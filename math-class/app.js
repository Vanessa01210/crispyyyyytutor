/* 數學卡關診斷 主程式 */
{
const SITE='https://vanessa01210.github.io/crispyyyyytutor/',THREADS='https://www.threads.com/@crispyyyyy0121';
/* ===== 可自行修改的設定 ===== */
const LINE_OA='';   // 有 LINE 官方帳號的話，把加好友連結貼在這裡（例如 https://lin.ee/xxxx），結果頁會多一顆「加 LINE」按鈕
const TRIAL={g3a:'1_5Ku41pqjLFLK5-t9FHDOC-LG50G9Z5_',g3b:'1R05LTmw8IJ3V_QwXdU_8JJCerwCFK3sX',g4a:'1ku6F8mZiKa6l1L6R2uScJVYG0RZNzU6i',g4b:'1k8yyzGPRId8HkCpJLi7FaW02IqjLwwUd',g5a:'1Cmw13a9vnlQdxuEIk1LqrwT6nL4v6pob',g5b:'1kr7XxwsIUo1oB0qfXMdflkthy7WR2GDA',g6a:'1YNhvYY3MqsZGampuMHGww-XiGtbEB6A8',g6b:'11ejop4rqEDuTh--BJ-vy0GNKkXVezfu6'};   // 《加點心》各冊試閱檔（Google 雲端檔案 ID）
const trialURL=(g,sem)=>TRIAL[g+sem]?`https://drive.google.com/file/d/${TRIAL[g+sem]}/view`:SITE;
const SEMN={a:'上學期',b:'下學期'};
const D=window.ISLAND,DG=window.DIAG,GD=window.GUIDE,GR=window.GENREF,GEN=window.GEN,MU=window.MU;
const app=document.getElementById('app');
const esc=s=>String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'})[c]);
const item=ref=>{const[g,u,i]=ref.split('-');const G=D.find(x=>x.id===g);if(!G||!G.units[+u]||!G.units[+u].items[+i])throw'noref';return{G,U:G.units[+u],it:G.units[+u].items[+i],ref}};
const GN={g3:'三年級',g4:'四年級',g5:'五年級',g6:'六年級',all:'三～六年級'};
const showM=m=>m.n===0?`${m.w}`:MU.F(m.n,m.d,m.w||'');
const star=f=>`<svg viewBox="0 0 40 40"><path d="M20 3l5 11 12 1.5-9 8.5 2.5 12L20 30l-10.5 6 2.5-12-9-8.5L15 14z" fill="${f==='y'?'#f2d58a':f==='c'?'#f6dcd8':'#fffdf8'}" stroke="#8a6a55" stroke-width="2" stroke-linejoin="round"/></svg>`;
const top0=()=>window.scrollTo(0,0);
const plain=h=>String(h).replace(/<span>(\d+)<\/span>/g,'$1 又 ').replace(/<i>(\d+)<\/i><i>(\d+)<\/i>/g,'$1/$2').replace(/<[^>]+>/g,'');

/* ---------- 首頁 ---------- */
function home(){window.HUB.scene(app)}

/* ---------- 家長：選年級、學期、單元 ---------- */
const nowSem=()=>{const m=new Date().getMonth()+1;return m>=2&&m<=7?'b':'a'};
let ps={g:'g5',sem:nowSem(),sel:null};
function parent(pre){if(pre&&pre!==ps.g){ps.g=pre;ps.sel=null}
 const cur=DG.filter(t=>t.g===ps.g&&t.sem===ps.sem),prev=ps.sem==='b'?DG.filter(t=>t.g===ps.g&&t.sem==='a'):[];
 if(!ps.sel)ps.sel=cur.map(t=>t.k);
 const chip=t=>`<button class="chip" type="button" data-k="${t.k}" aria-pressed="${ps.sel.includes(t.k)}">${t.label}</button>`;
 const n=nQ(ps.sel.length);
 app.innerHTML=`<div class="col"><button class="back" type="button" data-go="">← 回教室</button><h2 style="margin-top:6px">幫孩子做卡關診斷</h2>
 <div class="card" style="margin-top:6px">
  <div class="step"><span class="num">1</span><b>孩子的年級</b></div><div class="chips">${['g3','g4','g5','g6'].map(g=>`<button class="chip" type="button" data-pg="${g}" aria-pressed="${g===ps.g}">${GN[g]}</button>`).join('')}</div>
  <div class="step" style="margin-top:16px"><span class="num">2</span><b>現在是</b></div><div class="chips">${['a','b'].map(x=>`<button class="chip" type="button" data-sem="${x}" aria-pressed="${x===ps.sem}">${SEMN[x]}</button>`).join('')}</div>
  <div class="step" style="margin-top:16px"><span class="num">3</span><b>孩子已經學過的單元</b></div>
  <p class="small" style="margin:-4px 0 8px">還沒教到的請點一下取消，只考學過的內容才準。</p>
  <div class="chips">${cur.map(chip).join('')}</div>
  ${prev.length?`<p class="small" style="margin:12px 0 6px">上學期的單元（想一起複習可以加選）</p><div class="chips">${prev.map(chip).join('')}</div>`:''}
  <div class="btns"><button class="btn" type="button" id="startD" ${n?'':'disabled'}>開始診斷（${n} 題，約 ${Math.max(3,Math.round(n/2))} 分鐘）</button></div>
  <p class="small">請讓孩子自己作答，家長先不要提示。選錯的答案會告訴我們孩子是怎麼想的。每次診斷都會換新的數字。</p></div></div>`;top0();
 app.onclick=e=>{const t=e.target;const g=t.closest('[data-pg]');if(g){ps.g=g.dataset.pg;ps.sel=null;parent();return}
  const m=t.closest('[data-sem]');if(m){ps.sem=m.dataset.sem;ps.sel=null;parent();return}
  const k=t.closest('[data-k]');if(k){const v=k.dataset.k;ps.sel=ps.sel.includes(v)?ps.sel.filter(x=>x!==v):[...ps.sel,v];parent();return}
  if(t.id==='startD'&&ps.sel.length){app.onclick=null;quiz(ps.sel)}}}
const nQ=c=>c>=10?10:Math.min(10,c*2);
function buildDiag(keys){const pool=shufA(DG.filter(t=>keys.includes(t.k))),n=nQ(pool.length),order=[];
 for(let i=0;i<n;i++)order.push(pool[i%pool.length]);return shufA(order).map(t=>({...t.f(),t}))}
const shufA=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* ---------- 診斷作答 ---------- */
let st={};
function quiz(keys){st={keys,qs:buildDiag(keys),i:0,p:[]};const n=st.qs.length;
 const draw=()=>{const q=st.qs[st.i];app.innerHTML=`<div class="col quiz"><div class="qtop"><button class="back" type="button" id="qback">${st.i?'← 上一題':'← 重新選單元'}</button><div class="stars" aria-label="第 ${st.i+1} 題，共 ${n} 題">${st.qs.map((_,k)=>star(k<st.i?'y':k===st.i?'c':'')).join('')}</div></div>
  <div class="qcard"><p class="qs">第 ${st.i+1} / ${n} 題・${q.t.label}</p><p class="qq">${q.q}</p><div class="opts">${q.o.map((o,k)=>`<button class="opt${st.p[st.i]===k?' on':''}" type="button" data-o="${k}">${o[0]}</button>`).join('')}</div></div>
  <p class="small center">選了就會到下一題，不會當場對答案。</p></div>`;top0()};
 app.onclick=e=>{const o=e.target.closest('[data-o]');if(o){st.p[st.i]=+o.dataset.o;if(st.i<n-1){st.i++;draw()}else{app.onclick=null;diagResult()}return}
  if(e.target.id==='qback'){if(st.i){st.i--;draw()}else{app.onclick=null;parent()}}};draw()}

/* ---------- 家長結果頁 ---------- */
function diagResult(){window.HUB.track('diag');const qs=st.qs,P=st.p,n=qs.length,right=qs.filter((q,k)=>!q.o[P[k]][1]).length,hit={};
 qs.forEach((q,k)=>{const r=q.o[P[k]][1];if(!r)return;if(!hit[r])hit[r]={ref:r,c:0,t:q.t,pick:plain(q.o[P[k]][0]),q:plain(q.q)};hit[r].c++});
 const list=Object.values(hit).sort((a,b)=>b.c-a.c),main=list[0],rest=list.slice(1);
 const topics={};qs.forEach((q,k)=>{const L=q.t.label;topics[L]=topics[L]||{ok:0,all:0};topics[L].all++;if(!q.o[P[k]][1])topics[L].ok++});
 let h=`<div class="col"><div class="talk"><img src="avatar.jpg" alt=""><div class="bubble">${main?`<b>答對 ${right} / ${n} 題</b>最需要先補的是「${esc(item(main.ref).it.t)}」，下面告訴你今天怎麼陪孩子練。`:`<b>${n} 題全對，太棒了！</b>這些單元最常卡的觀念都沒問題。`}</div></div>
 <div class="tally">${Object.entries(topics).map(([L,v])=>`<span class="${v.ok===v.all?'y':'n'}">${v.ok===v.all?'✓':'✗'} ${L}</span>`).join('')}</div>`;
 if(main){const{it}=item(main.ref),g=GD[main.ref];
  h+=`<div class="acc focus" data-ref="${main.ref}" data-open data-gen="${main.t.gen}" data-g="${main.t.g}" data-label="${esc(main.t.label)}"><span class="flag">最需要先補</span><div class="ab">
  <h2 style="margin:4px 0 8px">${esc(it.t)}</h2><p class="picked">題目：${esc(main.q)}<br>孩子選了「${esc(main.pick)}」${main.c>1?`（同類型錯了 ${main.c} 次）`:''}</p>
  <div class="gsec"><h4>孩子心裡可能這樣想</h4><p>${esc(g?g.think:it.w)}</p></div>
  <div class="gsec"><h4>今天 10 分鐘，陪孩子這樣做</h4>${g?`<ol class="gsteps">${g.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:`<p>${esc(it.p)}</p>`}</div>
  ${g?`<div class="gsec"><h4>接下來一週</h4><p>${esc(g.prac)}</p><p class="done" style="margin-top:6px">學會的標準：${esc(g.done)}</p></div>`:''}
  <div class="btns">${it.v?'<button class="btn s g" type="button" data-act="viz" aria-expanded="false">看圖解</button>':''}<button class="btn s w" type="button" data-act="prac" aria-expanded="false">練 5 題</button><button class="btn s" type="button" data-sheet>免費下載補強練習卷</button></div>
  <p class="msg hide" data-smsg></p><div class="panel vbox hide"></div><div class="panel pbox hide"></div></div></div>`;
  h+=trialCTA(main.t.g,DG.find(x=>x.k===main.t.k).sem,it.t);
  if(rest.length){h+=`<h2 style="margin-top:30px">其他卡關點（${rest.length}）</h2><p class="small" style="margin-top:-6px">先把上面那個補好，再來看這些。點標題可以打開。</p>`;rest.forEach((w,k)=>{h+=accHTML(w.ref,k+2,`${w.t.label}・孩子選了 ${w.pick}`,false)})}}
 else{const sem=DG.find(x=>x.k===qs[0].t.k).sem;h+=`<div class="plan"><h2>接下來可以</h2><p>勾選更多單元再測一次，或試試${sem==='a'?'下學期':'更高年級'}的單元。想往下學，講義有每個單元的重點和分級練習。</p></div>`+trialCTA(qs[0].t.g,sem)}
 h+=`<div class="btns c"><button class="btn s w" type="button" id="again">一週後再測一次（會換新題目）</button><button class="btn s w" type="button" id="share">複製結果傳給老師</button><button class="btn s w" type="button" id="back2">換年級或單元</button></div><p class="msg center hide" id="copied"></p></div>`;
 app.innerHTML=h;top0();
 app.onclick=e=>{const t=e.target;if(t.closest('[data-sheet]')){const c=t.closest('.acc');sheet(c.dataset.gen,c.dataset.g,c.dataset.label,t,c.querySelector('[data-smsg]'));return}
  if(accClick(e))return;if(t.id==='again'){quiz(st.keys);return}if(t.id==='back2'){parent();return}
  if(t.id==='share'){copy(`【酥酥老師數學診斷】${GN[qs[0].t.g]}：答對 ${right}/${n} 題。${list.length?'卡關點：'+list.map(w=>item(w.ref).it.t).join('、'):'全對！'}`,document.getElementById('copied'),'已複製，可以貼到 LINE 傳給老師')}}}
function trialCTA(g,sem,topic){return`<div class="cta"><h2>《加點心》${GN[g]}${SEMN[sem]}講義</h2><p>${topic?`「${esc(topic)}」這個觀念，講義裡有完整的重點圖解和分級練習。`:'每個單元都有重點圖解、小心陷阱和分級練習。'}先免費看試閱，適合再帶回家。</p>
 <div class="btns"><a class="btn" href="${trialURL(g,sem)}" target="_blank" rel="noopener">免費看試閱</a><a class="btn w" href="${SITE}#shop" target="_blank" rel="noopener">購買講義</a>${LINE_OA?`<a class="btn g" href="${LINE_OA}" target="_blank" rel="noopener">加 LINE 問老師</a>`:`<a class="btn g" href="${THREADS}" target="_blank" rel="noopener">私訊酥酥老師</a>`}</div></div>`}
function sheet(gen,g,label,btn,msgEl){const p={seed:Math.floor(Math.random()*1e9),g,n:10,keys:[gen]};makePDF(p,btn,msgEl,`${label}補強練習卷`)}

/* ---------- 迷思指南 ---------- */
function guideHTML(ref){const{it}=item(ref),g=GD[ref];
 if(!g)return`<div class="gsec"><h4>為什麼會錯</h4><p>${esc(it.w)}</p></div><div class="gsec"><h4>怎麼改</h4><p>${esc(it.p)}</p></div>`;
 return`<div class="gsec"><h4>孩子心裡可能這樣想</h4><p>${esc(g.think)}</p></div>
 <div class="gsec"><h4>先確認是不是這個問題</h4><p>${esc(g.check)}</p></div>
 <div class="gsec"><h4>陪孩子這樣改</h4><ol class="gsteps">${g.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div>
 <div class="gsec"><h4>練習怎麼安排</h4><p>${esc(g.prac)}</p></div>
 <div class="gsec"><h4>怎樣算學會了</h4><p class="done">${esc(g.done)}</p></div>`}
function accHTML(ref,k,sub,open){const{it,U}=item(ref);return`<div class="acc" data-ref="${ref}"${open?' data-open':''}><button class="ah" type="button" data-acc><span class="num">${k}</span><span><h3>${esc(it.t)}</h3><small>${esc(sub)}</small></span><span class="arr">›</span></button>
 <div class="ab"><p class="picked">常見錯法：${esc(it.e)}</p>${guideHTML(ref)}
 <div class="btns">${it.v?'<button class="btn s g" type="button" data-act="viz" aria-expanded="false">看圖解</button>':''}<button class="btn s w" type="button" data-act="prac" aria-expanded="false">練 5 題</button></div>
 <div class="panel vbox hide"></div><div class="panel pbox hide"></div></div></div>`}
function openViz(c){const b=c.querySelector('[data-act=viz]');if(!b)return;const box=c.querySelector('.vbox'),{it}=item(c.dataset.ref);
 window.HUB.track('viz',c.dataset.ref);if(!box.dataset.on){box.dataset.on=1;try{window.VZ[it.v](box,it.a||{})}catch(e){box.innerHTML='<p class="vwarn">圖解載入失敗</p>'}}box.classList.remove('hide');b.setAttribute('aria-expanded','true');b.textContent='收起圖解'}
function accClick(e){const h=e.target.closest('[data-acc]');if(h){const a=h.closest('.acc');if(a.hasAttribute('data-open'))a.removeAttribute('data-open');else a.setAttribute('data-open','');return true}
 const a=e.target.closest('[data-act]');if(!a)return false;const c=a.closest('.acc');
 if(a.dataset.act==='viz'){if(a.getAttribute('aria-expanded')==='true'){c.querySelector('.vbox').classList.add('hide');a.setAttribute('aria-expanded','false');a.textContent='看圖解'}else openViz(c);return true}
 const box=c.querySelector('.pbox'),{U}=item(c.dataset.ref);if(a.getAttribute('aria-expanded')==='true'){box.classList.add('hide');a.setAttribute('aria-expanded','false');a.textContent='練 5 題';return true}
 if(!box.dataset.on){box.dataset.on=1;practice(box,U.g)}box.classList.remove('hide');a.setAttribute('aria-expanded','true');a.textContent='收起練習';return true}
const ctaHTML=(g,msg)=>`<div class="cta"><h2>想有系統地補起來？</h2><p>${msg||`《加點心》${GN[g]||''}數學自編講義，把這些常卡的觀念整理成重點和分級練習。先看試閱，適合再帶回家。`}</p><div class="btns"><a class="btn" href="${SITE}#shop" target="_blank" rel="noopener">看講義試閱</a><a class="btn g" href="${THREADS}" target="_blank" rel="noopener">私訊酥酥老師</a></div></div>`;

/* ---------- 單一迷思頁（Threads 連結用） ---------- */
function single(ref){try{item(ref)}catch(e){home();return}const x=item(ref),pg=x.G.id==='all'?'parent':'parent-'+x.G.id;
 app.innerHTML=`<div class="col"><div class="hero" style="padding-bottom:0"><span class="tag">${x.G.name}・${esc(x.U.name)}</span></div>${accHTML(ref,'!',`${x.G.name}常見迷思`,true)}
 <div class="cta" style="background:var(--pink-l);border-color:var(--pink)"><h2>孩子還有哪裡卡住？</h2><p>選孩子學過的單元，做 10 題卡關診斷，一次找出其他卡關點。</p><div class="btns"><button class="btn" type="button" data-go="${pg}">開始診斷</button></div></div>${ctaHTML(x.G.id)}</div>`;
 top0();openViz(app.querySelector('.acc'));app.onclick=accClick}

/* ---------- 練習（單題輪播） ---------- */
function judge(q,a){if(q.kind==='mc'){if(a==null)return{ok:null,msg:'還沒選'};return{ok:a===q.a,msg:a===q.a?'答對了！':'再看看詳解'}}
 if(q.kind==='frac'){const[ws,ns,ds]=a||['','',''];const w=parseInt(ws||'0',10),n=parseInt(ns,10),d=parseInt(ds,10),A=q.ans;
  if(isNaN(n)||isNaN(d)||d<=0||isNaN(w))return{ok:null,msg:'分子和分母都要填喔'};
  if((w*d+n)*A.d!==(A.w*A.d+A.n)*d)return{ok:false,msg:'再想想看，詳解在下面'};
  if(q.form==='mixed'&&(n>=d||!w))return{ok:false,msg:'數值對了，但題目要寫成帶分數'};
  if(q.form==='improper'&&w)return{ok:false,msg:'數值對了，但題目要寫成假分數'};
  if(!q.nosimp&&n&&MU.gcd(n,d)!==1)return{ok:false,msg:'數值對了，但還可以再約分'};
  return{ok:true,msg:'答對了！'}}
 const v=(a||[]).map(x=>parseFloat(x));if(v.length<q.fields.length||v.some(isNaN))return{ok:null,msg:'先填入答案喔'};
 const ok=v.every((x,i)=>Math.abs(x-q.fields[i].ans)<1e-6*Math.max(1,Math.abs(q.fields[i].ans)));return{ok,msg:ok?'答對了！':'再想想看，詳解在下面'}}
const ansInput=(q,pre)=>{if(q.kind==='mc')return`<div class="popts">${q.opts.map((o,i)=>`<button class="popt" type="button" data-po="${i}">${o}</button>`).join('')}</div>`;
 if(q.kind==='frac')return`<input data-f="0" inputmode="numeric" placeholder="整數" aria-label="整數（沒有就空白）"><span class="stk"><input data-f="1" inputmode="numeric" aria-label="分子"><hr><input data-f="2" inputmode="numeric" aria-label="分母"></span>`;
 return q.fields.map((f,i)=>`<label class="vl">${f.l==='答案'?'':f.l}<input data-f="${i}" inputmode="decimal">${f.u}</label>`).join('')};
const readAns=(box,q)=>q.kind==='mc'?(box.dataset.pick!=null&&box.dataset.pick!==''?+box.dataset.pick:null):[...box.querySelectorAll('[data-f]')].map(x=>x.value.trim());
const rightAns=q=>q.kind==='mc'?q.opts[q.a]:q.kind==='frac'?showM(q.ans):q.fields.map(f=>`${f.l==='答案'?'':f.l+' '}${MU.fmt(f.ans)}${f.u}`).join('、');
function practice(box,keys){let right=0,tries=0,cur,done,cnt=0;
 const nq=()=>{cur=GEN[keys[Math.floor(Math.random()*keys.length)]]();done=false;cnt++;
  box.innerHTML=`<p class="score">第 ${cnt} 題・答對 ${right} / ${tries} 題${tries>=5?'（今天的 5 題完成了！）':''}</p><p class="pq">${cur.q}</p><form class="pa" autocomplete="off">${ansInput(cur)}${cur.kind==='mc'?'':'<button class="btn s g" type="submit">檢查答案</button>'}</form><div class="pacts"><button class="vb" type="button" data-p="steps">看詳解</button><button class="vb pri" type="button" data-p="next">下一題</button></div><p class="fb" aria-live="polite"></p><ol class="psteps hide">${cur.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`;
  box.querySelector('form').onsubmit=e=>{e.preventDefault();chk()}};
 const chk=()=>{const r=judge(cur,readAns(box,cur));if(cur.kind==='mc')box.querySelectorAll('.popt').forEach((b,i)=>{b.classList.toggle('r',i===cur.a&&r.ok!==null);b.classList.toggle('w',i===+box.dataset.pick&&!r.ok)});
  box.querySelector('.fb').innerHTML=`<span class="${r.ok?'ok':'bad'}">${r.msg}</span>`;if(!done&&r.ok!==null){tries++;if(r.ok){right++;window.HUB.track('prac')}done=true;box.querySelector('.score').textContent=`第 ${cnt} 題・答對 ${right} / ${tries} 題${tries>=5?'（今天的 5 題完成了！）':''}`}if(r.ok===false)box.querySelector('.psteps').classList.remove('hide')};
 box.addEventListener('click',e=>{e.stopPropagation();const o=e.target.closest('[data-po]');if(o){box.dataset.pick=o.dataset.po;chk();return}const p=e.target.closest('[data-p]');if(!p)return;if(p.dataset.p==='next'){box.dataset.pick='';nq()}else box.querySelector('.psteps').classList.toggle('hide')});
 nq()}

/* ---------- 派卷：卷號編碼 ---------- */
const KEYS=['pv3','addsub','mul1','div1','time3','unit3','frac3','dec3','pv4','round','mul2','div2','order4','angle4','improper','fracw','deccmp','decadd','decmulw','area4','time4','prime','gl5','reduce','add','sub','borrow','mul','fracof','decmul','decdivw','area5','vol','pct','order5','sd','fracdiv','decdiv','ratio','speed','circle','scale','solvex','trees','word','order6'];
const AL='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const encPaper=p=>`p-1${p.seed.toString(36)}-${p.g}-${p.n}-${p.keys.map(k=>AL[KEYS.indexOf(k)]).join('')}`;
function decPaper(s){const m=/^p-1([0-9a-z]+)-(g3|g4|g5|g6)-(\d{1,2})-([0-9a-zA-Z]+)$/.exec(s);if(!m)return null;const keys=[...m[4]].map(c=>KEYS[AL.indexOf(c)]);if(keys.some(k=>!k||!GEN[k]))return null;const n=+m[3];if(n<1||n>30)return null;return{seed:parseInt(m[1],36),g:m[2],n,keys}}
function seeded(seed,fn){const o=Math.random;let s=seed>>>0;Math.random=()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};try{return fn()}finally{Math.random=o}}
const buildQs=p=>seeded(p.seed,()=>{const out=[];for(let i=0;i<p.n;i++){const k=p.keys[i%p.keys.length];out.push({...GEN[k](),key:k})}return out});
const unitsOf=p=>{const G=D.find(x=>x.id===p.g);return G.units.filter(u=>u.g.some(k=>p.keys.includes(k))).map(u=>u.name)};
const b64e=s=>btoa(unescape(encodeURIComponent(s))),b64d=s=>decodeURIComponent(escape(atob(s)));

/* ---------- 老師：派卷工作台 ---------- */
let tb={g:'g5',sel:null,n:10,seed:0,tab:'make'};
function teacher(){if(!tb.seed)tb.seed=Math.floor(Math.random()*1e9);const G=D.find(x=>x.id===tb.g),U=G.units.filter(u=>u.g&&u.g.length);if(!tb.sel)tb.sel=U.map(u=>u.name);
 const tabs=`<div class="tabs" role="tablist"><button role="tab" type="button" data-tab="make" aria-selected="${tb.tab==='make'}">① 出一張卷</button><button role="tab" type="button" data-tab="read" aria-selected="${tb.tab==='read'}">② 看學生結果</button></div>`;
 let body='';
 if(tb.tab==='make'){const sel=U.filter(u=>tb.sel.includes(u.name));const keys=[...new Set(sel.flatMap(u=>u.g))];const p={seed:tb.seed,g:tb.g,n:tb.n,keys};const ok=keys.length>0;
  body=`<div class="card" style="margin-top:0;border-radius:0 30px 30px 30px">
  <div class="step"><span class="num">1</span><b>年級</b></div><div class="chips">${['g3','g4','g5','g6'].map(g=>`<button class="chip" type="button" data-g="${g}" aria-pressed="${g===tb.g}">${GN[g]}</button>`).join('')}</div>
  <div class="step" style="margin-top:16px"><span class="num">2</span><b>單元</b><button class="back" type="button" id="all" style="padding:0">全選／全不選</button></div><div class="chips">${U.map(u=>`<button class="chip" type="button" data-u="${esc(u.name)}" aria-pressed="${tb.sel.includes(u.name)}">${esc(u.name)}</button>`).join('')}</div>
  <div class="step" style="margin-top:16px"><span class="num">3</span><b>題數</b></div><div class="chips">${[5,10,15,20].map(n=>`<button class="chip" type="button" data-n="${n}" aria-pressed="${n===tb.n}">${n} 題</button>`).join('')}</div>
  ${ok?`<div class="step" style="margin-top:20px"><span class="num">4</span><b>派出去</b></div>
  <div class="btns" style="margin-top:4px"><button class="btn s" type="button" id="link">複製線上卷連結</button><button class="btn s g" type="button" id="pdf">下載列印卷 PDF</button><button class="btn s w" type="button" id="new">換一批題目</button></div>
  <p class="msg hide" id="lmsg"></p>
  <p class="small">線上卷：學生打開連結作答，交卷後會拿到一段「結果碼」，請他用 LINE 傳給你，再貼到「② 看學生結果」。<br>列印卷：PDF 有題目頁和答案頁（附詳解），可以直接印。</p>`:'<p class="msg bad">至少選一個單元</p>'}</div>
  ${ok?`<div class="card"><h2>題目預覽（老師版，有答案）</h2><p class="small">${GN[tb.g]}・${unitsOf(p).join('、')}・${tb.n} 題　<button class="back" type="button" data-go="${encPaper(p)}" style="padding:0">預覽學生作答畫面 →</button></p><ol class="pv-list">${buildQs(p).map(q=>`<li>${q.q}${q.kind==='mc'?`<br><span class="small">${q.opts.map((o,i)=>`(${'ABCD'[i]}) ${o}`).join('　')}</span>`:''}<br><span class="ans">答案：${rightAns(q)}</span></li>`).join('')}</ol></div>`:''}`}
 else body=`<div class="card" style="margin-top:0;border-radius:0 30px 30px 30px"><h2>貼上學生傳來的結果碼</h2><p class="small">整段 LINE 訊息直接貼上就可以，裡面要有「SUSU:」開頭的那串。</p><textarea id="code" placeholder="例如：【酥酥老師練習卷】王小明 8/10　結果碼 SUSU:eyJ2Ij..."></textarea><div class="btns"><button class="btn s g" type="button" id="read">看分析</button></div><p class="msg bad hide" id="rmsg"></p></div><div id="analysis"></div>`;
 app.innerHTML=`<div class="col"><button class="back" type="button" data-go="">← 回教室</button><h2 style="margin-top:6px">老師派卷</h2>${tabs}${body}</div>`;
 app.onclick=e=>{const t=e.target;const tab=t.closest('[data-tab]');if(tab){tb.tab=tab.dataset.tab;teacher();return}
  const g=t.closest('[data-g]');if(g){tb.g=g.dataset.g;tb.sel=null;tb.seed=Math.floor(Math.random()*1e9);teacher();return}
  const u=t.closest('[data-u]');if(u){const n=u.dataset.u;tb.sel=tb.sel.includes(n)?tb.sel.filter(x=>x!==n):[...tb.sel,n];teacher();return}
  const n=t.closest('[data-n]');if(n){tb.n=+n.dataset.n;teacher();return}
  if(t.id==='all'){tb.sel=tb.sel.length===U.length?[]:U.map(x=>x.name);teacher();return}
  if(t.id==='new'){tb.seed=Math.floor(Math.random()*1e9);teacher();return}
  const sel=U.filter(x=>tb.sel.includes(x.name)),p={seed:tb.seed,g:tb.g,n:tb.n,keys:[...new Set(sel.flatMap(x=>x.g))]};
  if(t.id==='link'){const url=location.href.split('#')[0]+'#'+encPaper(p);const onPages=/github\.io$/.test(location.hostname);
   copy(`酥酥老師派了一張${GN[p.g]}練習卷（${p.n} 題）給你：\n${url}\n寫完後，把畫面上的結果碼複製傳給老師喔！`,document.getElementById('lmsg'),onPages?'已複製，貼到 LINE 傳給學生就可以了。':'已複製。提醒：這個網頁放到你的 GitHub Pages 之後，連結才能給學生打開；現在可以先按上面的「預覽學生作答畫面」試寫。');return}
  if(t.id==='pdf'){makePDF(p,t,document.getElementById('lmsg'));return}
  if(t.id==='read'){readCode();return}
  if(accClick(e))return;
  const rp=t.closest('[data-repaper]');if(rp){const d=JSON.parse(rp.dataset.repaper);tb={g:d.g,sel:d.units,n:Math.max(5,d.units.length*3),seed:Math.floor(Math.random()*1e9),tab:'make'};teacher();top0()}};
 if(tb.tab==='read'&&tb.last){document.getElementById('code').value=tb.last;readCode()}}

function readCode(){const v=document.getElementById('code').value,m=/SUSU:([A-Za-z0-9+/=]+)/.exec(v),err=document.getElementById('rmsg');
 let d;try{d=JSON.parse(b64d(m[1]))}catch(e){err.textContent='讀不到結果碼，請確認有完整貼上「SUSU:」後面那一串。';err.classList.remove('hide');return}
 const p=decPaper(d.p);if(!p){err.textContent='這個結果碼對應的卷子讀不到。';err.classList.remove('hide');return}err.classList.add('hide');tb.last=v;
 const qs=buildQs(p),res=qs.map((q,i)=>judge(q,d.a[i])),right=res.filter(r=>r.ok).length;
 const wrongRefs=[];qs.forEach((q,i)=>{if(!res[i].ok){const r=GR[q.key];if(r&&!wrongRefs.includes(r))wrongRefs.push(r)}});
 const G=D.find(x=>x.id===p.g),wrongUnits=[...new Set(qs.filter((q,i)=>!res[i].ok).map(q=>G.units.find(u=>u.g.includes(q.key))).filter(Boolean).map(u=>u.name))];
 const showA=(q,a)=>{if(q.kind==='mc')return a==null?'（沒寫）':q.opts[a];if(q.kind==='frac'){if(!a||!a[1])return'（沒寫）';return a[0]&&a[0]!=='0'?MU.F(a[1],a[2],a[0]):MU.F(a[1],a[2])}return(a||[]).filter(x=>x!=='').join('、')||'（沒寫）'};
 document.getElementById('analysis').innerHTML=`<div class="card"><h2>${esc(d.nm||'學生')} 的結果</h2><p class="score-big">${right} / ${p.n}</p><p class="small center">${GN[p.g]}・${unitsOf(p).join('、')}${d.t?'・交卷時間 '+new Date(d.t).toLocaleString('zh-TW',{hour12:false}):''}</p>
 <ol class="pv-list">${qs.map((q,i)=>`<li><span class="${res[i].ok?'ok':'bad'}">${res[i].ok?'✓':'✗'}</span> ${q.q}<br><span class="small">學生答：${showA(q,d.a[i])}${res[i].ok?'':`　正確：${rightAns(q)}`}</span></li>`).join('')}</ol></div>
 ${wrongRefs.length?`<h2 style="margin-top:26px">要補強的觀念</h2><p class="small" style="margin-top:-6px">依錯題整理，點開有改正步驟、圖解和練習。</p>${wrongRefs.map((r,k)=>{try{const x=item(r);return accHTML(r,k+1,`${x.U.name}・錯 ${qs.filter((q,i)=>!res[i].ok&&GR[q.key]===r).length} 題`,k===0)}catch(e){return''}}).join('')}
 <div class="btns"><button class="btn s" type="button" data-repaper='${esc(JSON.stringify({g:p.g,units:wrongUnits}))}'>針對錯的單元再出一張卷</button></div>`:'<div class="plan"><h2>全對！</h2><p>這幾個單元都很穩，可以往下一個單元前進。</p></div>'}`;
 const f=document.querySelector('#analysis .acc[data-open]');if(f)openViz(f)}

/* ---------- 學生：線上卷 ---------- */
function paper(code){const p=decPaper(code);if(!p){app.innerHTML=`<div class="col"><div class="card"><h2>找不到這張卷子</h2><p>連結可能沒有複製完整，請跟老師確認。</p></div></div>`;return}
 const qs=buildQs(p);let warn=false;
 app.innerHTML=`<div class="col"><div class="paper"><h2>酥酥老師的練習卷</h2><p class="meta">${GN[p.g]}・${unitsOf(p).join('、')}・共 ${p.n} 題</p>
 <div class="nm"><label>姓名 <input id="nm" autocomplete="off"></label><span class="small">寫完按最下面的「交卷」</span></div>
 ${qs.map((q,i)=>`<div class="pq-item" data-i="${i}"><div class="qt"><span class="qn">${i+1}</span>${q.q}</div><div class="pa" style="margin-top:8px">${ansInput(q)}</div><div class="res-mark"></div></div>`).join('')}
 <div class="btns c"><button class="btn" type="button" id="submit">交卷</button></div><p class="msg center hide" id="smsg"></p></div><div id="after"></div></div>`;top0();
 app.onclick=e=>{const o=e.target.closest('[data-po]');if(o){const it=o.closest('.pq-item');it.dataset.pick=o.dataset.po;it.querySelectorAll('.popt').forEach(b=>b.classList.toggle('on',b===o));return}
  if(e.target.id!=='submit')return;const items=[...app.querySelectorAll('.pq-item')];const ans=items.map((it,i)=>readAns(it,qs[i]));
  const blank=ans.filter((a,i)=>qs[i].kind==='mc'?a==null:!(a||[]).some((x,j)=>x!==''&&!(qs[i].kind==='frac'&&j===0))).length;const nm=document.getElementById('nm').value.trim(),sm=document.getElementById('smsg');
  if(!nm){sm.textContent='請先寫上姓名';sm.className='msg bad center';document.getElementById('nm').focus();return}
  if(blank&&!warn){warn=true;sm.textContent=`還有 ${blank} 題沒寫，確定要交卷的話再按一次「交卷」。`;sm.className='msg bad center';return}
  const res=qs.map((q,i)=>judge(q,ans[i])),right=res.filter(r=>r.ok).length;
  items.forEach((it,i)=>{it.classList.toggle('r',!!res[i].ok);it.querySelector('.res-mark').innerHTML=res[i].ok?'<span class="ok">✓ 答對</span>':`<span class="bad">✗ 正確答案：${rightAns(qs[i])}</span><details><summary class="small">看詳解</summary><ol class="psteps">${qs[i].steps.map(s=>`<li>${s}</li>`).join('')}</ol></details>`;it.querySelectorAll('input,button').forEach(x=>x.disabled=true)});
  e.target.disabled=true;sm.classList.add('hide');
  const payload=b64e(JSON.stringify({v:1,p:code,nm,a:ans,t:Date.now()})),msg=`【酥酥老師練習卷】${nm} ${right}/${p.n}　結果碼 SUSU:${payload}`;
  document.getElementById('after').innerHTML=`<div class="card center"><p class="score-big">${right} / ${p.n}</p><p>${right===p.n?'全對，太厲害了！':'錯的題目上面有正確答案和詳解，記得看一看喔。'}</p><h3 style="margin-top:12px">最後一步：把結果傳給老師</h3><p class="small">按下面的按鈕複製，貼到 LINE 傳給酥酥老師。</p><div class="linkbox">${esc(msg)}</div><div class="btns c"><button class="btn g" type="button" id="cp">複製結果傳給老師</button></div><p class="msg ok hide" id="cmsg"></p></div>`;
  document.getElementById('cp').onclick=()=>copy(msg,document.getElementById('cmsg'),'已複製！打開 LINE 貼給老師就完成了。');document.getElementById('after').scrollIntoView({behavior:'smooth'})}}

/* ---------- 列印卷 PDF ---------- */
const loadJS=src=>new Promise((ok,no)=>{if(document.querySelector(`script[src="${src}"]`))return ok();const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)});
async function makePDF(p,btn,msgEl,ttl){const m=msgEl||document.getElementById('lmsg');const say=(t,c='')=>{m.textContent=t;m.className='msg '+c};btn.disabled=true;say('正在產生 PDF，請稍等幾秒……');
 try{await loadJS('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');await loadJS('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')}catch(e){btn.disabled=false;say('PDF 工具載入失敗，請確認網路後再試一次。','bad');return}
 const qs=buildQs(p),root=document.getElementById('printroot'),title=ttl||`${GN[p.g]}數學練習卷`,units=unitsOf(p).join('、');root.innerHTML='';const pages=[];
 const head=k=>`<div class="ph"><img src="avatar.jpg" alt=""><div><b>酥酥老師家教・${title}${k?'（答案）':''}</b><small>${units}・共 ${p.n} 題・卷號 ${p.seed.toString(36)}</small></div></div>${k?'':'<div class="fields">姓名 <span></span> 日期 <span></span> 得分 <span></span></div>'}`;
 const newPage=k=>{const d=document.createElement('div');d.className='a4';d.innerHTML=head(k)+'<div class="body"></div><div class="foot">酥酥老師家教・更多重點與分級練習：《加點心　酥學點心鋪》數學講義・Threads @crispyyyyy0121</div>';root.appendChild(d);pages.push(d);return d.querySelector('.body')};
 const add=(k,html)=>{let b=pages.length&&pages[pages.length-1].dataset.k===String(k)?pages[pages.length-1].querySelector('.body'):null;if(!b){b=newPage(k);pages[pages.length-1].dataset.k=k}
  const it=document.createElement('div');it.className='it';it.innerHTML=html;b.appendChild(it);if(b.parentNode.scrollHeight>1123){it.remove();b=newPage(k);pages[pages.length-1].dataset.k=k;b.appendChild(it)}};
 qs.forEach((q,i)=>add(0,`<div class="q">${i+1}. ${q.q}</div>${q.kind==='mc'?`<div class="ab">${q.opts.map((o,j)=>`(${'ABCD'[j]}) ${o}`).join('')}</div>`:`<div class="sp"></div><div class="ab">答：${q.kind==='frac'?'＿＿＿＿':q.fields.map(f=>`${f.l==='答案'?'':f.l}＿＿＿${f.u}`).join('　')}</div>`}`));
 qs.forEach((q,i)=>add(1,`<div class="q">${i+1}. ${q.q}</div><div class="key">答案：${q.kind==='mc'?`(${'ABCD'[q.a]}) `:''}${rightAns(q)}</div><div class="key" style="color:#8f7a68">${q.steps.slice(0,3).join('；')}</div>`));
 try{await (document.fonts?document.fonts.ready:Promise.resolve());const{jsPDF}=window.jspdf;const pdf=new jsPDF({unit:'pt',format:'a4'});
  for(let i=0;i<pages.length;i++){const c=await window.html2canvas(pages[i],{scale:2,backgroundColor:'#ffffff',useCORS:true});if(i)pdf.addPage();pdf.addImage(c.toDataURL('image/jpeg',.9),'JPEG',0,0,595.28,841.89)}
  const blob=pdf.output('blob'),fn=`${title}_${units.slice(0,12)}_${p.seed.toString(36)}.pdf`;root.innerHTML='';
  const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
  if(dl){try{await dl.save({filename:fn,data:blob});say('PDF 已下載。','ok')}catch(e){say(e&&e.code==='declined'?'已取消下載。':'這裡無法下載，請稍後再試。','bad')}}
  else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();a.remove();say('PDF 已下載。','ok')}}
 catch(e){root.innerHTML='';say('產生 PDF 時出了問題，請再試一次。','bad')}btn.disabled=false}

/* ---------- 共用 ---------- */
function copy(txt,el,msg){const show=t=>{if(el){el.textContent=t;el.classList.remove('hide')}};
 try{navigator.clipboard.writeText(txt).then(()=>show(msg),()=>show('無法自動複製，請長按下面的文字手動複製：\n'+txt))}catch(e){show('無法自動複製，請長按下面的文字手動複製：\n'+txt)}}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){e.stopPropagation();go(g.dataset.go)}},true);
document.getElementById('home').onclick=()=>go('');
function go(h){if(location.hash.slice(1)===h)route();else location.hash=h}
function route(){app.onclick=null;const h=location.hash.slice(1);
 if(!h)return home();if(h==='parent')return parent();{const H=window.HUB;if(h==='lesson'||h==='concept')return H.lessons(app);if(h.startsWith('lesson-'))return H.lessons(app,h.slice(7));if(h==='reading')return H.reading(app);if(h==='exam'||h==='fix')return H.exam(app);if(h==='play')return H.play(app);if(h==='daily')return H.daily(app);if(h==='cards'||h==='me')return H.cards(app)}{const m=/^parent-(g3|g4|g5|g6)$/.exec(h);if(m)return parent(m[1])}if(h==='teacher')return teacher();if(h.startsWith('m-'))return single(h.slice(2));if(h.startsWith('p-'))return paper(h);home()}
window.APP={accHTML,accClick,openViz,practice,item};
window.addEventListener('hashchange',route);route();
window.__app={encPaper,decPaper,buildQs,judge,b64e,b64d,KEYS};
}
