const core=require('../../src/ProductionAssistant.App/Assets/TencentSheet/core.js');
const keys=['cutting','welding','section','plate'];
const positions=[['F9','G9','F8','B9','滨海公司'],['F19','G19','F18','B19','滨海公司'],['F35','H35','F34','N33','型材'],['G35','I35','G34','O33','板材']];
module.exports=()=>({documentUrl:'https://docs.qq.com/sheet/fixture',sheetReferenceName:'下料、装焊（26年9月）',fields:keys.map(id=>({id,name:id,unit:'吨'})),rules:Object.fromEntries(keys.map((key,i)=>{
 const [first,second,dateAddress,labelAddress,label]=positions[i];
 const rule=core.inferRule([{date:'2026-09-01',address:first},{date:'2026-09-02',address:second}]);
 return [key,core.normalizeRule({...rule,confirmation:core.prediction(rule),dateAnchor:{address:dateAddress,format:'{yyyy}年{M}月{d}日'},labelAnchor:{address:labelAddress,expected:label}})];
})),webControls:{
 cellAddressBox:{frame:[],sampleText:'',strategies:[{type:'css',value:'#name'}]},
 cellEditor:{frame:[],sampleText:'',strategies:[{type:'css',value:'#value'}]},
 sheetTab:{frame:[],sampleText:'',strategies:[{type:'collection',parentSelector:'body',itemSelector:':scope > [role=tab]',selectedSelector:'[aria-selected=true]'}]}
}});
