var F='all';
function setF(f,el){F=f;var btns=document.querySelectorAll('.fb');for(var i=0;i<btns.length;i++){btns[i].className='fb bg-white border px-4 py-2 rounded-xl';}el.className='fb bg-slate-900 text-white px-4 py-2 rounded-xl';render();}
function bc(s){return s==='critical'?'from-red-500 to-red-400':s==='warning'?'from-amber-500 to-yellow-400':'from-green-500 to-teal-400';}
function dispatchBin(id){toast('Crew dispatched to '+id,'fa-truck-fast');}
function render(){var q=(document.getElementById('q').value||'').toLowerCase();var z=document.getElementById('zone').value;var html='';
for(var i=0;i<BINS.length;i++){var b=BINS[i];var m=statusMeta(b.status);
if(!((F==='all'||b.status===F)&&(z==='all'||b.zone===z)))continue;
if(b.id.toLowerCase().indexOf(q)<0&&b.loc.toLowerCase().indexOf(q)<0)continue;
var hrs=b.hrsLeft<1?Math.round(b.hrsLeft*60)+' min':b.hrsLeft+' hrs';
html+='<div class="card-hover bg-white rounded-2xl border p-5 fade-in"><div class="flex items-start justify-between"><div><a href="details.html?id='+b.id+'" class="font-extrabold hover:text-green-600">'+b.id+'</a><p class="text-xs text-slate-500">'+b.loc+'</p></div><span class="text-[11px] font-bold border px-2.5 py-1 rounded-full '+m.bg+'">'+m.label+'</span></div><div class="flex items-end justify-between mt-4"><p class="text-3xl font-black">'+b.fill+'<span class="text-sm text-slate-400">%</span></p><p class="text-[11px] text-slate-400">updated '+b.updated+'</p></div><div class="h-2.5 bg-slate-100 rounded-full mt-2 overflow-hidden"><div class="h-full bg-gradient-to-r '+bc(b.status)+' rounded-full" style="width:'+b.fill+'%"></div></div><p class="text-xs mt-3 font-bold text-violet-600">AI: full in '+hrs+' · '+b.conf+'% · '+b.temp+'C</p><div class="flex gap-2 mt-4"><a href="details.html?id='+b.id+'" class="flex-1 text-center text-xs font-bold bg-slate-900 text-white py-2.5 rounded-xl">View Details</a><button onclick="dispatchBin(\''+b.id+'\')" class="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-3.5 py-2.5 rounded-xl">Dispatch</button></div></div>';}
document.getElementById('grid').innerHTML=html||'<p class="text-slate-400 col-span-full text-center py-10">No bins match.</p>';
var n=BINS.filter(function(x){return (F==='all'||x.status===F);}).length;
document.getElementById('cnt').textContent=n+' bins shown';}
render();

