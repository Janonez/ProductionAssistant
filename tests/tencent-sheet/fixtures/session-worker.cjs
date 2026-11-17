'use strict';
const fs=require('node:fs');
const readline=require('node:readline');
if(process.argv[2]==='--probe') {
  try {const fd=fs.openSync(process.argv[3],'r+');fs.closeSync(fd);process.stdout.write('available');}
  catch(error) {process.stdout.write(error.code==='EBUSY'||error.code==='EACCES'||error.code==='EPERM'?'blocked':error.code);}
} else {
const marker=process.argv[2]+'.closed';
const input=readline.createInterface({input:process.stdin});
input.on('line',line=>{
  const request=JSON.parse(line);
  if(request.operation==='hang')return;
  if(request.operation==='crash'){process.exit(7);return;}
  if(request.operation==='sessionVerify') {
    fs.appendFileSync(process.argv[2]+'.calls','verify\n');
    setTimeout(()=>process.stdout.write(JSON.stringify({ok:true,browserOpen:true,data:{state:'authenticated',browserOpen:true,
      authentication:'authenticated',authenticationSource:'server',authenticationObservedAt:new Date().toISOString(),
      documentAccess:'allowed',editPermission:'unknown',verifiedAt:new Date().toISOString(),message:'synthetic session',
      targetDocumentUrl:request.config.documentUrl,configRevision:request.config.configRevision,sessionGeneration:4,
      pageGeneration:9,permissionCheck:request.config.permissionTargets?.length?{document:{value:'editable',reason:'consistent-page-fields',source:'tencent-page-fields'},model:{value:'complete',reason:'initialized-and-stable'},
        targets:request.config.permissionTargets.map(t=>({...t,protection:'protected',eligibility:'denied',reason:'protected-read-only'})),checkedAt:new Date().toISOString(),expiresAt:new Date(Date.now()+15000).toISOString(),generation:4,pageGeneration:9,userGeneration:1}:null,
      authenticationDiagnostics:{cookieEvidence:'present-unclassified',tokenReadSource:'request-body',tokenMatchesCookie:true,tokenInUrl:false,tokenInResponse:false,userInfoRequestsSeen:1,userInfoRequestsAccepted:1,
        requests:[{origin:'https://docs.qq.com',path:'/cgi-bin/online_docs/user_info',method:'POST',httpStatus:200}],cookieValue:'synthetic-not-for-bridge'}}})+'\n'),50);
    return;
  }
  process.stdout.write(JSON.stringify({ok:true,browserOpen:true,data:{message:'fixture opened'}})+'\n');
});
input.on('close',()=>fs.writeFileSync(marker,'flushed on EOF'));
}
