export function filterTrades(trades,{start='',end='',month='',search='',side=''}={}) {
 const ranged=Boolean(start||end);
 return trades.filter(t=>(ranged?(!start||t.date>=start)&&(!end||t.date<=end):t.date.startsWith(month))&&t.symbol.includes(search.trim().toUpperCase())&&(!side||t.side===side));
}
