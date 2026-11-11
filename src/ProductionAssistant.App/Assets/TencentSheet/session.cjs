'use strict';

const closed=()=>({state:'closed',browserOpen:false,authentication:'unknown',documentAccess:'unknown',editPermission:'unknown',verifiedAt:null,code:null,recoveryHint:null,message:'当前没有受管浏览器会话；重新打开并验证后才能确认登录状态。'});
function documentUrl(value) {
  const url=new URL(value);
  if(url.protocol!=='https:'||!['docs.qq.com','doc.weixin.qq.com'].includes(url.hostname)||url.username||url.password||url.port)
    throw Error('请使用腾讯文档或企业微信文档的 HTTPS 分享链接。');
  return url.href;
}

// Authentication is observed from the document, never from a QR image or frontend flag.
class TencentSession {
  constructor(browser){this.browser=browser;}
  async run(operation,config={}) {
    if(operation==='sessionClose'){await this.browser.close();return closed();}
    if(!['sessionOpen','sessionVerify','sessionStatus'].includes(operation))throw Error('不支持的会话操作。');
    const target=config.documentUrl||this.browser.documentUrl;
    if(operation!=='sessionStatus') {
      if(!target)throw Error('请先填写文档链接。');
      const page=this.browser.page;
      if(!page||page.isClosed()||!this.browser.context||this.browser.headless||this.browser.documentUrl!==target) {
        try {await this.browser.open({...config,documentUrl:target},false);}
        catch(error) {
          if(error.code==='SessionClosed')return closed();
          if(error.code==='ProfileBusy')return {...closed(),state:'profile-busy',code:'ProfileBusy',message:'专用浏览器配置正被其他进程使用。',recoveryHint:'请先在占用它的应用中结束会话，再重新打开。'};
          const unavailable=error.code==='BrowserUnavailable';
          return {...closed(),state:'unavailable',browserOpen:!!this.browser.context,code:unavailable?'BrowserUnavailable':'DocumentUnavailable',
            message:unavailable?'无法打开专用 Edge 浏览器。':'目标文档未能加载。',
            recoveryHint:unavailable?'请确认 Microsoft Edge 已安装，再重新打开。':'请检查网络或在浏览器中完成登录，然后重新验证。'};
        }
      }
      else if(operation==='sessionOpen')await page.bringToFront();
    }
    // SPA content may appear after DOMContentLoaded. Verify waits for actual evidence,
    // while Status remains a single read and never opens or navigates a browser.
    const deadline=Date.now()+Math.min((config.timeout||5)*1000,5000);
    let status;
    do {
      status=await this.inspect(target);
      if(operation==='sessionStatus'||!['unverified','loading'].includes(status.state)||Date.now()>=deadline)return status;
      await new Promise(resolve=>setTimeout(resolve,200));
    } while(true);
  }
  async inspect(target) {
    const page=this.browser.page;
    if(!page||page.isClosed()||!this.browser.context)return closed();
    const base={...closed(),state:'unverified',browserOpen:true,message:'尚未确认当前文档的登录状态。',recoveryHint:'请等待文档加载，在浏览器完成登录后点击“重新检查”。'};
    try {
      const actual=new URL(page.url()),expected=new URL(target);
      if(actual.origin!==expected.origin||actual.pathname!==expected.pathname)return base;
      // One evaluation: no retained Frame/ElementHandle during redirects or iframe replacement.
      const evidence=await page.evaluate(()=>{
        const visible=selector=>[...document.querySelectorAll(selector)].some(element=>{
          const style=getComputedStyle(element),rect=element.getBoundingClientRect();
          return style.visibility!=='hidden'&&style.display!=='none'&&rect.width>0&&rect.height>0;
        });
        const notice=[...document.querySelectorAll('[role="alert"],.permission-tips,.permission-denied')]
          .filter(element=>element.getBoundingClientRect().height>0).map(element=>element.textContent||'').join(' ');
        return {
          login:visible('#header-login-btn,.login-modal'),
          account:visible('.user-info-wrap:has(#self-info),.user-info-ent-wrap:has(#self-info)'),
          document:visible('.tab-bar-item'),
          denied:/无权访问|没有访问权限|申请访问|无权限查看/.test(notice),
          readOnly:visible('[aria-label="只读"],.readonly-tips,.read-only-tips')
        };
      });
      const result={...base,verifiedAt:new Date().toISOString()};
      result.authentication=evidence.login?'required':evidence.account?'authenticated':'unknown';
      result.documentAccess=evidence.denied?'denied':!evidence.login&&evidence.document?'allowed':'unknown';
      result.editPermission=evidence.readOnly?'read-only':'unknown';
      if(evidence.denied)return {...result,state:'access-denied',code:'AccessDenied',message:'当前账号没有此文档的访问权限。',recoveryHint:'请在文档侧申请授权或切换账号，再重新验证。'};
      if(evidence.login)return {...result,state:'login-required',message:'请在 Edge 中扫码或按腾讯页面提示登录，然后点击“重新检查”。',recoveryHint:null};
      if(evidence.account&&evidence.document)return {...result,state:'authenticated',message:'已确认账号登录且文档可访问；未执行任何单元格写入。',recoveryHint:null};
      return result;
    } catch(error) {
      if(page.isClosed()||!this.browser.context)return closed();
      if(/Execution context was destroyed|Frame (?:has been |was )?detached|navigation/i.test(error.message))
        return {...base,state:'loading',message:'页面正在跳转，请等待浏览器加载后重新验证。'};
      return {...base,state:'unavailable',code:'PageUnavailable',message:'暂时无法读取页面状态。',recoveryHint:'请检查浏览器页面后重新验证。'};
    }
  }
}
module.exports={TencentSession,closed,documentUrl};
