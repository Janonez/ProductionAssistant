'use strict';
const {chromium}=require('playwright');

// One owner for the dedicated profile; clients borrow its page and never reopen it on errors.
class TencentDocsBrowser {
  constructor(profile,options={}) {this.profile=profile;this.options=options;this.context=null;this.page=null;this.documentUrl=null;}
  async open(config) {
    if(!this.context) {
      this.context=await chromium.launchPersistentContext(this.profile,{channel:'msedge',headless:false,viewport:null,...this.options});
      this.context.on('close',()=>{this.context=null;this.page=null;this.documentUrl=null;});
    }
    this.page=this.page&&!this.page.isClosed()?this.page:this.context.pages()[0]||await this.context.newPage();
    this.page.setDefaultTimeout(config.timeout*1000);
    await this.page.goto(config.documentUrl,{waitUntil:'domcontentloaded'});
    this.documentUrl=config.documentUrl;
    await this.page.bringToFront();
    return {message:'已打开填报专用浏览器。首次使用请扫码登录，然后点击「识别并检查」。'};
  }
  requirePage(config) {
    if(!this.page||this.page.isClosed())throw Error('请先打开文档并扫码登录。');
    if(this.documentUrl!==config.documentUrl)throw Error('文档链接已变更，请重新打开文档。');
    const expected=new URL(config.documentUrl),actual=new URL(this.page.url());
    if(actual.origin!==expected.origin||actual.pathname!==expected.pathname)throw Error('当前不在目标文档，请完成登录后重新打开文档。');
    this.page.setDefaultTimeout(config.timeout*1000);
  }
  async close(){if(this.context)await this.context.close();}
}
module.exports={TencentDocsBrowser};
