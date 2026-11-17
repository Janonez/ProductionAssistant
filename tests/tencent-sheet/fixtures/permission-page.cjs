'use strict';
// Synthetic model, not a claim about Tencent's unvalidated permission levels or special indices.
function permissionPage({readOnly=false,initializing=false,ranges=[]}={}) {
  return `(${function(options){
    class Range {
      constructor(sheetId='fixture-sheet',sr=0,er=0,sc=0,ec=0){Object.assign(this,{sheetId,startRowIndex:sr,endRowIndex:er,startColIndex:sc,endColIndex:ec});}
      clone(){return Object.assign(new Range(),this);}
      isInvalid(){return this.startRowIndex<0||this.startColIndex<0||this.endRowIndex<this.startRowIndex||this.endColIndex<this.startColIndex;}
      contains(other){return this.sheetId===other.sheetId&&!this.isInvalid()&&!other.isInvalid()&&this.startRowIndex<=other.startRowIndex&&other.endRowIndex<=this.endRowIndex&&this.startColIndex<=other.startColIndex&&other.endColIndex<=this.endColIndex;}
      isAll(){return this.isRow()&&this.isCol();}
      isRow(){return this.startColIndex===0&&this.endColIndex===2147483647;}
      isCol(){return this.startRowIndex===0&&this.endRowIndex===2147483647;}
    }
    const sheet={getSheetId:()=> 'fixture-sheet',getSheetName:()=> '合成工作表',getIsInitialized:()=> !options.initializing,getRowCount:()=>100,getColCount:()=>20,getSheetProtection:()=>undefined};
    const ranges=options.ranges.map((r,index)=>{const range=new Range(r.sheetId||'fixture-sheet',r.sr,r.er,r.sc,r.ec);return {getId:()=>r.id||String(index),getType:()=>r.type??3,getRange:()=>range};});
    const events=new Map(),event={listen:(name,fn)=>{const list=events.get(name)||[];list.push(fn);events.set(name,list);},remove:(name,fn)=>events.set(name,(events.get(name)||[]).filter(f=>f!==fn)),trigger:name=>{for(const fn of events.get(name)||[])fn();}};
    window.basicClientVars={authInfo:{attribute:{canEdit:!options.readOnly}}};
    window.clientVars={privilegeAttribute:{can_edit:options.initializing?null:options.readOnly?0:1},privilegeExpire:false,dataIniting:options.initializing};
    window.SpreadsheetApp={event:{init:event,rangeAuthEvent:event},view:{getSelectionRanges:()=>[new Range()]},sheetStatus:{getRangeCanEdit:()=>true},
      workbook:{activeSheet:sheet,worksheetManager:{getSheetBySheetId:id=>id==='fixture-sheet'?sheet:undefined,getSheetBySheetName:name=>name==='合成工作表'?sheet:undefined},
        workbookRangeManager:{getAllWorkbookRanges:()=>ranges,getWorkbookRangesByType:type=>ranges.filter(r=>r.getType()===type),getWorkbookRangeById:id=>ranges.find(r=>r.getId()===id),getWorkbookRangeBySheetId:(id,type)=>ranges.filter(r=>r.getType()===type&&r.getRange().sheetId===id)}}};
  }.toString()})(${JSON.stringify({readOnly,initializing,ranges})});`;
}
module.exports={permissionPage};
