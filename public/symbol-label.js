export function symbolLabel(symbol){
 const ticker=String(symbol||'').split(':').at(-1).toUpperCase();
 return ticker.replace(/\.P$/,'').replace(/_[0-9]{6,8}$/,'').replace(/(?:USDT|USDC|USD|EUR|BTC|ETH)$/,'').replace(/\d+!$/,'')||ticker;
}
