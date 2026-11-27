/* 數學島 互動圖解元件：VZ[key](el, args) */
{
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
const lcm=(a,b)=>a/gcd(a,b)*b;
const simp=(n,d)=>{const g=gcd(n,d)||1;return[n/g,d/g]};
const F=(n,d,w)=>`<span class="fr">${w?`<span>${w}</span>`:''}<span class="fs"><i>${n}</i><i>${d}</i></span></span>`;
const FM=(n,d)=>{[n,d]=simp(n,d);if(d===1)return`${n}`;const w=Math.floor(n/d);return w?F(n%d,d,w):F(n,d)};
const fmt=x=>String(+(+x).toFixed(6));
const val=(el,k)=>{const e=el.querySelector(`[data-k="${k}"]`);return e?e.value:''};
const num=(el,k)=>Number(val(el,k));
const inp=(k,v,l,w=4)=>`<label class="vl">${l}<input class="vi" data-k="${k}" value="${v}" inputmode="decimal" style="width:${w}em"></label>`;
const ctl=s=>`<div class="vctl">${s}</div>`;
const out='<div class="vo"></div>';
const bind=(el,draw)=>{const o=el.querySelector('.vo');const run=()=>{try{o.innerHTML=draw()}catch(e){o.innerHTML='<p class="vwarn">請輸入合理的數字</p>'}};el.addEventListener('input',run);run();return run};
const bad=t=>`<p class="vwarn">${t}</p>`;
const slice=(cx,cy,r,i,d)=>{if(d===1)return`M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`;const a0=(-90+360*i/d)*Math.PI/180,a1=(-90+360*(i+1)/d)*Math.PI/180;return`M${cx} ${cy}L${(cx+r*Math.cos(a0)).toFixed(1)} ${(cy+r*Math.sin(a0)).toFixed(1)}A${r} ${r} 0 ${360/d>180?1:0} 1 ${(cx+r*Math.cos(a1)).toFixed(1)} ${(cy+r*Math.sin(a1)).toFixed(1)}Z`};
const FILL=['var(--card)','var(--butter)','var(--line)','var(--teal-l)'];
const pie=(cx,cy,r,st)=>st.map((s,i)=>`<path d="${slice(cx,cy,r,i,st.length)}" fill="${FILL[s]}" stroke="var(--ink)" stroke-width="1.2"/>`+(s===2?`<path d="${slice(cx,cy,r*.55,i,st.length)}" fill="none" stroke="var(--berry)" stroke-width="2" stroke-dasharray="3 3"/>`:'')).join('');
const bar=(x,y,U,h,seg,fill,col='var(--butter)')=>{let s='';const w=U/seg;for(let i=0;i<seg;i++)s+=`<rect x="${x+i*w}" y="${y}" width="${w}" height="${h}" fill="${i<fill?col:'var(--card)'}" stroke="var(--ink)" stroke-width="1"/>`;return s};
const svg=(w,h,b)=>`<svg class="vsvg" viewBox="0 0 ${w} ${h}" role="img">${b}</svg>`;
const T=(x,y,t,o='')=>`<text x="${x}" y="${y}" ${o}>${t}</text>`;
const PL=['個位','十位','百位','千位','萬位','十萬位','百萬位','千萬位'];
const stepper=(el,steps,render)=>{let i=0;el.innerHTML=`<div class="vo"></div><div class="vctl"><button class="vb" data-s="-1">上一步</button><button class="vb pri" data-s="1">下一步</button><button class="vb" data-s="0">重來</button><span class="vstep"></span></div>`;
 const o=el.querySelector('.vo'),c=el.querySelector('.vstep');const show=()=>{o.innerHTML=render(i);c.textContent=`${i+1} / ${steps}`};
 el.onclick=e=>{const b=e.target.closest('[data-s]');if(!b)return;const s=+b.dataset.s;i=s===0?0:Math.max(0,Math.min(steps-1,i+s));show()};show()};
const wrapInputs=(el,html,mk)=>{el.innerHTML=ctl(html+'<button class="vb pri" data-go>開始</button>')+'<div class="vin"></div>';const box=el.querySelector('.vin');const go=()=>{box.onclick=null;try{mk(box)}catch(e){box.innerHTML=bad('請輸入合理的數字')}};el.querySelector('[data-go]').onclick=go;go()};

/* ---- 讀數 ---- */
const D='零一二三四五六七八九',P4=['千','百','十',''],U4=['','萬','億','兆'];
function readInt(s){s=s.replace(/^0+(?=\d)/,'');if(/^0*$/.test(s))return'零';let r='',z=false;const gs=[];while(s.length){gs.unshift(s.slice(-4).padStart(4,'0'));s=s.slice(0,-4)}
 gs.forEach((g,k)=>{const u=U4[gs.length-1-k];if(g==='0000'){if(r)z=true;return}for(let i=0;i<4;i++){const d=+g[i];if(!d){if(r)z=true;continue}if(z){r+='零';z=false}r+=D[d]+P4[i]}r+=u});
 return r.replace(/^一十/,'十')}
const readNum=s=>{const[a,b]=s.split('.');return readInt(a)+(b?'點'+[...b].map(c=>D[c]).join(''):'')};
window.readNum=readNum;
const VZ={};

VZ.pv=(el,a)=>{el.innerHTML=ctl(`<label class="vl">輸入一個數<input class="vi" data-k="n" value="${a.n}" inputmode="decimal" style="width:9em"></label>`)+out;
 const L=['個','十','百','千','萬','十萬','百萬','千萬','億','十億','百億','千億','兆'],DL=['十分位','百分位','千分位'];
 bind(el,()=>{const s=val(el,'n').trim();if(!/^\d{1,13}(\.\d{1,3})?$/.test(s))return bad('請輸入 13 位以內的整數，或最多 3 位小數');
  const[i,d='']=s.split('.');const ip=i.replace(/^0+(?=\d)/,'');const cells=[];
  [...ip].forEach((c,k)=>{const p=ip.length-1-k;cells.push(`<div class="pvc${c==='0'?' z':''}${p%4===0&&p?' sep':''}"><small>${L[p]}${p<4&&p?'位':p?'':'位'}</small><b>${c}</b></div>`)});
  if(d){cells.push('<div class="pvc dot"><small>&nbsp;</small><b>.</b></div>');[...d].forEach((c,k)=>cells.push(`<div class="pvc${c==='0'?' z':''}"><small>${DL[k]}</small><b>${c}</b></div>`))}
  const zs=(ip.match(/0/g)||[]).length;
  return`<div class="pv">${cells.join('')}</div><p class="vbig">讀作：${readNum(ip+(d?'.'+d:''))}</p>${zs&&ip.length>1?'<p>粉紅色是 0 的位置。整數部分四位一節，每節中間連在一起的 0 只讀一個「零」，每節結尾的 0 不讀。</p>':''}${d?`<p>小數點後面一位一位讀，不讀「十、百」。</p>`:''}`})};

/* ---- 直式加減 ---- */
VZ.col=(el,a)=>wrapInputs(el,inp('a',a.a,'',5)+`<b>${a.op==='-'?'－':'＋'}</b>`+inp('b',a.b,'',5),box=>{
 const A=Math.trunc(num(el,'a')),B=Math.trunc(num(el,'b')),op=a.op;if(!(A>=0&&B>=0)||A>9999999||B>9999999)throw 0;if(op==='-'&&A<B){box.innerHTML=bad('被減數要比減數大');return}
 const L=String(Math.max(A,B)).length+(op==='+'?1:0),ad=[...String(A).padStart(L,'0')].reverse().map(Number),bd=[...String(B).padStart(L,'0')].reverse().map(Number);
 const st=[{cur:[...ad],res:[],carry:[],hl:-1,t:'從個位開始，一位一位算。'}];let cur=[...ad],res=[],carry=[],c=0;
 const n=op==='+'?L-1:L;
 for(let i=0;i<n;i++){let t;if(op==='+'){const s=ad[i]+bd[i]+c;t=`${PL[i]}：${ad[i]} ＋ ${bd[i]}${c?' ＋ 進位 1':''} ＝ ${s}`;res[i]=s%10;c=s>=10?1:0;if(c){carry[i+1]=1;t+=`，寫 ${s%10}，進 1 到${PL[i+1]}`}}
  else{t='';if(cur[i]<bd[i]){let j=i+1;while(cur[j]===0)j++;const old=cur[j];t=`${PL[i]} ${cur[i]} 不夠減 ${bd[i]}，`;if(j>i+1)t+=`${PL.slice(i+1,j).join('、')}是 0 沒得借，`;t+=`向${PL[j]}借 1：${PL[j]} ${old} → ${old-1}`;cur[j]--;for(let k=j-1;k>i;k--)cur[k]=9;if(j>i+1)t+=`，中間的 0 都變成 9`;cur[i]+=10;t+=`，${PL[i]}變成 ${cur[i]}。`}
   res[i]=cur[i]-bd[i];t+=`${PL[i]}：${cur[i]} － ${bd[i]} ＝ ${res[i]}`}
  st.push({cur:[...cur],res:[...res],carry:[...carry],hl:i,t})}
 if(op==='+'&&c){res[L-1]=1;st.push({cur,res:[...res],carry,hl:L-1,t:'最後的進位 1 寫在最前面'})}
 const ans=op==='+'?A+B:A-B;st.push({...st[st.length-1],hl:-1,t:`答案：${A} ${op==='+'?'＋':'－'} ${B} ＝ ${ans}`});
 stepper(box,st.length,k=>{const s=st[k];const top=Math.max(String(A).length,String(B).length,String(ans).length);const cols=[];
  for(let i=L-1;i>=0;i--){if(i>=top)continue;const ch=op==='-'&&s.cur[i]!==ad[i];const hd=i<String(A).length;
   cols.push(`<div class="cc${i===s.hl?' hl':''}"><small class="cm">${ch?`<s>${ad[i]}</s>${s.cur[i]}`:op==='+'&&s.carry[i]?'1':'&nbsp;'}</small><b>${hd?ad[i]:'&nbsp;'}</b><b>${i<String(B).length?bd[i]:'&nbsp;'}</b><b class="cr">${s.res[i]!=null&&(i<String(ans).length)?s.res[i]:'&nbsp;'}</b></div>`)}
  return`<div class="colw"><div class="cc op"><small>&nbsp;</small><b>&nbsp;</b><b>${op==='+'?'＋':'－'}</b><b class="cr">&nbsp;</b></div>${cols.join('')}</div><p class="vstepT">${s.t}</p>`})});

/* ---- 直式乘法（×一位數） ---- */
VZ.mul=(el,a)=>wrapInputs(el,inp('a',a.a,'',5)+'<b>×</b>'+inp('b',a.b,'',3),box=>{
 const A=Math.trunc(num(el,'a')),B=Math.trunc(num(el,'b'));if(!(A>0&&B>0&&B<10&&A<100000))throw 0;
 const ad=[...String(A)].reverse().map(Number),st=[{res:[],car:[],hl:-1,t:'從個位開始乘。口訣：先乘，再加進位。'}];let c=0,res=[],car=[];
 ad.forEach((d,i)=>{const p=d*B,s=p+c;let t=`${PL[i]}：${d} × ${B} ＝ ${p}${c?`，再加進位 ${c} ＝ ${s}`:''}，寫 ${s%10}`;res[i]=s%10;const nc=Math.floor(s/10);if(nc){t+=`，進 ${nc} 到${PL[i+1]}`;car[i+1]=nc}c=nc;st.push({res:[...res],car:[...car],hl:i,t})});
 if(c){res.push(c);st.push({res:[...res],car,hl:ad.length,t:`最後的進位 ${c} 寫在最前面`})}
 st.push({...st[st.length-1],hl:-1,t:`答案：${A} × ${B} ＝ ${A*B}${String(A).includes('0')?'。注意中間的 0 那一位：0 × '+B+' ＝ 0，再加進位':''}`});
 const L=String(A*B).length;
 stepper(box,st.length,k=>{const s=st[k];let cols='';for(let i=L-1;i>=0;i--)cols+=`<div class="cc${i===s.hl?' hl':''}"><small class="cm">${s.car[i]||'&nbsp;'}</small><b>${ad[i]??'&nbsp;'}</b><b>${i===0?B:'&nbsp;'}</b><b class="cr">${s.res[i]??'&nbsp;'}</b></div>`;
  return`<div class="colw"><div class="cc op"><small>&nbsp;</small><b>&nbsp;</b><b>×</b><b class="cr">&nbsp;</b></div>${cols}</div><p class="vstepT">${s.t}</p>`})});

/* ---- 長除法 ---- */
VZ.div=(el,a)=>wrapInputs(el,inp('a',a.a,'',6)+'<b>÷</b>'+inp('b',a.b,'',3),box=>{
 const A=Math.trunc(num(el,'a')),B=Math.trunc(num(el,'b'));if(!(A>0&&B>0&&B<100&&A<10000000))throw 0;
 const ds=[...String(A)].map(Number),st=[{q:[],t:`從最高位開始，看夠不夠除 ${B}。${B>=10?`估商時把 ${B} 想成 ${Math.round(B/10)*10}。`:''}`}];let r=0,started=false;const q=[];
 ds.forEach((d,i)=>{const cur=r*10+d,qd=Math.floor(cur/B);let t;
  if(!started&&qd===0&&i<ds.length-1){t=`${cur} 不夠除 ${B}，商先不寫，連下一位一起看`;q[i]=null}
  else{started=true;q[i]=qd;t=qd===0?`${i?`往下拿 ${d}，`:''}${cur} 不夠除 ${B}，這一位商要寫 0！`:`${i&&r?`餘 ${r} 和下一位 ${d} 合成 ${cur}，`:''}${cur} ÷ ${B}：商 ${qd}，${B} × ${qd} ＝ ${B*qd}，${cur} － ${B*qd} ＝ ${cur-B*qd}`}
  r=cur-qd*B;st.push({q:[...q],t,hl:i})});
 const Q=Math.floor(A/B);st.push({q:[...q],hl:-1,t:`商 ${Q}，餘 ${r}。驗算：${B} × ${Q}${r?` ＋ ${r}`:''} ＝ ${A} ✓（餘數 ${r} 比除數 ${B} 小 ✓）`});
 stepper(box,st.length,k=>{const s=st[k];return`<div class="ldiv"><div class="lq">${ds.map((_,i)=>`<b class="${i===s.hl?'hl':''}">${s.q[i]??'&nbsp;'}</b>`).join('')}</div><div class="lb"><span>${B}</span><span class="ld">${ds.map((d,i)=>`<b class="${i===s.hl?'hl':''}">${d}</b>`).join('')}</span></div></div><p class="vstepT">${s.t}</p>`})});

/* ---- 尺 ---- */
VZ.ruler=(el,a)=>{el.innerHTML=ctl(`<label class="vl">起點<input class="vi" type="range" data-k="s" min="0" max="6" value="${a.s}"></label><label class="vl">長度<input class="vi" type="range" data-k="l" min="1" max="6" value="${a.l}"></label>`)+out;
 bind(el,()=>{const s=num(el,'s'),l=num(el,'l'),u=30,x0=20;let g='';for(let i=0;i<=12;i++){g+=`<line x1="${x0+i*u}" y1="70" x2="${x0+i*u}" y2="52" stroke="var(--ink)"/>`+T(x0+i*u,90,i,'text-anchor="middle" font-size="13"');if(i<12)for(let k=1;k<10;k++)g+=`<line x1="${x0+i*u+k*3}" y1="70" x2="${x0+i*u+k*3}" y2="${k===5?60:64}" stroke="var(--ink)" stroke-width=".6"/>`}
  return svg(400,110,`<rect x="10" y="48" width="380" height="50" rx="4" fill="var(--soft)" stroke="var(--ink)"/>${g}<rect x="${x0+s*u}" y="18" width="${l*u}" height="22" rx="6" fill="var(--berry)"/><line x1="${x0+s*u}" y1="18" x2="${x0+s*u}" y2="70" stroke="var(--berry)" stroke-dasharray="3 3"/><line x1="${x0+(s+l)*u}" y1="18" x2="${x0+(s+l)*u}" y2="70" stroke="var(--berry)" stroke-dasharray="3 3"/>`)+
  `<p class="vbig">終點 ${s+l} － 起點 ${s} ＝ ${l} 公分</p>${s?`<p>如果直接讀終點，會以為是 <s>${s+l} 公分</s>。</p>`:'<p>從 0 開始量時，終點的數字剛好就是長度。</p>'}`})};

/* ---- 時間借位 ---- */
VZ.time=(el,a)=>{el.innerHTML=ctl(inp('h1',a.h1,'',2)+'時'+inp('m1',a.m1,'',3)+'分 －'+inp('h2',a.h2,'',2)+'時'+inp('m2',a.m2,'',3)+'分')+out;
 bind(el,()=>{let h1=num(el,'h1'),m1=num(el,'m1');const h2=num(el,'h2'),m2=num(el,'m2');if([h1,m1,h2,m2].some(x=>!(x>=0))||m1>59||m2>59||h1*60+m1<h2*60+m2)return bad('分要在 0～59，而且前面的時間要比較多');
  const bor=m1<m2;const M=bor?m1+60:m1,H=bor?h1-1:h1;let cells='';for(let i=0;i<60;i++)cells+=`<i class="${i<m1?'on':''}"></i>`;let cells2='';if(bor)for(let i=0;i<60;i++)cells2+=`<i class="on b"></i>`;
  return`${bor?`<p>${m1} 分不夠減 ${m2} 分，向「時」借 1 小時。1 小時是 <b>60 分</b>，不是 100 分：</p><div class="mins">${cells2}</div><div class="mins">${cells}</div><p>${m1} ＋ 60 ＝ ${M} 分，${h1} 時變成 ${H} 時。</p>`:''}<p class="vbig">${H} 時 ${M} 分 － ${h2} 時 ${m2} 分 ＝ ${H-h2} 時 ${M-m2} 分</p>${bor?`<p>如果借成 100：<s>${H-h2} 時 ${m1+100-m2} 分</s>，分比 60 還多，一定不對。</p>`:''}`})};

/* ---- 平分 ---- */
VZ.fair=(el)=>{el.innerHTML=ctl(`<label class="vl">分成幾份<input class="vi" type="range" data-k="d" min="2" max="8" value="4"></label>`)+out;
 bind(el,()=>{const d=num(el,'d');const eq=Array(d).fill(0);eq[0]=1;const ang=[];let rest=360;for(let i=0;i<d;i++){const v=i===d-1?rest:Math.round(rest*(i===0?.42:.3));ang.push(v);rest-=v}
  let p='',a0=-90;ang.forEach((g,i)=>{const r=60,cx=300,cy=75,s=a0*Math.PI/180,e=(a0+g)*Math.PI/180;p+=`<path d="M${cx} ${cy}L${(cx+r*Math.cos(s)).toFixed(1)} ${(cy+r*Math.sin(s)).toFixed(1)}A${r} ${r} 0 ${g>180?1:0} 1 ${(cx+r*Math.cos(e)).toFixed(1)} ${(cy+r*Math.sin(e)).toFixed(1)}Z" fill="${i===0?'var(--butter)':'var(--card)'}" stroke="var(--ink)" stroke-width="1.2"/>`;a0+=g});
  return svg(400,165,pie(100,75,60,eq)+p+T(100,158,`平分：是 1/${d}`,'text-anchor="middle" font-size="15" fill="var(--mint)"')+T(300,158,`沒平分：不是 1/${d}`,'text-anchor="middle" font-size="15" fill="var(--berry)"'))+`<p>兩個圓都切成 ${d} 塊，但右邊每塊不一樣大，塗色那塊不能叫 ${F(1,d)}。分數的前提是「平分」。</p>`})};

/* ---- 分數條 ---- */
VZ.bars=(el,a)=>{let com=false;el.innerHTML=ctl(inp('a1',a.a[0],'',2)+'/'+inp('a2',a.a[1],'',2)+`<b>${a.op==='+'?'＋':'和'}</b>`+inp('b1',a.b[0],'',2)+'/'+inp('b2',a.b[1],'',2)+'<button class="vb pri" data-c>切成一樣大</button>')+out;
 const run=bind(el,()=>{const n1=num(el,'a1'),d1=num(el,'a2'),n2=num(el,'b1'),d2=num(el,'b2');if([n1,d1,n2,d2].some(x=>!(x>=0&&Number.isInteger(x)))||!d1||!d2||d1>12||d2>12||n1>d1||n2>d2)return bad('請輸入分母 12 以內的真分數');
  const L=lcm(d1,d2),sum=a.op==='+',tot=sum?n1*L/d1+n2*L/d2:0,big=sum&&tot>L,U=big?170:300,x=80;
  const s1=com?L:d1,s2=com?L:d2;let g=T(10,28,FM(n1,d1).replace(/<[^>]+>/g,'')||`${n1}/${d1}`,'font-size="15"');
  g=T(10,28,`${n1}/${d1}`,'font-size="15"')+bar(x,10,U,26,s1,com?n1*L/d1:n1)+T(10,72,`${n2}/${d2}`,'font-size="15"')+bar(x,54,U,26,s2,com?n2*L/d2:n2,'var(--teal-l)');let H=95,txt='';
  if(sum){const wn=n1+n2,wd=d1+d2;g+=T(10,116,'答案','font-size="15"')+bar(x,98,U,26,L,Math.min(tot,L))+(big?bar(x+U+10,98,U,26,L,tot-L):'');
   if(d1!==d2){g+=T(10,160,'錯的','font-size="15" fill="var(--berry)"')+bar(x,142,U,26,wd,wn,'var(--berry-l)');H=180}else H=135;
   txt=d1===d2?`<p class="vbig">${n1} 個 ${F(1,d1)} ＋ ${n2} 個 ${F(1,d1)} ＝ ${n1+n2} 個 ${F(1,d1)} ＝ ${FM(n1+n2,d1)}</p><p>分母是「切成幾份」，加起來還是同樣大小的 ${F(1,d1)}，分母不會變。如果寫成 ${F(n1+n2,d1+d2)}，每一份反而變小了。</p>`
    :`<p class="vbig">${F(n1,d1)} ＋ ${F(n2,d2)} ＝ ${F(n1*L/d1,L)} ＋ ${F(n2*L/d2,L)} ＝ ${FM(tot,L)}</p><p>${com?'':'按「切成一樣大」看看：'}兩條的每一小格不一樣大，不能直接加。都切成 ${F(1,L)} 以後，分子才能相加。</p><p>錯的算法 ${F(wn,wd)}（紅色）${wn*L<n1*wd||wn*L/wd<Math.max(n1*L/d1,n2*L/d2)?'比原來其中一個數還小，加完反而變少，一定不對。':'和正確答案不一樣大。'}</p>`}
  else{const A=n1*L/d1,B=n2*L/d2,sg=A>B?'＞':A<B?'＜':'＝';H=95;txt=`<p class="vbig">${F(n1,d1)} ${sg} ${F(n2,d2)}</p><p>通分成 ${F(A,L)} 和 ${F(B,L)}，每一小格一樣大，再數有幾格。${d1!==d2&&n1===n2?`分子一樣時，分母越大，每一份越小。`:''}</p>`}
  return svg(big?440:400,H,g)+txt});
 el.querySelector('[data-c]').onclick=e=>{com=!com;e.target.textContent=com?'恢復原樣':'切成一樣大';run()}};

/* ---- 一堆東西的幾分之幾 ---- */
VZ.set=(el,a)=>{el.innerHTML=ctl(inp('n',a.n,'共',3)+'個的'+inp('a',a.a,'',2)+'/'+inp('b',a.b,'',2))+out;
 bind(el,()=>{const n=num(el,'n'),p=num(el,'a'),q=num(el,'b');if(!(n>0&&n<=36&&q>0&&q<=n&&p>=0&&p<=q)||[n,p,q].some(x=>!Number.isInteger(x)))return bad('請輸入 36 以內的數，分數要是真分數');if(n%q)return bad(`${n} 不能平分成 ${q} 份，換一個數試試`);
  const k=n/q,per=Math.min(q,4),cw=Math.ceil(Math.sqrt(k)),bw=cw*22+12,rows=Math.ceil(k/cw),bh=rows*22+12;let g='';
  for(let j=0;j<q;j++){const X=8+(j%per)*(bw+10),Y=8+Math.floor(j/per)*(bh+10);g+=`<rect x="${X}" y="${Y}" width="${bw}" height="${bh}" rx="10" fill="${j<p?'var(--soft)':'none'}" stroke="${j<p?'var(--berry)':'var(--line)'}" stroke-width="2"/>`;for(let i=0;i<k;i++)g+=`<circle cx="${X+17+(i%cw)*22}" cy="${Y+17+Math.floor(i/cw)*22}" r="8" fill="${j<p?'var(--berry)':'var(--mute)'}"/>`}
  const W=per*(bw+10)+8,H=Math.ceil(q/per)*(bh+10)+8;return svg(Math.max(W,200),H,g)+`<p class="vbig">${n} 的 ${F(p,q)} ＝ ${n} ÷ ${q} × ${p} ＝ ${k*p}</p><p>先平分成 ${q} 份，每份 ${k} 個，拿 ${p} 份。「的」就是乘：${n} × ${F(p,q)} ＝ ${k*p}。</p>`})};

/* ---- 量角器 ---- */
VZ.angle=(el,a)=>{el.innerHTML=ctl(`<label class="vl">角度<input class="vi" type="range" data-k="d" min="5" max="175" value="${a.d}"></label><label class="vl">邊長<input class="vi" type="range" data-k="r" min="60" max="160" value="120"></label>`)+out;
 bind(el,()=>{const d=num(el,'d'),L=num(el,'r'),cx=200,cy=185,R=165;let g=`<path d="M${cx-R} ${cy}A${R} ${R} 0 0 1 ${cx+R} ${cy}Z" fill="var(--soft)" stroke="var(--ink)"/>`;
  for(let t=0;t<=180;t+=10){const r=t*Math.PI/180,c=Math.cos(r),s=Math.sin(r);g+=`<line x1="${cx+c*R}" y1="${cy-s*R}" x2="${cx+c*(R-12)}" y2="${cy-s*(R-12)}" stroke="var(--ink)"/>`;if(t%30===0){const yo=(t===0||t===180)?-12:0;g+=T(cx+c*(R-24),cy-s*(R-24)+4+yo,t,'text-anchor="middle" font-size="12" fill="var(--teal)"')+T(cx+c*(R-46),cy-s*(R-46)+4+yo,180-t,'text-anchor="middle" font-size="12" fill="var(--mute)"')}}
  const r=d*Math.PI/180;g+=`<line x1="${cx}" y1="${cy}" x2="${cx+L}" y2="${cy}" stroke="var(--berry)" stroke-width="4"/><line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(r)*L}" y2="${cy-Math.sin(r)*L}" stroke="var(--berry)" stroke-width="4"/><path d="M${cx+30} ${cy}A30 30 0 0 0 ${cx+30*Math.cos(r)} ${cy-30*Math.sin(r)}" fill="none" stroke="var(--berry)" stroke-width="2"/>`;
  return svg(400,195,g)+`<p class="vbig">這個角是 ${d} 度（${d<90?'銳角':d>90?'鈍角':'直角'}）</p><p>一條邊對著右邊的 0，所以看外圈（藍色）。如果看內圈會讀成 <s>${180-d} 度</s>。先判斷是銳角還是鈍角，就不會讀錯。</p><p>拉動「邊長」：邊變長或變短，角度都不變。</p>`})};

/* ---- 四捨五入 ---- */
VZ.round=(el,a)=>{let p=a.p;el.innerHTML=ctl(inp('n',a.n,'數',7)+[10,100,1000,10000].map(v=>`<button class="vb${v===p?' pri':''}" data-p="${v}">取到${{10:'十',100:'百',1000:'千',10000:'萬'}[v]}位</button>`).join(''))+out;
 const run=bind(el,()=>{const n=Math.trunc(num(el,'n'));if(!(n>0&&n<1e9))return bad('請輸入正整數');const lo=Math.floor(n/p)*p,hi=lo+p,mid=lo+p/2,dg=Math.floor(n%p/(p/10)),up=dg>=5,res=up?hi:lo;
  const X=v=>30+(v-lo)/p*340;const nm={10:'十',100:'百',1000:'千',10000:'萬'}[p],nx={10:'個',100:'十',1000:'百',10000:'千'}[p];const chain=up&&String(lo/p).endsWith('9');
  const g=`<line x1="30" y1="60" x2="370" y2="60" stroke="var(--ink)" stroke-width="2"/>${[lo,mid,hi].map(v=>`<line x1="${X(v)}" y1="50" x2="${X(v)}" y2="70" stroke="var(--ink)"/>`+T(X(v),92,v,'text-anchor="middle" font-size="13"')).join('')}<rect x="${up?X(mid):30}" y="54" width="170" height="12" fill="${up?'var(--teal-l)':'var(--butter)'}" opacity=".7"/><circle cx="${X(n)}" cy="60" r="8" fill="var(--berry)"/>${T(X(n),36,n,'text-anchor="middle" font-size="14" fill="var(--berry)"')}`;
  return svg(400,105,g)+`<p class="vbig">${n} ≈ ${res}</p><p>保留到${nm}位，只看下一位（${nx}位）是 ${dg}：${up?'5 以上要進位':'4 以下要捨去'}。${up?`數線上也看得出來，${n} 比較靠近 ${hi}。`:`${n} 比較靠近 ${lo}。`}</p>${chain?`<p>注意連續進位：${nm}位是 9，加 1 變成 10，要再往前一位進 1，所以是 ${res}。不是 <s>${lo}</s>，也不是把前面的位數變成 0。</p>`:''}`});
 el.querySelector('.vctl').addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;p=+b.dataset.p;el.querySelectorAll('[data-p]').forEach(x=>x.classList.toggle('pri',x===b));run()})};

/* ---- 算式逐步計算 ---- */
const Q={n:(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return{n:n/g,d:d/g}}};
Q.add=(a,b)=>Q.n(a.n*b.d+b.n*a.d,a.d*b.d);Q.sub=(a,b)=>Q.n(a.n*b.d-b.n*a.d,a.d*b.d);Q.mul=(a,b)=>Q.n(a.n*b.n,a.d*b.d);Q.div=(a,b)=>{if(!b.n)throw'div0';return Q.n(a.n*b.d,a.d*b.n)};
function tok(s){s=s.replace(/\s/g,'').replace(/[＋]/g,'+').replace(/[－−–]/g,'-').replace(/[*xX＊]/g,'×').replace(/（/g,'(').replace(/）/g,')');const t=[];let dec=false;
 while(s.length){let m;if(m=s.match(/^\d+(\.\d+)?(\/\d+)?/)){const x=m[0];let v;if(x.includes('/')){const[a,b]=x.split('/');v=Q.n(+a,+b)}else if(x.includes('.')){dec=true;const k=x.split('.')[1].length;v=Q.n(Math.round(+x*10**k),10**k)}else v=Q.n(+x,1);t.push({t:'n',v});s=s.slice(x.length)}
  else if('+-×÷()'.includes(s[0])){t.push({t:s[0]});s=s.slice(1)}else throw'bad'}
 t.dec=dec;return t}
const showQ=(v,dec)=>{if(v.d===1)return`${v.n}`;if(dec){let d=v.d;while(d%2===0)d/=2;while(d%5===0)d/=5;if(d===1)return fmt(v.n/v.d)}return(v.n<0?'－':'')+FM(Math.abs(v.n),v.d)};
const opS={'+':' ＋ ','-':' － ','×':' × ','÷':' ÷ ','(':'（',')':'）'};
const render=(t,dec,hl=[])=>t.map((x,i)=>{const s=x.t==='n'?showQ(x.v,dec):opS[x.t];return i===hl[0]?`<mark>${s}`:i===hl[1]?`${s}</mark>`:s}).join('');
function evalSteps(str){const t=tok(str),dec=t.dec;let cur=t.slice();const lines=[];let guard=0;
 const check=a=>{for(let i=0;i<a.length;i++){const x=a[i],p=a[i-1];if(x.t==='n'&&p&&p.t==='n')throw'bad';if('+-×÷'.includes(x.t)&&(!p||!(p.t==='n'||p.t===')')))throw'bad'}};check(cur);
 while(cur.length>1&&guard++<60){let o=-1,c=cur.findIndex(x=>x.t===')');if(c>=0){for(let i=c;i>=0;i--)if(cur[i].t==='('){o=i;break}if(o<0)throw'bad'}else{c=cur.length;o=-1}
  if(c-o===2){cur.splice(c,1);cur.splice(o,1);continue}
  let k=-1;for(let i=o+1;i<c;i++)if(cur[i].t==='×'||cur[i].t==='÷'){k=i;break}if(k<0)for(let i=o+1;i<c;i++)if(cur[i].t==='+'||cur[i].t==='-'){k=i;break}if(k<0)throw'bad';
  const A=cur[k-1],B=cur[k+1];if(!A||!B||A.t!=='n'||B.t!=='n')throw'bad';const f={'+':Q.add,'-':Q.sub,'×':Q.mul,'÷':Q.div}[cur[k].t];
  lines.push(render(cur,dec,[k-1,k+1]));cur.splice(k-1,3,{t:'n',v:f(A.v,B.v)})}
 if(cur.length!==1||cur[0].t!=='n')throw'bad';lines.push(render(cur,dec));return{lines,v:cur[0].v,dec}}
window.evalSteps=evalSteps;window.QR=Q;
VZ.expr=(el,a)=>{el.innerHTML=ctl(`<label class="vl">算式<input class="vi" data-k="x" value="${a.x}" style="width:12em"></label>`)+out;
 bind(el,()=>{let r;try{r=evalSteps(val(el,'x'))}catch(e){return bad(e==='div0'?'不能除以 0':'算式看不懂，可以用 ＋ － × ÷ 和括號，分數寫成 1/2')}
  return`<ol class="esteps">${r.lines.map((l,i)=>`<li>${i?'＝ ':''}${l}</li>`).join('')}</ol><p>黃色是下一步要先算的：先算括號裡，再算乘除（由左往右），最後算加減（由左往右）。</p>${a.bad&&val(el,'x')===a.x?`<p>常見的錯：<s>${a.bad}</s></p>`:''}`})};
VZ.eq=(el,a)=>{el.innerHTML=ctl(`<label class="vl">左邊<input class="vi" data-k="l" value="${a.l}" style="width:10em"></label><b>和</b><label class="vl">右邊<input class="vi" data-k="r" value="${a.r}" style="width:10em"></label>`)+out;
 bind(el,()=>{let L,R;try{L=evalSteps(val(el,'l'));R=evalSteps(val(el,'r'))}catch(e){return bad('算式看不懂，可以用 ＋ － × ÷ 和括號')}
  const same=L.v.n===R.v.n&&L.v.d===R.v.d;return`<div class="eqw"><div class="eqb"><ol class="esteps">${L.lines.map((l,i)=>`<li>${i?'＝ ':''}${l}</li>`).join('')}</ol></div><div class="eqs ${same?'ok':'no'}">${same?'＝':'≠'}</div><div class="eqb"><ol class="esteps">${R.lines.map((l,i)=>`<li>${i?'＝ ':''}${l}</li>`).join('')}</ol></div></div><p class="vbig">${same?'兩邊相等 ✓':`不相等！${showQ(L.v,L.dec||R.dec)} 和 ${showQ(R.v,L.dec||R.dec)}`}</p><p>改改看數字，用代數字的方法檢查一個規則能不能用。</p>`})};

/* ---- 圖形面積 ---- */
VZ.shape=(el,a)=>{const k=a.k;el.innerHTML=ctl(k==='trap'?inp('a',3,'上底',2)+inp('b',6,'下底',2)+inp('h',4,'高',2):inp('b',k==='tri'?6:8,'底',2)+inp('h',4,'高',2)+inp('o',3,'往右偏',2))+out;
 bind(el,()=>{const b=num(el,'b'),h=num(el,'h'),o=k==='trap'?1:num(el,'o'),t=k==='trap'?num(el,'a'):0;if(![b,h,o].every(x=>x>=0)||b<1||h<1||h>8||b>9||o>5||(k==='trap'&&!(t>0&&t<=b)))return bad('底 1～9、高 1～8、偏移 0～5');
  const s=24,x0=20,y0=225,Y=y0-h*s;let g='',txt='';const P=pts=>pts.map(p=>p.join(',')).join(' ');const slant=Math.hypot(o,h).toFixed(1);
  const hgt=x=>`<line x1="${x}" y1="${Y}" x2="${x}" y2="${y0}" stroke="var(--berry)" stroke-width="2" stroke-dasharray="5 4"/><path d="M${x} ${y0-12}h12v12" fill="none" stroke="var(--berry)"/>`+T(x+6,(Y+y0)/2,`高 ${h}`,'font-size="14" fill="var(--berry)"');
  if(k==='para'){g=`<polygon points="${P([[x0,y0],[x0+b*s,y0],[x0+(o+b)*s,Y],[x0+o*s,Y]])}" fill="var(--butter)" stroke="var(--ink)" stroke-width="2"/>`+hgt(x0+o*s)+T(x0+b*s/2,y0+18,`底 ${b}`,'text-anchor="middle" font-size="14"')+(o?T(x0+o*s/2-26,(Y+y0)/2,`斜邊 ${slant}`,'font-size="13" fill="var(--mute)"'):'');
   txt=`<p class="vbig">面積 ＝ 底 × 高 ＝ ${b} × ${h} ＝ ${b*h}</p><p>高是虛線，要和底垂直。${o?`斜邊 ${slant} 不是高，用 ${b} × ${slant} 就錯了。`:'現在沒有偏，斜邊剛好就是高（變成長方形）。'}</p>`}
  else if(k==='tri'){g=`<polygon points="${P([[x0+b*s,y0],[x0+(o+b)*s,Y],[x0+o*s,Y]])}" fill="none" stroke="var(--mute)" stroke-width="1.5" stroke-dasharray="6 4"/><polygon points="${P([[x0,y0],[x0+b*s,y0],[x0+o*s,Y]])}" fill="var(--butter)" stroke="var(--ink)" stroke-width="2"/>`+hgt(x0+o*s)+T(x0+b*s/2,y0+18,`底 ${b}`,'text-anchor="middle" font-size="14"');
   txt=`<p class="vbig">面積 ＝ 底 × 高 ÷ 2 ＝ ${b} × ${h} ÷ 2 ＝ ${fmt(b*h/2)}</p><p>虛線是一模一樣的三角形，兩個拼成平行四邊形（面積 ${b*h}），所以三角形是它的一半，要 ÷ 2。</p>`}
  else{const B=[x0+b*s,y0],Tt=[x0+(o+t)*s,Y],M=[(B[0]+Tt[0])/2,(B[1]+Tt[1])/2],rot=p=>[2*M[0]-p[0],2*M[1]-p[1]];const tr=[[x0,y0],B,Tt,[x0+o*s,Y]];
   g=`<polygon points="${P(tr.map(rot))}" fill="none" stroke="var(--mute)" stroke-width="1.5" stroke-dasharray="6 4"/><polygon points="${P(tr)}" fill="var(--butter)" stroke="var(--ink)" stroke-width="2"/>`+hgt(x0+o*s)+T(x0+b*s/2,y0+18,`下底 ${b}`,'text-anchor="middle" font-size="14"')+T(x0+(o+t/2)*s,Y-8,`上底 ${t}`,'text-anchor="middle" font-size="14"');
   txt=`<p class="vbig">面積 ＝（上底 ＋ 下底）× 高 ÷ 2 ＝（${t} ＋ ${b}）× ${h} ÷ 2 ＝ ${fmt((t+b)*h/2)}</p><p>兩個一樣的梯形拼成平行四邊形，底是 ${t} ＋ ${b}，所以要先加再乘，括號不能漏。漏掉括號會算成 <s>${t} ＋ ${b} × ${h} ÷ 2 ＝ ${fmt(t+b*h/2)}</s>。</p>`}
  return svg(400,250,g)+txt})};

/* ---- 帶分數圓餅 ---- */
VZ.mixed=(el,a)=>{if(a.mode==='conv'){el.innerHTML=ctl(inp('w',a.w,'',2)+'又'+inp('n',a.n,'',2)+'/'+inp('d',a.d,'',2))+out;
  bind(el,()=>{const w=num(el,'w'),n=num(el,'n'),d=num(el,'d');if(!(w>=1&&w<=4&&d>=2&&d<=8&&n>=1&&n<d)||[w,n,d].some(x=>!Number.isInteger(x)))return bad('整數 1～4，分母 2～8，分子比分母小');
   let g='',c=0;for(let i=0;i<=w;i++){const st=Array(d).fill(i<w?1:0).map((x,j)=>i<w||j<n?1:0);g+=pie(48+i*92,50,40,st);st.forEach((x,j)=>{if(x){c++;const an=(-90+360*(j+.5)/d)*Math.PI/180;g+=T(48+i*92+Math.cos(an)*26,50+Math.sin(an)*26+4,c,'text-anchor="middle" font-size="11"')}})}
   return svg((w+1)*92+4,100,g)+`<p class="vbig">${F(n,d,w)} ＝ ${F(w*d+n,d)}</p><p>每個圓切成 ${d} 份，${w} 個整圓有 ${w} × ${d} ＝ ${w*d} 份，再加 ${n} 份，一共 ${w*d+n} 份。不是 <s>${F(w+n,d)}</s> 也不是 <s>${F(w*n,d)}</s>。</p>`});return}
 const{w,n,d,w2,n2}=a;const need=n<n2;const st=[];
 const base=()=>{const p=[];for(let i=0;i<w;i++)p.push(Array(d).fill(1));p.push(Array(d).fill(0).map((x,j)=>j<n?1:0));return p};
 let p=base();st.push({p:p.map(x=>[...x]),t:`${F(n,d,w)}：${w} 個整圓和 ${n} 片`});
 if(need){p[w-1]=Array(d).fill(3);st.push({p:p.map(x=>[...x]),t:`${F(n,d)} 不夠減 ${F(n2,d)}，從整數借 1 個（藍色）＝ ${F(d,d)}，變成 ${F(n+d,d,w-1)}`})}
 for(let i=0;i<w2;i++)p[i]=Array(d).fill(2);let r=n2;for(let j=d-1;j>=0&&r;j--)if(p[w][j]===1){p[w][j]=2;r--}const bi=need?w-1:-1;for(let j=0;j<d&&r;j++)if(bi>=0&&p[bi][j]===3){p[bi][j]=2;r--}
 st.push({p:p.map(x=>[...x]),t:`拿走 ${w2} 個整圓和 ${n2} 片（打叉的部分）`});
 const tot=(w*d+n)-(w2*d+n2);st.push({p:p.map(x=>[...x]),t:`剩下 ${FM(tot,d)}。不能倒過來用 ${F(n2,d)} － ${F(n,d)}！`});
 stepper(el,st.length,k=>{const s=st[k];return svg(s.p.length*92+4,100,s.p.map((x,i)=>pie(48+i*92,50,40,x)).join(''))+`<p class="vstepT">${s.t}</p>`})};

/* ---- 分數 × 整數 ---- */
VZ.rep=(el,a)=>{el.innerHTML=ctl(inp('n',a.n,'',2)+'/'+inp('d',a.d,'',2)+'×'+inp('k',a.k,'',2))+out;
 bind(el,()=>{const n=num(el,'n'),d=num(el,'d'),k=num(el,'k');if(!(d>=2&&d<=10&&n>=1&&n<d&&k>=2&&k<=5))return bad('分母 2～10，乘 2～5');
  let g='';for(let i=0;i<k;i++)g+=bar(60,8+i*30,300,22,d,n)+T(10,24+i*30,`${n}/${d}`,'font-size="13"');const tot=n*k,rows=Math.ceil(tot/d),y=k*30+20;
  for(let i=0;i<rows;i++)g+=bar(60,y+i*30,300,22,d,Math.min(d,tot-i*d),'var(--teal-l)');g+=T(10,y+16,'合起來','font-size="13"');
  return svg(400,y+rows*30+4,g)+`<p class="vbig">${k} 個 ${F(n,d)} ＝ ${tot} 個 ${F(1,d)} ＝ ${FM(tot,d)}</p><p>一小格還是 ${F(1,d)}，分母不變。如果分母也乘，${F(tot,d*k)} 約分後還是 ${F(n,d)}，根本沒變多！</p>`})};

/* ---- 百格板 ---- */
VZ.grid=(el,a)=>{el.innerHTML=ctl(a.x.map((v,i)=>inp('x'+i,v,i?'和':'小數',4)).join(''))+out;
 bind(el,()=>{const xs=a.x.map((_,i)=>num(el,'x'+i));if(xs.some(x=>!(x>=0&&x<=1)))return bad('請輸入 0～1 之間的小數');
  const g=xs.map((x,j)=>{const c=Math.round(x*100);let s='';for(let i=0;i<100;i++)s+=`<rect x="${j*205+(i%10)*19}" y="${Math.floor(i/10)*19}" width="18" height="18" fill="${i<c?(j?'var(--teal-l)':'var(--butter)'):'var(--card)'}" stroke="var(--line)"/>`;return s}).join('');
  const lab=x=>{const c=Math.round(x*100);return`${fmt(x)} ＝ ${c} 格 ＝ ${FM(c,100)} ＝ ${c}%`};
  let t=xs.map(lab).join('<br>');if(xs.length===2){const s=xs[0]>xs[1]?'＞':xs[0]<xs[1]?'＜':'＝';t=`<span class="vbig">${fmt(xs[0])} ${s} ${fmt(xs[1])}</span><br>`+t}
  else{const c=Math.round(xs[0]*100);t+=`<br>例如打 ${c%10?c:c/10} 折：付原價的 ${c}%（塗色），便宜的是沒塗的 ${100-c}%。`}
  return svg(xs.length*205-15,190,g)+`<p>${t}</p><p>一整塊是 1，切成 100 格。比大小就數格子：位數多不代表比較大。</p>`})};

/* ---- 小數點對齊 ---- */
VZ.align=(el,a)=>{el.innerHTML=ctl(inp('a',a.a,'',4)+'＋'+inp('b',a.b,'',4))+out;
 bind(el,()=>{const A=val(el,'a').trim(),B=val(el,'b').trim();if(!/^\d+(\.\d+)?$/.test(A)||!/^\d+(\.\d+)?$/.test(B))return bad('請輸入小數');
  const da=(A.split('.')[1]||'').length,db=(B.split('.')[1]||'').length,m=Math.max(da,db),ai=+A.replace('.',''),bi=+B.replace('.',''),ws=String(ai+bi).padStart(m+1,'0'),wrong=m?ws.slice(0,-m)+'.'+ws.slice(-m):ws;
  const right=fmt(+A+ +B),pad=(s,k)=>s+(s.includes('.')?'':k?'.':'')+'0'.repeat(k-(s.split('.')[1]||'').length);
  const col=(rows)=>`<pre class="mono">${rows.join('\n')}</pre>`;const R=[pad(A,m),pad(B,m)],w=Math.max(...R.map(s=>s.length))+2;
  const Wr=[A,B],ww=Math.max(A.length,B.length)+2;
  return`<div class="eqw"><div class="eqb"><b class="bad">✗ 末位對齊</b>${col([A.padStart(ww),('+ '+B).padStart(ww),'─'.repeat(ww),wrong.padStart(ww)])}</div><div class="eqb"><b class="ok">✓ 小數點對齊</b>${col([R[0].padStart(w),('+ '+R[1]).padStart(w),'─'.repeat(w),pad(right,m).padStart(w)])}</div></div><p>小數點對齊，才是十分位對十分位、百分位對百分位。空位補 0 比較不會亂。先估算：${A} ＋ ${B} 大約是 ${Math.round(+A)+Math.round(+B)}，${wrong} 差太多。</p>`})};

/* ---- 單位面積、體積 ---- */
VZ.sq=(el,a)=>{let zoom=false;el.innerHTML=ctl('<button class="vb pri" data-z>放大一小格</button>')+out;
 const run=bind(el,()=>{let g='';const s=17,oy=a.d===3?30:0;for(let i=0;i<100;i++)g+=`<rect x="${(i%10)*s+10}" y="${Math.floor(i/10)*s+10+oy}" width="${s}" height="${s}" fill="${i===0?'var(--berry-l)':'var(--butter)'}" stroke="var(--ink)" stroke-width=".6"/>`;
  if(a.d===3)g+=`<polygon points="10,40 40,10 210,10 180,40" fill="var(--teal-l)" stroke="var(--ink)"/><polygon points="180,40 210,10 210,180 180,210" fill="var(--teal-l)" stroke="var(--ink)"/>`;
  if(zoom){for(let i=0;i<100;i++)g+=`<rect x="${(i%10)*15+240}" y="${Math.floor(i/10)*15+20+oy}" width="15" height="15" fill="var(--berry-l)" stroke="var(--ink)" stroke-width=".4"/>`;g+=T(315,185+oy,'1 小格放大','text-anchor="middle" font-size="13"')}
  g+=T(95,202+oy,'邊長 1 公尺 ＝ 100 公分','text-anchor="middle" font-size="13"');
  const t=a.d===2?`<p class="vbig">1 平方公尺 ＝ 100 × 100 ＝ 10000 平方公分</p><p>邊長 100 公分切成 10 段，每一小格是 10 公分 × 10 公分 ＝ 100 平方公分。100 小格 × 100 ＝ 10000。${zoom?'放大後每一小格裡還有 100 個 1 平方公分。':''}</p><p>長度差 100 倍，面積差 100 × 100 倍。</p>`
   :`<p class="vbig">1 立方公尺 ＝ 100 × 100 × 100 ＝ 1000000 立方公分</p><p>一面就有 10000 個 1 平方公分，往上疊 100 層，就是 1000000 個 1 立方公分。長度差 100 倍，體積差 100 × 100 × 100 倍。</p>`;
  return svg(400,212+oy,g)+t});el.querySelector('[data-z]').onclick=e=>{zoom=!zoom;e.target.textContent=zoom?'收起':'放大一小格';run()}};

/* ---- 因數 ---- */
VZ.factor=(el,a)=>{el.innerHTML=ctl(inp('n',a.n,'數',3))+out;
 bind(el,()=>{const n=num(el,'n');if(!(n>=1&&n<=60&&Number.isInteger(n)))return bad('請輸入 1～60');const pr=[];for(let i=1;i*i<=n;i++)if(n%i===0)pr.push([i,n/i]);
  const fs=[...new Set(pr.flat())].sort((x,y)=>x-y);let g='',x=6;pr.forEach(([r,c])=>{const s=Math.min(10,120/Math.max(r,c,1));const w=Math.min(c,12)*s;if(x+w>396)return;for(let i=0;i<r;i++)for(let j=0;j<c&&j<12;j++)g+=`<circle cx="${x+j*s+s/2}" cy="${8+i*s+s/2}" r="${s*.35}" fill="var(--teal)"/>`;g+=T(x,8+r*s+16,`${r}×${c}`,'font-size="13"');x+=w+18});
  let m=n,fac=[];for(let p=2;m>1;p++)while(m%p===0){fac.push(p);m/=p}
  const kind=n===1?'1 只有 1 個因數，不是質數也不是合數':fs.length===2?`${n} 是質數：只排得出一種長方形（1 × ${n}）`:`${n} 是合數：排得出 ${pr.length} 種長方形`;
  return svg(400,Math.max(...pr.map(p=>Math.min(10,120/Math.max(...p))*p[0]))+34,g)+`<p class="vbig">${kind}</p><p>因數：${fs.join('、')}（成對找：${pr.map(p=>p.join('×')).join('、')}）</p>${n>3&&fs.length>2?`<p>質因數分解：${n} ＝ ${fac.join(' × ')}</p>`:''}`})};

/* ---- 公倍數時間軸、短除法 ---- */
VZ.lcm=(el,a)=>{el.innerHTML=ctl(inp('a',a.a,'',3)+'和'+inp('b',a.b,'',3))+out;
 bind(el,()=>{const A=num(el,'a'),B=num(el,'b');if(!(A>=2&&B>=2&&A<=40&&B<=40&&Number.isInteger(A)&&Number.isInteger(B)))return bad('請輸入 2～40');const L=lcm(A,B),G=gcd(A,B),M=Math.min(L*2,Math.max(L,120)),X=v=>20+v/M*360;let g='';
  for(let v=0;v<=M;v+=A)g+=`<circle cx="${X(v)}" cy="30" r="6" fill="var(--butter)" stroke="var(--ink)"/>`;for(let v=0;v<=M;v+=B)g+=`<circle cx="${X(v)}" cy="70" r="6" fill="var(--teal-l)" stroke="var(--ink)"/>`;
  for(let v=0;v<=M;v+=L)g+=`<line x1="${X(v)}" y1="18" x2="${X(v)}" y2="82" stroke="var(--berry)" stroke-width="2"/>`+T(X(v),100,v,'text-anchor="middle" font-size="13" fill="var(--berry)"');
  g+=T(4,34,'A','font-size="12"')+T(4,74,'B','font-size="12"');
  let sd='';if(a.sd){let x=A,y=B;const rows=[];for(let p=2;p<=Math.min(x,y);)if(x%p===0&&y%p===0){rows.push([p,x,y]);x/=p;y/=p}else p++;
   sd=`<table class="sd">${rows.map(r=>`<tr><td class="l">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}<tr><td class="l"></td><td class="f">${x}</td><td class="f">${y}</td></tr></table><p>最大公因數 ＝ 左邊相乘 ＝ ${rows.map(r=>r[0]).join(' × ')||1} ＝ ${G}<br>最小公倍數 ＝ 左邊 × 最下面（L 形）＝ ${[...rows.map(r=>r[0]),x,y].join(' × ')} ＝ ${L}</p>`}
  return svg(400,110,g)+`<p class="vbig">每 ${A} 分和每 ${B} 分一班，第一次再一起發車是第 ${L} 分</p><p>一起發車要等「兩個數的倍數」碰在一起，所以是最小公倍數 ${L}，答案比 ${A}、${B} 都大。最大公因數是 ${G}，用在「平分、切成一樣大最大是多少」。</p>${sd}`})};

/* ---- 約分找最大公因數 ---- */
VZ.gcd=(el,a)=>{el.innerHTML=ctl(inp('a',a.a,'',3)+'/'+inp('b',a.b,'',3))+out;
 bind(el,()=>{const A=num(el,'a'),B=num(el,'b');if(!(A>=1&&B>=2&&A<=100&&B<=100&&Number.isInteger(A)&&Number.isInteger(B)))return bad('請輸入 100 以內的分數');const fa=[],fb=[];for(let i=1;i<=A;i++)if(A%i===0)fa.push(i);for(let i=1;i<=B;i++)if(B%i===0)fb.push(i);const G=gcd(A,B);
  const chip=(v,o)=>`<span class="fc${o.includes(v)?' cm':''}${v===G?' mx':''}">${v}</span>`;
  return`<p>${A} 的因數：${fa.map(v=>chip(v,fb)).join('')}</p><p>${B} 的因數：${fb.map(v=>chip(v,fa)).join('')}</p><p class="vbig">${F(A,B)} ＝ ${F(A/G,B/G)}（分子分母同除以 ${G}）</p><p>黃色是公因數，紅框是最大公因數 ${G}。${G>2&&A%2===0&&B%2===0?`如果只除以 2 變成 ${F(A/2,B/2)}，${A/2} 和 ${B/2} 還有公因數 ${G/2}，還沒約到最簡。`:''}一次除以最大公因數，就直接是最簡分數。</p>`})};

/* ---- 面積模型（分數、小數乘法） ---- */
VZ.area=(el,a)=>{el.innerHTML=ctl(inp('a1',a.a[0],'',2)+'/'+inp('a2',a.a[1],'',2)+'×'+inp('b1',a.b[0],'',2)+'/'+inp('b2',a.b[1],'',2))+out;
 bind(el,()=>{const n1=num(el,'a1'),d1=num(el,'a2'),n2=num(el,'b1'),d2=num(el,'b2');if(!([n1,d1,n2,d2].every(Number.isInteger)&&d1>=2&&d2>=2&&d1<=10&&d2<=10&&n1>=1&&n1<=d1&&n2>=1&&n2<=d2))return bad('請輸入分母 2～10 的真分數');
  const S=220,x0=20,y0=10;let g='';for(let i=0;i<d1;i++)for(let j=0;j<d2;j++){const c=i<n1&&j<n2?'var(--berry-l)':i<n1?'var(--butter)':j<n2?'var(--teal-l)':'var(--card)';g+=`<rect x="${x0+i*S/d1}" y="${y0+j*S/d2}" width="${S/d1}" height="${S/d2}" fill="${c}" stroke="var(--ink)" stroke-width=".7"/>`}
  g+=`<rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="none" stroke="var(--ink)" stroke-width="2"/>`+T(260,40,'黃：'+(a.dec?fmt(n1/d1):`${n1}/${d1}`),'font-size="14"')+T(260,64,'藍：'+(a.dec?fmt(n2/d2):`${n2}/${d2}`),'font-size="14"')+T(260,88,'重疊（紅）：答案','font-size="14"');
  const r=n1*n2,t=d1*d2;return svg(400,240,g)+(a.dec?`<p class="vbig">${fmt(n1/d1)} × ${fmt(n2/d2)} ＝ ${r} 格 ÷ ${t} 格 ＝ ${fmt(r/t)}</p><p>${d1===10&&d2===10?`十分之幾乘十分之幾，變成百分之幾，所以小數位數是 1 ＋ 1 ＝ 2 位。`:''}</p>`:`<p class="vbig">${F(n1,d1)} × ${F(n2,d2)} ＝ ${F(r,t)}${gcd(r,t)>1?` ＝ ${FM(r,t)}`:''}</p>`)+`<p>重疊的部分比黃色、藍色都小：乘以比 1 小的數，答案會變小。「${a.dec?fmt(n1/d1):`${n1}/${d1}`} 的 ${a.dec?fmt(n2/d2):`${n2}/${d2}`}」就是拿黃色裡的一部分。</p>`})};

/* ---- 裡面有幾個（分數除法） ---- */
VZ.howmany=(el,a)=>{el.innerHTML=ctl(inp('n',a.n,'',2)+'÷'+inp('a',a.a,'',2)+'/'+inp('b',a.b,'',2))+out;
 bind(el,()=>{const n=num(el,'n'),p=num(el,'a'),q=num(el,'b');if(!([n,p,q].every(Number.isInteger)&&n>=1&&n<=6&&q>=2&&q<=8&&p>=1&&p<q))return bad('被除數 1～6，分母 2～8 的真分數');
  const tot=n*q;let g='',idx=0;const cols=['var(--butter)','var(--teal-l)'];for(let i=0;i<n;i++)for(let j=0;j<q;j++){const grp=Math.floor(idx/p),full=(grp+1)*p<=tot;g+=`<rect x="${20+j*360/q}" y="${8+i*30}" width="${360/q}" height="22" fill="${full?cols[grp%2]:'var(--berry-l)'}" stroke="var(--ink)"/>`;if(idx%p===0&&full)g+=T(20+j*360/q+4,8+i*30+16,grp+1,'font-size="12"');idx++}
  return svg(400,n*30+12,g)+`<p class="vbig">${n} ÷ ${F(p,q)} ＝ ${FM(tot,p)}</p><p>${n} 個整條，每條切成 ${q} 份，共 ${tot} 份 ${F(1,q)}。每 ${p} 份是一個 ${F(p,q)}，數一數有 ${FM(tot,p)} 個。${tot%p?'紅色是不夠一整組的部分。':''}答案比 ${n} 還大，因為除以比 1 小的數。</p><p>所以 ${n} ÷ ${F(p,q)} ＝ ${n} × ${F(q,p)}：被除數不動，除數顛倒。</p>`})};

/* ---- 小數除法移小數點 ---- */
VZ.ddiv=(el,a)=>{el.innerHTML=ctl(inp('a',a.a,'',4)+'÷'+inp('b',a.b,'',4))+out;
 bind(el,()=>{const A=val(el,'a').trim(),B=val(el,'b').trim();if(!/^\d+(\.\d+)?$/.test(A)||!/^\d*\.\d+$/.test(B)||!(+B>0))return bad('除數請輸入小數');const k=B.split('.')[1].length,m=10**k,A2=fmt(+A*m),B2=fmt(+B*m),q=fmt(+A/ +B),w=fmt(+A/ +B2);
  return`<p class="vbig">${A} ÷ ${B} ＝ ${A2} ÷ ${B2} ＝ ${q}</p><p>除數 ${B} 有 ${k} 位小數，兩個數同時 × ${m}（小數點都往右移 ${k} 位，不夠補 0）。被除數和除數同時乘一樣的數，商不變，就像 6 ÷ 2 ＝ 60 ÷ 20。</p><p>只移除數會算成 <s>${A} ÷ ${B2} ＝ ${w}</s>。驗算：${q} × ${B} ＝ ${fmt(q*B)} ✓</p>`})};

/* ---- 線段圖 ---- */
VZ.bar=(el,a)=>{if(a.mode==='diff'){el.innerHTML=ctl(inp('big',a.big,'哥哥',3)+inp('diff',a.diff,'比弟弟多',3))+out;
  bind(el,()=>{const B=num(el,'big'),d=num(el,'diff');if(!(B>0&&d>0&&d<B))return bad('多的數要比哥哥的少');const s=330/B,sm=B-d;
   return svg(400,110,`${T(4,30,'哥哥','font-size="14"')}<rect x="50" y="14" width="${B*s}" height="24" rx="4" fill="var(--butter)" stroke="var(--ink)"/>${T(50+B*s-4,32,B,'text-anchor="end" font-size="14"')}${T(4,74,'弟弟','font-size="14"')}<rect x="50" y="58" width="${sm*s}" height="24" rx="4" fill="var(--teal-l)" stroke="var(--ink)"/><rect x="${50+sm*s}" y="58" width="${d*s}" height="24" fill="none" stroke="var(--berry)" stroke-dasharray="4 3"/>${T(50+sm*s+d*s/2,100,`多 ${d}`,'text-anchor="middle" font-size="13" fill="var(--berry)"')}`)+`<p class="vbig">弟弟 ＝ ${B} － ${d} ＝ ${sm}</p><p>題目有「多」，但多的是哥哥。畫出來就知道弟弟比較短，要用減法。看到「多」就加會算成 <s>${B+d}</s>。</p>`});return}
 el.innerHTML=ctl(inp('base',a.base,'B（基準量）',3)+'A 是 B 的'+inp('n',a.n,'',2)+'/'+inp('d',a.d,'',2))+out;
 bind(el,()=>{const B=num(el,'base'),n=num(el,'n'),d=num(el,'d');if(!(B>0&&d>=2&&d<=10&&n>=1))return bad('請輸入合理的數');const u=300/Math.max(d,n),Av=fmt(B*n/d);
  return svg(400,100,`${T(4,30,'B','font-size="15"')}${bar(40,12,u*d,26,d,d,'var(--teal-l)')}${T(48+u*d,32,B,'font-size="14"')}${T(4,76,'A','font-size="15"')}${bar(40,58,u*n,26,n,n)}${T(48+u*n,78,Av,'font-size="14"')}`)+`<p class="vbig">A ＝ B × ${F(n,d)} ＝ ${B} × ${F(n,d)} ＝ ${Av}</p><p>「A 是 B 的 ${n}/${d}」：「的」前面的 B 是基準量（當作 1，切成 ${d} 份），A 是比較量（拿 ${n} 份）。反過來，知道 A ＝ ${Av} 求 B：${Av} ÷ ${F(n,d)} ＝ ${B}。</p>`})};

/* ---- 速率換算 ---- */
VZ.spd=(el,a)=>{el.innerHTML=ctl(inp('v',a.v,'時速',3)+'公里')+out;
 bind(el,()=>{const v=num(el,'v');if(!(v>0&&v<=1200))return bad('請輸入時速');let g='';for(let i=0;i<60;i++)g+=`<rect x="${10+(i%20)*19}" y="${10+Math.floor(i/20)*26}" width="16" height="20" rx="3" fill="var(--butter)" stroke="var(--ink)" stroke-width=".6"/>`;
  return svg(400,92,g)+`<p class="vbig">時速 ${v} 公里 ＝ 分速 ${fmt(v/60)} 公里 ＝ 分速 ${fmt(v*1000/60)} 公尺</p><p>1 小時有 60 分（上面 60 格），${v} 公里平分到 60 分，每分走 ${v} ÷ 60 ＝ ${fmt(v/60)} 公里。不是除以 100：<s>${fmt(v/100)} 公里</s>。秒速再 ÷ 60 ＝ ${fmt(v*1000/3600)} 公尺。</p>`})};

/* ---- 平均速率 ---- */
VZ.avg=(el,a)=>{el.innerHTML=ctl(inp('d',a.d,'單程',3)+'公里，去'+inp('v1',a.v1,'時速',3)+'回'+inp('v2',a.v2,'時速',3))+out;
 bind(el,()=>{const d=num(el,'d'),v1=num(el,'v1'),v2=num(el,'v2');if(!(d>0&&v1>0&&v2>0))return bad('請輸入正數');const t1=d/v1,t2=d/v2,T2=t1+t2,av=2*d/T2,s=330/T2;
  return svg(400,70,`<rect x="40" y="16" width="${t1*s}" height="26" fill="var(--butter)" stroke="var(--ink)"/><rect x="${40+t1*s}" y="16" width="${t2*s}" height="26" fill="var(--teal-l)" stroke="var(--ink)"/>${T(40+t1*s/2,34,`去 ${fmt(t1)} 時`,'text-anchor="middle" font-size="13"')}${T(40+t1*s+t2*s/2,34,`回 ${fmt(t2)} 時`,'text-anchor="middle" font-size="13"')}${T(4,34,'時間','font-size="13"')}`)+`<p class="vbig">平均時速 ＝ ${2*d} ÷ ${fmt(T2)} ＝ ${fmt(av)} 公里</p><p>去和回的路一樣長，但慢的那段花比較久（長條比較長），所以平均會比較靠近慢的速率。直接平均 <s>(${v1} ＋ ${v2}) ÷ 2 ＝ ${fmt((v1+v2)/2)}</s> 是錯的。</p>`})};

/* ---- 圓 ---- */
VZ.circ=(el,a)=>{let dia=!!a.dia;el.innerHTML=ctl(`<label class="vl">題目給<select class="vi" data-k="m"><option value="r"${dia?'':' selected'}>半徑</option><option value="d"${dia?' selected':''}>直徑</option></select></label>`+inp('v',a.dia?a.r*2:a.r,'',3)+'公分')+out;
 bind(el,()=>{const m=val(el,'m'),v=num(el,'v');if(!(v>0&&v<=100))return bad('請輸入正數');const r=m==='r'?v:v/2,d=r*2,C=d*3.14,A=r*r*3.14,R=70,cx=95,cy=85;
  const g=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/><rect x="${cx}" y="${cy-R}" width="${R}" height="${R}" fill="var(--butter)" opacity=".8" stroke="var(--ink)"/><line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="var(--berry)" stroke-width="3"/>${T(cx-R/2,cy+18,`半徑 ${fmt(r)}`,'text-anchor="middle" font-size="13" fill="var(--berry)"')}${T(cx+R/2,cy-R/2+4,'r×r','text-anchor="middle" font-size="13"')}
   <line x1="190" y1="60" x2="390" y2="60" stroke="var(--teal)" stroke-width="4"/>${T(190,48,'圓周拉直：直徑的 3.14 倍','font-size="13" fill="var(--teal)"')}<rect x="190" y="90" width="${R*.6}" height="${R*.6}" fill="var(--butter)" stroke="var(--ink)"/><rect x="${196+R*.6}" y="90" width="${R*.6}" height="${R*.6}" fill="var(--butter)" stroke="var(--ink)"/><rect x="${202+R*1.2}" y="90" width="${R*.6}" height="${R*.6}" fill="var(--butter)" stroke="var(--ink)"/><rect x="${208+R*1.8}" y="90" width="${R*.6*.14}" height="${R*.6}" fill="var(--butter)" stroke="var(--ink)"/>${T(190,150,'面積：約 3.14 個 r×r','font-size="13"')}`;
  return svg(400,170,g)+`<p class="vbig">直徑 ${fmt(d)}，周長 ＝ ${fmt(d)} × 3.14 ＝ ${fmt(C)} 公分</p><p class="vbig">面積 ＝ ${fmt(r)} × ${fmt(r)} × 3.14 ＝ ${fmt(A)} 平方公分</p><p>周長是長度，只乘一次；面積是「半徑 × 半徑」那個正方形（黃色）的 3.14 倍。${m==='d'?`題目給的是直徑 ${v}，算面積要先 ÷ 2 變半徑，不是 <s>${v} × ${v} × 3.14</s>。`:`別把周長公式 <s>${r} × 2 × 3.14</s> 當成面積。`}</p>`})};

/* ---- 比例尺 ---- */
VZ.map=(el,a)=>{el.innerHTML=ctl('比例尺 1：'+inp('s',a.s,'',5)+'，圖上'+inp('c',a.c,'',3)+'公分')+out;
 bind(el,()=>{const s=num(el,'s'),c=num(el,'c');if(!(s>0&&c>0))return bad('請輸入正數');const cm=c*s;
  return`<ol class="esteps"><li>圖上 1 公分 ＝ 實際 ${s} 公分</li><li>實際 ＝ ${c} × ${s} ＝ <b>${fmt(cm)} 公分</b></li><li>＝ ${fmt(cm)} ÷ 100 ＝ <b>${fmt(cm/100)} 公尺</b></li><li>＝ ${fmt(cm/100)} ÷ 1000 ＝ <b>${fmt(cm/100000)} 公里</b></li></ol><p>比例尺的兩邊單位一樣（都是公分），算出來的是「公分」，要再換成公尺或公里。直接寫成 <s>${fmt(cm)} 公尺</s> 就差了 100 倍。</p>`})};

/* ---- 天平 ---- */
VZ.bal=(el,a)=>{let taken=false;el.innerHTML=ctl(`x ＋ ${inp('a',a.a,'',2)} ＝ ${inp('c',a.c,'',2)}<button class="vb pri" data-t>兩邊同時拿走</button>`)+out;
 const run=bind(el,()=>{const A=num(el,'a'),C=num(el,'c');if(!(Number.isInteger(A)&&Number.isInteger(C)&&A>=1&&C>A&&C<=20))return bad('請輸入整數，右邊要比左邊的數大，20 以內');
  const blk=(x0,n,col,skip)=>{let s='';for(let i=0;i<n;i++)s+=`<rect x="${x0+(i%5)*16}" y="${120-Math.floor(i/5)*16}" width="14" height="14" rx="2" fill="${i<skip?'none':col}" stroke="${i<skip?'var(--line)':'var(--ink)'}" stroke-dasharray="${i<skip?'3 2':'0'}"/>`;return s};
  const g=`<polygon points="200,60 185,160 215,160" fill="var(--line)"/><line x1="40" y1="64" x2="360" y2="64" stroke="var(--ink)" stroke-width="4"/><line x1="40" y1="64" x2="40" y2="136" stroke="var(--ink)"/><line x1="360" y1="64" x2="360" y2="136" stroke="var(--ink)"/><rect x="20" y="104" width="34" height="30" rx="4" fill="var(--berry)"/>${T(37,124,'x','text-anchor="middle" font-size="16" fill="#fff"')}${blk(62,A,'var(--butter)',taken?A:0)}${blk(280,C,'var(--teal-l)',taken?A:0)}`;
  return svg(400,170,g)+(taken?`<p class="vbig">x ＝ ${C} － ${A} ＝ ${C-A}</p><p>兩邊同時拿走 ${A} 個，天平還是平的。所以「加 ${A}」要用「減 ${A}」還原。如果算成 <s>x ＝ ${C} ＋ ${A} ＝ ${C+A}</s>，放回天平：${C+A} ＋ ${A} ＝ ${C+2*A}，不等於 ${C}。</p>`:`<p>天平兩邊一樣重。左邊有 x 和 ${A} 個方塊，右邊有 ${C} 個方塊。按「兩邊同時拿走」看看 x 是多少。</p>`)});
 el.querySelector('[data-t]').onclick=e=>{taken=!taken;e.target.textContent=taken?'放回去':'兩邊同時拿走';run()}};

window.VZ=VZ;window.MU={gcd,lcm,simp,F,FM,fmt};
}
