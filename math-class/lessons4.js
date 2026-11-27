/* 黑板動畫課（四）：五年級 */
{const {Y,P,G,B,INK,W,MU,RED,DG,L,T,R,pie,ck,ln,strip,C,Fr,X,Gp,bad,good,grid}=window.LZ;const add=o=>window.LESSONS.push(o);
const dot=(x,y,f=Y,r=9,o=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${INK}" stroke-width="1.2" opacity="${o}"/>`;

/* 質數 */
{const PR=[2,3,5,7,11,13,17,19];
add({id:'prime',g:'g5',ref:'g5-0-0',title:'質數和合數怎麼分？',desc:'1、2、9 是不是質數？',steps:[
 {say:'6 顆點心可以排成 2 排、每排 3 顆的長方形。6 除了 1 和 6，還有因數 2 和 3，是合數。',draw:t=>Array.from({length:6},(_,i)=>dot(L(30+i*26,60+(i%3)*30,t),L(90,95+Math.floor(i/3)*30,t))).join('')+T(95,180,'6 ＝ 2 × 3',18,INK,'middle',t)+T(95,206,'合數',18,RED,'middle',t)},
 {say:'7 顆怎麼排都只能排成一排，因數只有 1 和 7，是質數。',draw:t=>Array.from({length:6},(_,i)=>dot(60+(i%3)*30,95+Math.floor(i/3)*30)).join('')+T(95,180,'6 ＝ 2 × 3',18)+T(95,206,'合數',18,RED)+Array.from({length:7},(_,i)=>dot(225+i*24,110,P,9,ck(t,i/7,(i+1)/7))).join('')+T(297,180,'7 ＝ 1 × 7',18,INK,'middle',t)+T(297,206,'質數',18,DG,'middle',t)},
 {say:'質數只有 1 和自己兩個因數。1 只有 1 個因數，不是質數也不是合數；2 是質數；9 ＝ 3 × 3 是合數。',draw:t=>Array.from({length:20},(_,i)=>{const n=i+1,x=40+(i%10)*32,y=60+Math.floor(i/10)*40,p=PR.includes(n),o=ck(t,i/20,(i+1)/20);return`<rect x="${x}" y="${y}" width="30" height="34" rx="6" fill="${n===1?'#e9e2d9':p?G:W}" stroke="${INK}" stroke-width="1.2" opacity="${p||n===1?.3+.7*o:1}"/>`+T(x+15,y+23,n,15,n===9?RED:INK)}).join('')+T(200,175,'綠色是質數：2、3、5、7、11、13、17、19',14,DG,'middle',ck(t,.8,1))+T(200,200,'1 不是質數也不是合數',14,MU,'middle',ck(t,.8,1))+T(200,222,'9 ＝ 3 × 3 是合數',14,RED,'middle',ck(t,.8,1))}]})}

/* 公車：最小公倍數 */
{const px=m=>30+m*340/72;const row=(y,step,f,o)=>Array.from({length:72/step+1},(_,i)=>dot(px(i*step),y,f,8,ck(o,i/(72/step+1),(i+1)/(72/step+1)))).join('');
 const axis=ln(30,190,370,190,INK,2)+[0,12,18,24,36,48,54,60,72].map(m=>ln(px(m),185,px(m),195,INK,1.5)+T(px(m),212,m,11,MU)).join('')+T(385,212,'分',11,MU);
add({id:'lcmbus',g:'g5',ref:'g5-0-2',title:'公車再一起發車：公倍數',desc:'12 分和 18 分一班，多久再一起出發？',steps:[
 {say:'紅線公車每 12 分鐘發一班：0、12、24、36……',draw:t=>axis+T(40,72,'紅線 12 分一班',14,RED,'start')+row(95,12,P,t)},
 {say:'綠線公車每 18 分鐘發一班：0、18、36、54……',draw:t=>axis+T(40,72,'紅線 12 分一班',14,RED,'start')+row(95,12,P,1)+T(40,132,'綠線 18 分一班',14,DG,'start')+row(155,18,G,t)},
 {say:'兩班車第一次再一起發車是 36 分鐘後，36 是 12 和 18 的最小公倍數。如果用最大公因數 6，6 分鐘時兩班車都還沒發車呢！',draw:t=>axis+row(95,12,P,1)+row(155,18,G,1)+`<rect x="${px(36)-14}" y="78" width="28" height="94" rx="10" fill="none" stroke="${RED}" stroke-width="2.5" opacity="${t}"/>`+good(200,40,'36 分鐘後再一起發車',t,18)+bad(px(6)+20,125,'6',t,13)}]})}

/* 約分到最簡 */
add({id:'simplest',g:'g5',ref:'g5-1-0',title:'約分要約到最簡',desc:'18/24 約成 9/12 就可以停了嗎？',steps:[
 {say:'18/24：一共 24 格，塗了 18 格。',draw:t=>strip(50,40,300,34,24,Math.round(18*t),Y)+T(375,62,'18/24',14)},
 {say:'分子分母都 ÷ 2，兩格併成一格，變成 9/12。可是 9 和 12 還有公因數 3，還能再約！',draw:t=>strip(50,40,300,34,24,18,Y)+T(375,62,'18/24',14)+strip(50,105,300,34,12,9,Y,t)+T(375,127,'9/12',14,INK,'middle',t)+T(200,165,'9 和 12 都能被 3 整除',14,RED,'middle',ck(t,.5,1))},
 {say:'再 ÷ 3，變成 3/4。塗色的長度都一樣；3 和 4 只剩公因數 1，才是最簡分數。也可以一次用最大公因數 6 去約。',draw:t=>strip(50,40,300,34,24,18,Y)+T(375,62,'18/24',14)+strip(50,105,300,34,12,9,Y)+T(375,127,'9/12',14)+strip(50,170,300,34,4,3,Y,t)+T(375,192,'3/4',14,DG,'middle',t)+T(200,228,'18 ÷ 6 ＝ 3，24 ÷ 6 ＝ 4',14,DG,'middle',ck(t,.5,1))}]});

/* 擴分：分子也要乘 */
{const cut=(y,n,o)=>Array.from({length:n-1},(_,i)=>ln(60+280/n*(i+1),y,60+280/n*(i+1),y+34,RED,1.5,o,'3 3')).join('');
add({id:'expand',g:'g5',ref:'g5-1-3',title:'通分：分子也要跟著乘',desc:'1/2 ＝ 1/6 嗎？',steps:[
 {say:'1/2 再切細一點，切成 6 小格。塗色的大小沒變，變成 3 格，所以 1/2 ＝ 3/6：分母 × 3，分子也 × 3。',draw:t=>strip(60,50,280,34,2,1,Y)+cut(50,6,t)+T(35,72,'1/2',15)+T(370,72,'＝ 3/6',15,RED,'middle',t)},
 {say:'1/3 也切成 6 小格，塗色是 2 格：1/3 ＝ 2/6。',draw:t=>strip(60,50,280,34,2,1,Y)+cut(50,6,1)+T(35,72,'1/2',15)+T(370,72,'＝ 3/6',15,RED)+strip(60,110,280,34,3,1,P)+cut(110,6,t)+T(35,132,'1/3',15)+T(370,132,'＝ 2/6',15,RED,'middle',t)},
 {say:'如果只改分母，1/2 變成 1/6，塗色一下子變得好少，大小已經不一樣了。',draw:t=>strip(60,50,280,34,6,3,Y)+T(35,72,'1/2',15)+strip(60,170,280,34,6,1,Y,t)+T(35,192,'1/6？',15,RED,'middle',t)+bad(200,228,'只改分母，大小就變了',t)},
 {say:'分母乘幾，分子也乘幾：1/2 ＋ 1/3 ＝ 3/6 ＋ 2/6 ＝ 5/6。',draw:t=>strip(60,50,280,34,6,3,Y)+strip(60,110,280,34,6,2,P)+T(370,72,'3/6',15,RED)+T(370,132,'2/6',15,RED)+good(200,200,'3/6 ＋ 2/6 ＝ 5/6',t,22)}]})}

/* 乘以比 1 小的數 */
{const pos0=i=>[38+i*29,80],posG=i=>{const g=Math.floor(i/3),j=i%3;return[52+g*92+j*24,80]};
add({id:'multsmall',g:'g5',ref:'g5-2-0',title:'乘法一定越乘越大嗎？',desc:'12 × 3/4 比 12 大還是小？',steps:[
 {say:'12 × 3/4，就是「12 的 3/4」。先拿出 12 片餅乾。',draw:t=>Array.from({length:12},(_,i)=>dot(...pos0(i),Y,11,ck(t,i/12,(i+1)/12))).join('')+T(200,40,'12 × 3/4 ＝ 12 的 3/4',18,INK,'middle',t)},
 {say:'把 12 片平分成 4 份，每份 3 片。',draw:t=>Array.from({length:12},(_,i)=>{const a=pos0(i),b=posG(i);return dot(L(a[0],b[0],t),80,Y,11)}).join('')+[0,1,2,3].map(g=>`<rect x="${36+g*92}" y="60" width="80" height="40" rx="12" fill="none" stroke="${MU}" stroke-dasharray="4 3" opacity="${t}"/>`).join('')},
 {say:'拿其中 3 份，一共 9 片。',draw:t=>Array.from({length:12},(_,i)=>{const[x]=posG(i),take=i<9;return dot(x,take?L(80,150,t):80,take?P:Y,11)}).join('')+[0,1,2,3].map(g=>`<rect x="${36+g*92}" y="60" width="80" height="40" rx="12" fill="none" stroke="${MU}" stroke-dasharray="4 3"/>`).join('')+T(200,195,'9 片',20,RED,'middle',t)},
 {say:'12 × 3/4 ＝ 9，比 12 小！乘以比 1 小的數，答案會變小；乘以比 1 大的數，答案才會變大。',draw:t=>ln(40,110,360,110,INK,2)+[0,9,12].map(v=>ln(40+v*26.7,102,40+v*26.7,118,INK,2)+T(40+v*26.7,138,v,14,MU)).join('')+`<circle cx="${L(360,280,t)}" cy="110" r="8" fill="${P}" stroke="${INK}"/>`+good(200,70,'12 × 3/4 ＝ 9 ＜ 12',t,22)+T(200,190,'× 比 1 小的數 → 變小',16,DG,'middle',ck(t,.5,1))}]})}

/* 「的」就是乘 */
add({id:'ofmult',g:'g5',ref:'g5-2-1',title:'3/4 公尺的 2/3',desc:'「的」要用什麼算？',steps:[
 {say:'先畫 1 公尺，平分成 4 份，塗 3 份，是 3/4 公尺。',draw:t=>strip(60,80,280,40,4,3,Y,t)+T(200,60,'1 公尺',15,MU)+T(165,150,'3/4 公尺',16,INK,'middle',t)},
 {say:'「3/4 公尺的 2/3」：把這 3/4 公尺再平分成 3 份，取其中 2 份。',draw:t=>strip(60,80,280,40,4,3,Y)+T(200,60,'1 公尺',15,MU)+`<rect x="60" y="80" width="${140*t}" height="40" fill="${P}" opacity=".85"/>`+`<path d="M60 132v8h210v-8" fill="none" stroke="${RED}" stroke-width="2"/>`+T(165,160,'平分 3 份，取 2 份',15,RED,'middle',t)},
 {say:'取出來的正好是 1 公尺的一半：2/3 × 3/4 ＝ 6/12 ＝ 1/2 公尺。題目說「的」，就用乘法。',draw:t=>strip(60,80,280,40,4,3,Y)+`<rect x="60" y="80" width="140" height="40" fill="${P}" opacity=".85"/>`+T(200,60,'1 公尺',15,MU)+good(200,170,'2/3 × 3/4 ＝ 6/12 ＝ 1/2（公尺）',t,19)+T(200,205,'「的」就是 ×',16,DG,'middle',ck(t,.5,1))}]});

/* 小數乘法 */
{const g0=60,c=14,cells=(f,cols,rows,o)=>{let s='';for(let i=0;i<cols;i++)for(let j=0;j<rows;j++)s+=`<rect x="${g0+i*c}" y="${40+j*c}" width="${c}" height="${c}" fill="${f}" opacity="${o}"/>`;return s},frame=grid(g0,40,c,0);
add({id:'decmul',g:'g5',ref:'g5-2-3',title:'小數乘法：0.3 × 0.2',desc:'答案是 0.6 還是 0.06？',steps:[
 {say:'一個大正方形當 1，分成 100 小格。直的塗 3 行，是 0.3。',draw:t=>frame+cells(Y,3,10,t)+frame.replace(/fill="#fffdf8"/,'fill="none"')+T(300,80,'0.3',24,INK,'middle',t)},
 {say:'橫的塗 2 列，是 0.2。',draw:t=>frame+cells(Y,3,10,1)+cells(P,10,2,.6*t)+frame.replace(/fill="#fffdf8"/,'fill="none"')+T(300,80,'0.3',24)+T(300,120,'× 0.2',24,INK,'middle',t)},
 {say:'兩次都塗到的，只有 6 小格。一共 100 格，所以 0.3 × 0.2 ＝ 0.06。小數位數 1 ＋ 1 ＝ 2 位。',draw:t=>frame+cells(Y,3,10,1)+cells(P,10,2,.6)+frame.replace(/fill="#fffdf8"/,'fill="none"')+`<rect x="${g0}" y="40" width="${3*c}" height="${2*c}" fill="none" stroke="${RED}" stroke-width="3" opacity="${t}"/>`+T(300,80,'0.3 × 0.2',22)+good(300,125,'＝ 0.06',t,24)+T(300,160,'100 格裡的 6 格',14,MU,'middle',t)+bad(300,190,'0.6',t)}]})}

/* 斜邊不是高 */
{const tri=dx=>`<polygon points="${100+dx},180 ${160+dx},100 ${160+dx},180" fill="${P}" stroke="${INK}" stroke-width="1.5"/>`;
add({id:'slant',g:'g5',ref:'g5-3-1',title:'平行四邊形：斜邊不是高',desc:'底 8、斜邊 5、高 4，用哪兩個數？',steps:[
 {say:'這個平行四邊形底 8、斜邊 5、高 4，面積要用哪兩個數算？',draw:t=>`<polygon points="100,180 260,180 320,100 160,100" fill="${Y}" stroke="${INK}" stroke-width="2" opacity="${t}"/>`+T(180,205,'底 8',15)+T(110,135,'斜邊 5',14,INK,'middle',t)},
 {say:'從頂點畫一條和底垂直的線，這才是高。沿著高剪下左邊的三角形，移到右邊……',draw:t=>`<polygon points="160,180 260,180 320,100 160,100" fill="${Y}" stroke="${INK}" stroke-width="2"/>`+tri(160*t)+ln(160,100,160,180,RED,2.5,1,'6 4')+T(172,145,'高 4',14,RED,'start')+T(180,205,'底 8',15)},
 {say:'變成長 8、寬 4 的長方形，面積是 8 × 4 ＝ 32。高一定和底垂直，斜邊 5 這題用不到。',draw:t=>`<polygon points="160,180 260,180 320,100 160,100" fill="${Y}" stroke="${INK}" stroke-width="2"/>`+tri(160)+T(240,205,'8',15)+T(345,145,'4',15,RED)+good(200,50,'8 × 4 ＝ 32',t,22)+bad(200,76,'8 × 5 ＝ 40',t)}]})}

/* 梯形面積 */
add({id:'trapezoid',g:'g5',ref:'g5-3-2',title:'梯形面積為什麼要加括號',desc:'(上底 ＋ 下底) × 高 ÷ 2 怎麼來？',steps:[
 {say:'梯形上底 3、下底 5、高 4。',draw:t=>`<polygon points="60,190 185,190 160,90 85,90" fill="${Y}" stroke="${INK}" stroke-width="2" opacity="${t}"/>`+T(122,80,'上底 3',14)+T(122,212,'下底 5',14)+ln(85,90,85,190,RED,2,t,'5 4')+T(70,145,'4',14,RED,'middle',t)},
 {say:'再拿一個一模一樣的梯形，轉半圈，拼在旁邊。',draw:t=>`<polygon points="60,190 185,190 160,90 85,90" fill="${Y}" stroke="${INK}" stroke-width="2"/><polygon points="60,190 185,190 160,90 85,90" fill="${P}" stroke="${INK}" stroke-width="2" opacity=".85" transform="rotate(${180*t} 172.5 140)"/>`},
 {say:'拼成一個平行四邊形，底是 3 ＋ 5 ＝ 8，梯形是它的一半：(3 ＋ 5) × 4 ÷ 2 ＝ 16。上底加下底要先算，所以一定要加括號。',draw:t=>`<polygon points="60,190 185,190 160,90 85,90" fill="${Y}" stroke="${INK}" stroke-width="2"/><polygon points="285,90 160,90 185,190 260,190" fill="${P}" stroke="${INK}" stroke-width="2" opacity=".85"/>`+`<path d="M60 200v8h200v-8" fill="none" stroke="${RED}" stroke-width="2"/>`+T(160,226,'3 ＋ 5',14,RED)+good(200,40,'(3 ＋ 5) × 4 ÷ 2 ＝ 16',t,20)+bad(200,66,'3 ＋ 5 × 4 ÷ 2',t)}]});

/* 1 立方公尺 */
{const cube=(h=0,step=0)=>{const x=70,y=80,s=120,dx=50,dy=-40;let o=`<polygon points="${x},${y} ${x+dx},${y+dy} ${x+s+dx},${y+dy} ${x+s},${y}" fill="#fbf3dc" stroke="${INK}" stroke-width="1.5"/><polygon points="${x+s},${y} ${x+s+dx},${y+dy} ${x+s+dx},${y+s+dy} ${x+s},${y+s}" fill="#f6dcd8" stroke="${INK}" stroke-width="1.5"/>`+R(x,y,s,s,W);
  if(step>=1)o+=`<rect x="${x}" y="${y+s-6}" width="${s}" height="6" fill="${RED}"/>`;
  if(h>0){const hh=s*h;o+=`<rect x="${x}" y="${y+s-hh}" width="${s}" height="${hh}" fill="${Y}" opacity=".9"/><polygon points="${x},${y+s-hh} ${x+dx},${y+s-hh+dy} ${x+s+dx},${y+s-hh+dy} ${x+s},${y+s-hh}" fill="${Y}" stroke="${INK}" stroke-width="1"/><polygon points="${x+s},${y+s-hh} ${x+s+dx},${y+s-hh+dy} ${x+s+dx},${y+s+dy} ${x+s},${y+s}" fill="#efc97a" stroke="${INK}" stroke-width="1"/>`}
  return o+`<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="none" stroke="${INK}" stroke-width="2"/>`};
add({id:'m3',g:'g5',ref:'g5-4-0',title:'1 立方公尺 ＝ 幾立方公分？',desc:'長、寬、高都要換成 100。',steps:[
 {say:'邊長 1 公尺的正方體，體積是 1 立方公尺。每一條邊都是 100 公分。',draw:t=>cube()+T(130,222,'100 公分',13,RED,'middle',t)+T(44,140,'100',13,RED,'middle',t)+T(262,80,'100',13,RED,'middle',t)},
 {say:'最下面一排可以放 100 個 1 立方公分的小方塊；一層有 100 排，就是 100 × 100 ＝ 10000 個。',draw:t=>cube(t>.5?.04:0,1)+T(320,90,'一排：100 個',16,RED,'middle',ck(t,0,.4))+T(320,125,'一層：100 × 100',16,INK,'middle',ck(t,.5,.9))+T(320,150,'＝ 10000 個',16,INK,'middle',ck(t,.5,.9))},
 {say:'一層一層往上疊，一共 100 層：1 立方公尺 ＝ 100 × 100 × 100 ＝ 1000000 立方公分，不是 100。',draw:t=>{const k=Math.max(1,Math.round(100*t));return cube(k/100)+T(320,80,`${k} 層`,24)+good(320,130,'100 × 100 × 100',ck(t,.7,1),16)+good(312,158,'＝ 1000000 立方公分',ck(t,.7,1),14)+bad(320,190,'100 立方公分',ck(t,.7,1))}}]})}

/* 百分率 */
add({id:'percent',g:'g5',ref:'g5-5-0',title:'百分率：0.5 是 5% 嗎？',desc:'想成「100 格裡塗幾格」。',steps:[
 {say:'百分率的分母是 100。把一大格分成 100 小格，0.5 就是一半，塗 50 格，是 50%，不是 5%。',draw:t=>grid(50,50,12,Math.round(50*t),Y)+T(290,100,'0.5 ＝ 50/100',20,INK,'middle',t)+good(290,135,'＝ 50%',t,24)+bad(290,170,'5%',t)},
 {say:'3/4：先把 100 格平分成 4 份，每份 25 格；3 份就是 75 格，所以 3/4 ＝ 75%。',draw:t=>grid(50,50,12,Math.round(75*t),P)+T(290,100,'3/4 ＝ 75/100',20,INK,'middle',t)+good(290,135,'＝ 75%',t,24)+bad(290,170,'34%',t)},
 {say:'5% 只塗 5 格，比 0.5 小很多。換成百分率時，就想「100 格裡塗了幾格」。',draw:t=>grid(50,50,12,Math.round(5*t),B)+T(290,110,'5% ＝ 5/100 ＝ 0.05',18,INK,'middle',t)+T(290,145,'只有 5 格',16,MU,'middle',t)}]});

/* 乘除混合從左算 */
{const bag=(x,y,s,f=Y,o=1)=>`<rect x="${x}" y="${y}" width="70" height="56" rx="14" fill="${f}" stroke="${INK}" stroke-width="1.5" opacity="${o}"/>`+T(x+35,y+35,s,18,INK,'middle',o);
add({id:'muldiv',g:'g5',ref:'g5-6-0',title:'乘除混合：48 ÷ 4 × 2',desc:'只有乘和除，從哪裡開始算？',steps:[
 {say:'48 ÷ 4 × 2：只有乘和除，就從左到右依序算。',draw:t=>T(200,80,'48 ÷ 4 × 2',32,INK,'middle',t)+T(200,130,'從左到右 →',18,DG,'middle',t)},
 {say:'48 個點心平分裝成 4 袋，每袋 12 個：48 ÷ 4 ＝ 12。',draw:t=>T(200,50,'48 ÷ 4 ＝ 12',22)+[0,1,2,3].map(i=>bag(30+i*90,90,'12',Y,ck(t,i/4,(i+1)/4))).join('')},
 {say:'再拿 2 袋：12 × 2 ＝ 24。',draw:t=>T(200,50,'12 × 2 ＝ 24',22)+[0,1,2,3].map(i=>bag(30+i*90,i<2?L(90,120,t):90,'12',i<2?P:Y,i<2?1:.4)).join('')+good(200,215,'48 ÷ 4 × 2 ＝ 24',t,20)},
 {say:'如果先算 4 × 2 ＝ 8，就變成「分成 8 袋只拿 1 袋」，題目的意思完全變了，所以 6 是錯的。',draw:t=>good(200,80,'48 ÷ 4 × 2 ＝ 12 × 2 ＝ 24',1,20)+bad(200,130,'48 ÷（4 × 2）＝ 6',t,18)}]})}

/* 連除 */
add({id:'condiv',g:'g5',ref:'g5-6-2',title:'連除：360 ÷ 6 ÷ 5',desc:'連除兩個數，等於除以什麼？',steps:[
 {say:'360 元平分給 6 組，每組 60 元。',draw:t=>`<rect x="140" y="20" width="120" height="40" rx="12" fill="${Y}" stroke="${INK}" stroke-width="1.5"/>`+T(200,46,'360 元',17)+Array.from({length:6},(_,i)=>`<rect x="${22+i*61}" y="90" width="52" height="40" rx="10" fill="${P}" stroke="${INK}" stroke-width="1.5" opacity="${ck(t,i/6,(i+1)/6)}"/>`+T(48+i*61,116,'60',15,INK,'middle',ck(t,i/6,(i+1)/6))).join('')},
 {say:'每組再平分給 5 個人：60 ÷ 5 ＝ 12，每人 12 元。',draw:t=>`<rect x="140" y="20" width="120" height="40" rx="12" fill="${Y}" stroke="${INK}" stroke-width="1.5"/>`+T(200,46,'360 元',17)+Array.from({length:6},(_,i)=>`<rect x="${22+i*61}" y="90" width="52" height="40" rx="10" fill="${P}" stroke="${INK}" stroke-width="1.5"/>`+T(48+i*61,116,'60',15)+Array.from({length:5},(_,j)=>`<circle cx="${28+i*61+j*10}" cy="150" r="4.5" fill="${B}" stroke="${INK}" opacity="${t}"/>`).join('')).join('')+T(200,180,'每人 12 元',16,RED,'middle',t)},
 {say:'其實就是平分給 6 × 5 ＝ 30 個人：360 ÷ 6 ÷ 5 ＝ 360 ÷（6 × 5）＝ 12。連除兩個數，等於除以它們的「積」，括號裡是乘，不是除。',draw:t=>good(200,70,'360 ÷ 6 ÷ 5',1,22)+good(200,110,'＝ 360 ÷（6 × 5）＝ 360 ÷ 30 ＝ 12',t,17)+bad(200,160,'360 ÷（6 ÷ 5）',t,17)}]});

/* 去括號：減一包 */
{const u=3,bar=(o30=1,back=0)=>R(50,80,100*u,36,Y)+`<rect x="${50+70*u}" y="80" width="${30*u}" height="36" fill="${W}" stroke="${RED}" stroke-width="2" stroke-dasharray="5 4" opacity="${o30}"/>`+`<rect x="${50+70*u}" y="80" width="${10*u*back}" height="36" fill="${G}" stroke="${INK}" stroke-width="1.5" opacity="${back?1:0}"/>`+T(200,70,'100 元',15,MU);
add({id:'minuspar',g:'g5',ref:'g5-6-3',title:'去括號：100 －（30 － 10）',desc:'括號拿掉後，裡面的符號要不要變？',steps:[
 {say:'帶 100 元，買 30 元的東西，有一張 10 元折價券，只要付（30 － 10）元。',draw:t=>R(50,80,300,36,Y)+T(200,70,'100 元',15,MU)+T(200,170,'100 －（30 － 10）',24,INK,'middle',t)},
 {say:'先想成付了 30 元；可是折價券省了 10 元，這 10 元要「加回來」。',draw:t=>bar(t,ck(t,.5,1))+T(305,140,'－30',15,RED,'middle',t)+T(245,140,'＋10',15,DG,'middle',ck(t,.5,1))},
 {say:'所以 100 －（30 － 10）＝ 100 － 30 ＋ 10 ＝ 80。去括號時，減號後面括號裡的「－」要變成「＋」。',draw:t=>bar(1,1)+T(305,140,'－30',15,RED)+T(245,140,'＋10',15,DG)+good(200,185,'100 － 30 ＋ 10 ＝ 80',t,21)+bad(200,215,'100 － 30 － 10 ＝ 60',t)}]})}

/* 99 × 25 */
{const coins=(miss=0)=>{let s='';for(let i=0;i<100;i++){const x=40+(i%10)*16,y=40+Math.floor(i/10)*16;s+=`<rect x="${x}" y="${y}" width="14" height="14" rx="3" fill="${i===99?P:Y}" stroke="${INK}" stroke-width=".8" opacity="${i===99?1-miss*.8:1}"/>`}return s+(miss?X(40+9*16+7,40+9*16+7,8,miss):'')};
add({id:'near100',g:'g5',ref:'g5-6-6',title:'簡化計算：99 × 25',desc:'湊成 100 之後，要減掉什麼？',steps:[
 {say:'99 × 25，就是 99 個 25。先想 100 個 25：100 × 25 ＝ 2500。每一小格代表一個 25。',draw:t=>Gp(t,coins())+T(295,90,'100 個 25',18)+T(295,120,'＝ 2500',20,INK,'middle',t)},
 {say:'99 個 25，就是 100 個 25 少了「1 個 25」。',draw:t=>coins(t)+T(295,90,'99 個 25',18)+T(295,120,'＝ 100 個 25',16)+T(295,145,'－ 1 個 25',16,RED,'middle',t)},
 {say:'所以 99 × 25 ＝ 2500 － 25 ＝ 2475。少的是 1 個 25，不是 1，所以 2500 － 1 是錯的。',draw:t=>coins(1)+good(295,100,'2500 － 25',t,18)+good(295,128,'＝ 2475',t,20)+bad(295,170,'2500 － 1',t)}]})}
}
