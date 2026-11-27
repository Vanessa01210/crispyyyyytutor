/* 黑板動畫課（二）：三年級＋跨年級 */
{const {Y,P,G,B,INK,W,MU,RED,DG,L,T,R,pie,ck,ln,strip,C,Fr,X,Gp,bad,good,grid}=window.LZ;const add=o=>window.LESSONS.push(o);

/* 位值：三千零五 */
{const board=(v,o=[])=>['千','百','十','個'].map((h,i)=>{const c=v[i]==null?null:(typeof v[i]==='string'?[v[i]]:v[i]);return R(80+i*60,80,60,70,W)+T(110+i*60,70,h,16,MU)+(c?T(110+i*60,128,c[0],36,c[1]||INK,'middle',o[i]??1):'')}).join('');
add({id:'place0',g:'g3',ref:'g3-0-0',title:'寫數字：三千零五',desc:'空著的位為什麼要補 0？',steps:[
 {say:'寫數字前，先畫定位板：千、百、十、個。每一格最後都要放一個數字。',draw:t=>Gp(t,board([]))+T(200,200,'「三千零五」怎麼寫？',20,INK,'middle',t)},
 {say:'「三千」：千位放 3。',draw:t=>board(['3'],[t])+T(200,200,'三千 → 千位放 3',18,INK,'middle',t)},
 {say:'「零五」：個位放 5。百位和十位沒有東西，先空著。',draw:t=>board(['3',null,null,'5'],[1,0,0,t])+T(200,200,'零五 → 個位放 5',18,INK,'middle',t)},
 {say:'空著的位一定要補 0，所以三千零五是 3005。寫成 305 少了一位，寫成 30005 多了一位。',draw:t=>board(['3',['0',RED],['0',RED],'5'],[1,t,t,1])+good(200,195,'三千零五 ＝ 3005',1,22)+bad(200,225,'305、30005',t)}]})}

/* 乘法進位：27 × 3 */
{const base=C('27',240,90)+T(175,130,'×',30)+C('3',240,130)+ln(150,145,260,145);
add({id:'carry3',g:'g3',ref:'g3-2-0',title:'乘法進位：27 × 3',desc:'進位的數，什麼時候加？',steps:[
 {say:'27 × 3：先算個位，3 × 7 ＝ 21。',draw:t=>base+T(330,90,'3 × 7 ＝ 21',17,RED,'middle',t)},
 {say:'21 的 1 寫在個位，2 要進位，小小的寫在十位上面。',draw:t=>base+C('1',240,185,INK,t)+T(210,58,'2',17,RED,'middle',t)+T(330,90,'3 × 7 ＝ 21',17,RED)},
 {say:'再算十位：先乘，3 × 2 ＝ 6；再加進位的 2，6 ＋ 2 ＝ 8。',draw:t=>base+C('1',240,185)+T(210,58,'2',17,RED)+C('8',210,185,INK,ck(t,.5,1))+T(322,120,'先乘 3 × 2 ＝ 6',16,RED,'middle',t)+T(322,148,'再加 6 ＋ 2 ＝ 8',16,RED,'middle',ck(t,.4,1))},
 {say:'答案是 81。口訣「先乘，再加進位」。如果先加再乘，(2 ＋ 2) × 3 就算錯了。',draw:t=>base+C('81',240,185)+T(210,58,'2',17,RED)+good(330,120,'27 × 3 ＝ 81',t,18)+bad(330,150,'(2＋2)×3',t)}]})}

/* 商中間的 0：412 ÷ 4 */
{const qb=(v=[])=>['百','十','個'].map((h,i)=>{const c=v[i]==null?null:(typeof v[i]==='string'?[v[i]]:v[i]);return R(160+i*40,196,34,30,W)+T(177+i*40,238,h,11,MU)+(c?T(177+i*40,219,c[0],20,c[1]||INK):'')}).join('')+T(140,217,'商',15,MU);
 const kid=p=>`<rect x="${40+p*85}" y="88" width="66" height="96" rx="10" fill="${W}" stroke="${MU}" stroke-dasharray="4 3"/>`+T(73+p*85,104,`${p+1} 號`,12,MU);
 const kids=[0,1,2,3].map(kid).join('');
 const sq=(x,y,o=1)=>`<rect x="${x}" y="${y}" width="26" height="26" fill="${Y}" stroke="${INK}" stroke-width="1.2" opacity="${o}"/>`;
 const bar=(x,y,o=1)=>`<rect x="${x}" y="${y}" width="9" height="26" fill="${P}" stroke="${INK}" stroke-width="1.2" opacity="${o}"/>`;
 const dot=(x,y,o=1)=>`<circle cx="${x}" cy="${y}" r="5" fill="${B}" stroke="${INK}" opacity="${o}"/>`;
 const sqAt=(p,t)=>sq(L(30+p*32,60+p*85,t),L(30,114,t));
 const poolDot=k=>[230+(k%6)*14,38+Math.floor(k/6)*14],kidDot=k=>{const p=k%4,j=Math.floor(k/4);return[58+p*85+j*14,162]};
add({id:'quot0',g:'g3',ref:'g3-3-0',title:'商的中間有 0：412 ÷ 4',desc:'不夠除的那一位，商要寫什麼？',steps:[
 {say:'412 是 4 個百、1 個十、2 個一，要平分給 4 個人。',draw:t=>kids+Gp(t,[0,1,2,3].map(p=>sqAt(p,0)).join('')+bar(170,30)+dot(200,43)+dot(214,43))+qb()},
 {say:'4 個百平分給 4 人，每人 1 個百，商的百位寫 1。',draw:t=>kids+[0,1,2,3].map(p=>sqAt(p,t)).join('')+bar(170,30)+dot(200,43)+dot(214,43)+qb([['1',INK]].map(x=>t>.6?x:null))},
 {say:'剩下 1 個十，不夠分給 4 個人，十位的商要寫 0！再把 1 個十換成 10 個一，和原本的 2 個一合起來是 12 個一。',draw:t=>kids+[0,1,2,3].map(p=>sqAt(p,1)).join('')+bar(170,30,1-t)+Array.from({length:12},(_,k)=>{const[x,y]=poolDot(k);return dot(x,y,k<10?t:1)}).join('')+qb(['1',['0',RED]])},
 {say:'12 個一平分給 4 人，每人 3 個。商是 103，不是 13。用乘法驗算：103 × 4 ＝ 412。',draw:t=>kids+[0,1,2,3].map(p=>sqAt(p,1)).join('')+Array.from({length:12},(_,k)=>{const a=poolDot(k),b=kidDot(k);return dot(L(a[0],b[0],t),L(a[1],b[1],t))}).join('')+qb(['1',['0',RED],t>.7?'3':null])+T(330,217,'103 × 4 ＝ 412',13,DG,'middle',ck(t,.7,1))}]})}

/* 量長度：終點 － 起點 */
{const X0=40,U=32,x=v=>X0+v*U;
 const ruler=`<rect x="${X0-10}" y="122" width="${10*U+20}" height="34" fill="${W}" stroke="${INK}" stroke-width="1.5" rx="3"/>`+Array.from({length:11},(_,i)=>ln(x(i),122,x(i),140,INK,1.5)+T(x(i),172,i,13,MU)).join('')+Array.from({length:10},(_,i)=>ln(x(i)+U/2,122,x(i)+U/2,132,INK,1)).join('');
 const pencil=(o=1)=>Gp(o,`<rect x="${x(2)}" y="98" width="${5*U-14}" height="18" fill="${Y}" stroke="${INK}" stroke-width="1.5"/><polygon points="${x(7)-14},98 ${x(7)},107 ${x(7)-14},116" fill="${W}" stroke="${INK}" stroke-width="1.5"/>`+ln(x(2),92,x(2),122,RED,1.5,1,'3 3')+ln(x(7),92,x(7),122,RED,1.5,1,'3 3'));
add({id:'ruler',g:'g3',ref:'g3-4-0',title:'量長度：沒從 0 開始',desc:'東西不是從 0 放起，怎麼讀？',steps:[
 {say:'鉛筆從刻度 2 放到刻度 7，它是 7 公分嗎？',draw:t=>ruler+pencil(t)+T(200,60,'這枝鉛筆有幾公分？',18,INK,'middle',t)},
 {say:'一格一格數：從 2 到 7，一共 5 格，每格 1 公分。',draw:t=>ruler+pencil()+[0,1,2,3,4].map(k=>{const o=ck(t,k/5,(k+1)/5);return`<rect x="${x(2+k)}" y="140" width="${U}" height="16" fill="${P}" opacity="${o*.8}"/>`+T(x(2+k)+U/2,86,k+1,15,RED,'middle',o)}).join('')},
 {say:'長度是「從哪裡到哪裡」：終點 7 － 起點 2 ＝ 5 公分。',draw:t=>ruler+pencil()+[0,1,2,3,4].map(k=>`<rect x="${x(2+k)}" y="140" width="${U}" height="16" fill="${P}" opacity=".8"/>`).join('')+good(200,214,'7 － 2 ＝ 5（公分）',t,22)+bad(200,236,'7 公分',t)}]})}

/* 時間借位：60 不是 100 */
{const row=(y,h,m,hc=INK,mc=INK,o=1)=>Gp(o,T(170,y,h,28,hc)+T(198,y,'時',18,MU)+T(258,y,m,28,mc)+T(292,y,'分',18,MU));
 const base=(hc,mc)=>row(80,'3','20',hc,mc)+T(122,124,'－',26)+row(124,'1','45')+ln(110,140,310,140);
add({id:'timeborrow',g:'g3',ref:'g3-4-1',title:'時間借位：3 時 20 分 － 1 時 45 分',desc:'借 1 小時，是借 60 還是 100？',steps:[
 {say:'20 分不夠減 45 分，要向「時」借 1。',draw:t=>base(INK,RED)+T(350,80,'不夠減！',15,RED,'middle',t)},
 {say:'借 1 時是 60 分，不是 100 分！3 時變 2 時，20 分變 20 ＋ 60 ＝ 80 分。',draw:t=>base(MU,MU)+ln(158,72,182,90,RED,2,t)+ln(240,72,276,90,RED,2,t)+T(170,48,'2',20,RED,'middle',t)+T(258,48,'80',20,RED,'middle',t)+T(345,48,'＋60',15,RED,'middle',t)},
 {say:'80 － 45 ＝ 35，2 － 1 ＝ 1，答案是 1 時 35 分。',draw:t=>base(MU,MU)+T(170,48,'2',20,RED)+T(258,48,'80',20,RED)+row(178,'1','35',INK,INK,t)+bad(200,226,'1 時 75 分',t)},
 {say:'畫時間線檢查：1:45 到 2:00 是 15 分，到 3:00 再 1 小時，到 3:20 再 20 分，一共 1 時 35 分。',draw:t=>{const px=m=>40+m*320/95,pts=[[0,'1:45'],[15,'2:00'],[75,'3:00'],[95,'3:20']];return ln(40,110,40+320*t,110,INK,3)+pts.map(([m,s])=>Gp(ck(t,m/95-.05,m/95+.05),ln(px(m),100,px(m),120,INK,2)+T(px(m),142,s,14))).join('')+[[0,15,'15 分'],[15,75,'1 時'],[75,95,'20 分']].map(([a,b,s])=>T((px(a)+px(b))/2,92,s,14,RED,'middle',ck(t,b/95-.1,b/95))).join('')+good(200,195,'15 分 ＋ 1 時 ＋ 20 分 ＝ 1 時 35 分',ck(t,.8,1),18)}}]})}

/* 平分才是分數 */
{const W0=[30,60,80,110];const cake=(ws,o=1)=>{let x=60,s='';ws.forEach((w,i)=>{s+=`<rect x="${x}" y="80" width="${w}" height="60" fill="${i===0?Y:W}" stroke="${INK}" stroke-width="1.5" opacity="${o}"/>`;x+=w});return s};
add({id:'fairshare',g:'g3',ref:'g3-5-0',title:'分數一定要「平分」',desc:'切成 4 塊，塗 1 塊就是 1/4 嗎？',steps:[
 {say:'這條蛋糕切成 4 塊，塗了 1 塊。可以說是 1/4 嗎？',draw:t=>cake(W0,t)+T(200,60,'塗色是 1/4 嗎？',18,INK,'middle',t)},
 {say:'4 塊大小不一樣！用虛線把蛋糕真正平分成 4 份，塗色那塊比 1 份小很多。',draw:t=>cake(W0)+[1,2,3].map(k=>ln(60+70*k,72,60+70*k,148,RED,2,t,'5 4')).join('')+T(200,175,'虛線才是平分',15,RED,'middle',t)},
 {say:'分數的前提是「平分」：4 塊一樣大，塗 1 塊才是 1/4。可以摺紙檢查，摺起來要完全重疊。',draw:t=>cake(W0.map(w=>L(w,70,t)))+good(200,185,'平分成 4 份，1 份才是 1/4',ck(t,.6,1),19)}]})}

/* 分母越大越小 */
add({id:'bigden',g:'g3',ref:'g3-5-1',title:'1/4 和 1/8 誰比較大？',desc:'分母比較大，分數就比較大嗎？',steps:[
 {say:'兩個一樣大的披薩：左邊分給 4 個人，右邊分給 8 個人。',draw:t=>Gp(t,pie(110,105,62,1,[W])+pie(290,105,62,1,[W]))+T(110,200,'分給 4 人',15)+T(290,200,'分給 8 人',15)},
 {say:'左邊平分成 4 片，右邊平分成 8 片，每人拿 1 片。',draw:t=>pie(110,105,62,4,[Y,W,W,W],[1,t,t,t])+pie(290,105,62,8,[P,W,W,W,W,W,W,W],[1,t,t,t,t,t,t,t])+T(110,200,'1/4',20,INK,'middle',t)+T(290,200,'1/8',20,INK,'middle',t)},
 {say:'分給越多人，每人拿到的越小。所以 1/4 ＞ 1/8，分母越大，每一份反而越小。',draw:t=>pie(110,105,62,4,[Y,W,W,W])+pie(290,105,62,8,[P,W,W,W,W,W,W,W])+good(200,205,'1/4 ＞ 1/8',t,24)+T(200,230,'分母是「切成幾份」',14,MU,'middle',t)}]});

/* 同分母加法 */
add({id:'samedenom',g:'g3',ref:'g3-5-2',title:'同分母加法：2/5 ＋ 1/5',desc:'分母要不要相加？',steps:[
 {say:'2/5 是 2 個 1/5，1/5 是 1 個 1/5。',draw:t=>Gp(t,strip(60,60,280,36,5,2,Y)+strip(60,130,280,36,5,0)+R(60,130,56,36,P))+T(35,84,'2/5',16)+T(35,154,'1/5',16)},
 {say:'把 1 個 1/5 搬過去，接在 2 個 1/5 後面。',draw:t=>strip(60,60,280,36,5,2,Y)+strip(60,130,280,36,5,0)+R(L(60,172,t),L(130,60,t),56,36,P)+T(35,84,'2/5',16)},
 {say:'每一格還是 1/5，一共 3 格，就是 3/5。如果分母也相加變 3/10，看下面：3/10 比 2/5 還小，一定不對！',draw:t=>strip(60,60,280,36,5,2,Y)+R(172,60,56,36,P)+good(200,124,'2/5 ＋ 1/5 ＝ 3/5',1,20)+strip(60,150,280,30,10,3,B,t)+bad(200,205,'3/10 反而比 2/5 小',t)}]});

/* 跨年級：關鍵字解題 */
{const u=9.6,bars=(dd=1,o=1)=>R(80,70,25*u,30,Y)+T(50,91,'哥哥',15)+T(80+12.5*u,62,'25 元',15)+Gp(o,R(80,140,17*u*dd,30,P)+T(50,161,'弟弟',15));
add({id:'keyword',g:'all',ref:'all-0-0',title:'看到「多」就用加法？',desc:'用線段圖看懂誰多誰少。',steps:[
 {say:'題目：哥哥有 25 元，比弟弟多 8 元，弟弟有幾元？先畫哥哥的錢：25 元。',draw:t=>Gp(t,R(80,70,25*u,30,Y)+T(50,91,'哥哥',15)+T(80+12.5*u,62,'25 元',15))},
 {say:'「哥哥比弟弟多 8 元」：哥哥比較多，所以弟弟的線段比較短，少了 8 元。',draw:t=>bars(t)+`<rect x="${80+17*u}" y="140" width="${8*u}" height="30" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="5 4" opacity="${t}"/>`+ln(80+17*u,110,80+17*u,180,MU,1,t,'3 3')+T(80+21*u,195,'差 8 元',14,RED,'middle',t)},
 {say:'弟弟 ＝ 25 － 8 ＝ 17 元。看到「多」不一定用加法，先想「誰比較多」，畫出來就知道。',draw:t=>bars()+`<rect x="${80+17*u}" y="140" width="${8*u}" height="30" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="5 4"/>`+T(80+8.5*u,161,'？',16)+good(200,214,'弟弟 ＝ 25 － 8 ＝ 17（元）',t,20)+bad(200,236,'25 ＋ 8 ＝ 33',t)}]})}
}
