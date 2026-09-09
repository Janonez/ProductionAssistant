'use strict';
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const core = require('./core.js');
const {BrowserSession,normalizeAdapter,explainError} = require('./browser.cjs');

const root = path.resolve(__dirname,'../../..');
const defaultRuntime = path.join(root,'artifacts/tencent-docs-demo');
function normalizeConfig(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw Error('配置必须为对象');
  const selected = {};
  for (const key of Object.keys(core.defaults)) {
    const value = raw[key] ?? core.defaults[key];
    if (typeof value !== typeof core.defaults[key]) throw Error('配置类型错误：'+key);
    selected[key] = value;
  }
  const result = core.validate(selected);
  result.adapter = normalizeAdapter(raw.adapter);
  return result;
}
async function createServer(options = {}) {
  const runtime = options.runtime || defaultRuntime;
  await fs.mkdir(runtime,{recursive:true});
  const configPath = path.join(runtime,'config.json');
  let config = normalizeConfig(core.defaults), loadWarning = '';
  try { config = normalizeConfig(JSON.parse(await fs.readFile(configPath,'utf8'))); }
  catch(e) { if(e.code !== 'ENOENT') loadWarning = '已保存的配置读取失败，请在设置中重新导入；原文件未覆盖。'; }
  const driver = options.driver || new BrowserSession(path.join(runtime,'edge-profile'));
  const token = crypto.randomBytes(32).toString('hex');
  let busy = false, preview = null, version = 0;
  const writeBlockedReason='真实写入已暂停：已报告修改了错误位置，需验证目标单元格与编辑器的关联。读取和校验仍可使用。';
  const canWrite=()=>options.allowFixtureWrites===true && new URL(config.documentUrl || 'https://invalid.local').hostname==='127.0.0.1';
  function send(res,status,body,type='application/json; charset=utf-8') {
    res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer'});
    res.end(type.startsWith('application/json')?JSON.stringify(body):body);
  }
  const assets = {
    '/core.js':['core.js','text/javascript; charset=utf-8'],
    '/app.js':['app.js','text/javascript; charset=utf-8'],
    '/fonts/Inter.ttf':[path.join(root,'src/ProductionAssistant.App/Assets/Fonts/Inter.ttf'),'font/ttf'],
    '/fonts/NotoSansSC.ttf':[path.join(root,'src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf'),'font/ttf']
  };
  const server = http.createServer(async (req,res) => {
    const origin = `http://127.0.0.1:${server.address().port}`;
    if (req.headers.host !== `127.0.0.1:${server.address().port}`) return send(res,403,{error:'仅允许本机地址访问'});
    const url = new URL(req.url,origin);
    try {
      if (req.method==='GET' && url.pathname==='/') {
        let html = await fs.readFile(path.join(__dirname,'index.html'),'utf8');
        html = html.replace('<script src="core.js">',`<script>window.DEMO_SERVICE=${JSON.stringify({token,origin})};</script><script src="core.js">`)
          .replaceAll('../../../src/ProductionAssistant.App/Assets/Fonts/','/fonts/');
        return send(res,200,html,'text/html; charset=utf-8');
      }
      if (req.method==='GET' && assets[url.pathname]) {
        const [file,type] = assets[url.pathname];
        return send(res,200,await fs.readFile(path.resolve(__dirname,file)),type);
      }
      if (!url.pathname.startsWith('/api/')) return send(res,404,{error:'地址不存在'});
      if (req.headers['x-demo-token'] !== token || (req.headers.origin && req.headers.origin !== origin)) return send(res,403,{error:'请从本地 Demo 页面发起操作'});
      if (req.method==='GET' && url.pathname==='/api/config') return send(res,200,{config,warning:loadWarning,busy,writeEnabled:canWrite(),writeBlockedReason});
      if (req.method !== 'POST' || !String(req.headers['content-type']).startsWith('application/json')) return send(res,405,{error:'需要 JSON POST 请求'});
      if (busy) return send(res,409,{error:'已有操作正在执行，请等待完成'});
      // One dedicated browser page: serialize all mutations and invalidate one-use previews.
      busy = true;
      try {
        const chunks = []; let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if(size > 65536) throw Error('请求过大');
          chunks.push(chunk);
        }
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        if(url.pathname==='/api/config') {
          const next = normalizeConfig(body);
          await fs.writeFile(configPath+'.tmp',JSON.stringify(next,null,2),'utf8');
          await fs.rename(configPath+'.tmp',configPath);
          config = next; version++; preview = null; loadWarning = '';
          return send(res,200,{config,writeEnabled:canWrite(),message:'设置已保存到本机服务'});
        }
        if(url.pathname==='/api/open') { preview = null; return send(res,200,await driver.open(config)); }
        if(url.pathname==='/api/close') { preview = null; await driver.close(); return send(res,200,{message:'专用浏览器已关闭，登录会话保留'}); }
        if(url.pathname==='/api/status') return send(res,200,await driver.ready(config));
        if(url.pathname==='/api/discover') return send(res,200,await driver.discover(config));
        if(url.pathname==='/api/pick') { preview=null; const pickConfig={...config,adapter:normalizeAdapter({...config.adapter,frame:body.frame ?? config.adapter.frame})}; const result=await driver.pick(pickConfig,body.key); if(result.error)throw Error(result.error);return send(res,200,result); }
        if(url.pathname==='/api/read') {
          preview = null;
          const plan = core.plan(config,body.date,{cutting:0,welding:0,section:0,plate:0});
          await driver.selectSheet(config,plan.sheet);
          return send(res,200,{address:body.address,value:await driver.read(config,body.address),sheet:plan.sheet});
        }
        if(url.pathname==='/api/inspect') {
          preview = null;
          const plan = core.plan(config,body.date,body.values);
          const result = await driver.inspect(config,plan);
          if(!result.conflict) preview = {id:crypto.randomUUID(),version,created:Date.now(),plan,result};
          return send(res,200,{...result,inspectionId:preview?.id || null});
        }
        if(url.pathname==='/api/write') {
          if(!canWrite()){preview=null;throw Error(writeBlockedReason);}
          const saved = preview; preview = null;
          if(!saved || saved.id !== body.inspectionId || saved.version !== version || Date.now()-saved.created > 120000) throw Error('检查结果已失效，请重新检查真实目标');
          return send(res,200,await driver.write(config,saved.plan,saved.result));
        }
        return send(res,404,{error:'操作不存在'});
      } finally { busy = false; }
    } catch(e) {
      // Never report a partial write as an untouched document or retry it automatically.
      send(res,400,{...explainError(e),completed:e.completed || [],uncertainAddress:e.uncertainAddress || null});
    }
  });
  server.requestTimeout = 30000;
  server.headersTimeout = 10000;
  await new Promise((resolve,reject) => { server.once('error',reject); server.listen(options.port ?? 43128,'127.0.0.1',resolve); });
  return {server,token,driver,origin:`http://127.0.0.1:${server.address().port}`,async close() { await driver.close(); await new Promise(resolve=>server.close(resolve)); }};
}
if (require.main === module) {
  createServer().then(app => {
    console.log(`Tencent Docs Demo: ${app.origin}\nOpen this address to configure and operate the test page.\nPress Ctrl+C to stop.`);
    for (const signal of ['SIGINT','SIGTERM']) process.once(signal,async()=>{await app.close();process.exit(0);});
  }).catch(e => { console.error(e.code === 'EADDRINUSE' ? 'Port 43128 is in use. Open http://127.0.0.1:43128 if the demo is already running.' : e.message); process.exitCode=1; });
}
module.exports = {createServer,normalizeConfig};
