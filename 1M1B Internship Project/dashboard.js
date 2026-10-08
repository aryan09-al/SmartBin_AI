// dashboard trend chart (runs after data.js)
let F='all';
function setF(f,el){F=f;document.querySelectorAll('.fb').forEach(b=>b.className='fb bg-slate-100 px-3.5 py-2 rounded-xl');el.className='fb bg-slate-900 text-white px-3.5 py-2 rounded-xl';renderTable();}
function barColor(s){return s==='critical'?'bg-red-500':s==='warning'?'bg-amber-500':'bg-green-500';}
function renderTable(){var qEl=document.getElementById('q');var q=(qEl?qEl.value:'').toLowerCase();
var list=[...BINS].sort((a,b)=>b.fill-a.fill).filter(b=>(F==='all'||b.status===F)&&(b.id.toLowerCase().includes(q)||b.loc.toLowerCase().includes(q))).slice(0,10);
document.getElementById('rows').innerHTML=list.map(b=>{var m=statusMeta(b.status);
return '<tr class="border-b"><td class="px-5 py-3.5"><a href="details.html?id='+b.id+'" class="font-bold hover:text-green-600">'+b.id+'</a><p class="text-xs text-slate-400">'+b.loc+'</p></td><td class="px-5 py-3.5"><div class="flex items-center gap-2"><div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full '+barColor(b.status)+' rounded-full" style="width:'+b.fill+'%"></div></div><b>'+b.fill+'%</b></div></td><td class="px-5 py-3.5"><span class="text-[11px] font-bold border px-2.5 py-1 rounded-full '+m.bg+'">'+m.label+'</span></td><td class="px-5 py-3.5 text-xs text-slate-500">'+b.updated+'</td><td class="px-5 py-3.5 text-xs font-bold text-violet-600">'+(b.hrsLeft<1?'~'+Math.round(b.hrsLeft*60)+' min':'~'+b.hrsLeft+' hrs')+'</td><td class="px-5 py-3.5 text-right"><a href="details.html?id='+b.id+'" class="text-xs font-bold bg-slate-900 text-white px-3.5 py-2 rounded-lg hover:bg-green-600">View</a></td></tr>';}).join('');}
renderTable();
(function(){var c=document.getElementById('chTrend');if(!c||!window.Chart)return;
var H=['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'];
var D=[41,38,36,39,47,55,58,61,63,66,64,62];
new Chart(c,{type:'line',data:{labels:H,datasets:[{data:D,borderColor:'#16a34a',backgroundColor:'rgba(22,163,74,.12)',fill:true,tension:.45,pointRadius:3,pointBackgroundColor:'#16a34a',borderWidth:2.5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:30,max:75,ticks:{font:{size:10}}},x:{ticks:{font:{size:10}},grid:{display:false}}}}});})();
