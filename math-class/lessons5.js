/* 黑板動畫課（五）：六年級，最後依年級和單元排序 */
{const {Y,P,G,B,INK,W,MU,RED,DG,L,T,R,pie,ck,ln,strip,C,Fr,X,Gp,bad,good,grid}=window.LZ;const add=o=>window.LESSONS.push(o);
const dot=(x,y,f=Y,r=9,o=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${INK}" stroke-width="1.2" opacity="${o}"/>`;

/* 短除法 */
{const rowA=o=>Gp(o,T(110,70,'2',22)+ln(125,48,125,82,INK,2)+T(165,70,'12',22)+T(225,70,'18',22)+ln(125,82,255,82,INK,2)),
 rowB=o=>Gp(o,T(110,112,'3',22)+ln(125,90,125,124,INK,2)+T(165,112,'6',22)+T(225,112,'9',22)+ln(125,124,255,124,INK,2)),
 rowC=o=>Gp(o,T(165,154,'2',22)+T(225,154,'3',22));
add({id:'shortdiv',g:'g6',ref:'g6-0-0',title:'短除法：最大公因數和最小公倍數',desc:'哪些數要乘起來？',steps:[
 {say:'12 和 18 先同除以 2，得到 6 和 9；再同除以 3，得到 2 和 3。2 和 3 沒有公因數了，就停。',draw:t=>rowA(ck(t,0,.35))+rowB(ck(t,.35,.7))+rowC(ck(t,.7,1))},
 {say:'最大公因數：只乘左邊的除數，2 × 3 ＝ 6。',draw:t=>rowA(1)+rowB(1)+rowC(1)+`<rect x="96" y="46" width="28" height="76" rx="10" fill="none" stroke="${DG}" stroke-width="3" opacity="${t}"/>`+good(320,80,'最大公因數',t,15)+good(320,105,'2 × 3 ＝ 6',t,18)},
 {say:'最小公倍數：乘「L 形」，左邊的 2、3，再乘下面剩下的 2、3：2 × 3 × 2 × 3 ＝ 36。只乘左邊就少乘了。',draw:t=>rowA(1)+rowB(1)+rowC(1)+`<path d="M96 46H124V134H250V166H96Z" fill="none" stroke="${RED}" stroke-width="3" stroke-linejoin="round" opacity="${t}"/>`+good(320,130,'最小公倍數',t,15)+good(320,156,'2×3×2×3 ＝ 36',t,17)+bad(200,205,'只乘左邊 2 × 3 ＝ 6',t)}]})}

/* 6 ÷ 1/2 */
{const cx=i=>60+i*56;
add({id:'divhalf',g:'g6',ref:'g6-1-0',title:'6 ÷ 1/2 是多少？',desc:'除法一定越除越小嗎？',steps:[
 {say:'6 ÷ 1/2 的意思是：6 裡面有幾個 1/2？先拿出 6 個披薩。',draw:t=>Array.from({length:6},(_,i)=>pie(cx(i),100,24,1,[Y],[ck(t,i/6,(i+1)/6)])).join('')+T(200,50,'6 裡面有幾個 1/2？',18,INK,'middle',t)},
 {say:'每個披薩都切成一半，一半一半數……',draw:t=>Array.from({length:6},(_,i)=>pie(cx(i),100,24,2,[Y,P])).join('')+Array.from({length:12},(_,k)=>T(cx(Math.floor(k/2))+(k%2?-12:12),105,k+1,12,INK,'middle',ck(t,k/12,(k+1)/12))).join('')},
 {say:'一共 12 個半個，所以 6 ÷ 1/2 ＝ 12，不是 3。除以比 1 小的數，答案反而變大；「除以 1/2」和「除以 2」不一樣。',draw:t=>Array.from({length:6},(_,i)=>pie(cx(i),100,24,2,[Y,P])).join('')+good(200,170,'6 ÷ 1/2 ＝ 12',t,24)+bad(200,205,'6 ÷ 1/2 ＝ 3',t)}]})}

/* 分數除法顛倒 */
add({id:'recip',g:'g6',ref:'g6-1-1',title:'分數除法：顛倒哪一個？',desc:'3/4 ÷ 2/5，誰要上下顛倒？',steps:[
 {say:'3/4 ÷ 2/5：被除數不動，除號變成乘號，除數上下顛倒。',draw:t=>Fr(110,80,3,4,INK,1,26)+T(175,90,'÷',28)+Fr(240,80,2,5,INK,1,26)+T(110,150,'被除數',13,MU,'middle',t)+T(240,150,'除數',13,MU,'middle',t)},
 {say:'3/4 不動；÷ 變 ×；2/5 翻過來變成 5/2。',draw:t=>`<rect x="82" y="44" width="56" height="78" rx="10" fill="none" stroke="${DG}" stroke-width="2" opacity="${t}"/>`+Fr(110,80,3,4,INK,1,26)+T(175,90,'÷',28,INK,'middle',1-t)+T(175,90,'×',28,RED,'middle',t)+T(240,L(74,106,t),'2',26,RED)+ln(222,80,258,80,INK,2)+T(240,L(106,74,t),'5',26,RED)+T(110,150,'不動',13,DG,'middle',t)+T(240,150,'顛倒',13,RED,'middle',t)},
 {say:'3 × 5 ＝ 15，4 × 2 ＝ 8，答案是 15/8 ＝ 1 又 7/8。',draw:t=>Fr(110,80,3,4,INK,1,26)+T(175,90,'×',28,RED)+Fr(240,80,5,2,RED,1,26)+T(290,90,'＝',26,INK,'middle',t)+Fr(340,80,15,8,INK,t,26)+good(200,175,'＝ 1 又 7/8',t,20)},
 {say:'用乘回去驗算：15/8 × 2/5 ＝ 30/40 ＝ 3/4，對了！要顛倒的是後面的除數，不是前面的被除數。',draw:t=>good(200,70,'驗算：15/8 × 2/5 ＝ 30/40 ＝ 3/4　✓',1,17)+bad(200,130,'4/3 × 2/5（顛倒錯了）',t,17)+T(200,185,'除數顛倒，被除數不動',18,DG,'middle',t)}]});

/* 比的順序 */
{const girls=o=>Array.from({length:18},(_,i)=>dot(40+(i%6)*24,70+Math.floor(i/6)*28,P,9,o)).join(''),boys=o=>Array.from({length:12},(_,i)=>dot(240+(i%6)*24,70+Math.floor(i/6)*28,B,9,o)).join('');
add({id:'ratioorder',g:'g6',ref:'g6-2-0',title:'比的前後順序',desc:'「女生和男生的比」誰寫前面？',steps:[
 {say:'女生 18 人，男生 12 人。',draw:t=>girls(t)+boys(t)+T(100,45,'女生 18 人',15)+T(300,45,'男生 12 人',15)},
 {say:'題目問「女生和男生的比」：先說女生，女生就寫在前面，是 18 ： 12。',draw:t=>girls(1)+boys(1)+T(100,45,'女生 18 人',15)+T(300,45,'男生 12 人',15)+good(200,190,'女生 ： 男生 ＝ 18 ： 12',t,20)},
 {say:'每 6 人圈成一組，女生 3 組、男生 2 組，最簡整數比是 3 ： 2。寫成 12 ： 18，就變成「男生和女生的比」了。',draw:t=>girls(1)+boys(1)+[0,1,2].map(r=>`<rect x="28" y="${58+r*28}" width="144" height="24" rx="12" fill="none" stroke="${RED}" stroke-width="2" opacity="${t}"/>`).join('')+[0,1].map(r=>`<rect x="228" y="${58+r*28}" width="144" height="24" rx="12" fill="none" stroke="${RED}" stroke-width="2" opacity="${t}"/>`).join('')+good(200,180,'18 ： 12 ＝ 3 ： 2',t,20)+bad(200,214,'12 ： 18',t)}]})}

/* 基準量 */
{const w=56,B_=(lab=0)=>strip(60,60,5*w,34,5,0)+T(200,48,'B（基準量，當作 1）',14,MU)+(lab?[0,1,2,3,4].map(i=>T(60+w*i+w/2,83,'4',15,RED,'middle',lab)).join(''):'');
add({id:'baseqty',g:'g6',ref:'g6-2-2',title:'基準量：A 是 B 的 3/5',desc:'已知 A，怎麼求 B？',steps:[
 {say:'「A 是 B 的 3/5」：「是」後面的 B 是基準量，把 B 當作 1，平分成 5 份。',draw:t=>Gp(t,B_())},
 {say:'假設 A ＝ 12。A 是其中 3 份，所以 1 份是 12 ÷ 3 ＝ 4。',draw:t=>B_()+`<rect x="60" y="130" width="${3*w*t}" height="34" fill="${P}" stroke="${INK}" stroke-width="1.5"/>`+T(30,152,'A',16)+T(60+1.5*w,186,'A ＝ 12（3 份）',14,INK,'middle',t)+T(310,152,'1 份 ＝ 4',15,RED,'middle',ck(t,.5,1))},
 {say:'B 有 5 份：4 × 5 ＝ 20，也就是 12 ÷ 3/5 ＝ 20。B 比 A 大，用 12 × 3/5 算出比 12 還小的數，一定錯了。',draw:t=>B_(t)+`<rect x="60" y="130" width="${3*w}" height="34" fill="${P}" stroke="${INK}" stroke-width="1.5"/>`+T(30,152,'A',16)+T(60+1.5*w,186,'A ＝ 12',14)+good(200,215,'B ＝ 4 × 5 ＝ 20 ＝ 12 ÷ 3/5',t,17)+bad(200,236,'12 × 3/5',t,13)}]})}

/* 時速換分速 */
add({id:'speedunit',g:'g6',ref:'g6-3-0',title:'時速 60 公里 ＝ 分速幾公里？',desc:'1 小時是 60 分，不是 100 分。',steps:[
 {say:'時速 60 公里：1 小時走 60 公里。',draw:t=>ln(40,110,360,110,INK,3)+T(40,135,'0',13,MU)+T(360,135,'60 公里',13,MU)+`<rect x="${L(28,340,t)}" y="92" width="26" height="14" rx="4" fill="${P}" stroke="${INK}"/>`+T(200,60,'1 小時',18)},
 {say:'1 小時是 60 分鐘。把 60 公里平分給 60 分鐘，每分鐘走 1 公里。',draw:t=>ln(40,110,360,110,INK,3)+Array.from({length:61},(_,i)=>ln(40+i*320/60,i%10?104:98,40+i*320/60,116,INK,1,ck(t,i/61,(i+1)/61))).join('')+`<rect x="40" y="120" width="${320/60}" height="12" fill="${RED}" opacity="${t}"/>`+T(110,160,'1 分鐘 → 1 公里',16,RED,'middle',t)+T(200,60,'60 公里 ÷ 60 分',18)},
 {say:'所以時速 60 公里 ＝ 分速 1 公里。寫成分速 0.6 公里，是把 1 小時當成 100 分了。',draw:t=>good(200,90,'時速 60 公里 ＝ 分速 1 公里',t,20)+bad(200,140,'分速 0.6 公里（1 小時不是 100 分）',t,16)}]});

/* 平均速率 */
add({id:'avgspeed',g:'g6',ref:'g6-3-1',title:'平均速率不是兩個速率的平均',desc:'去程時速 60、回程時速 40，平均時速是 50 嗎？',steps:[
 {say:'假設單程是 120 公里。去程時速 60，要走 120 ÷ 60 ＝ 2 小時。',draw:t=>T(40,60,'家',15)+T(360,60,'外婆家',15)+ln(60,80,60+280*t,80,RED,4)+T(200,104,'去：時速 60，2 小時',15,RED,'middle',t)},
 {say:'回程時速 40，要走 120 ÷ 40 ＝ 3 小時，比較久。',draw:t=>T(40,60,'家',15)+T(360,60,'外婆家',15)+ln(60,80,340,80,RED,4)+T(200,104,'去：時速 60，2 小時',15,RED)+ln(340,140,340-280*t,140,DG,4)+T(200,164,'回：時速 40，3 小時',15,DG,'middle',t)},
 {say:'來回一共 240 公里、5 小時，平均時速 ＝ 240 ÷ 5 ＝ 48。比較慢的回程花的時間多，所以平均會比 50 小。',draw:t=>good(200,80,'總距離 ÷ 總時間',1,18)+good(200,120,'＝ 240 ÷ 5 ＝ 48（公里／時）',t,20)+bad(200,170,'（60 ＋ 40）÷ 2 ＝ 50',t,17)}]});

/* 半徑、直徑 */
add({id:'diameter',g:'g6',ref:'g6-4-1',title:'題目給直徑，先變半徑',desc:'直徑 10 的圓，面積怎麼算？',steps:[
 {say:'題目給的是直徑 10。先圈起來：這是直徑，還是半徑？',draw:t=>`<circle cx="120" cy="120" r="80" fill="${Y}" stroke="${INK}" stroke-width="2"/>`+ln(40,120,40+160*t,120,RED,3)+T(120,112,'直徑 10',15,RED,'middle',t)},
 {say:'半徑是直徑的一半：10 ÷ 2 ＝ 5。',draw:t=>`<circle cx="120" cy="120" r="80" fill="${Y}" stroke="${INK}" stroke-width="2"/>`+ln(40,120,200,120,RED,2,1-t*.6)+ln(120,120,200,120,DG,4,t)+T(160,140,'半徑 5',15,DG,'middle',t)+`<circle cx="120" cy="120" r="4" fill="${INK}"/>`},
 {say:'面積 ＝ 半徑 × 半徑 × 3.14 ＝ 5 × 5 × 3.14 ＝ 78.5。直接用 10 × 10 × 3.14 ＝ 314，會變成 4 倍那麼大。',draw:t=>`<circle cx="120" cy="120" r="80" fill="${Y}" stroke="${INK}" stroke-width="2"/>`+ln(120,120,200,120,DG,4)+T(160,140,'5',15,DG)+good(305,100,'5 × 5 × 3.14',t,17)+good(305,128,'＝ 78.5',t,20)+bad(305,175,'10 × 10 × 3.14',t)}]});

/* 比例尺 */
add({id:'scale',g:'g6',ref:'g6-5-2',title:'比例尺換算',desc:'1 ： 1000，圖上 5 公分是實際幾公尺？',steps:[
 {say:'比例尺 1 ： 1000：圖上 1 公分，代表實際 1000 公分。',draw:t=>`<rect x="30" y="50" width="170" height="140" rx="8" fill="#f6efe0" stroke="${INK}" stroke-width="1.5"/>`+ln(50,120,50+130*t,120,RED,4)+T(115,145,'圖上 5 公分',14,RED,'middle',t)+T(300,90,'比例尺 1 ： 1000',17)},
 {say:'圖上 5 公分 ＝ 實際 5 × 1000 ＝ 5000 公分。注意，單位還是「公分」！',draw:t=>`<rect x="30" y="50" width="170" height="140" rx="8" fill="#f6efe0" stroke="${INK}" stroke-width="1.5"/>`+ln(50,120,180,120,RED,4)+T(115,145,'圖上 5 公分',14,RED)+T(300,90,'比例尺 1 ： 1000',17)+T(300,130,'5 × 1000',18,INK,'middle',t)+T(300,158,'＝ 5000 公分',18,RED,'middle',t)},
 {say:'再換成公尺：100 公分 ＝ 1 公尺，5000 ÷ 100 ＝ 50 公尺。',draw:t=>`<rect x="30" y="50" width="170" height="140" rx="8" fill="#f6efe0" stroke="${INK}" stroke-width="1.5"/>`+ln(50,120,180,120,RED,4)+T(115,145,'圖上 5 公分',14,RED)+T(300,90,'5000 公分',18)+good(300,130,'＝ 50 公尺',t,22)+bad(300,170,'5000 公尺',t)}]});

/* 天平解未知數 */
{ const W8=(x,y,o=1,dy=0)=>dot(x,y-dy,G,7,o);
 const left=(o5=1,dy=0)=>`<rect x="56" y="114" width="34" height="34" rx="6" fill="${P}" stroke="${INK}" stroke-width="1.5"/>`+T(73,138,'x',18)+Array.from({length:5},(_,i)=>W8(102+(i%3)*16,142-Math.floor(i/3)*15,o5,dy)).join('');
 const right=(o5=1,dy=0)=>Array.from({length:12},(_,i)=>W8(240+(i%6)*18,142-Math.floor(i/6)*15,i<5?o5:1,i<5?dy:0)).join('');
 const beam=`<polygon points="200,92 184,206 216,206" fill="${MU}"/>`+ln(70,92,330,92,INK,4)+ln(80,92,60,150,MU,1.2)+ln(140,92,160,150,MU,1.2)+ln(260,92,240,150,MU,1.2)+ln(320,92,340,150,MU,1.2)+`<path d="M50 150h120M230 150h120" stroke="${INK}" stroke-width="3"/>`;
add({id:'balance',g:'g6',ref:'g6-5-3',title:'解未知數：x ＋ 5 ＝ 12',desc:'移項為什麼要用相反的運算？',steps:[
 {say:'把 x ＋ 5 ＝ 12 想成天平：左邊是 x 和 5 顆砝碼，右邊是 12 顆砝碼，兩邊一樣重。',draw:t=>beam+Gp(t,left()+right())+T(200,40,'x ＋ 5 ＝ 12',22)},
 {say:'兩邊同時拿掉 5 顆，天平還是平的。',draw:t=>beam+left(1-t,60*t)+right(1-t,60*t)+T(200,40,'兩邊同時 － 5',20,RED)},
 {say:'左邊剩下 x，右邊剩下 7 顆，所以 x ＝ 12 － 5 ＝ 7。「加的」要用「減的」還原；驗算 7 ＋ 5 ＝ 12。',draw:t=>beam+left(0)+right(0)+good(200,40,'x ＝ 12 － 5 ＝ 7',t,22)+bad(200,230,'x ＝ 12 ＋ 5',t)}]})}

/* 植樹問題 */
{const tree=(x,o=1)=>Gp(o,`<rect x="${x-3}" y="120" width="6" height="16" fill="#a07c5b"/><polygon points="${x},88 ${x-14},122 ${x+14},122" fill="${G}" stroke="${INK}" stroke-width="1.2"/>`);
 const xs=[60,153,247,340];
add({id:'trees',g:'g6',ref:'g6-5-4',title:'植樹問題：棵數和間隔數',desc:'兩端都種，要種幾棵？',steps:[
 {say:'先畫小一點的例子：30 公尺的路，每 10 公尺種一棵，兩端都種。',draw:t=>ln(40,136,360,136,INK,3)+xs.map((x,i)=>tree(x,ck(t,i/4,(i+1)/4))).join('')+[0,1,2].map(i=>T((xs[i]+xs[i+1])/2,160,'10 公尺',12,MU)).join('')},
 {say:'數數看：間隔有 3 個，樹有 4 棵。兩端都種時，棵數 ＝ 間隔數 ＋ 1。',draw:t=>ln(40,136,360,136,INK,3)+xs.map(x=>tree(x)).join('')+[0,1,2].map(i=>T((xs[i]+xs[i+1])/2,160,`間隔 ${i+1}`,13,RED,'middle',t)).join('')+xs.map((x,i)=>T(x,80,`${i+1}`,15,DG,'middle',t)).join('')+good(200,205,'棵數 ＝ 間隔數 ＋ 1',ck(t,.5,1),19)},
 {say:'100 公尺：間隔數 ＝ 100 ÷ 10 ＝ 10 個，棵數 ＝ 10 ＋ 1 ＝ 11 棵。10 棵是把間隔數當成棵數了。',draw:t=>good(200,80,'間隔數：100 ÷ 10 ＝ 10',1,19)+good(200,125,'棵數：10 ＋ 1 ＝ 11（棵）',t,21)+bad(200,175,'10 棵',t)}]})}

/* 分數四則：先乘後加 */
add({id:'fracorder',g:'g6',ref:'g6-6-0',title:'分數四則：1/2 ＋ 1/2 × 4',desc:'分數也要先乘除後加減。',steps:[
 {say:'1/2 ＋ 1/2 × 4：有加也有乘，和整數一樣，先算乘法。',draw:t=>T(200,90,'1/2 ＋ 1/2 × 4',30,INK,'middle',t)+ln(222,104,322,104,RED,3,t)},
 {say:'1/2 × 4 是 4 個半圓，兩個半圓拼成一個整圓，所以是 2 個整圓。',draw:t=>[0,1].map(k=>`<path d="M0 -36A36 36 0 0 1 0 36Z" transform="translate(${150+k*110+L(30,0,t)} 110)" fill="${Y}" stroke="${INK}" stroke-width="1.5"/><path d="M0 -36A36 36 0 0 0 0 36Z" transform="translate(${150+k*110-L(30,0,t)} 110)" fill="${P}" stroke="${INK}" stroke-width="1.5"/>`).join('')+T(200,190,'1/2 × 4 ＝ 2',20,RED,'middle',t)},
 {say:'再加前面的 1/2：1/2 ＋ 2 ＝ 2 又 1/2。如果先算 1/2 ＋ 1/2 再乘 4，就變成 4，算錯了。',draw:t=>good(200,80,'1/2 ＋ 1/2 × 4',1,22)+good(200,125,'＝ 1/2 ＋ 2 ＝ 2 又 1/2',t,22)+bad(200,175,'（1/2 ＋ 1/2）× 4 ＝ 4',t,17)}]});

/* 依年級、單元排序 */
const GO={g3:0,g4:1,g5:2,g6:3,all:4},key=l=>{const[g,u,i]=l.ref.split('-');return[GO[g]??9,+u,+i]};
window.LESSONS.sort((a,b)=>{const A=key(a),B2=key(b);return A[0]-B2[0]||A[1]-B2[1]||A[2]-B2[2]});
}
