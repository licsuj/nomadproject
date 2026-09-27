/* =====================================================================
   BLUE GROTTO — location data. The only file you edit for this spot.
   Both the English and Chinese pages read from here.
   Rules: no view counts, likes or "trending" claims. Link to the original
   public post and credit the creator. Only set `thumb` with written permission.
   ===================================================================== */
window.LOCATION = {
  slug: "blue-grotto",
  curatedOn: "2026-09-27",
  draft: true,                       // set false once every post slot is verified

  name:  { en: "Blue Wall & Grotto Viewpoint", zh: "马耳他蓝洞观景台" },
  area:  { en: "Wied iż-Żurrieq, Żurrieq, Malta", zh: "Blue Wall & Grotto Viewpoint · 马耳他 Żurrieq" },
  locationTag: "Blue Wall And Grotto Viewpoint",

  maps: {
    google: "https://maps.app.goo.gl/mhLzaVBHZMs81vwW7",
    apple:  "https://maps.apple.com/?q=Blue%20Wall%20and%20Grotto%20Viewpoint%2C%20Zurrieq%2C%20Malta",
    coords: [35.82228959487456, 14.458313624490671]   // viewpoint pin → adds a 高德 (Amap) pin link on the Chinese page
  },

  // Your own accounts. Register them first, then fill in. Empty = hidden.
  handles: { instagram: "@maltashotboard", tiktok: "@maltashotboard", red: "" },
  trackTag: { en: "#BlueGrottoShot", zh: "#蓝洞拍同款" },  // unique tags you search weekly

  // Booking line (affiliate). Shown as helpful info; link only appears when url is set.
  boat: { url: "" },

  // One paid local listing. null = hidden. Example:
  // { name: "Café X", en: "Coffee with the same view, 2 min walk.", zh: "同款海景咖啡，步行 2 分钟。", url: "https://..." }
  localPick: null,

  // "This spot this month" — counted by hand from the public posts you reviewed. null = not counted yet.
  // Never put reach, ranking or engagement-rate numbers here. A public view count is allowed only if you read it yourself, with the date.
  month: {
    period: { en: "September 2026", zh: "2026 年 9 月" },
    checked: 5,                          // e.g. 12
    formats: [["photo",3],["reel",1],["video",1]],
    opening: { en:"Person or boat with the arch", zh:"人物或小船与拱门同框", count:4 },
    angle: { en:"Place name in line one", zh:"第一句写地名", count:5 },
    topViews: null                       // e.g. { slot:1, date:"2026-09-28" }
  },

  // Optional email list (English page only). Hidden until `action` is set to your email provider's form URL.
  signup: { action: "" },

  posts: [
    // Verified by Justin. Hook = what you see first (checked by Justin); why = what makes it work.
    { verified:true, platform:"instagram", scene:"person", url:"https://www.instagram.com/dittusandmate/reel/C7lqB3TsDkj/", creator:"@dittusandmate", thumb:"", ease:"easy",
      en:{ format:"Reel", hook:"Starts on a person from behind, then the camera moves to reveal the arch.", why:"You wait for the view, and the caption calls it “the most beautiful viewpoint in Malta”." },
      zh:{ format:"短视频", hook:"先拍人物背影，镜头再移开，露出拱门。", why:"让人等着看全景，文案还写了“马耳他最美观景点”。" } },
    { verified:true, platform:"instagram", scene:"reveal", url:"https://www.instagram.com/p/DR789V7jqMa/", creator:"@visitmaltauk", thumb:"", ease:"easy",
      en:{ format:"Photo", hook:"The arch with a boat passing underneath, Filfla on the horizon.", why:"The small boat shows how big the arch really is." },
      zh:{ format:"照片", hook:"小船正好从拱门下经过，远处是 Filfla 小岛。", why:"小船让人一眼看出拱门有多大。" } },
    { verified:true, platform:"instagram", scene:"person", url:"https://www.instagram.com/p/DUTtM92DhHH/", creator:"@nurana_ismail", thumb:"", ease:"easy",
      en:{ format:"Photo", hook:"The arch, with a woman sitting in front of it.", why:"A person in the frame turns the view into “I was here”." },
      zh:{ format:"照片", hook:"拱门前，一位女生坐着。", why:"画面里有人，就有“我来过”的打卡感。" } },
    { verified:true, platform:"instagram", scene:"reveal", url:"https://www.instagram.com/lifeisjovial/p/DC57x2Att4A/", creator:"@lifeisjovial", thumb:"", ease:"easy",
      en:{ format:"Photo", hook:"The arch at sunset, Filfla on the horizon.", why:"Golden light makes the classic view look new." },
      zh:{ format:"照片", hook:"日落时的拱门，远处是 Filfla 小岛。", why:"金色光线让经典机位有新鲜感。" } },
    { verified:true, platform:"tiktok", scene:"reveal", url:"https://www.tiktok.com/@flyingsapphire/video/7242781192506952965", creator:"@flyingsapphire", thumb:"", ease:"boat",
      en:{ format:"Video", hook:"Filmed from a boat passing under the arch.", why:"The one angle you can't get from the road. It needs the boat trip from the harbour below." },
      zh:{ format:"短视频", hook:"坐船从拱门下穿过时拍的。", why:"这是在路边拍不到的角度，需要在山下港口坐船。" } }
  ],

  patterns: [
    { icon:"person", seenIn:[1,2,3,5], en:{ title:"Put something with the arch", body:"A person at the railing or a boat underneath gives the arch scale and a small story." },
                                      zh:{ title:"让拱门和人或船同框", body:"护栏边的人，或拱门下的小船，能显出拱门的大小，也更有故事感。" } },
    { icon:"eye",    seenIn:[2,4],     en:{ title:"Keep Filfla in the frame", body:"The small island on the horizon tells people this is Malta's south coast." },
                                      zh:{ title:"把 Filfla 小岛拍进去", body:"海平线上的小岛，一看就知道是马耳他南部海岸。" } },
    { icon:"pin",    seenIn:[1,2,3,4,5], en:{ title:"Name the spot in the first line", body:"All five captions put Blue Grotto in the opening line, most with Malta or a 📍 pin, so the post is easy to find in search." },
                                      zh:{ title:"第一句写清地名", body:"五条帖子的第一句都写了“Blue Grotto（蓝洞）”，大多还加了马耳他或 📍 定位，方便被搜索到。" } }
  ],

  recipe: {
    en: {
      firstTab: "video",
      title: "The Blue Grotto reveal",
      oneLiner: "Start on a person at the railing, move to reveal the arch, hold on the arch with Filfla behind. Wait for a boat if you can. The same shots work as a Reel or a carousel.",
      facts: [["Time","5 min"],["Video","8 s"],["Gear","Phone only"]],
      video: [
        { t:"0–2s",  title:"Person from behind", how:"A friend stands at the railing, back to camera. Or prop the phone and step in yourself.", text:"Wait for it…" },
        { t:"2–5s",  title:"Reveal the arch", how:"Move the camera slowly past their shoulder until the arch fills the frame." },
        { t:"5–8s",  title:"Hold the wide shot", how:"Keep still on the arch with Filfla on the horizon. If a boat is coming, wait for it to pass under the arch.", text:"Blue Grotto, Malta" }
      ],
      carousel: [
        { t:"1", title:"Cover: arch and Filfla", how:"Wide shot of the arch with the island on the horizon. Put the title on the image.", text:"No boat needed" },
        { t:"2", title:"You in the view", how:"Standing or sitting at the railing, arch behind you. Stay behind the barrier." },
        { t:"3", title:"Arch with a boat", how:"Wait for a boat to pass under the arch. It shows the scale." },
        { t:"4", title:"The arch, zoomed", how:"Use 2× zoom on the arch and the water colour." },
        { t:"5", title:"How to get here", how:"Screenshot the map pin, or a photo of the road and viewpoint.", text:"Roadside stop · 20 min" }
      ],
      tips: [
        "<b>Shoot vertical (9:16).</b> Tap the water to lock focus, then drag exposure down a little so the blue stays deep.",
        "<b>Light:</b> mornings are usually best for the water colour. Sunset works for the arch against the sky (post 4).",
        "<span class='safe'><b>Stay behind the barrier.</b> The cliff edge is high and it gets windy.</span>"
      ],
      coreTags: "#BlueGrotto #Malta #VisitMalta #Zurrieq",
      captions: [
        { angle:"Useful",    text:"No boat needed. This is the Blue Grotto from the road above 🌊\n📍 Blue Wall & Grotto Viewpoint, Żurrieq, Malta\nSave this for your Malta trip.", tags:"#MaltaTravel #TravelTips" },
        { angle:"Short",     text:"Blue Grotto, Malta 🌊", tags:"#Mediterranean #TravelReels" },
        { angle:"Moody",     text:"Some blues don't look real until you're standing above them.\n📍 Żurrieq, Malta", tags:"#Wanderlust #SeaView" },
        { angle:"Question",  text:"Would you stop the car for this? 🌊\n📍 Blue Grotto viewpoint, Malta", tags:"#RoadTrip #MaltaTravel" },
        { angle:"Relatable", text:"Pulled over for 5 minutes. Stayed 40.\n📍 Blue Grotto, Malta", tags:"#TravelMoments #Mediterranean" }
      ]
    },
    zh: {
      firstTab: "carousel",
      title: "拍同款：蓝洞揭晓",
      oneLiner: "先拍护栏边的人物背影，再移动镜头露出拱门，最后定格拱门和 Filfla 小岛。有船经过就等一等。同一组素材，可以发小红书图文，也可以发抖音短视频。",
      facts: [["用时","5 分钟"],["图文","5 张"],["设备","一部手机"]],
      video: [
        { t:"0–2秒", title:"人物背影", how:"朋友站在护栏边，背对镜头。也可以把手机架好自己入镜。", text:"等一下…" },
        { t:"2–5秒", title:"露出拱门", how:"镜头慢慢从肩膀旁移过去，直到拱门占满画面。" },
        { t:"5–8秒", title:"定格全景", how:"停在拱门和海平线上的 Filfla 小岛。如果有船过来，等它从拱门下经过。", text:"马耳他蓝洞 · Blue Grotto" }
      ],
      carousel: [
        { t:"1", title:"封面：拱门和小岛", how:"拱门加海平线上的 Filfla 小岛，图上加标题。", text:"马耳他蓝洞｜不用坐船也能看" },
        { t:"2", title:"人物照", how:"站或坐在护栏边，身后是拱门。请站在护栏内。" },
        { t:"3", title:"拱门和小船", how:"等小船从拱门下经过再拍，更显拱门的大小。" },
        { t:"4", title:"拱门特写", how:"用 2 倍变焦拍拱门和海水颜色。" },
        { t:"5", title:"怎么去", how:"截一张地图定位，或拍一张公路和观景台。", text:"路边观景台 · 停留 20 分钟" }
      ],
      tips: [
        "<b>竖屏拍（9:16）。</b>点一下海面锁定对焦，再把曝光往下拉一点，蓝色更深。",
        "<b>光线：</b>上午海水颜色最好；日落时拍拱门剪影也很出片（见帖子 4）。",
        "<span class='safe'><b>请站在护栏内。</b>悬崖很高，风也大。</span>"
      ],
      coreTags: "#马耳他 #马耳他旅行 #马耳他蓝洞",
      captions: [
        { angle:"小红书攻略", text:"马耳他蓝洞｜路边就能看到的绝美机位🌊\n\n📍位置：Blue Wall and Grotto Viewpoint（Żurrieq 海边公路观景台）\n⏱停留：20 分钟左右就够\n📷拍法：先拍海水特写，再慢慢抬镜头露出拱门\n🚤想进洞：山下 Wied iż-Żurrieq 小港口可以坐船\n☀️一般建议上午去，海水颜色更好\n\n收藏起来，去马耳他用得上！", tags:"#欧洲旅行 #旅行攻略 #值得打卡" },
        { angle:"抖音一句话", text:"马耳他蓝洞，不用坐船就能看到的机位🌊 最后一秒别划走", tags:"#地中海 #出片机位" },
        { angle:"氛围感", text:"站在悬崖上，才知道地中海可以蓝成这样。\n📍马耳他 · 蓝洞", tags:"#氛围感 #海边" },
        { angle:"提问", text:"如果路过这里，你会停车吗？🌊\n📍马耳他蓝洞观景台", tags:"#小众旅行地 #自驾游" },
        { angle:"中英双语", text:"马耳他蓝洞｜不用坐船也能看的机位 🌊\nNo boat needed: the Blue Grotto from the road above.\n📍 Blue Wall & Grotto Viewpoint, Żurrieq, Malta", tags:"#欧洲旅行 #地中海" }
      ]
    }
  }
};
