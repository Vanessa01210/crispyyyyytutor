/* 數學島 一鍵出題：GEN[key]() → {q, kind:'multi'|'frac'|'mc', fields|ans|opts, steps} */
{
const{gcd,lcm,simp,F,FM,fmt}=window.MU;
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=R(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const mixed=(n,d)=>{const[a,b]=simp(n,d);return{w:Math.floor(a/b),n:a%b,d:b}};
const showM=m=>m.n===0?`${m.w}`:F(m.n,m.d,m.w||'');
const pf=(lo,hi)=>{const d=R(lo,hi);return simp(R(1,d-1),d)};
const one=(ans,u='',l='答案')=>({kind:'multi',fields:[{l,u,ans}]});
const mc=(q,right,wrongs,steps)=>{const o=shuf([right,...wrongs.filter((w,i,a)=>w!==right&&a.indexOf(w)===i).slice(0,3)]);return{q,kind:'mc',opts:o,a:o.indexOf(right),steps}};
const evS=s=>window.evalSteps(s);
const G={};

/* 位值 */
const zeroNum=L=>{let s;do{s=String(R(1,9));for(let i=1;i<L;i++)s+=Math.random()<.5?'0':R(1,9)}while(!/[1-9]0+[1-9]/.test(s));return s};
const pvQ=L=>{const n=zeroNum(L),z=n.indexOf('0'),j=n.slice(z).search(/[1-9]/)+z,sw=[...n];[sw[z],sw[j]]=[sw[j],sw[z]];const w=[n.slice(0,z)+n.slice(z+1),n.slice(0,z)+'0'+n.slice(z),sw.join(''),String(+n+10**(L-2))].filter(x=>x!==n);
 return mc(`「${window.readNum(n)}」寫成數字是哪一個？`,n,w,[`四位一節：${n.replace(/\B(?=(\d{4})+(?!\d))/g,'｜')}`,`讀出來的「零」代表中間有 0，每一位都要寫數字，空位補 0`])};
G.pv3=()=>pvQ(4);G.pv4=()=>pvQ(R(7,9));

/* 加減乘除 */
G.addsub=()=>{if(Math.random()<.6){const a=R(2,9)*1000+pick([0,0,R(1,9)*100])+pick([0,R(1,9)*10])+R(0,9),b=R(1000,a-1);return{q:`${a} － ${b} ＝ ？`,...one(a-b),steps:[`從個位開始減，不夠減就向前一位借 1`,`遇到 0 沒得借，要繼續往前借，中間的 0 變成 9`,`${a} － ${b} ＝ ${a-b}，驗算：${a-b} ＋ ${b} ＝ ${a}`]}}
 const a=R(1000,8999),b=R(100,9999-a);return{q:`${a} ＋ ${b} ＝ ？`,...one(a+b),steps:[`從個位開始加，滿 10 進 1`,`進位的 1 要加到下一位`,`${a} ＋ ${b} ＝ ${a+b}`]}};
G.mul1=()=>{const a=Math.random()<.4?R(1,9)*100+R(1,9):R(12,98),b=R(3,9);return{q:`${a} × ${b} ＝ ？`,...one(a*b),steps:[`從個位乘起：先乘，再加進位`,...[...String(a)].reverse().map((d,i)=>`${['個','十','百'][i]}位：${d} × ${b} ＝ ${d*b}`),`${a} × ${b} ＝ ${a*b}${String(a).includes('0')?'（中間 0 那一位不能漏）':''}`]}};
G.mul2=()=>{const a=R(102,899),b=R(12,89);const t=Math.floor(b/10),u=b%10;return{q:`${a} × ${b} ＝ ？`,...one(a*b),steps:[`${a} × ${u} ＝ ${a*u}`,`${a} × ${t*10} ＝ ${a*t*10}（乘十位的數，往左一位）`,`${a*u} ＋ ${a*t*10} ＝ ${a*b}`]}};
const divQ=(b,q)=>{const r=R(0,b-1),a=q*b+r;return{q:`${a} ÷ ${b} ＝ ？`,kind:'multi',fields:[{l:'商',u:'',ans:q},{l:'餘',u:'',ans:r}],steps:[`從最高位開始除，不夠除的那一位商要寫 0`,`商 ${q}，餘 ${r}`,`驗算：${b} × ${q}${r?` ＋ ${r}`:''} ＝ ${a}，餘數 ${r} 比 ${b} 小`]}};
G.div1=()=>divQ(R(3,9),Math.random()<.6?R(1,9)*100+R(1,9):R(12,99));
G.div2=()=>divQ(R(12,48),Math.random()<.5?R(1,9)*100+R(1,9):R(12,99));

/* 時間、單位 */
G.time3=()=>{const h1=R(3,11),m1=R(0,40),h2=R(1,h1-1),m2=R(m1+1,59);const M=m1+60,H=h1-1;return{q:`${h1} 時 ${m1} 分 － ${h2} 時 ${m2} 分 ＝ ？`,kind:'multi',fields:[{l:'',u:'時',ans:H-h2},{l:'',u:'分',ans:M-m2}],steps:[`${m1} 分不夠減 ${m2} 分，向時借 1 小時 ＝ 60 分`,`${h1} 時 ${m1} 分 ＝ ${H} 時 ${M} 分`,`${H} － ${h2} ＝ ${H-h2} 時，${M} － ${m2} ＝ ${M-m2} 分`]}};
G.time4=()=>{const a=R(7,11),b=R(5,9);return{q:`晚上 ${a} 時到隔天早上 ${b} 時，經過幾小時？`,...one(12-a+b,'小時'),steps:[`分兩段：晚上 ${a} 時到午夜 12 時是 ${12-a} 小時`,`午夜 12 時（0 時）到早上 ${b} 時是 ${b} 小時`,`${12-a} ＋ ${b} ＝ ${12-a+b} 小時`]}};
G.unit3=()=>{const t=R(0,2);if(t===0){const L=R(1,9),m=pick([R(1,9)*10,R(1,99),R(100,999)]);return{q:`${L} 公升 ${m} 毫升 ＝ ＿ 毫升`,...one(L*1000+m,'毫升'),steps:[`1 公升 ＝ 1000 毫升（不是 100）`,`${L} 公升 ＝ ${L*1000} 毫升，${L*1000} ＋ ${m} ＝ ${L*1000+m}`]}}
 if(t===1){const g=R(1,9)*1000+pick([R(1,9)*10,R(100,999),R(1,9)]);return{q:`${g} 公克 ＝ ＿ 公斤 ＿ 公克`,kind:'multi',fields:[{l:'',u:'公斤',ans:Math.floor(g/1000)},{l:'',u:'公克',ans:g%1000}],steps:[`1000 公克 ＝ 1 公斤`,`${g} 公克 ＝ ${Math.floor(g/1000)} 公斤 ${g%1000} 公克`]}}
 const c=R(1,20),m=R(1,9);return{q:`${c} 公分 ${m} 公釐 ＝ ＿ 公釐`,...one(c*10+m,'公釐'),steps:[`1 公分 ＝ 10 公釐`,`${c} 公分 ＝ ${c*10} 公釐，再加 ${m} ＝ ${c*10+m}`]}};

/* 分數 */
G.frac3=()=>{const t=R(0,2);if(t===0){const d=R(4,12),a=R(1,d-2),b=R(1,d-1-a),sub=Math.random()<.4;const[x,y]=sub?[a+b,b]:[a,b];const r=sub?x-y:x+y;
  return{q:`${F(x,d)} ${sub?'－':'＋'} ${F(y,d)} ＝ ？`,kind:'frac',ans:{w:0,n:r,d},nosimp:1,steps:[`同分母：分母不變，分子${sub?'相減':'相加'}`,`${x} ${sub?'－':'＋'} ${y} ＝ ${r}，答案 ${F(r,d)}`]}}
 if(t===1){const[a,b]=shuf([2,3,4,5,6,8,10]).slice(0,2);return mc(`${F(1,a)} 和 ${F(1,b)}，哪一個比較大？`,F(1,Math.min(a,b)),[F(1,Math.max(a,b)),'一樣大'],[`同一個東西分成越多份，每一份越小`,`所以 ${F(1,Math.min(a,b))} 比較大`])}
 const b=R(2,6),k=R(2,6),a=R(1,b-1);return{q:`${b*k} 顆糖的 ${F(a,b)} 是幾顆？`,...one(k*a,'顆'),steps:[`先把 ${b*k} 顆平分成 ${b} 份，每份 ${k} 顆`,`拿 ${a} 份：${k} × ${a} ＝ ${k*a} 顆`]}};
G.dec3=()=>{const t=R(0,1);if(t){const c=R(1,15),m=R(1,9);return{q:`${c} 公分 ${m} 公釐 ＝ ＿ 公分`,...one(+`${c}.${m}`,'公分'),steps:[`1 公釐 ＝ 0.1 公分`,`${m} 公釐 ＝ ${fmt(m/10)} 公分，所以是 ${c}.${m} 公分`]}}
 const k=R(11,59);return{q:`${k} 個 0.1 是多少？`,...one(k/10),steps:[`10 個 0.1 是 1`,`${k} 個 0.1 ＝ ${fmt(k/10)}`]}};
G.improper=()=>{const d=R(2,9),n=R(1,d-1),w=R(1,5);if(Math.random()<.5)return{q:`把 ${F(n,d,w)} 化成假分數`,kind:'frac',ans:{w:0,n:w*d+n,d},form:'improper',steps:[`${w} 個整數 ＝ ${w} × ${d} ＝ ${w*d} 個 ${F(1,d)}`,`再加 ${n} 個：${w*d+n}，答案 ${F(w*d+n,d)}`]};
 return{q:`把 ${F(w*d+n,d)} 化成帶分數`,kind:'frac',ans:{w,n,d},form:'mixed',steps:[`${w*d+n} ÷ ${d} ＝ ${w} 餘 ${n}`,`商是整數，餘數是分子：${F(n,d,w)}`]}};
G.fracw=()=>{const d=R(3,9),n=R(1,d-1),k=R(2,6),m=mixed(n*k,d);return{q:`${F(n,d)} × ${k} ＝ ？`,kind:'frac',ans:m,steps:[`${k} 個 ${F(n,d)} ＝ ${n*k} 個 ${F(1,d)}，分母不變`,`${F(n*k,d)} ＝ ${showM(m)}`]}};
G.reduce=()=>{let a,b;do{[a,b]=pf(3,10)}while(b<3);const k=R(2,6);return{q:`把 ${F(a*k,b*k)} 化成最簡分數`,kind:'frac',ans:{w:0,n:a,d:b},steps:[`${a*k} 和 ${b*k} 的最大公因數是 ${k}`,`分子分母同除以 ${k}：${F(a,b)}`]}};
const addsubF=sub=>{let a,b,c,d;do{[a,b]=pf(2,10);[c,d]=pf(2,10)}while(b===d||lcm(b,d)>48||a*d===c*b);if(sub&&a*d<c*b)[a,b,c,d]=[c,d,a,b];const L=lcm(b,d),x=a*L/b,y=c*L/d,m=mixed(sub?x-y:x+y,L);
 return{q:`${F(a,b)} ${sub?'－':'＋'} ${F(c,d)} ＝ ？`,kind:'frac',ans:m,steps:[`分母 ${b} 和 ${d} 的最小公倍數是 ${L}，先通分`,`${F(a,b)} ＝ ${F(x,L)}，${F(c,d)} ＝ ${F(y,L)}（分子也要乘）`,`分子${sub?'相減':'相加'}：${F(sub?x-y:x+y,L)}`,`約分：${showM(m)}`]}};
G.add=()=>addsubF(0);G.sub=()=>addsubF(1);
G.borrow=()=>{const b=R(3,10),a=R(1,b-2),c=R(a+1,b-1),W=R(2,6),V=R(1,W-1),[n,d]=simp(a+b-c,b),w=W-1-V;return{q:`${F(a,b,W)} － ${F(c,b,V)} ＝ ？`,kind:'frac',ans:{w,n,d},steps:[`${F(a,b)} 不夠減 ${F(c,b)}，從整數借 1 ＝ ${F(b,b)}`,`${F(a,b,W)} ＝ ${F(a+b,b,W-1)}`,`整數 ${W-1} － ${V} ＝ ${w}，分數 ${F(a+b,b)} － ${F(c,b)} ＝ ${F(a+b-c,b)}`,`答案 ${showM({w,n,d})}`]}};
G.mul=()=>{const[a,b]=pf(2,9),[c,d]=pf(2,9),m=mixed(a*c,b*d);return{q:`${F(a,b)} × ${F(c,d)} ＝ ？`,kind:'frac',ans:m,steps:[`分子乘分子、分母乘分母：${F(a*c,b*d)}`,`約分：${showM(m)}（也可以先交叉約分）`]}};
G.fracof=()=>{const b=R(3,8),a=R(1,b-1),k=R(2,9);return{q:`${b*k} 公尺的 ${F(a,b)} 是幾公尺？`,...one(a*k,'公尺'),steps:[`「的」就是乘：${b*k} × ${F(a,b)}`,`${b*k} ÷ ${b} × ${a} ＝ ${a*k}`]}};
G.fracdiv=()=>{if(Math.random()<.4){const n=R(2,6),[a,b]=pf(2,8),m=mixed(n*b,a);return{q:`${n} ÷ ${F(a,b)} ＝ ？`,kind:'frac',ans:m,steps:[`除以一個分數 ＝ 乘以它的倒數`,`${n} × ${F(b,a)} ＝ ${F(n*b,a)} ＝ ${showM(m)}`,`想想看：${n} 裡面有幾個 ${F(a,b)}？答案比 ${n} 大`]}}
 const[a,b]=pf(2,9),[c,d]=pf(2,9),m=mixed(a*d,b*c);return{q:`${F(a,b)} ÷ ${F(c,d)} ＝ ？`,kind:'frac',ans:m,steps:[`被除數不動，除數顛倒：${F(a,b)} × ${F(d,c)}`,`＝ ${F(a*d,b*c)} ＝ ${showM(m)}`]}};

/* 小數 */
G.deccmp=()=>{const a=R(1,9),x=`0.${a}`,y=Math.random()<.6?`0.${a-1}${R(1,9)}`:`0.${a}${R(1,9)}`,X=+x,Y=+y;return mc(`${x} 和 ${y}，哪一個比較大？`,X>Y?x:y,[X>Y?y:x,'一樣大'],[`補 0 讓位數一樣：${x.padEnd(4,'0')} 和 ${y}`,`比較 ${Math.round(X*100)} 格和 ${Math.round(Y*100)} 格，${X>Y?x:y} 比較大`])};
G.decadd=()=>{const a=R(11,99)/10,b=R(101,999)/100,sub=Math.random()<.4&&a>b;const r=sub?a-b:a+b;return{q:`${fmt(a)} ${sub?'－':'＋'} ${fmt(b)} ＝ ？`,...one(+r.toFixed(2)),steps:[`小數點對齊：${a.toFixed(2)} 和 ${b.toFixed(2)}（補 0）`,`${a.toFixed(2)} ${sub?'－':'＋'} ${b.toFixed(2)} ＝ ${r.toFixed(2)}`]}};
G.decmulw=()=>{const a=R(11,99)/10,k=R(2,9);return{q:`${fmt(a)} × ${k} ＝ ？`,...one(+(a*k).toFixed(1)),steps:[`先當整數算：${Math.round(a*10)} × ${k} ＝ ${Math.round(a*10)*k}`,`${fmt(a)} 有 1 位小數，答案也點 1 位：${fmt(a*k)}`,`估算：${Math.round(a)} × ${k} 大約 ${Math.round(a)*k}`]}};
G.decmul=()=>{const a=R(2,9)/10,b=Math.random()<.5?R(2,9)/10:R(11,49)/10,p=+(a*b).toFixed(3),k=(fmt(a).split('.')[1]||'').length+(fmt(b).split('.')[1]||'').length;return{q:`${fmt(a)} × ${fmt(b)} ＝ ？`,...one(p),steps:[`先當整數乘：${fmt(a).replace('0.','').replace('.','')} × ${fmt(b).replace('.','')}`,`小數位數 ${(fmt(a).split('.')[1]||'').length} ＋ ${(fmt(b).split('.')[1]||'').length} ＝ ${k} 位`,`答案 ${fmt(p)}，比 ${fmt(b)} 小（乘以比 1 小的數）`]}};
G.decdivw=()=>{const q=R(11,99)/10,b=R(2,9),a=+(q*b).toFixed(1);return{q:`${fmt(a)} ÷ ${b} ＝ ？`,...one(q),steps:[`像整數一樣除`,`商的小數點和被除數的小數點對齊`,`${fmt(a)} ÷ ${b} ＝ ${fmt(q)}，驗算 ${fmt(q)} × ${b} ＝ ${fmt(a)}`]}};
G.decdiv=()=>{const b=pick([R(2,9)/10,R(11,99)/100]),q=Math.random()<.6?R(3,40):R(11,99)/10,a=+(b*q).toFixed(3),k=(fmt(b).split('.')[1]||'').length,m=10**k;return{q:`${fmt(a)} ÷ ${fmt(b)} ＝ ？`,...one(q),steps:[`除數 ${fmt(b)} 有 ${k} 位小數，兩個數同時 × ${m}`,`${fmt(a)} ÷ ${fmt(b)} ＝ ${fmt(a*m)} ÷ ${fmt(b*m)}`,`＝ ${fmt(q)}`]}};

/* 概數、四則 */
G.round=()=>{const p=pick([100,1000,10000]),nm={100:'百',1000:'千',10000:'萬'}[p];let n=R(p*3,p*99);if(Math.random()<.5){n=(Math.floor(n/(p*10))*10+9)*p+R(p/2,p-1)}const r=Math.round(n/p)*p;return{q:`${n} 用四捨五入法取到${nm}位，約是多少？`,...one(r),steps:[`看${nm}位的下一位：${Math.floor(n%p/(p/10))}`,`${Math.floor(n%p/(p/10))>=5?'5 以上進位':'4 以下捨去'}${String(Math.floor(n/p)).endsWith('9')&&r>n?'，9 進位變 10 要再往前進':''}`,`答案 ${r}`]}};
const exprQ=s=>{const r=evS(s),v=r.v;const steps=r.lines.map((l,i)=>(i?'＝ ':'')+l);let dd=v.d;while(dd%2===0)dd/=2;while(dd%5===0)dd/=5;if(v.d===1||(r.dec&&dd===1))return{q:`${r.lines[0].replace(/<\/?mark>/g,'')} ＝ ？`,...one(v.d===1?v.n:+(v.n/v.d).toFixed(6)),steps};return{q:`${r.lines[0].replace(/<\/?mark>/g,'')} ＝ ？`,kind:'frac',ans:mixed(v.n,v.d),steps}};
G.order4=()=>{let s;do{const a=R(2,9),b=R(2,9),c=R(2,9);s=pick([`${a*b+R(1,40)}-${a}×${b}`,`${R(2,40)}+${a*b}÷${a}`,`(${a+b+R(1,9)}-${b})×${c}`,`${a}×(${b}+${c})`,`${R(60,99)}-(${a*3}+${b*2})`])}while(evS(s).v.n<0);return exprQ(s)};
G.order5=()=>{const t=R(0,5);
 if(t===0){const b=R(2,9),q=R(2,9),a=R(2,9);return exprQ(`${a}×${b*q}÷${b}`)}
 if(t===1){const b=R(2,6),c=R(2,5),q=R(2,9);return exprQ(`${b*c*q}÷${b}÷${c}`)}
 if(t===2){const a=R(80,99),b=R(10,30),c=R(5,20);return exprQ(`${a}-(${b}+${c})`)}
 if(t===3){const a=pick([25,125,36,48,75]),b=R(11,89);return exprQ(`${a}×${b}+${a}×${100-b}`)}
 if(t===4){const n1=pick([20,25,30]),n2=pick([10,20,25]),a1=R(70,90),M=R(70,90);const tot=M*(n1+n2)-a1*n1;if(tot%n2){return G.order5()}const a2=tot/n2;if(a2<50||a2>100)return G.order5();return{q:`甲班 ${n1} 人平均 ${a1} 分，乙班 ${n2} 人平均 ${a2} 分，兩班合起來的平均是幾分？`,...one(M,'分'),steps:[`甲班總分 ${n1} × ${a1} ＝ ${n1*a1}，乙班總分 ${n2} × ${a2} ＝ ${n2*a2}`,`兩班總分 ${n1*a1+n2*a2}，總人數 ${n1+n2}`,`平均 ＝ ${n1*a1+n2*a2} ÷ ${n1+n2} ＝ ${M}（不能直接把兩個平均再平均）`]}}
 const p1=R(10,25),k1=R(2,5),p2=R(20,45),k2=R(1,3),pay=Math.ceil((p1*k1+p2*k2+1)/100)*100;return{q:`買 ${k1} 枝 ${p1} 元的筆和 ${k2} 本 ${p2} 元的筆記本，付 ${pay} 元，應找回多少元？`,...one(pay-p1*k1-p2*k2,'元'),steps:[`併式：${pay} －（${p1} × ${k1} ＋ ${p2} × ${k2}）`,`括號裡：${p1*k1} ＋ ${p2*k2} ＝ ${p1*k1+p2*k2}`,`${pay} － ${p1*k1+p2*k2} ＝ ${pay-p1*k1-p2*k2}`]}};
G.order6=()=>{const t=R(0,2);if(t===0){const[x,y]=pf(2,6),[p,q]=pf(2,6);return exprQ(`${x}/${y}+${p}/${q}×${R(2,4)}`)}
 if(t===1){const[p,q]=pick([[5,8],[3,4],[2,5],[1,4]]);const a=R(11,29)/10,b=R(11,29)/10;return exprQ(`(${fmt(a)}+${fmt(b)})×${p}/${q}`)}
 const[x,y]=pf(2,6),[p,q]=pf(2,6);return exprQ(`${x}/${y}×(${p}/${q}+1)`)};

/* 角度、圖形、面積體積 */
G.angle4=()=>{let d;do{d=R(2,34)*5}while(d===90);return mc(`一個${d<90?'銳角':'鈍角'}，量角器的兩圈分別讀到 ${Math.min(d,180-d)} 和 ${Math.max(d,180-d)}，這個角是幾度？`,`${d} 度`,[`${180-d} 度`,'90 度',`${d+10} 度`],[`${d<90?'銳角比 90 度小':'鈍角比 90 度大'}`,`所以是 ${d} 度`])};
G.area4=()=>{if(Math.random()<.5){const m=R(2,9);return{q:`${m} 平方公尺 ＝ ＿ 平方公分`,...one(m*10000,'平方公分'),steps:[`1 平方公尺 ＝ 100 公分 × 100 公分 ＝ 10000 平方公分`,`${m} × 10000 ＝ ${m*10000}`]}}
 const a=R(3,15),b=R(3,15),c=R(1,a-1),d=R(1,b-1);return{q:`長 ${a} 公分、寬 ${b} 公分的長方形，挖掉一個長 ${c} 公分、寬 ${d} 公分的長方形，剩下的面積是多少？`,...one(a*b-c*d,'平方公分'),steps:[`大長方形：${a} × ${b} ＝ ${a*b}`,`挖掉：${c} × ${d} ＝ ${c*d}`,`${a*b} － ${c*d} ＝ ${a*b-c*d}`]}};
G.area5=()=>{const t=R(0,2),b=R(4,12),h=R(3,9);if(t===0)return{q:`三角形的底 ${b} 公分、高 ${h} 公分，面積是多少？`,...one(b*h/2,'平方公分'),steps:[`三角形 ＝ 底 × 高 ÷ 2`,`${b} × ${h} ÷ 2 ＝ ${fmt(b*h/2)}`]};
 if(t===1){const s=h+R(1,3);return{q:`平行四邊形的底 ${b} 公分、高 ${h} 公分、斜邊 ${s} 公分，面積是多少？`,...one(b*h,'平方公分'),steps:[`面積 ＝ 底 × 高，斜邊用不到`,`${b} × ${h} ＝ ${b*h}`]}}
 const u=R(2,b-1);return{q:`梯形的上底 ${u} 公分、下底 ${b} 公分、高 ${h} 公分，面積是多少？`,...one((u+b)*h/2,'平方公分'),steps:[`（上底 ＋ 下底）× 高 ÷ 2`,`（${u} ＋ ${b}）× ${h} ÷ 2 ＝ ${fmt((u+b)*h/2)}`]}};
G.vol=()=>{const t=R(0,2);if(t===0){const a=R(2,12),b=R(2,12),c=R(2,12);return{q:`長 ${a}、寬 ${b}、高 ${c} 公分的長方體，體積是多少？`,...one(a*b*c,'立方公分'),steps:[`長 × 寬 × 高`,`${a} × ${b} × ${c} ＝ ${a*b*c}`]}}
 if(t===1){const m=R(2,9);return{q:`${m} 立方公尺 ＝ ＿ 立方公分`,...one(m*1e6,'立方公分'),steps:[`1 立方公尺 ＝ 100 × 100 × 100 ＝ 1000000 立方公分`,`${m} × 1000000 ＝ ${m*1e6}`]}}
 const L=R(2,9);return{q:`${L} 公升 ＝ ＿ 立方公分`,...one(L*1000,'立方公分'),steps:[`1 公升 ＝ 1000 立方公分（＝ 1000 毫升）`,`${L} × 1000 ＝ ${L*1000}`]}};
G.circle=()=>{const t=R(0,3),r=R(2,10);if(t===0)return{q:`半徑 ${r} 公分的圓，周長是多少？`,...one(+(r*2*3.14).toFixed(2),'公分'),steps:[`周長 ＝ 直徑 × 3.14`,`${r*2} × 3.14 ＝ ${fmt(r*2*3.14)}`]};
 if(t===1)return{q:`半徑 ${r} 公分的圓，面積是多少？`,...one(+(r*r*3.14).toFixed(2),'平方公分'),steps:[`面積 ＝ 半徑 × 半徑 × 3.14`,`${r} × ${r} × 3.14 ＝ ${fmt(r*r*3.14)}`]};
 if(t===2)return{q:`直徑 ${r*2} 公分的圓，面積是多少？`,...one(+(r*r*3.14).toFixed(2),'平方公分'),steps:[`先把直徑換成半徑：${r*2} ÷ 2 ＝ ${r}`,`${r} × ${r} × 3.14 ＝ ${fmt(r*r*3.14)}`]};
 return{q:`直徑 ${r*2} 公分的半圓，周長是多少？`,...one(+(r*2*3.14/2+r*2).toFixed(2),'公分'),steps:[`弧長 ＝ ${r*2} × 3.14 ÷ 2 ＝ ${fmt(r*3.14)}`,`別忘了加直徑那條邊：${fmt(r*3.14)} ＋ ${r*2} ＝ ${fmt(r*3.14+r*2)}`]}};

/* 因數倍數 */
G.prime=()=>{const P=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47],C=[1,9,15,21,25,27,33,35,39,45,49,51,57];const p=pick(P);return mc('下面哪一個是質數？',`${p}`,shuf(C).slice(0,3).map(String),[`質數只有 1 和自己兩個因數`,`${p} 只有 1 和 ${p}；1 不是質數，9、15、21 這些奇數都還有別的因數`])};
G.gl5=()=>{const k=R(2,6),a=k*R(2,5);let b;do{b=k*R(2,6)}while(b===a);if(Math.random()<.5)return{q:`甲公車每 ${a} 分一班，乙公車每 ${b} 分一班，兩車同時發車後，至少再過幾分會再一起發車？`,...one(lcm(a,b),'分'),steps:[`再一起發車：要找兩個數的公倍數，答案比 ${a}、${b} 大`,`最小公倍數是 ${lcm(a,b)}`]};
 return{q:`${a} 公分和 ${b} 公分的兩條緞帶，要剪成一樣長、沒有剩下的小段，每段最長幾公分？`,...one(gcd(a,b),'公分'),steps:[`剪成一樣長、沒有剩：要找公因數，答案比 ${a}、${b} 小`,`最大公因數是 ${gcd(a,b)}`]}};
G.sd=()=>{const k=R(2,8),a=k*R(2,7);let b;do{b=k*R(2,7)}while(b===a);return{q:`用短除法求 ${a} 和 ${b} 的最大公因數和最小公倍數`,kind:'multi',fields:[{l:'最大公因數',u:'',ans:gcd(a,b)},{l:'最小公倍數',u:'',ans:lcm(a,b)}],steps:[`一直用兩個數的公因數去除，除到沒有公因數`,`最大公因數 ＝ 左邊相乘 ＝ ${gcd(a,b)}`,`最小公倍數 ＝ 左邊 × 最下面 ＝ ${gcd(a,b)} × ${a/gcd(a,b)} × ${b/gcd(a,b)} ＝ ${lcm(a,b)}`]}};

/* 百分率、比、速率、比例尺、未知數、間隔 */
G.pct=()=>{const t=R(0,2);if(t===0){const p=R(1,99);return{q:`${fmt(p/100)} ＝ ＿ ％`,...one(p,'％'),steps:[`百分率就是「分母 100」`,`${fmt(p/100)} ＝ ${p} 個 0.01 ＝ ${p}％`]}}
 if(t===1){const[n,d]=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,10],[7,10],[3,20],[9,25]]);return{q:`${F(n,d)} ＝ ＿ ％`,...one(n*100/d,'％'),steps:[`擴分成分母 100：${F(n*100/d,100)}`,`所以是 ${n*100/d}％`]}}
 const P=R(2,9)*100,z=R(5,9);return{q:`原價 ${P} 元的商品打 ${z} 折，要付多少元？`,...one(P*z/10,'元'),steps:[`打 ${z} 折 ＝ 付原價的 ${z*10}％`,`${P} × ${fmt(z/10)} ＝ ${P*z/10} 元（便宜的是 ${100-z*10}％）`]}};
G.ratio=()=>{if(Math.random()<.5){const g=R(1,6),a=g*R(1,9),b=g*R(1,9);return{q:`女生 ${a} 人、男生 ${b} 人，「女生和男生的比」的比值是多少？`,kind:'frac',ans:mixed(a,b),steps:[`女生在前：${a}：${b}`,`比值 ＝ ${a} ÷ ${b} ＝ ${FM(a,b)}`]}}
 const d=R(3,8),n=R(1,d-1),k=R(2,9);return{q:`A 是 B 的 ${F(n,d)}，A 是 ${n*k}，B 是多少？`,...one(d*k),steps:[`B 是基準量（當作 1），A ＝ B × ${F(n,d)}`,`B ＝ ${n*k} ÷ ${F(n,d)} ＝ ${n*k} × ${F(d,n)} ＝ ${d*k}`]}};
G.speed=()=>{const t=R(0,2);if(t===0){const v=R(1,12)*6;return{q:`時速 ${v} 公里 ＝ 分速 ＿ 公尺`,...one(v*1000/60,'公尺'),steps:[`時速 ${v} 公里 ＝ ${v*1000} 公尺 / 60 分`,`${v*1000} ÷ 60 ＝ ${fmt(v*1000/60)}（1 小時是 60 分，不是 100）`]}}
 if(t===1){const v=R(3,9)*10,h=R(2,5);return{q:`汽車時速 ${v} 公里，${h} 小時可以走幾公里？`,...one(v*h,'公里'),steps:[`距離 ＝ 速率 × 時間`,`${v} × ${h} ＝ ${v*h}`]}}
 const[v1,v2]=pick([[60,40],[60,30],[60,20],[30,20],[90,60],[120,60]]),d=lcm(v1,v2)*R(1,2),av=2*d/(d/v1+d/v2);return{q:`單程 ${d} 公里，去程時速 ${v1} 公里，回程時速 ${v2} 公里，來回的平均時速是多少？`,...one(+av.toFixed(2),'公里'),steps:[`去 ${d} ÷ ${v1} ＝ ${fmt(d/v1)} 時，回 ${d} ÷ ${v2} ＝ ${fmt(d/v2)} 時`,`平均 ＝ 總距離 ÷ 總時間 ＝ ${2*d} ÷ ${fmt(d/v1+d/v2)} ＝ ${fmt(av)}`,`不是 (${v1} ＋ ${v2}) ÷ 2`]}};
G.scale=()=>{const s=pick([1000,2000,5000,10000,50000]),c=R(2,9),k=c*s;return Math.random()<.5?{q:`比例尺 1：${s}，圖上 ${c} 公分，實際是幾公尺？`,...one(k/100,'公尺'),steps:[`實際 ＝ ${c} × ${s} ＝ ${k} 公分`,`${k} 公分 ＝ ${fmt(k/100)} 公尺`]}:{q:`比例尺 1：${s}，圖上 ${c} 公分，實際是幾公里？`,...one(k/100000,'公里'),steps:[`實際 ＝ ${c} × ${s} ＝ ${k} 公分`,`÷ 100 ＝ ${fmt(k/100)} 公尺，÷ 1000 ＝ ${fmt(k/100000)} 公里`]}};
G.solvex=()=>{const t=R(0,3),a=R(2,12),x=R(2,15);const[q,c,s]=[[`x ＋ ${a} ＝ ${x+a}`,x,`兩邊同時減 ${a}：x ＝ ${x+a} － ${a} ＝ ${x}`],[`x － ${a} ＝ ${x}`,x+a,`兩邊同時加 ${a}：x ＝ ${x} ＋ ${a} ＝ ${x+a}`],[`${a} × x ＝ ${a*x}`,x,`兩邊同時除以 ${a}：x ＝ ${a*x} ÷ ${a} ＝ ${x}`],[`x ÷ ${a} ＝ ${x}`,a*x,`兩邊同時乘 ${a}：x ＝ ${x} × ${a} ＝ ${a*x}`]][t];return{q:`${q}，x ＝ ？`,...one(c),steps:[`用相反的運算還原（像天平兩邊做一樣的事）`,s,`驗算：把 x 放回去算算看`]}};
G.trees=()=>{const k=pick([2,4,5,10]),n=R(4,12),L=k*n,t=R(0,2);const[q,ans,s]=[[`${L} 公尺長的路，每隔 ${k} 公尺種一棵樹，兩端都種，共種幾棵？`,n+1,`間隔數 ${L} ÷ ${k} ＝ ${n}，兩端都種：棵數 ＝ 間隔數 ＋ 1 ＝ ${n+1}`],[`${L} 公尺長的路，每隔 ${k} 公尺種一棵樹，只有一端種，共種幾棵？`,n,`間隔數 ${n}，一端種：棵數 ＝ 間隔數 ＝ ${n}`],[`周長 ${L} 公尺的圓形池塘，每隔 ${k} 公尺種一棵樹，共種幾棵？`,n,`繞一圈頭尾相接：棵數 ＝ 間隔數 ＝ ${n}`]][t];return{q,...one(ans,'棵'),steps:['先畫小一點的例子數數看',s]}};
G.word=()=>{const b=R(20,90),d=R(3,15);return Math.random()<.5?{q:`哥哥有 ${b} 元，比弟弟多 ${d} 元，弟弟有幾元？`,...one(b-d,'元'),steps:[`畫線段圖：哥哥比較長，多的是哥哥`,`弟弟 ＝ ${b} － ${d} ＝ ${b-d}`]}:{q:`姊姊有 ${b} 張貼紙，比妹妹少 ${d} 張，妹妹有幾張？`,...one(b+d,'張'),steps:[`姊姊比妹妹少，所以妹妹比較多`,`妹妹 ＝ ${b} ＋ ${d} ＝ ${b+d}（看到「少」不一定是減）`]}};

window.GEN=G;
}
