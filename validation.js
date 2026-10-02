import {inferSide} from './public/trade-math.js';
export function validateTrade(b){
 const fail=()=>{const e=new Error('Tarih, sembol, fiyatlar, net sonuç ve komisyonu kontrol edin.');e.status=400;throw e;};
 if(!b||typeof b.symbol!=='string'||!b.symbol.trim()||b.symbol.length>80||!/^\d{4}-\d{2}-\d{2}$/.test(b.date)||!Number.isFinite(Date.parse(b.date))||new Date(b.date).toISOString().slice(0,10)!==b.date)fail();
 const values={};for(const k of ['entry','exit','pnl','fees']){if(b[k]===''||b[k]===null||!['number','string'].includes(typeof b[k]))fail();values[k]=Number(b[k]);if(!Number.isFinite(values[k])||(k!=='pnl'&&values[k]<0))fail();}
 const notes=typeof b.notes==='string'?b.notes:'';if(notes.length>10000)fail();
 return {symbol:b.symbol.trim().toUpperCase(),date:b.date,...values,notes,side:inferSide(values.entry,values.exit,values.pnl,values.fees),pnlMode:'manual'};
}
