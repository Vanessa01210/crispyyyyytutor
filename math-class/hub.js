/* 酥酥數學點心教室：教室場景與各角落（黑板動畫課、書櫃讀報、沙發小遊戲、座位月考模擬、牆上每日一題與集小卡） */
{
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'})[c]);
const GN={g3:'三年級',g4:'四年級',g5:'五年級',g6:'六年級',all:'各年級'};
const dkey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

/* ---------- 紀錄（只存在這台裝置的瀏覽器） ---------- */
const DEF={name:'',grade:'g5',days:{},cnt:{diag:0,fix:0,prac:0,daily:0},viz:[],best:0,dailyLog:{},tour:false,cards:[]};
let S;try{S=Object.assign(structuredClone(DEF),JSON.parse(localStorage.getItem('susu-class')||'{}'))}catch(e){S=structuredClone(DEF)}
const save=()=>{try{localStorage.setItem('susu-class',JSON.stringify(S))}catch(e){}};
const day=k=>S.days[k]||(S.days[k]={sec:0,ck:false});
const checkedDays=()=>Object.values(S.days).filter(d=>d.ck).length;
function streak(){let n=0;const d=new Date();if(!day(dkey(d)).ck)d.setDate(d.getDate()-1);for(;;){const k=dkey(d);if(S.days[k]&&S.days[k].ck){n++;d.setDate(d.getDate()-1)}else break}return n}
const mins=s=>s<60?'不到 1 分':`${Math.round(s/60)} 分`;
const totalSec=()=>Object.values(S.days).reduce((a,d)=>a+(d.sec||0),0);
setInterval(()=>{if(document.visibilityState==='visible'){day(dkey()).sec+=15;save()}},15000);

/* ---------- 稱號與點心卡 ---------- */
const BADGES=[
 {id:'b1',name:'第一次打卡',grp:'打卡',need:1,cur:()=>checkedDays(),card:'雞蛋糕',fact:'雞蛋糕一盤 12 個，平分給 3 個人，每人 12 ÷ 3 ＝ 4 個。'},
 {id:'b2',name:'暖身小點心',grp:'打卡',need:3,cur:()=>streak(),desc:'連續打卡 3 天',card:'紅豆餅',fact:'圓形的紅豆餅，直徑 8 公分，周長是 8 × 3.14 ＝ 25.12 公分。'},
 {id:'b3',name:'一週不斷電',grp:'打卡',need:7,cur:()=>streak(),desc:'連續打卡 7 天',card:'草莓大福',fact:'一盒 6 個大福吃掉 2 個，剩下 4/6，約分是 2/3。'},
 {id:'b4',name:'月度練功王',grp:'打卡',need:30,cur:()=>checkedDays(),desc:'打卡 30 天',card:'生日蛋糕',fact:'蛋糕切成 8 片，拿 3 片是 3/8，比 1/2 少 1/8。'},
 {id:'b5',name:'圖解小學徒',grp:'黑板',need:5,cur:()=>S.viz.length+(S.les||[]).length,desc:'看 5 個圖解或動畫課',card:'布丁',fact:'布丁杯裝 120 毫升，8 杯就是 960 毫升，快要 1 公升了。'},
 {id:'b6',name:'圖解大師',grp:'黑板',need:20,cur:()=>S.viz.length+(S.les||[]).length,desc:'看 20 個圖解或動畫課',card:'馬卡龍',fact:'馬卡龍 5 種顏色各拿 1 個排一排，有 120 種排法。'},
 {id:'b7',name:'找到卡關點',grp:'診斷',need:1,cur:()=>S.cnt.diag,desc:'完成 1 次卡關診斷',card:'蛋塔',fact:'蛋塔的塔皮是圓形，半徑 3 公分，面積 3 × 3 × 3.14 ＝ 28.26 平方公分。'},
 {id:'b8',name:'小小改考卷',grp:'月考模擬',need:5,cur:()=>S.cnt.fix,desc:'改考卷找到 5 個錯',card:'泡芙',fact:'泡芙 1 個 15 元，買 12 個用分配律：15 × 12 ＝ 15 × 10 ＋ 15 × 2 ＝ 180 元。'},
 {id:'b9',name:'火眼金睛',grp:'月考模擬',need:15,cur:()=>S.cnt.fix,desc:'改考卷找到 15 個錯',card:'銅鑼燒',fact:'銅鑼燒 2 片餅夾 1 層餡，9 個銅鑼燒有 18 片餅。'},
 {id:'b10',name:'練習小達人',grp:'練習',need:30,cur:()=>S.cnt.prac,desc:'練習答對 30 題',card:'甜甜圈',fact:'甜甜圈中間的洞讓它變成「環形」，面積是大圓減小圓。'},
 {id:'b11',name:'點心快手',grp:'練習',need:10,cur:()=>S.best,desc:'快手挑戰答對 10 題',card:'鬆餅',fact:'鬆餅格子 4 × 4 ＝ 16 格，淋了 4 格糖漿，是 4/16 ＝ 1/4。'},
 {id:'b12',name:'每日一酥',grp:'每日一題',need:7,cur:()=>S.cnt.daily,desc:'每日一題答對 7 次',card:'奶酥麵包',fact:'奶酥麵包原價 40 元打八折，付 40 × 0.8 ＝ 32 元。'}];
const done=b=>b.cur()>=b.need;
function award(){const got=[];BADGES.forEach(b=>{if(done(b)&&!S.cards.includes(b.id)){S.cards.push(b.id);got.push(b)}});save();got.forEach((b,i)=>setTimeout(()=>toast(`獲得稱號「${b.name}」和點心卡「${b.card}」！`,'card'),i*2600))}
const title=()=>{const g=BADGES.filter(b=>S.cards.includes(b.id));return g.length?g[g.length-1].name:'還沒有稱號，加油！'};

/* ---------- 給其他頁面呼叫的紀錄 ---------- */
function track(t,v){if(t==='viz'){if(!S.viz.includes(v))S.viz.push(v)}else if(t==='les'){S.les=S.les||[];if(!S.les.includes(v))S.les.push(v)}else S.cnt[t]=(S.cnt[t]||0)+1;day(dkey());save();award()}

/* ---------- 小工具 ---------- */
function toast(t,k){let el=$('#toast');if(!el){el=document.createElement('div');el.id='toast';document.body.appendChild(el)}el.className='toast '+(k||'');el.textContent=t;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),2400)}
const back=`<button class="back" type="button" data-go="">← 回教室</button>`;
const seeded=(seed,fn)=>{const o=Math.random;let s=seed>>>0;Math.random=()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};try{return fn()}finally{Math.random=o}};
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const plain=h=>String(h).replace(/<span>(\d+)<\/span>/g,'$1 又 ').replace(/<i>(\d+)<\/i><i>(\d+)<\/i>/g,'$1/$2').replace(/<[^>]+>/g,'');

/* ---------- 改考卷 ---------- */
const FIX=[
 {g:'g3',ref:'g3-1-0',q:'4002 － 1567 ＝ ？',s:['個位：2 不夠減 7，就改成 7 － 2 ＝ 5','十位：0 不夠減 6，改成 6 － 0 ＝ 6','百位：0 不夠減 5，改成 5 － 0 ＝ 5','千位：4 － 1 ＝ 3，答案 3565'],w:0,ex:'不夠減不能倒過來減。個位 2 不夠減 7，要向前借；十位、百位都是 0，一路借到千位：千位 4 變 3，百位、十位的 0 變成 9，個位變 12。',ans:'2435'},
 {g:'g3',ref:'g3-3-0',q:'412 ÷ 4 ＝ ？',s:['百位：4 ÷ 4 ＝ 1，商寫 1','十位：1 不夠除 4，跳過不寫','12 ÷ 4 ＝ 3，商寫 3','答案是 13'],w:1,ex:'不夠除也要在那一位寫 0。十位 1 不夠除 4，商寫 0，再把 1 和下一位 2 合成 12。',ans:'103'},
 {g:'g3',ref:'g3-4-1',q:'3 時 20 分 － 1 時 45 分 ＝ ？',s:['20 分不夠減 45 分，向「時」借 1','借來的 1 小時是 100 分：20 ＋ 100 ＝ 120 分','120 － 45 ＝ 75 分，2 － 1 ＝ 1 時','答案是 1 時 75 分'],w:1,ex:'1 小時是 60 分，不是 100 分。20 ＋ 60 ＝ 80 分，80 － 45 ＝ 35 分。',ans:'1 時 35 分'},
 {g:'g4',ref:'g4-3-0',q:'20 － 4 × 3 ＝ ？',s:['先算 20 － 4 ＝ 16','再算 16 × 3 ＝ 48','答案是 48'],w:0,ex:'要先乘除後加減：先算 4 × 3 ＝ 12，再算 20 － 12。',ans:'8'},
 {g:'g4',ref:'g4-5-0',q:'把 2 又 3/4 化成假分數',s:['把整數 2 和分子 3 加起來：2 ＋ 3 ＝ 5','分母不變，還是 4','答案是 5/4'],w:0,ex:'2 個整數是 2 × 4 ＝ 8 個 1/4，再加 3 個，一共 11 個 1/4。',ans:'11/4'},
 {g:'g4',ref:'g4-6-2',q:'3.5 ＋ 1.25 ＝ ？',s:['直式把 3.5 和 1.25 的最後一位對齊','35 ＋ 125 ＝ 160','點上兩位小數，答案 1.60'],w:0,ex:'小數加法要對齊小數點，不是對齊最後一位：3.50 ＋ 1.25。',ans:'4.75'},
 {g:'g5',ref:'g5-1-3',q:'1/2 ＋ 1/3 ＝ ？',s:['2 和 3 的最小公倍數是 6','1/2 ＝ 1/6，1/3 ＝ 1/6','1/6 ＋ 1/6 ＝ 2/6 ＝ 1/3'],w:1,ex:'通分時分母乘幾，分子也要乘幾：1/2 ＝ 3/6，1/3 ＝ 2/6。',ans:'5/6'},
 {g:'g5',ref:'g5-1-4',q:'3 又 1/4 － 1 又 3/4 ＝ ？',s:['1/4 不夠減 3/4','改成 3/4 － 1/4 ＝ 2/4','整數 3 － 1 ＝ 2，答案 2 又 2/4'],w:1,ex:'不能倒過來減。從整數借 1 ＝ 4/4，變成 2 又 5/4，再減 1 又 3/4。',ans:'1 又 1/2'},
 {g:'g5',ref:'g5-6-0',q:'48 ÷ 4 × 2 ＝ ？',s:['乘法比較強，先算 4 × 2 ＝ 8','再算 48 ÷ 8 ＝ 6','答案是 6'],w:0,ex:'乘和除是同一級，要由左往右：48 ÷ 4 ＝ 12，12 × 2 ＝ 24。',ans:'24'},
 {g:'g5',ref:'g5-6-6',q:'用簡便方法算 99 × 25',s:['99 看成 100 － 1','100 × 25 ＝ 2500','再扣掉 1：2500 － 1 ＝ 2499'],w:2,ex:'(100 － 1) × 25 ＝ 100 × 25 － 1 × 25，多算的是 1 個 25，要扣 25。',ans:'2475'},
 {g:'g5',ref:'g5-6-7',q:'甲班 30 人平均 80 分，乙班 20 人平均 75 分，全體平均幾分？',s:['甲班平均 80 分，乙班平均 75 分','兩班合起來的平均 ＝ (80 ＋ 75) ÷ 2','答案是 77.5 分'],w:1,ex:'兩班人數不一樣，不能直接把平均再平均。總分 30 × 80 ＋ 20 × 75 ＝ 3900，3900 ÷ 50 ＝ 78。',ans:'78 分'},
 {g:'g6',ref:'g6-1-2',q:'4.5 ÷ 0.15 ＝ ？',s:['除數 0.15 乘 100，變成 15','被除數 4.5 不用動','4.5 ÷ 15 ＝ 0.3'],w:1,ex:'被除數和除數要同時乘 100，商才不變：450 ÷ 15 ＝ 30。',ans:'30'},
 {g:'g6',ref:'g6-4-1',q:'直徑 10 公分的圓，面積是多少？',s:['題目給的直徑是 10 公分','面積 ＝ 10 × 10 × 3.14','答案是 314 平方公分'],w:1,ex:'圓面積要用半徑：10 ÷ 2 ＝ 5，5 × 5 × 3.14 ＝ 78.5。',ans:'78.5 平方公分'},
 {g:'g6',ref:'g6-5-3',q:'x ＋ 5 ＝ 12，x ＝ ？',s:['把 5 移到等號右邊','x ＝ 12 ＋ 5','答案 x ＝ 17'],w:1,ex:'「加 5」要用「減 5」還原：兩邊同時拿走 5，x ＝ 12 － 5。',ans:'7'}];
/* ---------- 練習場 ---------- */
function speed(app,DG){let left=60,score=0,n=0,q,lock=false;const T0=Date.now();
 const next=()=>{const t=DG[Math.floor(Math.random()*DG.length)];q=t.f();n++;lock=false;
  app.querySelector('#gq').innerHTML=`<p class="qs">${t.label}</p><p class="qq" style="font-size:24px">${q.q}</p><div class="opts">${q.o.map((o,k)=>`<button class="opt" type="button" data-o="${k}">${o[0]}</button>`).join('')}</div>`};
 app.innerHTML=`<div class="col quiz"><div class="qtop"><b class="timer" id="tm">60</b><b class="sc">答對 <span id="sc">0</span></b></div><div class="qcard" id="gq"></div></div>`;next();
 const tick=setInterval(()=>{left=60-Math.floor((Date.now()-T0)/1000);const tm=$('#tm');if(!tm){clearInterval(tick);return}tm.textContent=Math.max(0,left);if(left<=0){clearInterval(tick);end()}},250);
 app.onclick=e=>{const o=e.target.closest('[data-o]');if(!o||lock)return;lock=true;const k=+o.dataset.o,ok=!q.o[k][1];if(ok){score++;$('#sc').textContent=score;track('prac')}
  app.querySelectorAll('.opt').forEach((b,i)=>{if(!q.o[i][1])b.classList.add('on');else if(i===k)b.style.borderColor='var(--berry)'});setTimeout(()=>{if($('#gq'))next()},ok?350:900)};
 function end(){const nb=score>S.best;if(nb)S.best=score;save();award();
  app.innerHTML=`<div class="col"><div class="card center" style="margin-top:24px"><h2>${nb?'新紀錄！':'時間到！'}</h2><p class="score-big">${score} 題</p><p>你一共作答 ${n-1 > 0 ? n-1 : 0} 題，最高分 ${S.best} 題。</p><div class="btns c"><button class="btn" type="button" id="again2">再挑戰一次</button><button class="btn w" type="button" data-go="play">回練習場</button></div></div></div>`;
  $('#again2').onclick=()=>speed(app,DG)}}

/* ---------- 每日一題 ---------- */
function daily(app){const k=dkey(),g=S.grade,pool=window.DIAG.filter(t=>t.g===g),t=pool[hash(k+g)%pool.length],q=seeded(hash(k+g+'q'),()=>t.f()),log=S.dailyLog[k];
 const got=Object.values(S.dailyLog).filter(x=>x.ok).length;
 app.innerHTML=`<div class="col">${back}<h2 style="margin-top:6px">每日一題</h2><p class="small" style="margin-top:-6px">${k.replace(/-/g,' / ')}・${GN[g]}（可以在「集小卡」換年級）・累積答對 ${got} 天</p>
 <div class="qcard"><p class="qs">${t.label}</p><p class="qq">${q.q}</p><div class="opts">${q.o.map((o,i)=>`<button class="opt${log&&log.pick===i?' on':''}" type="button" data-o="${i}" ${log?'disabled':''}>${o[0]}</button>`).join('')}</div><div id="dfb"></div></div>
 <p class="small center">每天只能答一次，明天會換新的一題。</p></div>`;window.scrollTo(0,0);
 const show=(pick)=>{const ok=!q.o[pick][1],ref=q.o[pick][1];app.querySelectorAll('.opt').forEach((b,i)=>{b.disabled=true;if(!q.o[i][1])b.classList.add('on');else if(i===pick)b.style.borderColor='var(--berry)'});
  $('#dfb').innerHTML=ok?`<div class="plan" style="margin-top:14px"><h3 style="margin:0">答對了！</h3><p>明天再來挑戰新的一題。</p></div>`:`<div class="plan" style="margin-top:14px;border-color:var(--pink)"><h3 style="margin:0">差一點！</h3><p>正確答案是「${plain(q.o.find(o=>!o[1])[0])}」。這題常見的錯法是：${esc(window.APP.item(ref).it.t)}。</p><div class="btns"><button class="btn s g" type="button" data-go="m-${ref}">看圖解和改法</button></div></div>`};
 if(log)show(log.pick);
 app.onclick=e=>{const o=e.target.closest('[data-o]');if(!o||S.dailyLog[k])return;const pick=+o.dataset.o,ok=!q.o[pick][1];S.dailyLog[k]={pick,ok};if(ok)S.cnt.daily++;save();award();show(pick)}}

/* ---------- 點心卡包 ---------- */
const sweet=(i,on)=>{const c=on?['#f2d58a','#e8a09a','#9bb38a','#a9c9e0','#d9a0c8','#f2a64a']:['#e3d3c3'];const a=c[i%c.length],b=c[(i+2)%c.length],ink=on?'#5b4a3f':'#c9b8a4';
 const sh=[`<ellipse cx="40" cy="48" rx="26" ry="14" fill="${a}" stroke="${ink}" stroke-width="2.5"/><ellipse cx="40" cy="42" rx="22" ry="9" fill="${b}" stroke="${ink}" stroke-width="2"/>`,`<circle cx="40" cy="42" r="22" fill="${a}" stroke="${ink}" stroke-width="2.5"/><circle cx="40" cy="42" r="9" fill="#faf3ea" stroke="${ink}" stroke-width="2"/>`,
  `<path d="M16 56l24-34 24 34z" fill="${a}" stroke="${ink}" stroke-width="2.5"/><path d="M22 48h36" stroke="${b}" stroke-width="5"/><circle cx="40" cy="22" r="5" fill="#e8a09a" stroke="${ink}" stroke-width="2"/>`,`<path d="M18 40h44l-5 18h-34z" fill="${a}" stroke="${ink}" stroke-width="2.5"/><path d="M18 40c4-14 40-14 44 0z" fill="${b}" stroke="${ink}" stroke-width="2.5"/>`][i%4];
 return`<svg viewBox="0 0 80 72">${sh}</svg>`};
const SITE='https://vanessa01210.github.io/crispyyyyytutor/',READ_URL=SITE+'daily-reading/';
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const gchips=(cur,attr,all)=>`<div class="chips">${(all?['all']:[]).concat(['g3','g4','g5','g6']).map(x=>`<button class="chip" type="button" data-${attr}="${x}" aria-pressed="${x===cur}">${x==='all'?'全部':GN[x]}</button>`).join('')}</div>`;

/* ---------- 教室場景 ---------- */
const VY=170,yL=(x,Y)=>VY+(Y-VY)*(200-x)/188,yR=(x,Y)=>VY+(Y-VY)*(x-200)/188;
const PL=(u,v)=>{const x=12+48*u,a=yL(x,100),b=yL(x,330);return`${x.toFixed(1)},${(a+(b-a)*v).toFixed(1)}`};
const QR=(u,v,Y1,Y2)=>{const x=340+48*u,a=yR(x,Y1),b=yR(x,Y2);return`${x.toFixed(1)},${(a+(b-a)*v).toFixed(1)}`};
const quad=(f,u1,u2,v1,v2,...r)=>`${f(u1,v1,...r)} ${f(u2,v1,...r)} ${f(u2,v2,...r)} ${f(u1,v2,...r)}`;
function shelf(){let s=`<polygon points="${quad(PL,0,1,0,1)}" fill="#b47c48" stroke="#5b4a3f" stroke-width="2"/>`;const cols=['#e8a09a','#9bb38a','#f2d58a','#a9c9e0','#d9a0c8','#f2a64a'];
 for(let k=0;k<4;k++){const v0=k*.25;s+=`<polygon points="${quad(PL,.06,.94,v0+.02,v0+.23)}" fill="#8a5a2b"/>`;
  if(k<3){let u=.08,i=0;while(u<.9){const w=.1+((i*7+k)%3)*.03,top=v0+.04+((i*5+k)%3)*.025;s+=`<polygon points="${quad(PL,u,Math.min(.92,u+w),top,v0+.23)}" fill="${cols[(i+k*2)%6]}" stroke="#5b4a3f" stroke-width=".8"/>`;u+=w+.015;i++}}
  else{for(let j=0;j<4;j++)s+=`<polygon points="${quad(PL,.12,.86,v0+.08+j*.035,v0+.11+j*.035)}" fill="#fffdf8" stroke="#5b4a3f" stroke-width=".8"/>`}}
 return s}
function frames(){const f=(Y1,Y2,fill)=>`<polygon points="${quad(QR,0,1,0,1,Y1,Y2)}" fill="#c9915c" stroke="#5b4a3f" stroke-width="2"/><polygon points="${quad(QR,.12,.88,.1,.9,Y1,Y2)}" fill="${fill}"/>`;
 let s=f(100,160,'#fffdf8')+`<polygon points="${quad(QR,.3,.7,.3,.7,100,160)}" fill="#f2d58a" stroke="#5b4a3f" stroke-width="1"/>`;
 s+=f(182,262,'#e9cfa6');[[.18,.42,.16,.44,'#e8a09a'],[.52,.78,.14,.42,'#9bb38a'],[.2,.44,.54,.82,'#a9c9e0'],[.54,.8,.56,.84,'#f2d58a']].forEach(([a,b,c,d,col])=>s+=`<polygon points="${quad(QR,a,b,c,d,182,262)}" fill="${col}" stroke="#5b4a3f" stroke-width=".8"/>`);return s}
const SCENE=()=>`<svg viewBox="0 0 400 600" class="room" aria-hidden="true">
 <polygon points="0,0 400,0 330,40 70,40" fill="#efdfc4"/><rect x="70" y="40" width="260" height="260" fill="#f6e9d2"/>
 <polygon points="0,0 70,40 70,300 0,380" fill="#ead6b5"/><polygon points="400,0 330,40 330,300 400,380" fill="#ead6b5"/>
 <polygon points="70,300 330,300 400,380 400,600 0,600 0,380" fill="#dcae78"/>
 ${Array.from({length:11},(_,k)=>{const xb=70+26*k,xe=200+(xb-200)*(600-VY)/(300-VY);return`<line x1="${xb}" y1="300" x2="${xe.toFixed(0)}" y2="600" stroke="#c89863" stroke-width="1.5"/>`}).join('')}
 <path d="M70 300H330M70 40V300M330 40V300" stroke="#d6bf98" stroke-width="2"/>
 <line x1="200" y1="0" x2="200" y2="18" stroke="#5b4a3f" stroke-width="2"/><path d="M186 18h28l-5 10h-18z" fill="#9bb38a" stroke="#5b4a3f" stroke-width="1.5"/>
 <rect x="96" y="58" width="208" height="116" rx="6" fill="#b47c48" stroke="#5b4a3f" stroke-width="2"/><rect x="103" y="65" width="194" height="102" rx="3" fill="#41705a"/>
 <text x="118" y="88" font-size="12" fill="#e4eedd">今天的點心：通分</text>
 <rect x="118" y="98" width="90" height="12" fill="none" stroke="#fffdf8"/><rect x="118" y="98" width="45" height="12" fill="#f2d58a" opacity=".85"/>
 <rect x="118" y="116" width="90" height="12" fill="none" stroke="#fffdf8"/><rect x="118" y="116" width="30" height="12" fill="#e8a09a" opacity=".85"/>
 <text x="220" y="114" font-size="13" fill="#fffdf8">1/2 ＋ 1/3</text><text x="118" y="152" font-size="13" fill="#f2d58a">＝ 3/6 ＋ 2/6 ＝ 5/6</text>
 <rect x="100" y="172" width="200" height="5" rx="2" fill="#8a5a2b"/>
 ${shelf()}${frames()}
 <clipPath id="tav"><circle cx="200" cy="212" r="22"/></clipPath>
 <path d="M170 262c0-18 12-26 30-26s30 8 30 26z" fill="#fffdf8" stroke="#5b4a3f" stroke-width="2"/><path d="M194 236l6 8 6-8" fill="none" stroke="#5b4a3f" stroke-width="1.5"/>
 <circle cx="200" cy="212" r="24" fill="#e8a09a"/><image href="avatar.jpg" x="176" y="188" width="48" height="48" clip-path="url(#tav)"/>
 <rect x="138" y="252" width="124" height="12" rx="3" fill="#c9915c" stroke="#5b4a3f" stroke-width="2"/><rect x="146" y="264" width="108" height="40" fill="#b47c48" stroke="#5b4a3f" stroke-width="2"/>
 <rect x="174" y="272" width="52" height="14" rx="3" fill="#fffdf8" stroke="#5b4a3f" stroke-width="1"/><text x="200" y="283" font-size="9" fill="#5b4a3f" text-anchor="middle">酥酥老師</text>
 <rect x="226" y="240" width="26" height="14" rx="2" fill="#f6d6d2" stroke="#5b4a3f" stroke-width="1.5"/><rect x="150" y="244" width="30" height="9" fill="#9bb38a" stroke="#5b4a3f" stroke-width="1"/>
 <ellipse cx="325" cy="482" rx="74" ry="18" fill="#cfe3b8" stroke="#5b4a3f" stroke-width="1.5"/>
 <path d="M262 470C250 420 282 380 330 382C380 384 400 420 392 470C360 488 292 488 262 470Z" fill="#e8a09a" stroke="#5b4a3f" stroke-width="2"/>
 <path d="M282 424C300 404 352 402 374 424" stroke="#f6d6d2" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="300" cy="400" rx="10" ry="6" fill="#f6d6d2" opacity=".8"/>
 <rect x="266" y="486" width="34" height="20" rx="2" fill="#a9c9e0" stroke="#5b4a3f" stroke-width="1.5"/><path d="M270 492h26" stroke="#fffdf8" stroke-width="2"/>
 <path d="M340 494h22a5 5 0 0 1 4 7l-2 4a4 4 0 0 1-6 1l-2-2h-14l-2 2a4 4 0 0 1-6-1l-2-4a5 5 0 0 1 4-7z" fill="#fffdf8" stroke="#5b4a3f" stroke-width="1.5"/>
 ${[[20,150],[176,306]].map(([a,b],k)=>`<polygon points="${a},520 ${b},520 ${b+10},552 ${a-10},552" fill="#e7c48f" stroke="#5b4a3f" stroke-width="2"/><rect x="${a-10}" y="552" width="${b-a+20}" height="12" fill="#c9915c" stroke="#5b4a3f" stroke-width="2"/><path d="M${a-2} 564v36M${b+2} 564v36" stroke="#5b4a3f" stroke-width="3"/>
 <polygon points="${a+30},524 ${a+78},521 ${a+82},545 ${a+34},548" fill="#fffdf8" stroke="#5b4a3f" stroke-width="1"/><circle cx="${a+70}" cy="531" r="6" fill="none" stroke="#c96f68" stroke-width="1.5"/><path d="M${a+40} 531h18M${a+40} 538h14" stroke="#9a8573" stroke-width="1"/>
 <path d="M${a+96} 534l14-8" stroke="#f2a64a" stroke-width="3" stroke-linecap="round"/>${k?'':`<rect x="${a+40}" y="578" width="60" height="22" rx="8" fill="#a9c9e0" stroke="#5b4a3f" stroke-width="2"/>`}${k?`<rect x="${a+44}" y="578" width="60" height="22" rx="8" fill="#9bb38a" stroke="#5b4a3f" stroke-width="2"/>`:''}`).join('')}
</svg>`;
const SPOTS=[['lesson','黑板・動畫講解',[24,9.5,52,20],[50,4.2]],['reading','書櫃・讀報',[2,16,14,40],[12,60]],['play','懶人沙發・小遊戲',[63,62,36,20],[78,59.5]],['exam','座位・月考模擬',[2,85,79,15],[34,82.5]],['daily','每日一題',[84,15.5,14,11],[88,12.4]],['cards','集小卡',[84,29,14,15],[89,47]]];
const AREAS=[['lesson','黑板','動畫式概念講解','一步一步看動畫，把觀念看懂，再動手玩圖解'],['reading','書櫃','讀報資源','每天一篇改寫過的時事，有生詞和練習題'],['play','懶人沙發','小遊戲','60 秒點心快手、一題一題練'],['exam','學生座位','月考模擬','當一次老師，改小明的考卷，找出哪一步錯'],['daily','牆上的畫','每日一題','每天一題，答對累積紀錄'],['cards','牆上的畫','集小卡','每天打卡、收集點心卡和稱號']];
function scene(app){const ck=day(dkey()).ck;
 app.innerHTML=`<div class="col cls"><div class="talk" style="margin-top:14px"><img src="avatar.jpg" alt=""><div class="bubble"><b style="font-size:20px">${S.name?esc(S.name)+'，':''}歡迎來到教室！</b>點教室裡的黑板、書櫃、沙發、座位或牆上的畫，就能進去。${ck?`今天已打卡，連續 ${streak()} 天。`:'記得到牆上的「集小卡」打卡喔。'}</div></div>
 <div class="stage2">${SCENE()}${SPOTS.map(([h,t,[l,tp,w,ht]])=>`<button class="hot" type="button" data-go="${h}" aria-label="${t}" style="left:${l}%;top:${tp}%;width:${w}%;height:${ht}%"></button>`).join('')}${SPOTS.map(([h,t,,[x,y]])=>`<button class="sign" type="button" data-go="${h}" style="left:${x}%;top:${y}%">${t}</button>`).join('')}</div>
 <h2 style="margin:26px 0 4px">教室裡有什麼</h2><div class="areas">${AREAS.map(([h,w,t,d],i)=>`<button class="area" type="button" data-go="${h}"><span class="num">${i+1}</span><span><small>${w}</small><b>${t}</b><span>${d}</span></span></button>`).join('')}</div>
 <p class="small center" style="margin-top:18px">家長想知道孩子卡在哪：<button class="back" type="button" data-go="parent" style="padding:0">卡關診斷</button>　老師要出卷：<button class="back" type="button" data-go="teacher" style="padding:0">老師派卷</button></p></div>`;
 window.scrollTo(0,0);app.onclick=null}

/* ---------- 黑板：動畫課與動手玩圖解 ---------- */
let lesG=null,lesTab='anim';
function lessons(app,id){const LS=window.LESSONS;if(lesG===null)lesG=S.grade||'all';if(id){const L=LS.find(x=>x.id===id);if(L)return player(app,L)}
 const A=window.APP;let body='';
 if(lesTab==='anim'){const list=LS.filter(l=>lesG==='all'||l.g===lesG||l.g==='all');let lastU='';body=`<div class="tests">${list.map(l=>{const[g,u]=l.ref.split('-'),G=window.ISLAND.find(x=>x.id===g),un=(lesG==='all'?GN[g]+'・':'')+(G&&G.units[+u]?G.units[+u].name:''),hd=un!==lastU?`<h3 style="margin:18px 0 2px">${esc(un)}</h3>`:'';lastU=un;return hd+`<button class="tcard" type="button" data-go="lesson-${l.id}"><span class="num">${(S.les||[]).includes(l.id)?'✓':'▶'}</span><span><b>${l.title}</b><span>${GN[l.g]}・${l.desc}</span></span><i>${l.steps.length} 步</i></button>`}).join('')||'<p class="small">這個年級的動畫課製作中，先看看其他年級或動手玩圖解。</p>'}</div>`}
 else{const g=lesG==='all'?S.grade:lesG,G=window.ISLAND.find(x=>x.id===g);body=G.units.map((u,ui)=>{const it=u.items.map((x,ii)=>({x,ref:`${g}-${ui}-${ii}`})).filter(o=>o.x.v);return it.length?`<h3 style="margin:20px 0 0">${esc(u.name)}</h3>${it.map((o,k)=>A.accHTML(o.ref,S.viz.includes(o.ref)?'✓':k+1,o.x.e,false)).join('')}`:''}).join('')}
 app.innerHTML=`<div class="col">${back}<h2 style="margin-top:6px">黑板・動畫式概念講解</h2><p class="small" style="margin-top:-6px">先看動畫把觀念看懂，再到「動手玩圖解」自己改數字試試看。</p>
 <div class="tabs" role="tablist"><button role="tab" type="button" data-lt="anim" aria-selected="${lesTab==='anim'}">動畫課</button><button role="tab" type="button" data-lt="viz" aria-selected="${lesTab==='viz'}">動手玩圖解</button></div>
 <div class="card" style="margin-top:0;border-radius:0 30px 30px 30px">${gchips(lesTab==='viz'&&lesG==='all'?S.grade:lesG,'lg',lesTab==='anim')}${body}</div></div>`;window.scrollTo(0,0);
 app.onclick=e=>{const t=e.target.closest('[data-lt]');if(t){lesTab=t.dataset.lt;lessons(app);return}const g=e.target.closest('[data-lg]');if(g){lesG=g.dataset.lg;if(lesG!=='all'){S.grade=lesG;save()}lessons(app);return}A.accClick(e)}}
function player(app,L){let i=0,raf=0;const n=L.steps.length,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 app.innerHTML=`<div class="col"><button class="back" type="button" data-go="lesson">← 回黑板</button><h2 style="margin-top:6px">${L.title}</h2>
 <div class="lboard"><svg viewBox="0 0 400 240" id="lsvg" role="img" aria-label="${esc(L.title)}動畫"></svg></div>
 <div class="talk" style="margin-top:12px"><img src="avatar.jpg" alt=""><div class="bubble" id="lsay"></div></div>
 <div class="ldots" id="ldots"></div><div class="btns c"><button class="btn s w" type="button" id="lprev">上一步</button><button class="btn s w" type="button" id="lrep">重播</button><button class="btn s" type="button" id="lnext">下一步 →</button></div><div id="lend"></div></div>`;
 const svg=$('#lsvg'),E=t=>t<.5?2*t*t:1-((-2*t+2)**2)/2;
 const show=()=>{cancelAnimationFrame(raf);const st=L.steps[i];$('#lsay').textContent=st.say;$('#ldots').innerHTML=L.steps.map((_,k)=>`<i class="${k<=i?'on':''}"></i>`).join('');
  $('#lprev').disabled=i===0;$('#lnext').textContent=i===n-1?'看完了 ✓':'下一步 →';
  if(reduce){svg.innerHTML=st.draw(1);return}const t0=performance.now();const fr=now=>{const t=Math.min(1,(now-t0)/1400);svg.innerHTML=st.draw(E(t));if(t<1)raf=requestAnimationFrame(fr)};raf=requestAnimationFrame(fr)};
 $('#lprev').onclick=()=>{if(i>0){i--;show()}};$('#lrep').onclick=show;
 $('#lnext').onclick=()=>{if(i<n-1){i++;show();return}track('les',L.id);const idx=window.LESSONS.indexOf(L),nx=window.LESSONS[idx+1];
  $('#lend').innerHTML=`<div class="plan" style="margin-top:18px"><h3 style="margin:0">看完了！接下來可以</h3><div class="btns"><button class="btn s g" type="button" data-go="m-${L.ref}">動手玩圖解</button><button class="btn s w" type="button" id="lprac">練 5 題</button>${nx?`<button class="btn s" type="button" data-go="lesson-${nx.id}">下一堂：${nx.title.split('：')[0]}</button>`:''}</div><div class="panel pbox hide" id="lpbox"></div></div>`;
  $('#lprac').onclick=()=>{const b=$('#lpbox');b.classList.remove('hide');if(!b.dataset.on){b.dataset.on=1;window.APP.practice(b,window.APP.item(L.ref).U.g)}};$('#lend').scrollIntoView({behavior:'smooth',block:'nearest'})};
 show();window.scrollTo(0,0);app.onclick=null}

/* ---------- 書櫃：讀報 ---------- */
function reading(app){app.innerHTML=`<div class="col">${back}<h2 style="margin-top:6px">書櫃・讀報資源</h2>
 <div class="card"><h3 style="margin:0">酥酥老師的讀報專區</h3><p>把時事新聞改寫成國小、國中看得懂的文章，有中文和英文版本，附生詞解釋和練習題，還有一鍵注音。</p><div class="btns"><a class="btn" href="${READ_URL}" target="_blank" rel="noopener">打開讀報專區</a></div></div>
 <div class="card"><h3 style="margin:0">讀報三步驟</h3><ol class="gsteps" style="margin-top:10px"><li>先看標題和圖片，猜猜看這篇在講什麼。</li><li>讀完圈出不懂的詞，對照生詞解釋。</li><li>寫練習題，最後用一句話說出這篇的重點。</li></ol></div></div>`;window.scrollTo(0,0);app.onclick=null}

/* ---------- 懶人沙發：小遊戲 ---------- */
let playG=null;
function play(app){playG=playG||S.grade;const DG=window.DIAG.filter(t=>t.g===playG);
 app.innerHTML=`<div class="col">${back}<h2 style="margin-top:6px">懶人沙發・小遊戲</h2>${gchips(playG,'pg2')}
 <div class="card game"><h3 style="margin:0">60 秒點心快手</h3><p>60 秒內答對越多越好，題目都是${GN[playG]}常卡的觀念。最高分：<b>${S.best}</b> 題</p><div class="btns"><button class="btn" type="button" id="gstart">開始挑戰</button></div></div>
 <div class="card"><h3 style="margin:0">一題一題練</h3><p class="small">選一個單元，每按一次出新題，答錯有詳解。</p><div class="chips">${window.ISLAND.find(x=>x.id===playG).units.map((u,i)=>`<button class="chip" type="button" data-pu="${i}">${esc(u.name)}</button>`).join('')}</div><div id="pbox" class="panel hide"></div></div></div>`;
 window.scrollTo(0,0);
 app.onclick=e=>{const c=e.target.closest('[data-pg2]');if(c){playG=c.dataset.pg2;S.grade=playG;save();play(app);return}
  const u=e.target.closest('[data-pu]');if(u){app.querySelectorAll('[data-pu]').forEach(x=>x.setAttribute('aria-pressed',x===u));const box=$('#pbox');const nb=box.cloneNode(false);nb.classList.remove('hide');box.replaceWith(nb);window.APP.practice(nb,window.ISLAND.find(x=>x.id===playG).units[+u.dataset.pu].g);return}
  if(e.target.id==='gstart')speed(app,DG)}}

/* ---------- 學生座位：月考模擬（改錯考卷） ---------- */
const OK=[
 {g:'g3',q:'305 × 4 ＝ ？',s:['個位：5 × 4 ＝ 20，寫 0 進 2','十位：0 × 4 ＝ 0，加進位 2，寫 2','百位：3 × 4 ＝ 12，寫 12','答案是 1220'],ans:'1220'},
 {g:'g3',q:'3 時 50 分 ＋ 2 時 25 分 ＝ ？',s:['50 分 ＋ 25 分 ＝ 75 分','75 分 ＝ 1 時 15 分','3 ＋ 2 ＋ 1 ＝ 6 時','答案是 6 時 15 分'],ans:'6 時 15 分'},
 {g:'g4',q:'39650 用四捨五入法取到千位',s:['保留到千位，看下一位百位是 6','6 比 5 大，要進位','千位 9 加 1 變 10，再往萬位進 1','答案是 40000'],ans:'40000'},
 {g:'g4',q:'2/7 × 3 ＝ ？',s:['3 個 2/7 是 6 個 1/7','分母不變，還是 7','答案是 6/7'],ans:'6/7'},
 {g:'g5',q:'把 18/24 化成最簡分數',s:['18 和 24 的最大公因數是 6','分子分母同時除以 6','答案是 3/4'],ans:'3/4'},
 {g:'g5',q:'25 ×（4 ＋ 8）＝ ？',s:['用分配律：25 × 4 ＋ 25 × 8','＝ 100 ＋ 200','答案是 300'],ans:'300'},
 {g:'g6',q:'6 ÷ 1/2 ＝ ？',s:['想成 6 裡面有幾個 1/2','除以 1/2 等於乘以 2','6 × 2 ＝ 12'],ans:'12'},
 {g:'g6',q:'時速 60 公里 ＝ 分速幾公里？',s:['1 小時 ＝ 60 分','60 公里 ÷ 60 ＝ 1 公里','答案是分速 1 公里'],ans:'分速 1 公里'}];
let exG=null,paper=null;
function exam(app,fresh){exG=exG||S.grade;if(fresh||!paper||paper.g!==exG){const items=shuf([...FIX.filter(f=>f.g===exG).map(f=>({...f,bad:true})),...OK.filter(f=>f.g===exG).map(f=>({...f,bad:false}))]).slice(0,5);paper={g:exG,items,ans:items.map(()=>({m:null,st:null})),done:false}}
 const P=paper,pts=Math.round(100/P.items.length);
 const itemHTML=(f,i)=>{const a=P.ans[i];let res='';
  if(P.done){const got=!f.bad?(a.m==='o'?pts:0):(a.m==='x'?(a.st===f.w?pts:Math.round(pts/2)):0);res=`<div class="exres ${got===pts?'ok':'no'}"><b>${got} / ${pts} 分</b>${f.bad?`小明這題算錯了，錯在第 ${f.w+1} 步。${esc(f.ex)}<br>正確答案：${esc(f.ans)}　<button class="back" type="button" data-go="m-${f.ref}" style="padding:0">看這個觀念的圖解</button>`:`小明這題算對了，答案是 ${esc(f.ans)}。`}</div>`;a.got=got}
  return`<div class="exq"><div class="exhead"><span class="qn">${i+1}</span><span class="qt" style="flex:1">${esc(f.q)}</span><span class="mk">${['o','x'].map(m=>`<button type="button" class="mbtn${a.m===m?' on':''}" data-m="${m}" data-i="${i}" ${P.done?'disabled':''} aria-label="${m==='o'?'打圈，算對了':'打叉，算錯了'}">${m==='o'?'○':'✗'}</button>`).join('')}</span></div>
  <ol class="steps2">${f.s.map((s,j)=>`<li><button type="button" class="stp${a.st===j?' wrongstep':''}${P.done&&f.bad&&j===f.w?' truth':''}" data-st="${j}" data-i="${i}" ${a.m!=='x'||P.done?'disabled':''}>${esc(s)}</button></li>`).join('')}</ol>${a.m==='x'&&!P.done&&a.st==null?'<p class="small" style="margin:6px 0 0">再點一下小明錯在哪一步。</p>':''}${res}</div>`};
 const itemsH=P.items.map(itemHTML).join(''),total=P.done?P.ans.reduce((s,a)=>s+(a.got||0),0):0;
 app.innerHTML=`<div class="col">${back}<h2 style="margin-top:6px">座位・月考模擬</h2><p class="small" style="margin-top:-6px">今天換你當老師！改小明的考卷：算對的打 ○，算錯的打 ✗，再點出錯在哪一步。</p>${gchips(exG,'eg')}
 <div class="paper exam"><div class="exmeta"><b>${GN[exG]}數學月考模擬卷</b><span>姓名：小明　改卷老師：${esc(S.name||'你')}</span></div>${itemsH}
 ${P.done?`<div class="center"><p class="score-big">${total} 分</p><p>這是你的改卷分數。${total>=90?'眼睛好利，觀念很清楚！':'看看上面的解析，把卡住的觀念補起來。'}</p></div>`:''}
 <div class="btns c">${P.done?'<button class="btn" type="button" id="exnew">換一份考卷</button>':'<button class="btn" type="button" id="exsub">改完了，對答案</button>'}</div><p class="msg bad center hide" id="exmsg"></p></div></div>`;
 app.onclick=e=>{const t=e.target;const g=t.closest('[data-eg]');if(g){exG=g.dataset.eg;S.grade=exG;save();exam(app,true);return}
  const m=t.closest('[data-m]');if(m){const a=P.ans[+m.dataset.i];a.m=m.dataset.m;if(a.m==='o')a.st=null;keep(()=>exam(app));return}
  const s=t.closest('[data-st]');if(s){P.ans[+s.dataset.i].st=+s.dataset.st;keep(()=>exam(app));return}
  if(t.id==='exsub'){const miss=P.ans.findIndex(a=>!a.m||(a.m==='x'&&a.st==null));if(miss>=0){const el=$('#exmsg');el.textContent=`第 ${miss+1} 題還沒改完喔。`;el.classList.remove('hide');return}
   P.done=true;P.items.forEach((f,i)=>{if(f.bad&&P.ans[i].m==='x'&&P.ans[i].st===f.w)track('fix')});exam(app);window.scrollTo(0,0);return}
  if(t.id==='exnew'){exam(app,true);window.scrollTo(0,0)}};if(fresh)window.scrollTo(0,0)}
const keep=fn=>{const y=window.scrollY;fn();window.scrollTo(0,y)};

/* ---------- 牆上的畫：集小卡 ---------- */
function cards(app){const k=dkey(),ck=day(k).ck,days=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const kk=dkey(d),dd=S.days[kk]||{};days.push({m:Math.round((dd.sec||0)/60),ck:dd.ck,lab:i===13?`${d.getMonth()+1}/${d.getDate()}`:`${d.getDate()}`})}const mx=Math.max(5,...days.map(d=>d.m));
 app.innerHTML=`<div class="col">${back}<h2 style="margin-top:6px">牆上的畫・集小卡</h2>
 <div class="ckbox"><img src="avatar.jpg" alt=""><div><b>${ck?'今天打過卡了！':'今天來練功了嗎？'}</b><span class="small">連續 ${streak()} 天・共打卡 ${checkedDays()} 天・累積練習 ${mins(totalSec())}</span></div><button class="btn${ck?' g':''}" type="button" id="ckin" ${ck?'disabled':''}>${ck?'已打卡':'今日打卡'}</button></div>
 <div class="card"><h3 style="margin:0">最近 14 天 <small class="small">每天練了幾分鐘，★ 是有打卡的日子</small></h3><div class="bars">${days.map(d=>`<div><span style="height:${d.m/mx*100}%">${d.m?`<i>${d.m}</i>`:''}</span><em>${d.ck?'★':''}${d.lab}</em></div>`).join('')}</div></div>
 <h3 style="margin:22px 0 0">我的點心卡（${S.cards.length} / ${BADGES.length}）</h3><p class="small" style="margin:2px 0 0">完成任務就能拿到一張點心卡，點卡片看背面的小知識。</p>
 <div class="cardgrid">${BADGES.map((b,i)=>{const on=S.cards.includes(b.id),c=Math.min(b.cur(),b.need);return`<button class="scard${on?' on':''}" type="button" data-c="${i}">${sweet(i,on)}<b>${on?b.card:'？？？'}</b><span class="small">${b.desc||'第一次打卡'}</span><span class="meter" style="width:80%"><span style="width:${c/b.need*100}%"></span></span></button>`}).join('')}</div><div id="cfact"></div>
 <div class="card"><h3 style="margin:0">我的資料</h3><div class="btns" style="align-items:center"><label class="vl">名字 <input class="vi" id="nm2" value="${esc(S.name)}" placeholder="同學" maxlength="10" style="width:7em"></label><label class="vl">年級 <select class="vi" id="gr2">${['g3','g4','g5','g6'].map(g=>`<option value="${g}" ${g===S.grade?'selected':''}>${GN[g]}</option>`).join('')}</select></label></div>
 <p class="small">稱號：${esc(title())}。紀錄存在這台裝置的瀏覽器裡，換手機或清除瀏覽資料會重新開始。</p></div></div>`;window.scrollTo(0,0);
 $('#nm2').onchange=e=>{S.name=e.target.value.trim();save()};$('#gr2').onchange=e=>{S.grade=e.target.value;save()};
 const ckb=$('#ckin');if(ckb&&!ck)ckb.onclick=()=>{day(k).ck=true;save();toast(`打卡成功！連續 ${streak()} 天`);award();setTimeout(()=>cards(app),400)};
 app.onclick=e=>{const c=e.target.closest('[data-c]');if(!c)return;const b=BADGES[+c.dataset.c],on=S.cards.includes(b.id);$('#cfact').innerHTML=`<div class="plan" style="margin-top:16px"><h3 style="margin:0">${on?b.card+'・'+b.name:'還沒拿到'}</h3><p>${on?b.fact:`達成「${b.desc||'第一次打卡'}」就能拿到這張卡。`}</p></div>`;$('#cfact').scrollIntoView({behavior:'smooth',block:'nearest'})}}

window.HUB={scene,lessons,reading,play,exam,daily,cards,track};

}
