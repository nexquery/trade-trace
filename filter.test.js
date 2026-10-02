import test from 'node:test';
import assert from 'node:assert/strict';
import {filterTrades} from './public/filter.js';
const trades=['2026-09-30','2026-10-01','2026-10-02','2026-10-03','2026-11-01'].map(date=>({date,symbol:'BTCUSDT',side:'Long'}));
test('Tarih aralığı her iki sınırı dahil eder ve ay filtresini geçersiz kılar',()=>{assert.deepEqual(filterTrades(trades,{start:'2026-09-30',end:'2026-10-02',month:'2026-11'}).map(t=>t.date),['2026-09-30','2026-10-01','2026-10-02']);});
test('Aralık kaldırıldığında ay, sembol ve yön filtreleri çalışır',()=>{assert.equal(filterTrades(trades,{month:'2026-10'}).length,3);assert.equal(filterTrades(trades,{start:'2026-10-01',end:'2026-10-02',search:'eth'}).length,0);assert.equal(filterTrades(trades,{month:'2026-10',side:'Short'}).length,0);});
