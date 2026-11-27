/* 卡關診斷題庫：每次出題都換數字。每個錯誤選項對應一條迷思（年級-單元-第幾條）。
   sem：a＝上學期、b＝下學期（對應《加點心》各冊）。gen：練習題與補強卷使用的題型。 */
{
const{gcd,lcm,simp,F,FM,fmt}=window.MU;
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=R(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const pf=(lo,hi)=>{const d=R(lo,hi);return simp(R(1,d-1),d)};
const MX=(n,d)=>{[n,d]=simp(n,d);const w=Math.floor(n/d),r=n%d;return r===0?`${w}`:w?F(r,d,w):F(r,d)};
/* 組選項：正確答案＋最多 3 個不重複的錯誤選項 */
const mk=(q,right,wrongs)=>{const seen=new Set([right]),o=[[right,null]];for(const[w,ref]of wrongs){if(o.length>=4)break;if(w==null||seen.has(w))continue;seen.add(w);o.push([w,ref])}return{q,o:shuf(o)}};
const zeroNum=L=>{let s;do{s=String(R(1,9));for(let i=1;i<L;i++)s+=Math.random()<.5?'0':R(1,9)}while(!/[1-9]0+[1-9]/.test(s));return s};
const pvWrongs=(n,ref)=>{const z=n.indexOf('0'),j=n.slice(z).search(/[1-9]/)+z,sw=[...n];[sw[z],sw[j]]=[sw[j],sw[z]];return[[n.slice(0,z)+n.slice(z+1),ref],[n.slice(0,z)+'0'+n.slice(z),ref],[sw.join(''),ref]]};
const D=[];const add=(meta,f)=>D.push({...meta,f});

/* ---------- 三年級 ---------- */
add({k:'pv3',g:'g3',sem:'a',label:'大數的讀寫',gen:'pv3'},()=>{const n=zeroNum(4);return mk(`「${window.readNum(n)}」寫成數字是？`,n,pvWrongs(n,'g3-0-0'))});
add({k:'sub0',g:'g3',sem:'a',label:'退位減法',gen:'addsub'},()=>{const d=R(3,9),h=Math.random()<.5?0:R(1,9),o=R(0,5),a=d*1000+h*100+o,bo=R(o+1,9),b=R(1,d-1)*1000+R(1,9)*100+R(1,9)*10+bo;if(b>=a)return D.find(x=>x.k==='sub0').f();
 const A=String(a).padStart(4,'0'),B=String(b).padStart(4,'0'),rev=+[...A].map((c,i)=>Math.abs(+c-+B[i])).join('');
 return mk(`${a} － ${b} ＝ ？`,`${a-b}`,[[`${rev}`,'g3-1-0'],[`${a-b+1000}`,'g3-1-0'],[`${a-b+100}`,'g3-1-0']])});
add({k:'mul3',g:'g3',sem:'a',label:'乘法進位',gen:'mul1'},()=>{let T,O,b;do{T=R(1,9);O=R(2,9);b=R(3,9)}while(O*b<10);const a=10*T+O,c=Math.floor(O*b/10);
 return mk(`${a} × ${b} ＝ ？`,`${a*b}`,[[`${(T+c)*b*10+(O*b)%10}`,'g3-2-0'],[`${T*b*10+(O*b)%10}`,'g3-2-0'],[`${T*b}${O*b}`,'g3-2-0']])});
add({k:'ruler',g:'g3',sem:'a',label:'量長度',gen:'unit3'},()=>{const s=R(1,5),l=R(2,7);return mk(`一支鉛筆放在尺上，一端對準 ${s} 公分的刻度，另一端對準 ${s+l} 公分的刻度。鉛筆長幾公分？`,`${l} 公分`,[[`${s+l} 公分`,'g3-4-0'],[`${l+1} 公分`,'g3-4-0'],[`${s} 公分`,'g3-4-0']])});
add({k:'ml',g:'g3',sem:'a',label:'容量換算',gen:'unit3'},()=>{const L=R(2,9),m=R(11,95);return mk(`${L} 公升 ${m} 毫升 ＝ ？ 毫升`,`${L*1000+m}`,[[`${L*100+m}`,'g3-4-4'],[`${L*10+m}`,'g3-4-4']])});
add({k:'unitfrac',g:'g3',sem:'a',label:'分數比大小',gen:'frac3'},()=>{const[a,b]=shuf([2,3,4,5,6,8,10]).slice(0,2);return mk(`${F(1,a)} 和 ${F(1,b)}，哪一個比較大？`,F(1,Math.min(a,b)),[[F(1,Math.max(a,b)),'g3-5-1'],['一樣大','g3-5-1']])});
add({k:'div0',g:'g3',sem:'b',label:'除法（商中間的 0）',gen:'div1'},()=>{const b=R(3,9),d=R(1,9),e=R(1,b-1),q=d*100+e;return mk(`${q*b} ÷ ${b} ＝ ？`,`${q}`,[[`${d*10+e}`,'g3-3-0'],[`${d*100+e*10}`,'g3-3-0'],[`${q-1} 餘 ${b}`,'g3-3-1']])});
add({k:'time3',g:'g3',sem:'b',label:'時間計算',gen:'time3'},()=>{const h1=R(3,10),m1=R(5,35),h2=R(1,h1-1),m2=R(m1+1,59);return mk(`${h1} 時 ${m1} 分 － ${h2} 時 ${m2} 分 ＝ ？`,`${h1-1-h2} 時 ${m1+60-m2} 分`,[[`${h1-1-h2} 時 ${m1+100-m2} 分`,'g3-4-1'],[`${h1-h2} 時 ${m2-m1} 分`,'g3-4-1'],[`${h1-h2} 時 ${m1+60-m2} 分`,'g3-4-1']])});
add({k:'samed',g:'g3',sem:'b',label:'同分母分數加法',gen:'frac3'},()=>{const d=R(5,12),a=R(1,d-2),b=R(1,d-1-a);return mk(`${F(a,d)} ＋ ${F(b,d)} ＝ ？`,F(a+b,d),[[F(a+b,d+d),'g3-5-2'],[F(a*b,d),'g3-5-2']])});

/* ---------- 四年級 ---------- */
add({k:'pv4',g:'g4',sem:'a',label:'億以內的大數',gen:'pv4'},()=>{const n=zeroNum(R(8,9));return mk(`「${window.readNum(n)}」寫成數字是？`,n,pvWrongs(n,'g4-0-0'))});
add({k:'ord4',g:'g4',sem:'a',label:'先乘除後加減',gen:'order4'},()=>{const a=R(2,9),b=R(2,9),c=a*b+R(5,40);return mk(`${c} － ${a} × ${b} ＝ ？`,`${c-a*b}`,[[`${(c-a)*b}`,'g4-3-0'],[`${c-a-b}`,'g4-3-0']])});
add({k:'mix4',g:'g4',sem:'a',label:'帶分數和假分數',gen:'improper'},()=>{const w=R(1,4),d=R(3,8),n=R(1,d-1);return mk(`${F(n,d,w)} 化成假分數是？`,F(w*d+n,d),[[F(w+n,d),'g4-5-0'],[F(w*n,d),'g4-5-0'],[F(w*d,d),'g4-5-0']])});
add({k:'fracw4',g:'g4',sem:'a',label:'分數的整數倍',gen:'fracw'},()=>{const d=R(5,9),n=R(1,d-2),k=R(2,4);return mk(`${F(n,d)} × ${k} ＝ ？`,F(n*k,d),[[F(n*k,d*k),'g4-5-1'],[F(n,d*k),'g4-5-1']])});
add({k:'dcmp4',g:'g4',sem:'a',label:'小數比大小',gen:'deccmp'},()=>{const a=R(2,9),x=`0.${a}`,y=`0.${a-1}${R(1,9)}`;return mk(`${x} 和 ${y}，哪一個比較大？`,x,[[y,'g4-6-0'],['一樣大','g4-6-0']])});
add({k:'dadd4',g:'g4',sem:'a',label:'小數加法',gen:'decadd'},()=>{const A=R(11,99)/10,B=R(101,999)/100,s=Math.round(A*10)+Math.round(B*100);return mk(`${fmt(A)} ＋ ${fmt(B)} ＝ ？`,fmt(A+B),[[fmt(s/100),'g4-6-2'],[fmt(s/10),'g4-6-2']])});
add({k:'rnd4',g:'g4',sem:'b',label:'概數（四捨五入）',gen:'round'},()=>{const X=R(1,9),lo=(X*10+9)*1000,n=lo+R(500,999);return mk(`${n} 用四捨五入法取到千位，約是多少？`,`${lo+1000}`,[[`${lo}`,'g4-1-0'],[`${X*10000}`,'g4-1-0'],[`${Math.round(n/100)*100}`,'g4-1-0']])});
add({k:'dmul4',g:'g4',sem:'b',label:'小數乘法',gen:'decmulw'},()=>{const A=R(11,99)/10,k=R(3,9);return mk(`${fmt(A)} × ${k} ＝ ？`,fmt(A*k),[[`${Math.round(A*10)*k}`,'g4-6-3'],[fmt(A*k/10),'g4-6-3']])});
add({k:'area4',g:'g4',sem:'b',label:'面積單位',gen:'area4'},()=>{const m=R(2,9);return mk(`${m} 平方公尺 ＝ ？ 平方公分`,`${m*10000}`,[[`${m*100}`,'g4-7-0'],[`${m*1000}`,'g4-7-0']])});

/* ---------- 五年級 ---------- */
add({k:'prime5',g:'g5',sem:'a',label:'質數與合數',gen:'prime'},()=>{const p=pick([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]);return mk('下面哪一個是質數？',`${p}`,shuf([1,9,15,21,25,27,33,39,49,51]).slice(0,3).map(x=>[`${x}`,'g5-0-0']))});
add({k:'lcm5',g:'g5',sem:'a',label:'公因數、公倍數應用',gen:'gl5'},()=>{const k=R(2,6),a=k*R(2,5);let b;do{b=k*R(2,6)}while(b===a||b%a===0||a%b===0);return mk(`甲公車每 ${a} 分一班，乙公車每 ${b} 分一班。兩車同時發車後，至少再過幾分會再一起發車？`,`${lcm(a,b)} 分`,[[`${gcd(a,b)} 分`,'g5-0-2'],[`${a*b} 分`,'g5-0-2'],[`${a+b} 分`,'g5-0-2']])});
add({k:'red5',g:'g5',sem:'a',label:'約分',gen:'reduce'},()=>{let a,b;do{[a,b]=pf(3,9)}while(b<3);const k=pick([4,6,8,9,10,12]),p=k%2===0?2:3;return mk(`${F(a*k,b*k)} 化成最簡分數是？`,F(a,b),[[F(a*k/p,b*k/p),'g5-1-0'],[F(a*k/(k/p),b*k/(k/p)),'g5-1-0'],[F(a,b*k/p),'g5-1-1']])});
add({k:'add5',g:'g5',sem:'a',label:'異分母分數加法',gen:'add'},()=>{let a,b,c,d;do{[a,b]=pf(2,8);[c,d]=pf(2,8)}while(b===d||lcm(b,d)>40||a*d+c*b>=b*d);const L=lcm(b,d);return mk(`${F(a,b)} ＋ ${F(c,d)} ＝ ？`,MX(a*d+c*b,b*d),[[F(a+c,b+d),'g5-1-2'],[F(a+c,L),'g5-1-3'],[F(a*c,b*d),'g5-1-2']])});
add({k:'bor5',g:'g5',sem:'a',label:'帶分數減法（借位）',gen:'borrow'},()=>{const b=R(3,9),a=R(1,b-2),c=R(a+1,b-1),W=R(2,6),V=R(1,W-1),tot=(W*b+a)-(V*b+c);return mk(`${F(a,b,W)} － ${F(c,b,V)} ＝ ？`,MX(tot,b),[[(W-V)?F(c-a,b,W-V):F(c-a,b),'g5-1-4'],[(W-V)?F(a+b-c,b,W-V):F(a+b-c,b),'g5-1-4']])});
add({k:'cmp5',g:'g5',sem:'a',label:'異分母分數比大小',gen:'add'},()=>{let n,d,m,e;do{d=R(3,8);n=R(1,d-1);e=R(d+1,10);m=R(n+1,e-1)}while(m<=n||m>=e||n*e<=m*d||gcd(n,d)>1||gcd(m,e)>1);return mk(`${F(n,d)} 和 ${F(m,e)}，哪一個比較大？`,F(n,d),[[F(m,e),'g5-1-5'],['一樣大','g5-1-5']])});
add({k:'md5',g:'g5',sem:'a',label:'乘除混合',gen:'order5'},()=>{const b=R(2,6),c=R(2,6),q=R(2,9),a=b*c*q;return mk(`${a} ÷ ${b} × ${c} ＝ ？`,`${a/b*c}`,[[`${q}`,'g5-6-0'],[`${a*c}`,'g5-6-0']])});
add({k:'dist5',g:'g5',sem:'a',label:'分配律',gen:'order5'},()=>{const a=pick([12,15,25,35]),b=R(2,9),c=R(2,9);return mk(`${a} ×（${b} ＋ ${c}）＝ ？`,`${a*(b+c)}`,[[`${a*b+c}`,'g5-6-1'],[`${a*c+b}`,'g5-6-1'],[`${a+b*c}`,'g5-6-1']])});
add({k:'par5',g:'g5',sem:'a',label:'去括號',gen:'order5'},()=>{const a=R(80,99),b=R(20,40),c=R(5,15);return mk(`${a} －（${b} － ${c}）＝ ？`,`${a-b+c}`,[[`${a-b-c}`,'g5-6-3'],[`${a+b-c}`,'g5-6-3']])});
add({k:'nine5',g:'g5',sem:'a',label:'湊整簡化計算',gen:'order5'},()=>{const k=R(12,48);return mk(`99 × ${k} ＝ ？`,`${99*k}`,[[`${100*k-1}`,'g5-6-6'],[`${100*k-99}`,'g5-6-6']])});
add({k:'avg5',g:'g5',sem:'a',label:'平均',gen:'order5'},()=>{for(;;){const n1=pick([20,25,30]),n2=pick([10,15,20].filter(x=>x!==n1)),a1=R(70,92),M=R(70,90),t=M*(n1+n2)-a1*n1;if(t%n2)continue;const a2=t/n2;if(a2<55||a2>100||a2===a1||(a1+a2)%2)continue;
 return mk(`甲班 ${n1} 人平均 ${a1} 分，乙班 ${n2} 人平均 ${a2} 分，兩班合起來的平均是幾分？`,`${M} 分`,[[`${(a1+a2)/2} 分`,'g5-6-7'],[`${a1+a2} 分`,'g5-6-7']])}});
add({k:'tri5',g:'g5',sem:'a',label:'三角形面積',gen:'area5'},()=>{const b=R(4,12),h=R(3,9);return mk(`底 ${b} 公分、高 ${h} 公分的三角形，面積是多少平方公分？`,fmt(b*h/2),[[`${b*h}`,'g5-3-0'],[`${(b+h)*2}`,'g5-3-0'],[`${b+h}`,'g5-3-0']])});
add({k:'para5',g:'g5',sem:'a',label:'平行四邊形面積',gen:'area5'},()=>{const b=R(5,12),h=R(3,8),s=h+R(1,3);return mk(`平行四邊形的底 ${b} 公分、高 ${h} 公分、斜邊 ${s} 公分，面積是多少平方公分？`,`${b*h}`,[[`${b*s}`,'g5-3-1'],[`${b*h*s}`,'g5-3-1'],[fmt(b*h/2),'g5-3-1']])});
add({k:'of5',g:'g5',sem:'b',label:'分數的分數倍',gen:'fracof'},()=>{let p,q,r,s;do{[p,q]=pf(2,6);[r,s]=pf(2,5)}while(p*s<=r*q||q===s);return mk(`一條繩子長 ${F(p,q)} 公尺，用掉它的 ${F(r,s)}，用掉幾公尺？`,MX(p*r,q*s),[[MX(p*s-r*q,q*s),'g5-2-1'],[MX(p*s,q*r),'g5-2-1'],[MX(p*s+r*q,q*s),'g5-2-1']])});
add({k:'small5',g:'g5',sem:'b',label:'乘以真分數',gen:'mul'},()=>{const n=pick([12,16,20,24,30]),[p,q]=pf(2,6);return mk(`${n} × ${F(p,q)} 的答案，和 ${n} 比起來？`,`比 ${n} 小`,[[`比 ${n} 大`,'g5-2-0'],['一樣大','g5-2-0']])});
add({k:'dm5',g:'g5',sem:'b',label:'小數乘以小數',gen:'decmul'},()=>{const a=R(2,9),b=R(2,9);return mk(`0.${a} × 0.${b} ＝ ？`,fmt(a*b/100),[[fmt(a*b/10),'g5-2-3'],[`${a*b}`,'g5-2-3']])});
add({k:'vol5',g:'g5',sem:'b',label:'體積單位',gen:'vol'},()=>{const m=R(2,9);return mk(`${m} 立方公尺 ＝ ？ 立方公分`,`${m*1000000}`,[[`${m*100}`,'g5-4-0'],[`${m*1000}`,'g5-4-0'],[`${m*10000}`,'g5-4-0']])});
add({k:'pct5',g:'g5',sem:'b',label:'百分率',gen:'pct'},()=>{const[n,d]=pick([[3,4],[1,4],[2,5],[3,5],[4,5],[7,10],[1,2]]);return mk(`${F(n,d)} ＝ 百分之幾？`,`${n*100/d}%`,[[`${n}${d}%`,'g5-5-0'],[`${fmt(n/d)}%`,'g5-5-0']])});

/* ---------- 六年級 ---------- */
add({k:'lcm6',g:'g6',sem:'a',label:'最大公因數、最小公倍數',gen:'sd'},()=>{const g=R(2,6);let x,y;do{x=R(2,7);y=R(2,7)}while(x===y||gcd(x,y)>1);const a=g*x,b=g*y;return mk(`${a} 和 ${b} 的最小公倍數是多少？`,`${g*x*y}`,[[`${g}`,'g6-0-0'],[`${a*b}`,'g6-0-0'],[`${g*x}`,'g6-0-0']])});
add({k:'div6a',g:'g6',sem:'a',label:'除以分數',gen:'fracdiv'},()=>{const n=R(2,8),b=R(2,5);return mk(`${n} ÷ ${F(1,b)} ＝ ？`,`${n*b}`,[[MX(n,b),'g6-1-0'],[F(1,n*b),'g6-1-1']])});
add({k:'div6b',g:'g6',sem:'a',label:'分數除以分數',gen:'fracdiv'},()=>{let a,b,c,d;do{[a,b]=pf(2,7);[c,d]=pf(2,7)}while(a*d===b*c||b===d);return mk(`${F(a,b)} ÷ ${F(c,d)} ＝ ？`,MX(a*d,b*c),[[MX(b*c,a*d),'g6-1-1'],[MX(a*c,b*d),'g6-1-1']])});
add({k:'ddiv6',g:'g6',sem:'a',label:'小數除法',gen:'decdiv'},()=>{const b=pick([0.15,0.25,0.12,0.35,0.45]),q=R(3,40),a=+(b*q).toFixed(2);return mk(`${fmt(a)} ÷ ${fmt(b)} ＝ ？`,`${q}`,[[fmt(q/100),'g6-1-2'],[fmt(q/10),'g6-1-2']])});
add({k:'base6',g:'g6',sem:'a',label:'基準量與比較量',gen:'ratio'},()=>{const d=R(3,8),n=R(1,d-1),k=R(2,9);return mk(`A 是 B 的 ${F(n,d)}，A 是 ${n*k}，B 是多少？`,`${d*k}`,[[MX(n*k*n,d),'g6-2-2'],[`${n*k*d}`,'g6-2-2']])});
add({k:'scale6',g:'g6',sem:'a',label:'比例尺',gen:'scale'},()=>{const s=pick([1000,2000,5000]),c=R(2,9);return mk(`比例尺 1：${s}，地圖上 ${c} 公分，實際距離是幾公尺？`,`${c*s/100} 公尺`,[[`${c*s} 公尺`,'g6-5-2'],[`${c*s/1000} 公尺`,'g6-5-2']])});
add({k:'x6',g:'g6',sem:'a',label:'解未知數',gen:'solvex'},()=>{const a=R(3,15),x=R(3,20);return mk(`x ＋ ${a} ＝ ${x+a}，x 是多少？`,`${x}`,[[`${x+2*a}`,'g6-5-3'],[`${(x+a)*a}`,'g6-5-3']])});
add({k:'spd6',g:'g6',sem:'b',label:'速率換算',gen:'speed'},()=>{const v=pick([36,48,60,72,90]);return mk(`時速 ${v} 公里 ＝ 分速幾公尺？`,`${v*1000/60} 公尺`,[[`${v*10} 公尺`,'g6-3-0'],[`${fmt(v/60)} 公尺`,'g6-3-0']])});
add({k:'avg6',g:'g6',sem:'b',label:'平均速率',gen:'speed'},()=>{const[v1,v2]=pick([[60,40],[60,30],[60,20],[30,20],[90,60],[120,60]]),d=lcm(v1,v2);return mk(`單程 ${d} 公里，去程時速 ${v1} 公里、回程時速 ${v2} 公里，來回的平均時速是多少公里？`,`${2*d/(d/v1+d/v2)}`,[[`${(v1+v2)/2}`,'g6-3-1'],[`${v1+v2}`,'g6-3-1']])});
add({k:'circ6',g:'g6',sem:'b',label:'圓面積',gen:'circle'},()=>{if(Math.random()<.5){const r=R(2,9);return mk(`半徑 ${r} 公分的圓，面積是多少平方公分？`,fmt(r*r*3.14),[[fmt(r*2*3.14),'g6-4-0'],[fmt(r*r*2*3.14),'g6-4-0']])}
 const r=R(2,9),D2=r*2;return mk(`直徑 ${D2} 公分的圓，面積是多少平方公分？`,fmt(r*r*3.14),[[fmt(D2*D2*3.14),'g6-4-1'],[fmt(D2*3.14),'g6-4-0']])});
add({k:'mix6',g:'g6',sem:'b',label:'分數、小數四則混合',gen:'order6'},()=>{const[x,y]=pf(2,5),k=R(2,4);const v=simp(x*y+x*k*y,y*y);return mk(`${F(x,y)} ＋ ${F(x,y)} × ${k} ＝ ？`,MX(x*(1+k),y),[[MX(2*x*k,y),'g6-6-0'],[MX(x*k+x,y*k),'g6-6-0']])});

window.DIAG=D;
}
