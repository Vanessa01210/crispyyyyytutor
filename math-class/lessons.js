/* 黑板：動畫式概念講解。每堂課是幾個步驟，每一步有一句說明和一段動畫（draw(t)，t 從 0 播到 1）。 */
{
const Y='#f2d58a',P='#e8a09a',G='#9bb38a',B='#a9c9e0',INK='#5b4a3f',W='#fffdf8',MU='#9a8573';
const L=(a,b,t)=>a+(b-a)*t;
const T=(x,y,s,sz=16,f=INK,a='middle',o=1)=>`<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" opacity="${o}">${s}</text>`;
const R=(x,y,w,h,f,o=1,st=INK)=>`<rect x="${x}" y="${y}" width="${Math.max(0,w)}" height="${h}" fill="${f}" stroke="${st}" stroke-width="1.5" opacity="${o}"/>`;
const rad=d=>d*Math.PI/180;
const sect=(r,a,sp)=>`M0 0L${(r*Math.cos(rad(a-sp))).toFixed(1)} ${(r*Math.sin(rad(a-sp))).toFixed(1)}A${r} ${r} 0 0 1 ${(r*Math.cos(rad(a+sp))).toFixed(1)} ${(r*Math.sin(rad(a+sp))).toFixed(1)}Z`;
const pie=(cx,cy,r,n,fill,op=[])=>n===1?`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill[0]||'none'}" stroke="${INK}" stroke-width="1.5" opacity="${op[0]??1}"/>`:Array.from({length:n},(_,i)=>`<path d="${sect(r,-90+360/n*(i+.5),180/n)}" transform="translate(${cx} ${cy})" fill="${fill[i]||'none'}" stroke="${INK}" stroke-width="1.5" opacity="${op[i]??1}"/>`).join('');

const LESSONS=[
{id:'tongfen',g:'g5',ref:'g5-1-2',title:'通分：1/2 ＋ 1/3',desc:'為什麼分母不一樣，不能直接相加？',steps:[
 {say:'1/2 和 1/3 是兩條一樣長的分數條，但每一格的大小不一樣。',draw:t=>T(36,74,'1/2',16)+R(60,50,280,34,W)+R(60,50,140*t,34,Y)+T(36,134,'1/3',16)+R(60,110,280,34,W)+R(60,110,93.3*t,34,P)+`<line x1="200" y1="50" x2="200" y2="84" stroke="${INK}"/>`+[1,2].map(k=>`<line x1="${60+93.3*k}" y1="110" x2="${60+93.3*k}" y2="144" stroke="${INK}"/>`).join('')},
 {say:'把兩條都切成 6 小格，格子就一樣大了：1/2 ＝ 3/6，1/3 ＝ 2/6。',draw:t=>T(36,74,'1/2',16)+R(60,50,280,34,W)+R(60,50,140,34,Y)+T(36,134,'1/3',16)+R(60,110,280,34,W)+R(60,110,93.3,34,P)+[1,2,3,4,5].map(k=>`<line x1="${60+46.67*k}" y1="50" x2="${60+46.67*k}" y2="84" stroke="${INK}" opacity="${t}"/><line x1="${60+46.67*k}" y1="110" x2="${60+46.67*k}" y2="144" stroke="${INK}" opacity="${t}"/>`).join('')+T(370,74,'3/6',16,'#c96f68','middle',t)+T(370,134,'2/6',16,'#c96f68','middle',t)},
 {say:'格子一樣大，才能一起數：3 格加 2 格。',draw:t=>R(60,50,280,34,W)+R(60,50,140,34,Y)+[1,2,3,4,5].map(k=>`<line x1="${60+46.67*k}" y1="50" x2="${60+46.67*k}" y2="84" stroke="${INK}"/>`).join('')+R(L(60,200,t),L(110,50,t),93.3,34,P)+`<line x1="${L(106.7,246.7,t)}" y1="${L(110,50,t)}" x2="${L(106.7,246.7,t)}" y2="${L(144,84,t)}" stroke="${INK}"/>`},
 {say:'一共 5 格，每格是 1/6，所以答案是 5/6。分母是「切成幾份」，不能相加。',draw:t=>R(60,50,280,34,W)+R(60,50,140,34,Y)+R(200,50,93.3,34,P)+[1,2,3,4,5].map(k=>`<line x1="${60+46.67*k}" y1="50" x2="${60+46.67*k}" y2="84" stroke="${INK}"/>`).join('')+T(200,140,'1/2 ＋ 1/3 ＝ 3/6 ＋ 2/6 ＝ 5/6',20,INK,'middle',t)+T(200,180,'不是 2/5 喔！',16,'#c96f68','middle',t)}]},
{id:'borrow0',g:'g3',ref:'g3-1-0',title:'退位減法：4002 － 1567',desc:'遇到 0 不夠借怎麼辦？',steps:null},
{id:'mixsub',g:'g5',ref:'g5-1-4',title:'帶分數借位：3 又 1/4 － 1 又 3/4',desc:'分數不夠減時，從整數借 1。',steps:[
 {say:'3 又 1/4 是 3 個整圓，再加 1 片 1/4。',draw:t=>[70,150,230].map(x=>pie(x,110,32,1,[Y],[t])).join('')+pie(310,110,32,4,[Y,null,null,null],[t,1,1,1])},
 {say:'1/4 不夠減 3/4，把 1 個整圓切成 4 片：變成 2 又 5/4。',draw:t=>pie(70,110,32,1,[Y])+pie(150,110,32,1,[Y])+pie(230,110,32,4,[B,B,B,B],[1,1,1,1]).replace(/stroke-width="1.5"/g,`stroke-width="1.5" stroke-opacity="${t}"`)+pie(310,110,32,4,[Y,null,null,null])+T(200,190,'2 又 5/4',20,INK,'middle',t)},
 {say:'拿走 1 個整圓和 3 片 1/4。',draw:t=>pie(70,110,32,1,[Y],[1-.8*t])+pie(150,110,32,1,[Y])+pie(230,110,32,4,[B,B,B,B],[1,1,1-.8*t,1-.8*t])+pie(310,110,32,4,[Y,null,null,null],[1-.8*t,1,1,1])+`<path d="M50 90l40 40M90 90l-40 40" stroke="#c96f68" stroke-width="3" opacity="${t}"/>`},
 {say:'剩下 1 個整圓和 2 片，就是 1 又 2/4 ＝ 1 又 1/2。不能倒過來用 3/4 － 1/4！',draw:t=>pie(150,110,32,1,[Y])+pie(230,110,32,4,[B,B,null,null])+T(200,190,'3 又 1/4 － 1 又 3/4 ＝ 1 又 2/4 ＝ 1 又 1/2',18,INK,'middle',t)}]},
{id:'triangle',g:'g5',ref:'g5-3-0',title:'三角形面積為什麼要 ÷ 2',desc:'兩個一樣的三角形，可以拼成什麼？',steps:[
 {say:'這是一個底 8、高 6 的三角形。',draw:t=>`<polygon points="90,190 250,190 150,60" fill="${Y}" stroke="${INK}" stroke-width="2" opacity="${t}"/>`+T(170,212,'底',15,INK,'middle',t)},
 {say:'再拿一個一模一樣的三角形，轉半圈拼上去。',draw:t=>`<polygon points="90,190 250,190 150,60" fill="${Y}" stroke="${INK}" stroke-width="2"/><polygon points="90,190 250,190 150,60" fill="${P}" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4" opacity=".85" transform="rotate(${180*t} 200 125)"/>`},
 {say:'拼成一個平行四邊形，面積是底 × 高。',draw:t=>`<polygon points="90,190 250,190 150,60" fill="${Y}" stroke="${INK}" stroke-width="2"/><polygon points="250,190 310,60 150,60" fill="${P}" stroke="${INK}" stroke-width="2" opacity=".85"/><line x1="150" y1="60" x2="150" y2="${L(60,190,t)}" stroke="#c96f68" stroke-width="2.5" stroke-dasharray="6 4"/>`+T(140,130,'高',15,'#c96f68','end',t)+T(170,212,'底',15)},
 {say:'三角形只有平行四邊形的一半，所以面積 ＝ 底 × 高 ÷ 2。',draw:t=>`<polygon points="90,190 250,190 150,60" fill="${Y}" stroke="${INK}" stroke-width="2"/><polygon points="250,190 310,60 150,60" fill="none" stroke="${MU}" stroke-width="2" stroke-dasharray="5 4"/>`+T(200,226,'三角形面積 ＝ 底 × 高 ÷ 2',19,INK,'middle',t)}]},
{id:'circle',g:'g6',ref:'g6-4-0',title:'圓面積公式怎麼來',desc:'把圓切開，拼成一個長方形。',steps:null},
{id:'average',g:'g5',ref:'g5-6-7',title:'平均：截長補短',desc:'平均就是把多的補給少的。',steps:[
 {say:'小美三天看書 7 頁、3 頁、5 頁。平均每天看幾頁？',draw:t=>[7,3,5].map((h,i)=>R(100+i*80,200-h*18*t,50,h*18*t,[Y,P,B][i])+T(125+i*80,222,`${h} 頁`,14)).join('')},
 {say:'把第一天多出來的 2 頁，補給第二天。',draw:t=>R(100,110,50,90,Y)+R(180,146,50,54,P)+R(260,110,50,90,B)+R(L(100,180,t),L(74,110,t),50,36,Y)+T(125,222,'7 頁',14)+T(205,222,'3 頁',14)+T(285,222,'5 頁',14)},
 {say:'三天變得一樣高，都是 5 頁。平均 ＝ 總和 ÷ 天數 ＝ (7 ＋ 3 ＋ 5) ÷ 3 ＝ 5。',draw:t=>R(100,110,50,90,Y)+R(180,110,50,90,P)+R(260,110,50,90,B)+`<line x1="80" y1="110" x2="330" y2="110" stroke="#c96f68" stroke-width="2" stroke-dasharray="6 4" opacity="${t}"/>`+T(200,60,'(7 ＋ 3 ＋ 5) ÷ 3 ＝ 5',20,INK,'middle',t)}]},
{id:'decdiv',g:'g6',ref:'g6-1-2',title:'小數除法：4.5 ÷ 0.15',desc:'小數點為什麼兩邊都要移？',steps:null},
{id:'dist',g:'g5',ref:'g5-6-1',title:'分配律：25 ×（4 ＋ 8）',desc:'用長方形看懂分配律。',steps:[
 {say:'25 ×（4 ＋ 8）可以看成一個長方形：寬 25、長是 4 ＋ 8。',draw:t=>R(80,60,216*t,100,Y)+T(66,115,'25',16,INK,'end',t)+T(188,182,'4 ＋ 8',16,INK,'middle',t)},
 {say:'沿著 4 和 8 中間切開，變成兩塊。',draw:t=>R(80,60,72,100,Y)+R(152+20*t,60,144,100,B)+T(66,115,'25',16,INK,'end')+T(116,182,'4',16)+T(244+20*t,182,'8',16)},
 {say:'兩塊都要乘 25：25 × 4 ＝ 100，25 × 8 ＝ 200。',draw:t=>R(80,60,72,100,Y)+R(172,60,144,100,B)+T(116,116,'25 × 4',14,INK,'middle',t)+T(244,116,'25 × 8',15,INK,'middle',t)+T(116,182,'100',16,'#c96f68','middle',t)+T(244,182,'200',16,'#c96f68','middle',t)},
 {say:'所以 25 ×（4 ＋ 8）＝ 25 × 4 ＋ 25 × 8 ＝ 300。不是 25 × 4 ＋ 8 喔！',draw:t=>R(80,60,72,100,Y)+R(172,60,144,100,B)+T(200,206,'25 ×（4 ＋ 8）＝ 25 × 4 ＋ 25 × 8 ＝ 300',17,INK,'middle',t)+T(200,232,'不是 25 × 4 ＋ 8',15,'#c96f68','middle',t)}]}];

/* 退位減法：數字和借位標記 */
{const X=[140,200,260,320],top=['4','0','0','2'],bot=['1','5','6','7'],res=['2','4','3','5'];
 const base=(marks,hi,show)=>X.map((x,i)=>T(x,110,top[i],30,INK)+T(x,150,bot[i],30,INK)+(marks[i]?`<line x1="${x-11}" y1="100" x2="${x+11}" y2="88" stroke="#c96f68" stroke-width="2.5"/>`+T(x,74,marks[i],18,'#c96f68'):'')+(show[i]?T(x,198,res[i],30,'#6f8e5e','middle',show[i]):'')).join('')+T(100,150,'－',28)+`<line x1="90" y1="164" x2="345" y2="164" stroke="${INK}" stroke-width="2"/>`+(hi!=null?`<rect x="${X[hi]-22}" y="80" width="44" height="80" rx="8" fill="none" stroke="${Y}" stroke-width="4"/>`:'')+X.map((x,i)=>T(x,232,['千','百','十','個'][i],13,MU)).join('');
 const tok=(x,t)=>`<circle cx="${x}" cy="40" r="13" fill="${Y}" stroke="${INK}" stroke-width="1.5" opacity="${t}"/>`;
 LESSONS[1].steps=[
 {say:'個位 2 不夠減 7，要往前借。可是十位、百位都是 0，沒得借。',draw:t=>base([],3,[]).replace('opacity="1"','opacity="1"')},
 {say:'只好向千位借 1 個千，換成 10 個百。千位 4 變 3。',draw:t=>base(['3','10','',''],null,[])+tok(L(140,200,t),1)+T(L(140,200,t),45,'千',12)},
 {say:'再從百位拿 1 個百，換成 10 個十。百位剩 9。',draw:t=>base(['3','9','10',''],null,[])+tok(L(200,260,t),1)+T(L(200,260,t),45,'百',12)},
 {say:'十位拿 1 個十給個位。十位剩 9，個位變成 12。',draw:t=>base(['3','9','9','12'],null,[])+tok(L(260,320,t),1)+T(L(260,320,t),45,'十',12)},
 {say:'再一位一位減：12 － 7 ＝ 5、9 － 6 ＝ 3、9 － 5 ＝ 4、3 － 1 ＝ 2。答案 2435。',draw:t=>base(['3','9','9','12'],null,[Math.min(1,Math.max(0,t*4-3)),Math.min(1,Math.max(0,t*4-2)),Math.min(1,Math.max(0,t*4-1)),Math.min(1,t*4)])}]}

/* 圓面積：8 片扇形重新排列 */
{const r=56,hw=r*Math.sin(rad(22.5)),h=r*Math.cos(rad(22.5)),cx=80,cy=120,x0=190,y0=80;
 const sec=(i,t,lbl)=>{const a0=-90+i*45+22.5,even=i%2===0,ax=x0+i*hw,ay=even?y0:y0+h,a1=even?90:-90;const x=L(cx,ax,t),y=L(cy,ay,t),a=L(a0,a1+(a0>a1+180?360:0),t);return`<path d="${sect(r,a,22.5)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" fill="${even?Y:P}" stroke="${INK}" stroke-width="1.5"/>`};
 LESSONS[4].steps=[
 {say:'把一個圓像切蛋糕一樣，平分成 8 片扇形。',draw:t=>Array.from({length:8},(_,i)=>sec(i,0)).join('').replace(/stroke-width="1.5"/g,`stroke-width="1.5" stroke-opacity="${.3+.7*t}"`)+T(cx,cy+r+24,'半徑 r',14)},
 {say:'把扇形一上一下排好……',draw:t=>Array.from({length:8},(_,i)=>sec(i,t)).join('')},
 {say:'就變成一個很像長方形的形狀！長是圓周的一半，高是半徑。',draw:t=>Array.from({length:8},(_,i)=>sec(i,1)).join('')+`<line x1="${x0-hw}" y1="${y0+h+14}" x2="${x0+7*hw+hw}" y2="${y0+h+14}" stroke="#c96f68" stroke-width="2.5" opacity="${t}"/>`+T(x0+3.5*hw,y0+h+34,'圓周的一半 ＝ r × 3.14',14,'#c96f68','middle',t)+`<line x1="${x0+8*hw+10}" y1="${y0}" x2="${x0+8*hw+10}" y2="${y0+h}" stroke="#6f8e5e" stroke-width="2.5" opacity="${t}"/>`+T(x0+8*hw+18,y0+h/2+5,'r',16,'#6f8e5e','start',t)},
 {say:'長方形面積 ＝ 長 × 高 ＝ r × 3.14 × r，所以圓面積 ＝ 半徑 × 半徑 × 3.14。',draw:t=>Array.from({length:8},(_,i)=>sec(i,1)).join('')+T(200,40,'圓面積 ＝ 半徑 × 半徑 × 3.14',19,INK,'middle',t)}]}

/* 小數除法：小數點一起移 */
{const dig=(s,x0,dot,zero,dx)=>{let o='';[...s].forEach((c,i)=>o+=T(x0+i*24,120,c,32));if(zero)o+=T(x0+s.length*24,120,'0',32,'#c96f68','middle',zero);if(dot!=null)o+=`<circle cx="${x0+dot*24-12}" cy="116" r="3.5" fill="#c96f68"/>`;return o};
 LESSONS[6].steps=[
 {say:'4.5 ÷ 0.15：除數 0.15 是小數，先想辦法把它變成整數。',draw:t=>dig('45',60,1)+T(150,120,'÷',30)+dig('015',190,1)},
 {say:'0.15 × 100 ＝ 15：除數的小數點往右移兩位。',draw:t=>dig('45',60,1)+T(150,120,'÷',30)+dig('015',190,t<1?L(1,3,t):null)+T(230,70,'× 100',16,'#c96f68','middle',t)},
 {say:'被除數也要一起 × 100，小數點也往右移兩位，不夠的位數補 0。',draw:t=>dig('45',60,t<1?L(1,3,t):null,t)+T(150,120,'÷',30)+dig('015',190,null)+T(90,70,'× 100',16,'#c96f68','middle',t)+T(230,70,'× 100',16,'#c96f68')},
 {say:'兩個數同時乘 100，商不變：4.5 ÷ 0.15 ＝ 450 ÷ 15 ＝ 30。只移除數會算錯！',draw:t=>dig('45',60,null,1)+T(150,120,'÷',30)+dig('015',190,null)+T(200,190,'4.5 ÷ 0.15 ＝ 450 ÷ 15 ＝ 30',20,INK,'middle',t)}]}


/* 共用小工具：給其他動畫課檔案用 */
const RED='#c96f68',DG='#6f8e5e';
const ck=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
const ln=(x1,y1,x2,y2,c=INK,w=2,o=1,d='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" opacity="${o}"${d?` stroke-dasharray="${d}"`:''} stroke-linecap="round"/>`;
const strip=(x,y,w,h,n,k,f=Y,o=1)=>`<g opacity="${o}">`+R(x,y,w,h,W)+(k>0?`<rect x="${x}" y="${y}" width="${w/n*k}" height="${h}" fill="${f}"/>`:'')+Array.from({length:n-1},(_,i)=>ln(x+w/n*(i+1),y,x+w/n*(i+1),y+h,INK,1.2)).join('')+`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="1.5"/></g>`;
const C=(s,xr,y,c=INK,o=1,sz=32,gap=30)=>[...String(s)].map((ch,i,a)=>T(xr-(a.length-1-i)*gap,y,ch,sz,c,'middle',o)).join('');
const Fr=(x,y,n,d,c=INK,o=1,sz=22)=>{const hw=6+sz*.3*Math.max(String(n).length,String(d).length);return`<g opacity="${o}">${T(x,y-6,n,sz,c)}${ln(x-hw,y,x+hw,y,c,2)}${T(x,y+sz,d,sz,c)}</g>`};
const X=(x,y,s=12,o=1)=>ln(x-s,y-s,x+s,y+s,RED,3,o)+ln(x+s,y-s,x-s,y+s,RED,3,o);
const Gp=(o,s)=>`<g opacity="${o}">${s}</g>`;
const bad=(x,y,s,o=1,sz=15)=>T(x,y,s+'　✗',sz,RED,'middle',o);
const good=(x,y,s,o=1,sz=20)=>T(x,y,s,sz,INK,'middle',o);
const grid=(x,y,c,n,f=Y,cols=10,rows=10,o=1)=>{let s=R(x,y,c*cols,c*rows,W);for(let i=0;i<n;i++){const cl=Math.floor(i/rows),rw=i%rows;s+=`<rect x="${x+cl*c}" y="${y+rw*c}" width="${c}" height="${c}" fill="${f}" opacity="${o}"/>`}for(let i=1;i<cols;i++)s+=ln(x+i*c,y,x+i*c,y+rows*c,MU,.6);for(let i=1;i<rows;i++)s+=ln(x,y+i*c,x+cols*c,y+i*c,MU,.6);return s+`<rect x="${x}" y="${y}" width="${c*cols}" height="${c*rows}" fill="none" stroke="${INK}" stroke-width="1.5"/>`};
window.LZ={Y,P,G,B,INK,W,MU,RED,DG,L,T,R,pie,sect,rad,ck,ln,strip,C,Fr,X,Gp,bad,good,grid};
window.LESSONS=LESSONS;
}
