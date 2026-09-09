'use strict';
const assert=require('node:assert/strict');
const {TencentSheetClient}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/client.cjs');
const {normalize,dispatch}=require('../../src/ProductionAssistant.App/Assets/TencentSheet/runner.cjs');
let writes=0;
TencentSheetClient.prototype.inspect=async()=>({prewriteVerified:true,rows:[],conflict:false});
TencentSheetClient.prototype.write=async()=>{writes++;return {message:'fixture'};};
async function main() {
  assert.throws(()=>normalize({documentUrl:'https://example.com/'}),/分享链接/);
  const config=normalize({documentUrl:'https://docs.qq.com/sheet/fixture'});
  assert.equal(config.adapter.anchors.plateDate.address,'{sectionColumn}24');
  const request={config,date:'2026-09-09',values:{cutting:1,welding:2,section:3,plate:4}};
  await assert.rejects(dispatch({...request,operation:'write',token:'unknown'}),/预览已失效/);
  let preview=await dispatch({...request,operation:'inspect'});
  await assert.rejects(dispatch({...request,operation:'write',token:preview.token,values:{...request.values,cutting:9}}),/预览已失效/);
  assert.equal(writes,0);
  preview=await dispatch({...request,operation:'inspect'});
  await dispatch({...request,operation:'write',token:preview.token});
  await assert.rejects(dispatch({...request,operation:'write',token:preview.token}),/预览已失效/);
  assert.equal(writes,1);
  console.log('PASS: URL boundary, merged anchor, changed values and one-use confirmation');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
