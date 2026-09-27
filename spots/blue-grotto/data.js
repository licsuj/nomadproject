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
    coords: null                     // e.g. [35.82, 14.45] → adds a 高德 (Amap) pin link on the Chinese page
  },

  // Your own accounts. Register them first, then fill in. Empty = hidden.
  handles: { instagram: "", tiktok: "", red: "" },
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
    checked: null,                       // e.g. 12
    formats: null,                       // e.g. [["reel",7],["carousel",4],["photo",1]]
    opening: null,                       // e.g. { en:"Water close-up", zh:"海水特写", count:6 }
    angle: null,                         // e.g. { en:"\"No boat needed\"", zh:"“不用坐船”", count:3 }
    topViews: null                       // e.g. { slot:1, date:"2026-09-28" }
  },

  // Optional email list (English page only). Hidden until `action` is set to your email provider's form URL.
  signup: { action: "" },

  posts: [
    { verified:false, platform:"tiktok", scene:"reveal", url:"", creator:"", thumb:"", ease:"easy",
      en:{ format:"Reveal video", hook:"Tight on turquoise water, then the camera tilts up to the arch.", why:"The first second is pure colour, so you keep watching to see where it is." },
      zh:{ format:"揭晓式短视频", hook:"先拍一片蓝绿色海水，再慢慢抬镜头露出拱门。", why:"第一秒只有颜色，让人想看下去这是哪里。" } },
    { verified:false, platform:"instagram", scene:"carousel", url:"", creator:"", thumb:"", ease:"easy",
      en:{ format:"Carousel guide", hook:"Wide cover with the spot's name, then detail slides and a 'how to get here' slide.", why:"It works as a saveable mini-guide, not just a pretty photo." },
      zh:{ format:"图文攻略", hook:"封面是全景加地名，后面是细节图和“怎么去”。", why:"像一份可以收藏的小攻略，不只是一张好看的照片。" } },
    { verified:false, platform:"instagram", scene:"person", url:"", creator:"", thumb:"", ease:"easy",
      en:{ format:"Reel · person in frame", hook:"Back to camera at the railing, arch and Filfla islet behind.", why:"A person in the view makes it read as 'I was here'." },
      zh:{ format:"人物入镜", hook:"背对镜头站在护栏边，身后是拱门和 Filfla 小岛。", why:"画面里有人，就是“我来过这里”的打卡感。" } },
    { verified:false, platform:"tiktok", scene:"pov", url:"", creator:"", thumb:"", ease:"car",
      en:{ format:"POV road stop", hook:"\"POV: you pull over on the coast road and see this.\"", why:"Shows how close the view is to the road, which makes people want to go." },
      zh:{ format:"第一视角", hook:"“开车路过海边，停下来就看到了这个。”", why:"让人知道这个景就在路边，很容易去。" } }
  ],

  patterns: [
    { icon:"eye",   seenIn:[1,3],   en:{ title:"Colour first", body:"The opening frame is the blue water up close, before any context." },
                                   zh:{ title:"第一秒先给颜色", body:"开头先拍近处的蓝色海水，不急着交代在哪里。" } },
    { icon:"arrow", seenIn:[1,2,4], en:{ title:"Then reveal the arch", body:"The full view (arch plus Filfla islet) comes after the close-up." },
                                   zh:{ title:"再揭晓拱门全景", body:"特写之后，才出现拱门和 Filfla 小岛的全景。" } },
    { icon:"pin",   seenIn:[2,4],   en:{ title:"Name it, give a reason to save", body:"The caption says Blue Grotto, Malta and adds one useful line, like \"no boat needed\"." },
                                   zh:{ title:"写清地名，给出收藏理由", body:"标题写明“马耳他蓝洞”，再加一句实用信息，比如“不用坐船”。" } }
  ],

  recipe: {
    en: {
      firstTab: "video",
      title: "The Blue Grotto reveal",
      oneLiner: "Start on the blue water, tilt up to the arch, step into frame. The same shots work as a Reel or a carousel.",
      facts: [["Time","5 min"],["Video","8–10 s"],["Gear","Phone only"]],
      video: [
        { t:"0–1s",  title:"Water close-up", how:"Point straight down at the turquoise water. Nothing else in frame.", text:"Wait for it…" },
        { t:"1–4s",  title:"Slow tilt up", how:"Tilt up smoothly until the arch fills the top half. Keep it slow." },
        { t:"4–7s",  title:"Step into frame", how:"A friend walks to the railing, back to camera. Or prop the phone and walk in yourself." },
        { t:"7–10s", title:"Hold the wide shot", how:"Hold still on the arch, with Filfla islet on the horizon.", text:"Blue Grotto, Malta" }
      ],
      carousel: [
        { t:"1", title:"Cover: the wide view", how:"Arch plus Filfla, with the title on the image.", text:"No boat needed" },
        { t:"2", title:"The colour", how:"Close-up of the water from the railing. No people." },
        { t:"3", title:"You in the view", how:"Back to camera, arch behind you. Stand behind the barrier." },
        { t:"4", title:"The arch, zoomed", how:"Use 2× zoom on the arch and the boats below." },
        { t:"5", title:"How to get here", how:"Screenshot the map pin, or a photo of the road and viewpoint.", text:"Roadside stop · 20 min" }
      ],
      tips: [
        "<b>Shoot vertical (9:16).</b> Tap the water to lock focus, then drag exposure down a little so the blue stays deep.",
        "<b>Light:</b> mornings are usually recommended, when the sun is on the water.",
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
      oneLiner: "先拍海水，再抬镜头露出拱门，最后人物入镜。同一组素材，可以发小红书图文，也可以发抖音短视频。",
      facts: [["用时","5 分钟"],["图文","5 张"],["设备","一部手机"]],
      video: [
        { t:"0–1秒",  title:"海水特写", how:"镜头垂直向下，只拍蓝绿色的海水。", text:"等一下…" },
        { t:"1–4秒",  title:"慢慢抬镜头", how:"匀速往上抬，直到拱门占画面上半部分。越慢越好。" },
        { t:"4–7秒",  title:"人物入镜", how:"朋友走到护栏边，背对镜头。也可以把手机架好自己走进去。" },
        { t:"7–10秒", title:"定格全景", how:"停在拱门和海平线上的 Filfla 小岛。", text:"马耳他蓝洞 · Blue Grotto" }
      ],
      carousel: [
        { t:"1", title:"封面：全景", how:"拱门加 Filfla 小岛，图上加标题。", text:"马耳他蓝洞｜不用坐船也能看" },
        { t:"2", title:"海水颜色", how:"从护栏往下拍海水特写，不要人。" },
        { t:"3", title:"人物照", how:"背对镜头，身后是拱门。请站在护栏内。" },
        { t:"4", title:"拱门特写", how:"用 2 倍变焦拍拱门和下面的小船。" },
        { t:"5", title:"怎么去", how:"截一张地图定位，或拍一张公路和观景台。", text:"路边观景台 · 停留 20 分钟" }
      ],
      tips: [
        "<b>竖屏拍（9:16）。</b>点一下海面锁定对焦，再把曝光往下拉一点，蓝色更深。",
        "<b>光线：</b>一般建议上午来，阳光照在海面上颜色最好。",
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
