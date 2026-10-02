const clean=value=>String(value||'').replace(/<[^>]*>/g,'').trim();
const records=new Map(),cache=new Map();
export function parseSymbols(data){
 if(!Array.isArray(data?.symbols))throw Error('Geçersiz TradingView yanıtı');
 const result=[];
 for(const raw of data.symbols){const prefix=clean(raw.prefix||raw.source_id||raw.exchange).toUpperCase(),base=clean(raw.symbol),name=clean(raw.description);if(!/^[A-Z0-9_]+$/.test(prefix))continue;const logo=raw['base-currency-logoid']||raw.logo?.logoid||raw.logoid;const image=typeof logo==='string'&&/^[a-zA-Z0-9_/-]+$/.test(logo)&&!logo.includes('..')?'https://s3-symbol-logo.tradingview.com/'+logo+'.svg':'';const variants=raw.contracts?.length?raw.contracts:[raw];for(const variant of variants){const ticker=clean(variant.symbol);if(!/^[A-Z0-9_.!/-]{1,50}$/i.test(ticker))continue;result.push({ticker,symbol:prefix+':'+ticker,name:name+(variant!==raw&&variant.description?' · '+clean(variant.description):''),image,exchangeImage:typeof raw.source_logoid==='string'&&/^[a-zA-Z0-9_/-]+$/.test(raw.source_logoid)&&!raw.source_logoid.includes('..')?'https://s3-symbol-logo.tradingview.com/'+raw.source_logoid+'.svg':'',exchange:clean(raw.exchange),source:'tradingview',type:raw.type||'',contractType:raw.type==='futures'?'Vadeli':raw.type==='swap'?'Süresiz':raw.type==='forex'?'Forex':raw.type==='spot'?'Spot':raw.type||''});}}
 return result;
}
export async function searchTradingView(query){
 const q=String(query||'').trim().slice(0,100);if(!q)return [];
 const key=q.toUpperCase(),hit=cache.get(key);if(hit&&Date.now()<hit.expires)return hit.result;
 try{const batches=await Promise.all(['undefined','futures'].map(async type=>{const url='https://symbol-search.tradingview.com/symbol_search/v3/?text='+encodeURIComponent(q)+'&hl=1&exchange=&lang=en&search_type='+type+'&domain=production';const response=await fetch(url,{headers:{Origin:'https://www.tradingview.com',Referer:'https://www.tradingview.com/'},signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error();return parseSymbols(await response.json());}));const result=[...new Map(batches.flat().map(c=>[c.symbol,c])).values()].slice(0,60);for(const coin of result)records.set(coin.symbol,coin);cache.set(key,{expires:Date.now()+300000,result});if(cache.size>200)cache.delete(cache.keys().next().value);return result;}catch{const error=new Error('Sembol aramasına ulaşılamıyor. Lütfen tekrar deneyin.');error.status=502;throw error;}
}
export async function resolveSymbol(symbol){if(!symbol.includes(':'))return null;let record=records.get(symbol);if(!record){await searchTradingView(symbol.split(':')[1]);record=records.get(symbol);}if(!record){const error=new Error('Arama listesinden bir sembol seçin.');error.status=400;throw error;}return record;}
