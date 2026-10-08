// SmartBin AI — mock dataset + helpers
const ZONES=['Zone A - Market Rd','Zone A - Station Rd','Zone B - MG Road','Zone B - Lake View','Zone C - University','Zone C - Hospital Rd','Zone D - Industrial','Zone D - Park Ave','Zone E - Old Town','Zone E - Riverside'];
const AREAS=['Market Rd','Station Rd','MG Road','Lake View','University Gate','Hospital Rd','Industrial Estate','Park Ave','Old Town','Riverside','Bus Stand','City Mall','Green Park','Court Rd','College St'];
function mulberry(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rnd=mulberry(42);
const BINS=[];
for(let i=1;i<=50;i++){
 const r=rnd();let fill,status;
 if(i<=8){fill=85+Math.floor(rnd()*15);}else if(i<=18){fill=70+Math.floor(rnd()*14);}else{fill=12+Math.floor(rnd()*55);}
 if(fill>=85)status='critical';else if(fill>=70)status='warning';else status='normal';
 const rate=(5+rnd()*6).toFixed(1);
 const hrsLeft=fill>=100?0:((100-fill)/rate);
 const conf=86+Math.floor(rnd()*12);
 const temp=(28+rnd()*12).toFixed(1);
 const lat=12.935+ (rnd()-.5)*0.12, lng=77.60+(rnd()-.5)*0.14;
 const minsAgo=Math.floor(rnd()*28)+2;
 BINS.push({id:'DB-'+String(100+i),loc:AREAS[i%AREAS.length]+' · '+(i%5+1)+''+(i%2?'A':'B'),zone:ZONES[i%ZONES.length].split(' -')[0],area:AREAS[i%AREAS.length],fill,prevFill:Math.max(5,fill-Math.floor(rnd()*9+2)),status,rate:parseFloat(rate),hrsLeft:parseFloat(hrsLeft.toFixed(1)),conf,temp,lat,lng,updated:minsAgo+' min ago',updatedMin:minsAgo,lastCollection:['Today 6:40 AM','Yesterday 7:15 PM','Today 8:05 AM'][i%3],battery:68+Math.floor(rnd()*30),sensor:i%17===0?'offline':'online'});
}
BINS.find(b=>b.id==='DB-102').fill=92;BINS.find(b=>b.id==='DB-102').status='critical';
const ALERTS=[
 {id:1,level:'critical',title:'Dustbin DB-102 is 92% full',desc:'Market Rd · Zone A — dispatch collection immediately.',time:'4 min ago',icon:'fa-triangle-exclamation'},
 {id:2,level:'critical',title:'Dustbin DB-108 predicted to overflow in 3 hours',desc:'AI forecast · 93% confidence · rate 7.4%/hr.',time:'18 min ago',icon:'fa-brain'},
 {id:3,level:'warning',title:'Collection required at Zone A',desc:'4 bins above 80% — Route R-4 suggested (4.2 km).',time:'42 min ago',icon:'fa-truck-fast'},
 {id:4,level:'info',title:'Route R-2 completed',desc:'12 bins collected · 2.1 t waste · fuel −18%.',time:'2 hrs ago',icon:'fa-circle-check'},
 {id:5,level:'warning',title:'Sensor offline — DB-117',desc:'Lake View · no heartbeat for 45 min. Inspect device.',time:'1 hr ago',icon:'fa-wifi'},
 {id:6,level:'info',title:'Weekly report ready',desc:'Zone C recycling up 12% week-over-week.',time:'5 hrs ago',icon:'fa-file-lines'},
 {id:7,level:'critical',title:'Dustbin DB-131 is 96% full',desc:'Bus Stand · Zone D — overflow risk. Priority pickup.',time:'26 min ago',icon:'fa-dumpster'},
 {id:8,level:'info',title:'New bin provisioned — DB-151',desc:'Riverside · calibration complete, now online.',time:'Yesterday',icon:'fa-plus'}];
const HISTORY=[
 {route:'R-4',zone:'Zone A',bins:12,weight:'2.4 t',fuel:'18.2 L',date:'Today 09:30 AM',status:'Completed'},
 {route:'R-2',zone:'Zone B',bins:9,weight:'1.8 t',fuel:'14.6 L',date:'Today 07:00 AM',status:'Completed'},
 {route:'R-1',zone:'Zone C',bins:11,weight:'2.1 t',fuel:'16.9 L',date:'Yesterday 06:45 PM',status:'Completed'},
 {route:'R-5',zone:'Zone D',bins:7,weight:'1.4 t',fuel:'11.3 L',date:'Yesterday 10:15 AM',status:'Completed'},
 {route:'R-3',zone:'Zone E',bins:10,weight:'2.0 t',fuel:'15.8 L',date:'Oct 06, 08:20 AM',status:'Completed'},
 {route:'R-4',zone:'Zone A',bins:13,weight:'2.6 t',fuel:'19.1 L',date:'Oct 05, 09:00 AM',status:'Completed'}];
function statusMeta(s){return s==='critical'?{label:'Critical',cls:'red',bg:'bg-red-50 text-red-600 border-red-200',dot:'bg-red-500'}:s==='warning'?{label:'Nearly Full',cls:'amber',bg:'bg-amber-50 text-amber-600 border-amber-200',dot:'bg-amber-500'}:{label:'Normal',cls:'green',bg:'bg-green-50 text-green-600 border-green-200',dot:'bg-green-500'}}
function toast(msg,icon='fa-circle-check'){const t=document.getElementById('toast');if(!t)return;t.innerHTML=`<div class="bg-slate-900 text-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3"><i class="fa-solid ${icon} text-green-400"></i><p class="text-sm font-semibold">${msg}</p></div>`;t.style.transform='none';setTimeout(()=>t.style.transform='translateX(120%)',2800);}
