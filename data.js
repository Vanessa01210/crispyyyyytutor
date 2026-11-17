/* =========================================================
   酥酥老師網站：內容設定檔
   之後新增資源、修改商品或匯款資訊，只要改這個檔案就好。
   ========================================================= */

const SITE = {
  // Google 試算表訂單程式的網址（照「設定說明」部署後貼上）
  // 還沒設定前，網站會用「示範模式」，訂單不會真的送出。
  ORDER_API_URL: "",

  // 匯款資訊（請改成你的帳戶）
  bank: {
    bankName: "連線商業銀行 LINE Bank",
    bankCode: "824",
    branch: "總行（6880）",
    account: "111006103716",
    holder: "",   // 戶名（選填，填了會顯示在匯款資訊）
    note: "匯款後請填寫下方表單，確認入帳後 1～2 天內寄出檔案至您的 Email。",
  },

  contact: {
    instagram: "https://www.instagram.com/crispyyyyy0121/",
    threads: "https://www.threads.net/@crispyyyyy0121",
    handle: "@crispyyyyy0121",
  },
};

/* ---------------------------------------------------------
   免費資源（檔案放在 Google 雲端，網站直接下載）
   新增方式：在雲端檔案按「共用 → 複製連結」，
   連結中 /d/ 和 /view 中間那串就是檔案 ID。
   欄位：grade 年級（2～6，或 "all" 不分年級）、sem 學期（"上"/"下"/""）、
        subject 科目、type 類型、title 標題、version 版本（可留空）、
        files 檔案清單：["顯示名稱", "雲端檔案ID"]，多個檔案會合併成一張卡片
   --------------------------------------------------------- */
const RESOURCES = [
  // ===== 不分年級 =====
  { grade: "all", sem: "", subject: "學習工具", type: "計畫表", title: "我的打卡日計畫", files: [
    ["注音版", "1m9RcLUThx9ePVebKf71QO6sZbZS1ZoNC"],
    ["無注音版", "1KtBO5zS2KvzTbVxsJkvvgBgCxtcam3PZ"],
    ["空白版", "1W2_8hQsF3gDLGERmb0fufwZ6mur5Bfns"],
    ["集點卡（圖片）", "1uq5FdlGXpSDk8H9doHPmQXiQGvWf3a9N"],
  ]},

  // ===== 二年級 =====
  { grade: 2, sem: "上", subject: "國語", type: "簡報", title: "二上國語各課簡報", files: [
    ["第 1 課　新學年新希望", "1PCFf1U9mEwnFHe_6RU4GiYiRaNxsYYqz"],
    ["第 2 課　一起做早餐", "1VmDTJnChTIhBYGIwIAPzg515zyj0zyGX"],
    ["第 3 課　走過小巷", "1DyIiPkQImLq3mExen6uqKHXxHLUu24tS"],
    ["第 4 課　運動會", "1Pc4yg9aB7O5hYIoJPg2qRJjrAaORq40e"],
    ["第 5 課　坐竹籃船", "1RQM_EQpYTkiOaOiYjZLI54-JaeumdqYE"],
    ["第 6 課　小鎮的柿餅節", "1mM2qhMdl68kvAckXDKZGggKhPuNIXYTd"],
  ]},

  // ===== 三年級 =====
  { grade: 3, sem: "上", subject: "國語", type: "簡報", version: "南一", title: "三上國語各課簡報", files: [
    ["第 1 課　你好，新朋友", "1hkj4CytmONWOgQJXZpzQBm-J0m5iVobW"],
    ["第 2 課　我們的約定", "1N0LHdkQ3IBLAkO41ZbSQk_xavvYWq69x"],
    ["第 3 課　下課十分鐘", "1SaeXg-0SE7XjaUj1zBX-0FXyQNP1Dgn0"],
    ["第 4 課　一顆黑點", "1LCOyTaQ2vsRx_vhifsWJZHC88BgOy_Uz"],
    ["第 5 課　火大了", "1nMUWN5H44WI9QbQwJaBBkcQJHlBtq1G3"],
    ["第 6 課　我該怎麼辦", "1bz20V2w42znOwz-mudyiRws6eIuAAOhc"],
    ["第 7 課　最年輕的奶奶", "1cL8Yr9HTJdzDllNltsDz0mjrL3OIn7Ha"],
    ["第 8 課　魔「髮」哥哥", "1UnVvHJcIuLxccoGo0zgks60BG_PuIAv0"],
    ["第 9 課　穿白袍的醫生伯伯", "1Mk9_ch-Y13PwFQfEv4rXz6eNnnfE71MK"],
    ["第 10 課　唉呀！誤會大了", "117P8E6ZcFPTL21RpqyZMmqWMAa0k76NE"],
    ["第 11 課　石虎的告白", "1pcu4aDtj6BTdzeTg3uWPmYWqCx1_zwh8"],
    ["第 12 課　昆蟲的保命妙招", "1ACR_uBV9lN4TazklGHqe39mHXm2uIFPE"],
  ]},
  { grade: 3, sem: "上", subject: "數學", type: "練習卷", title: "三上數學第一次期中練習題", files: [
    ["練習題", "1fDn1RsCl8ZjaTrXdBY6WiTx9k1NoYJEN"],
    ["詳解", "1OkUxC7y07tzz6ol64jH5n6Gn_JEwhASK"],
  ]},
  { grade: 3, sem: "下", subject: "數學", type: "簡報", title: "三下數學期末複習簡報", files: [["PDF 檔", "1LL6CLUDM34UPYyk6VJ0W9VmVl1AYesX3"]] },
  { grade: 3, sem: "下", subject: "數學", type: "複習圖", title: "三下數學期末複習圖", files: [["PDF 檔", "1S4y5W_C-_DI4k8c4qEoAr5rTWqV9hD3s"]] },
  { grade: 3, sem: "下", subject: "數學", type: "練習卷", title: "三下數學期中考複習卷", files: [["PDF 檔", "1hzhFhBVQXByCJ2rsCuSbqgI4AOV9ru_K"]] },
  { grade: 3, sem: "下", subject: "數學", type: "學習單", title: "三下數學單元學習單", files: [
    ["除法", "1eXf8jSTZflV1yHNCGu01hGDfaKitZeNv"],
    ["二位數除法", "1P62ilL09EwxML4XbG18sJJNhhWRw3Xm_"],
    ["分數加減", "1gAsHZpVXiCKp1tUkS-08gIK3NKd5u3j5"],
    ["公斤與公克", "1kFgg1oH1MfzxCmFwuFG3tWAMKS4snWpY"],
    ["尋找規律", "1gT_79KOgixXuNlX-QCONi5Dz8Y7fQCLb"],
    ["期末衝刺學習單", "1aXroYTQkS5G6KY_oTeLiWA6co8sM0Ezw"],
  ]},
  { grade: 3, sem: "下", subject: "自然", type: "簡報", title: "三下自然複習簡報", files: [
    ["期中複習簡報", "1oJFySp1csCkAswq2XFeKttumPhBOvg68"],
    ["期末複習簡報", "1yO9_u2Nz4t9Y4ntHxg1jK3Nxq_515Our"],
  ]},
  { grade: 3, sem: "下", subject: "自然", type: "講義", title: "三下自然期中複習講義＋學習單", files: [
    ["期中複習講義", "106LX5_wIwfXIX1PstoisH92eLCoc2S16"],
    ["期中總複習學習單", "1ExvHcXxbTQAsITWo6SYD0G-eOK1KZW7-"],
  ]},
  { grade: 3, sem: "下", subject: "自然", type: "複習圖", title: "三下自然複習圖", files: [["圖片", "1wPMHxEXNidqI7MXFcy9AG9LYAh9DaLis"]] },
  { grade: 3, sem: "", subject: "自然", type: "練習卷", version: "南一", title: "三年級自然期中考 B 卷", files: [["PDF 檔", "1Qfd5pDfKVCJWohdVU7FUyH_Ogsl2vK6z"]] },

  // ===== 四年級 =====
  { grade: 4, sem: "上", subject: "國語", type: "簡報", version: "康軒", title: "四上國語各課簡報", files: [
    ["第 1 課　窗口邊的臺灣欒樹", "1y4OQ41S5YO2G_iIFopfe8fVoxRnMuFfF"],
    ["第 2 課　奶奶的排骨粥", "1aiUlGOxBWDgVBOvPO9MBot0egAFxgE9x"],
    ["第 3 課　充滿希望的五味屋", "1ygBVxboWPJdTraQMj9jzTvGDqdgbi5A3"],
    ["第 4 課　玉山之歌", "1Cn1DJUEBNNxd_uQ_n7I-he-wh3zl5DOy"],
    ["第 5 課　高舉臺灣之光", "1ai2KQFaklrgnEUNPiTUoITlXgPdQS67y"],
    ["第 6 課　臺灣的驕傲", "1SWt5K-w_eiSYJW13GxRWiwTlUAAKMlj4"],
    ["第 7 課　到此「藝」遊", "1Hj6AnpcNWXBKrmmDrl86Ts1Ace_GEyHD"],
    ["第 8 課　四季的頭髮", "1eykoC2Dl8qfZ1dPbMkl8XafqxNEZQbcA"],
    ["第 9 課　阿白觀察記", "1BjJKuHkNDdE6qeaBLsMjy8v4kEro8b-H"],
    ["第 10 課　老鼠嫁女兒", "1LG6rqnDcdGSOULh_0_w0rwB_77fPpf9k"],
    ["第 11 課　豆粥婆婆", "1Zw6mybwjgsdhbzrtcLf_wH7zNaRKh9mb"],
    ["第 12 課　戴斗笠的地藏", "1FFMNGB8nUuXEgdwCqMvrJ_xlGf9w39cY"],
  ]},
  { grade: 4, sem: "下", subject: "國語", type: "學習單", title: "四下期末成語複習學習單", files: [["PDF 檔", "1PJ-zQaU0eChhWeP1I1ib1euwBzH0n9bp"]] },
  { grade: 4, sem: "上", subject: "數學", type: "練習卷", title: "四上數學第一次期中練習題", files: [
    ["練習題", "1G9qda6UKCZT7cSyGZeREqpRoUV3Rdemh"],
    ["詳解", "1F9K8_KMTzO3VNhTs2hzPykJ2dvdOkaqL"],
  ]},
  { grade: 4, sem: "上", subject: "數學", type: "學習單", title: "四上大數的加減學習單", files: [
    ["大數的加減 1", "1_vRGZ5BWUWw3IlwtLwJFdaJeT9zlpZAP"],
    ["大數的加減 2", "188kRI_uk92Rp_YNdM5SytAPxk8vDRX36"],
  ]},
  { grade: 4, sem: "下", subject: "數學", type: "練習卷", title: "四下數學期中複習卷＋挑戰卷", files: [
    ["期中複習卷", "17gUlyFDNIfLKxVaHfe_R6H875QqGC9_p"],
    ["期中評量挑戰卷", "1tRdOu7uZIUBsklhzISMclJRoq1I1mxg7"],
  ]},
  { grade: 4, sem: "下", subject: "數學", type: "簡報", title: "四下數學期末複習簡報", files: [["PDF 檔", "1bt0cjcm-NNxCxGF1qTnVFe511rlgMbL9"]] },
  { grade: 4, sem: "下", subject: "數學", type: "複習圖", title: "四下數學期末複習圖", files: [
    ["複習圖（PDF）", "1x6Ez720DI_vy73Bmk3C5uZKdEA-jcGIr"],
    ["總複習圖（圖片）", "19mvKkxiWCJz2rU8zw44jp0hSL5PZjAI3"],
  ]},
  { grade: 4, sem: "下", subject: "數學", type: "學習單", title: "四下立方公分學習單", files: [["PDF 檔", "1ZNJ8muSWAgoNID-D5I-5eSb1pGzOSJ0P"]] },
  { grade: 4, sem: "上", subject: "社會", type: "講義", title: "四上社會期末總複習講義", files: [
    ["講義 1", "1pKYCSWWHihsyQCi9mxx3N81VyniBXJmm"],
    ["講義 2", "1cWp3eViutTH4lOS-rPn1hF1j0_pysI6r"],
  ]},
  { grade: 4, sem: "下", subject: "社會", type: "講義", title: "四下社會總複習講義", files: [
    ["期中總複習講義", "1DJmaWEKVfmDrdtbmHFxI5L8_tnSMpJE-"],
    ["期末總複習講義", "1bdKIh6tS-hjZHtNfcqxkr9qOwQokryg1"],
  ]},
  { grade: 4, sem: "下", subject: "社會", type: "簡報", title: "四下社會複習簡報", files: [
    ["期中複習簡報", "1fLbAgzY96_AI1ckxmK5M5y-NeXUGk6dd"],
    ["總複習簡報", "19XwC5rdGYQG-Rp_roIhi8TdRxmS8gz7l"],
  ]},
  { grade: 4, sem: "下", subject: "社會", type: "複習圖", title: "四下探索家鄉複習圖", files: [["PDF 檔", "1smwbEKQPHNn7izseqpNAQ04w-YwXk63f"]] },
  { grade: 4, sem: "下", subject: "自然", type: "簡報", title: "四下自然複習簡報", files: [
    ["期中複習簡報", "1d5pwn6dxPxDQousEywBkUL0fwVDWzMzR"],
    ["總複習簡報", "1ejDa4nGdE4lcZg8Mpuxk0u1TR5s0wiKL"],
  ]},
  { grade: 4, sem: "下", subject: "自然", type: "講義", title: "四下自然複習講義", files: [
    ["期中複習講義", "1FmFNOaytmOnFpqKPnx5g70oiHGusV6jW"],
    ["期末複習講義", "1haNJ9bVkkkLkINiFzh4NQ_OBaa5ZJ6Ie"],
  ]},
  { grade: 4, sem: "下", subject: "自然", type: "複習圖", title: "四下自然複習圖", files: [
    ["期末總複習圖", "1EoHrHrruhT4qcQxmrv1eQsn6jrJNzb1g"],
    ["昆蟲大解密（圖片）", "124zA6IqBX3HaJeb__omyqWh3KCq9Y1tR"],
  ]},

  // ===== 五年級 =====
  { grade: 5, sem: "上", subject: "國語", type: "簡報", version: "康軒", title: "五上國語各課簡報", files: [
    ["第 1 課　蚊帳大使", "1x-PcbpqN-av2-3ixfDoqigHJPutswIH8"],
    ["第 2 課　從空中看台灣", "1WhynXCpe5sk8Z8gUu8QIJJzHyAbPBzU0"],
    ["第 3 課　攀岩高手", "1y_LNvTtzQHdHJrq07Nm2gHmbhSi6ZhF6"],
    ["第 4 課　恆久的美", "1YTeO6EQucSxfocpGDL_QOsVAcMOLUHD2"],
    ["第 5 課　它抓得住你", "1RJyvZpS3C0jZ3bS9Yyxp5k3VfITr8f5V"],
    ["第 6 課　故事動起來", "1v32ctnYELtao8UggKv3YO3KlC55NeLoB"],
    ["第 7 課　為生命找到出口", "1LTfDNZHCwTG8Yt1ryQeFDFszGKOTfsOR"],
    ["第 8 課　最勇敢的女孩", "1UVthvmPG0x9xnOQq_iojsaIn4MuKZX8s"],
    ["第 9 課　勇者的試煉", "1qreuGHO2uGYik9JQ-j48cUba4AVKr-_f"],
    ["第 10 課　山中寄情", "1x71Fszta4v-BUf6kLRQKAVPwqeqXOl86"],
    ["第 11 課　與達駭黑熊走入山林", "1bd354bjuZcx9nuwrGZbWeVB3UKpmjOYZ"],
    ["第 12 課　荒島上的國王", "14sciUfzVwYPULsN2lgU5fXMEDKMsAqfm"],
  ]},
  { grade: 5, sem: "上", subject: "數學", type: "練習卷", title: "五上數學第一次期中練習題", files: [
    ["練習題", "1naHNVlpLoUhEBusbnaIQ2QMzrwD60ze2"],
    ["詳解", "18nHENsU6-DPgBiHuxQXxLjbxDHWoc-3O"],
  ]},
  { grade: 5, sem: "下", subject: "數學", type: "簡報", title: "五下數學期末複習簡報", files: [["PDF 檔", "1s2njozRXpKUd9Cr-f4NUdTExqHzB-lEA"]] },
  { grade: 5, sem: "上", subject: "社會", type: "簡報", version: "康軒", title: "五上社會單元複習", files: [
    ["第一單元", "1EgBbXK_LZc3HAaAyWzUen1riuOju6F-J"],
    ["第二單元", "16vIt7HBE_uBwVDH5NN1gemM-sYgTBypC"],
  ]},
];

/* ---------------------------------------------------------
   付費商品
   每個商品可以有多個「選項」（年級、版本…），
   每個選項的 code 要和 Google 試算表「商品連結」分頁的代碼一樣。
   --------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "math",
    name: "數學自編講義",
    tag: "三～六年級",
    desc: "依課綱整理的段考複習手冊，重點觀念＋例題，讓孩子考前複習有方向。",
    options: [
      { label: "三年級上學期", code: "math-3a", price: 110 },
      { label: "三年級下學期", code: "math-3b", price: 110 },
      { label: "四年級上學期", code: "math-4a", price: 110 },
      { label: "四年級下學期", code: "math-4b", price: 110 },
      { label: "五年級上學期", code: "math-5a", price: 110 },
      { label: "五年級下學期", code: "math-5b", price: 110 },
      { label: "六年級上學期", code: "math-6a", price: 110 },
      { label: "六年級下學期", code: "math-6b", price: 110 },
    ],
  },
  {
    id: "reading",
    name: "國語閱讀講義",
    tag: "中、高年級",
    desc: "循序練習閱讀理解策略，培養孩子抓重點、統整與表達的能力。",
    options: [
      { label: "中年級（三、四年級）", code: "reading-mid", price: 120 },
      { label: "高年級（五、六年級）", code: "reading-high", price: 120 },
    ],
  },
  {
    id: "review",
    name: "國語、社會考前複習包",
    tag: "三～六年級・分版本",
    desc: "段考前的重點整理與練習，依年級與教科書版本選購。",
    // ※ 價格先暫定，請依實際售價修改
    options: [
      { label: "三年級 國語（康軒）", code: "review-3-ch-k", price: 69 },
      { label: "三年級 國語（南一）", code: "review-3-ch-n", price: 69 },
      { label: "三年級 社會（康軒）", code: "review-3-so-k", price: 69 },
      { label: "三年級 社會（南一）", code: "review-3-so-n", price: 69 },
      { label: "四年級 國語（康軒）", code: "review-4-ch-k", price: 69 },
      { label: "四年級 國語（南一）", code: "review-4-ch-n", price: 69 },
      { label: "四年級 社會（康軒）", code: "review-4-so-k", price: 69 },
      { label: "四年級 社會（南一）", code: "review-4-so-n", price: 69 },
      { label: "五年級 國語（康軒）", code: "review-5-ch-k", price: 89 },
      { label: "五年級 國語（南一）", code: "review-5-ch-n", price: 89 },
      { label: "五年級 社會（康軒）", code: "review-5-so-k", price: 89 },
      { label: "五年級 社會（南一）", code: "review-5-so-n", price: 89 },
      { label: "六年級 國語（康軒）", code: "review-6-ch-k", price: 89 },
      { label: "六年級 國語（南一）", code: "review-6-ch-n", price: 89 },
      { label: "六年級 社會（康軒）", code: "review-6-so-k", price: 89 },
      { label: "六年級 社會（南一）", code: "review-6-so-n", price: 89 },
    ],
  },
];
