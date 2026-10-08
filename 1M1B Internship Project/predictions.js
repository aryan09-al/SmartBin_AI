let charts=[];
function loadBin(id){var b=BINS.find(x=>x.id===id)||BINS[1];
document.getElementById('pId').textContent=b.id+' · '+b.loc;
document.getElementById('pConf').textContent='⚡ '+b.conf+'% CONFIDENCE';
document.getElementById('pFill').textContent=b.fill+'%';
document.getElementById('pRate').textContent=b.rate+'%/hr';
document.getElementById('pTime').textContent=b.hrsLeft<1?Math.round(b.hrsLeft*60)+' min':b.hrsLeft+' hrs';
document.getElementById('pFull').textContent=Math.round(b.fill+b.rate*b.hrsLeft)+'%';
document.getElementById('pAdvice').innerHTML='<b>AI recommendation:</b> '+(b.status==='critical'?'Dispatch immediately — overflow imminent on '+b.id+'. Assign Route R-4.':'Schedule '+b.id+' within '+Math.ceil(b.hrsLeft)+' hrs. Current rate '+b.rate+'%/hr is '+(b.rate>7?'above':'near')+' city average (6.2%/hr).');
charts.forEach(c=>c.destroy());charts=[];
var H=[];for(var i=23;i>=0;i--)H.push((new Date(Date.now()-i*36e5)).getHours()+':00');
var act=[],pred=[],v=b.fill;for(var j=23;j>=0;j--){v=Math.max(8,v-(b.rate*(0.5+Math.random()*0.8)));act.unshift(Math.round(v));}
for(var k=0;k<24;k++){pred.push(Math.round(Math.min(100,act[0]+(b.rate*0.92)*(k+1)/3.2)));}
charts.push(new Chart(document.getElementById('chAccum'),{type:'line',data:{labels:H,datasets:[{label:'Actual',data:act,borderColor:'#16a34a',backgroundColor:'rgba(22,163,74,.1)',fill:true,tension:.4,borderWidth:2.5,pointRadius:0},{label:'AI predicted',data:pred,borderColor:'#8b5cf6',borderDash:[6,5],tension:.4,fill:false,borderWidth:2.5,pointRadius:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,font:{size:11}}}},scales:{y:{min:0,max:105},x:{ticks:{maxTicksLimit:8,font:{size:9}},grid:{display:false}}}}}));
var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
var a2=[62,68,71,64,74,58,66],p2=a2.map(v=>v+(Math.random()*4-2));
charts.push(new Chart(document.getElementById('chAcc'),{type:'bar',data:{labels:days,datasets:[{label:'Actual %',data:a2,backgroundColor:'#16a34a',borderRadius:6},{label:'Predicted %',data:p2,backgroundColor:'#a78bfa',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,font:{size:11}}}}} }));
charts.push(new Chart(document.getElementById('chWeek'),{type:'bar',data:{labels:days,datasets:[{data:[2.1,2.4,1.9,2.2,2.6,1.7,1.5],backgroundColor:['#16a34a','#16a34a','#0d9488','#16a34a','#15803d','#38bdf8','#38bdf8'],borderRadius:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}}}}}));
}
document.getElementById('binSel').innerHTML=BINS.slice(0,15).map(b=>'<option>'+b.id+'</option>').join('');
document.getElementById('binSel').value='DB-102';loadBin('DB-102');
