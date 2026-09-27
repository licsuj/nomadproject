/* Malta Shot Board — shared renderer. Reads window.LOCATION (+ window.SPOTS), draws the page in EN or ZH.
   Page sets window.BOARD_LANG = "auto" | "en" | "zh" before loading this file. */
(function(){
const L = window.LOCATION;
const SPOTS = window.SPOTS || [];
const CONTACT = "hello@example.com";           // ← replace before launch
const STALE_MIN = 90;                            // minutes in background before asking "Moved on?"

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fill = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? "");

const UI = {
  en: {
    htmlLang:"en", title:"Blue Grotto Shot Board", switchTo:"中文", switchAria:"切换到中文",
    draft:"<b>Draft.</b> {n}/{t} posts verified. Don't print the QR yet.",
    eyebrow:"Posted from here", h1:"What people post from <em>this exact spot</em>",
    sub:"Real posts from this viewpoint, what they share, and one you can shoot in 5 minutes.",
    make:"Make this post", free:"Free · no sign-up",
    hook:"Hook", easy:"Easy to copy", car:"Needs a car", open:"Open post ↗", pending:"Link pending", illus:"Illustration · verified post goes here",
    workH:"What's working here", slots:"Slots {s}", check:"to check",
    monthLead:"{n} public posts checked · {p}", monthEx:"Example numbers until this month's count is in.",
    monthNote:"Counted by hand. Not reach or ranking data.",
    fmt:{ reel:"Reels", carousel:"Carousels", photo:"Photos", video:"Videos" },
    opening:"Top opening", angle:"Top caption angle", topViews:"Most views we saw", topViewsVal:"Slot {s} · {d}", ofN:"{c}/{n}",
    yourPost:"Your post", tabVideo:"Reel / TikTok", tabCar:"Carousel", slide:"slide", onscreen:"Text",
    copyShots:"Copy shot list",
    capH:"Pick a caption", capSub:"Swipe for 5 styles. Copies with hashtags.", copy:"Copy", tagsOnly:"Tags only", copied:"Copied ✓", selected:"Selected, tap Copy",
    locTag:"Location tag", net:"",
    boatH:"See the caves from inside", boatP:"Boats leave from Wied iż-Żurrieq harbour, a short drive down the road.", boatGo:"Book a boat trip ↗", aff:"Affiliate link, same price for you.",
    featH:"Get featured here", featP:"Add {tag}{handle} when you post. We show the best ones, with credit.",
    pick:"Local pick · Sponsored",
    otherH:"Other spots", find:"Find my spot", finding:"Checking…", notNear:"No board spot near you right now.", locOff:"Location unavailable. Pick from the list.", soon:"draft",
    sigH:"Get new Malta spots", sigP:"One email when a new board goes live.", sigBtn:"Send me new spots", sigConsent:"I agree to emails about new Malta Shot Board spots. Unsubscribe any time.", sigPh:"you@email.com",
    movedH:"Moved on?", movedP:"This page is for the {here}. Pick where you are now.", stay:"I'm still here",
    foot:`Posts picked by hand from public TikTok and Instagram. We link and credit, never re-host. No views promised. Creators: <span class="sel">${CONTACT}</span>`,
    maps: () => [["Map", L.maps.google]]
  },
  zh: {
    htmlLang:"zh-CN", title:"马耳他蓝洞 · 拍同款", switchTo:"EN", switchAria:"Switch to English",
    draft:"<b>草稿。</b>已核实 {n}/{t} 条帖子，暂勿打印二维码。",
    eyebrow:"在这里发出的帖子", h1:"这个机位，<br><em>大家都在拍什么</em>",
    sub:"这里的真实帖子、它们的共同点，和一条 5 分钟就能拍完的同款。",
    make:"拍同款", free:"免费 · 无需注册",
    hook:"开头", easy:"容易拍", car:"需要开车", open:"查看原帖 ↗", pending:"链接待补充", illus:"示意图 · 待放入已核实的帖子",
    workH:"这里什么内容有效", slots:"见位置 {s}", check:"待核对",
    monthLead:"已查看 {n} 条公开帖子 · {p}", monthEx:"本月统计完成前，显示的是示例数字。",
    monthNote:"人工统计，不是流量或排名数据。",
    fmt:{ reel:"短视频", carousel:"图文", photo:"单图", video:"视频" },
    opening:"最常见开头", angle:"最常见文案", topViews:"最高播放量", topViewsVal:"位置 {s} · {d}", ofN:"{c}/{n}",
    yourPost:"你的这一条", tabVideo:"短视频（抖音）", tabCar:"图文（小红书）", slide:"张", onscreen:"画面文字",
    copyShots:"复制拍摄清单",
    capH:"选一条文案", capSub:"左右滑动，5 种风格，复制时带上话题。", copy:"复制", tagsOnly:"只复制标签", copied:"已复制 ✓", selected:"已选中，请点复制",
    locTag:"定位",
    net:"用国内手机卡漫游时，Instagram 和 TikTok 通常打不开，小红书、抖音、微信可以正常用，所以默认给你小红书图文版。",
    boatH:"想进洞看？", boatP:"山下 Wied iż-Żurrieq 小港口有游船，开车几分钟。", boatGo:"预订游船 ↗", aff:"推广链接，价格不变。",
    featH:"有机会展示在这里", featP:"发布时带上 {tag}{handle}，我们会展示优秀作品并注明作者。",
    pick:"本地推荐 · 赞助",
    otherH:"其他景点", find:"定位我的景点", finding:"定位中…", notNear:"附近暂时没有我们的景点页面。", locOff:"无法定位，请从列表选择。", soon:"草稿",
    movedH:"换地方了？", movedP:"这个页面是{here}的。选择你现在所在的景点。", stay:"我还在这里",
    foot:`帖子由人工从公开的 TikTok 和 Instagram 挑选，只链接原帖并注明作者，不转存。不保证流量。作者联系：<span class="sel">${CONTACT}</span>`,
    maps: () => L.maps.coords
      ? [["高德", `https://uri.amap.com/marker?position=${L.maps.coords[1]},${L.maps.coords[0]}&name=${encodeURIComponent(L.name.zh)}`], ["Apple 地图", L.maps.apple]]
      : [["Apple 地图", L.maps.apple]]
  }
};

/* ---------- analytics hook: no-op unless a cookie-free script like Plausible is on the page ---------- */
let sticker = null;
try { sticker = new URLSearchParams(location.search).get("q"); } catch(e){}
let lang;
function track(name, extra){
  try { if (typeof window.plausible === "function") window.plausible(name, { props: Object.assign({ lang, loc: L.slug, sticker: sticker || "none" }, extra || {}) }); } catch(e){}
}

/* ---------- language + fonts ---------- */
function pickLang(){
  const forced = window.BOARD_LANG;
  if (forced === "en" || forced === "zh") return forced;
  try { const s = localStorage.getItem("board-lang"); if (s === "en" || s === "zh") return s; } catch(e){}
  const n = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  return /^zh/i.test(n) ? "zh" : "en";
}
function latinFonts(){
  // English only. Chinese visitors on roaming usually can't reach Google, so zh uses system fonts.
  if (document.getElementById("gf")) return;
  const l = Object.assign(document.createElement("link"), { id:"gf", rel:"stylesheet",
    href:"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" });
  document.head.appendChild(l);
}

/* ---------- illustration standing in for a post preview (never a creator's image) ---------- */
function scene(kind, i){
  const id = "g"+i;
  const extra = {
    reveal:`<g fill="none" stroke="#F6C21C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M45 128 V96"/><path d="M38 103 L45 96 L52 103"/></g>`,
    carousel:[0,1,2,3,4].map(n=>`<circle cx="${33+n*6}" cy="120" r="1.8" fill="${n?'rgba(255,255,255,.55)':'#fff'}"/>`).join(""),
    person:`<g fill="#0B1A24"><circle cx="58" cy="118" r="4.2"/><rect x="53.5" y="122" width="9" height="20" rx="3"/></g><rect x="0" y="140" width="90" height="2" fill="#E8E2D6"/>`,
    pov:`<path d="M0 160 L0 146 L90 140 L90 160Z" fill="#6E6A60"/><g stroke="#E8E2D6" stroke-width="1.6"><line x1="0" y1="138" x2="90" y2="130"/><line x1="10" y1="137" x2="10" y2="146"/><line x1="40" y1="134" x2="40" y2="143"/><line x1="70" y1="131" x2="70" y2="141"/></g>`
  }[kind] || "";
  return `<svg viewBox="0 0 90 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ED3EC"/><stop offset="1" stop-color="#DDF0F6"/></linearGradient>
    <linearGradient id="sea${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E6FA8"/><stop offset=".55" stop-color="#16A7C0"/><stop offset="1" stop-color="#5FD6D6"/></linearGradient></defs>
    <rect width="90" height="60" fill="url(#sky${id})"/><rect y="58" width="90" height="102" fill="url(#sea${id})"/>
    <ellipse cx="74" cy="58.5" rx="7" ry="2" fill="#6B7F86"/>
    <path d="M0 40 L22 44 L38 52 L46 70 L44 104 L36 112 L0 118Z" fill="#C9A66B"/><path d="M0 40 L22 44 L38 52 L40 58 L0 56Z" fill="#DDBE84"/>
    <path d="M18 104 Q18 76 30 76 Q42 76 42 104Z" fill="#1392B8"/><path d="M22 104 Q23 84 30 84 Q37 84 38 104Z" fill="#35C1CF" opacity=".7"/>
    <ellipse cx="60" cy="98" rx="2.4" ry=".9" fill="#fff"/><rect x="59" y="95.5" width="2" height="2.6" fill="#F6C21C"/>${extra}</svg>`;
}
const ICON = {
  eye:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  arrow:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M6 11l6-6 6 6"/></svg>`,
  pin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  save:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4Z"/></svg>`
};
const PLAT = { tiktok:"TikTok", instagram:"Instagram", red:"小红书", douyin:"抖音" };
const km = (a,b) => { const r=x=>x*Math.PI/180, dLa=r(b[0]-a[0]), dLo=r(b[1]-a[1]);
  return 12742*Math.asin(Math.sqrt(Math.sin(dLa/2)**2+Math.cos(r(a[0]))*Math.cos(r(b[0]))*Math.sin(dLo/2)**2)); };

/* ---------- render ---------- */
let mode, openedAt = Date.now(), io = null;

function render(){
  const T = UI[lang], R = L.recipe[lang];
  document.documentElement.lang = T.htmlLang;
  document.title = T.title;
  if (lang === "en") latinFonts();
  mode = R.firstTab;

  const verified = L.posts.filter(p=>p.verified).length;
  const handle = lang === "zh" ? L.handles.red : (L.handles.instagram || L.handles.tiktok);
  const tag = L.trackTag[lang];
  const handleLine = handle ? `\n${lang==="zh" ? "@"+handle.replace(/^@/,"") : "📍 via @"+handle.replace(/^@/,"")}` : "";
  const tagsFor = c => `${R.coreTags} ${c.tags} ${tag}`;
  const others = SPOTS.filter(sp => sp.slug !== L.slug && (sp.live || L.draft));
  const canLocate = others.length && "geolocation" in navigator && [L.slug, ...others.map(x=>x.slug)].every(sl => (SPOTS.find(x=>x.slug===sl)||{}).coords);

  const post = (p,i) => {
    const c = p[lang];
    const media = p.thumb && p.verified ? `<img src="${esc(p.thumb)}" alt="${esc(p.creator)}" loading="lazy">` : scene(p.scene,i);
    const link = p.verified && p.url
      ? `<a class="open" data-track="open_post" data-slot="${i+1}" href="${esc(p.url)}" target="_blank" rel="noopener">${T.open}</a>`
      : `<span class="open off">${T.pending}</span>`;
    return `<article class="post${p.verified?"":" unverified"}">
      <div class="thumb">${media}
        <div class="top"><span class="badge ${p.platform}">${PLAT[p.platform]||p.platform}</span><span class="fmt">${esc(c.format)}</span></div>
        ${p.verified?"":`<div class="slotmark">${T.illus}</div>`}
        <div class="hookline"><small>${T.hook}</small>${esc(c.hook)}</div>
      </div>
      <p class="why">${esc(c.why)}</p>
      <div class="postfoot"><span class="ease${p.ease==="easy"?"":" med"}">${p.ease==="easy"?T.easy:T.car}</span>${link}</div>
      <div class="credit">${p.verified&&p.creator?esc(p.creator):`#${i+1}`}</div>
    </article>`;
  };

  function month(){
    let M = L.month; if (!M) return "";
    let example = false;
    if (!(M.checked && M.formats)) {
      if (!L.draft) return "";
      example = true;   // draft preview only, clearly labelled
      M = Object.assign({}, M, { checked:12, formats:[["reel",7],["carousel",4],["photo",1]],
        opening:{en:"Water close-up",zh:"海水特写",count:6}, angle:{en:"“No boat needed”",zh:"“不用坐船”",count:3}, topViews:null });
    }
    const cls = ["f1","f2","f3","f4"];
    return `<div class="month${example?" example":""}">
      ${example?`<p class="m-ex">${T.monthEx}</p>`:""}
      <p class="m-lead">${fill(T.monthLead,{n:M.checked,p:esc(M.period[lang])})}</p>
      <div class="stack" role="img" aria-label="${M.formats.map(f=>`${T.fmt[f[0]]||f[0]} ${f[1]}`).join(", ")}">${M.formats.map((f,i)=>`<span class="${cls[i%4]}" style="flex:${f[1]}"></span>`).join("")}</div>
      <div class="legend">${M.formats.map((f,i)=>`<span><i class="${cls[i%4]}"></i>${T.fmt[f[0]]||f[0]} <b>${f[1]}</b></span>`).join("")}</div>
      <dl class="mrows">
        ${M.opening?`<div><dt>${T.opening}</dt><dd>${esc(M.opening[lang])} <small>${fill(T.ofN,{c:M.opening.count,n:M.checked})}</small></dd></div>`:""}
        ${M.angle?`<div><dt>${T.angle}</dt><dd>${esc(M.angle[lang])} <small>${fill(T.ofN,{c:M.angle.count,n:M.checked})}</small></dd></div>`:""}
        ${M.topViews?`<div><dt>${T.topViews}</dt><dd>${fill(T.topViewsVal,{s:M.topViews.slot,d:esc(M.topViews.date)})}</dd></div>`:""}
      </dl>
      <p class="m-note">${T.monthNote}</p>
    </div>`;
  }

  const shotList = m => (m==="video"?R.video:R.carousel).map(s=>`<li class="shot">
      <div class="t">${m==="video"?esc(s.t):`<b>${esc(s.t)}</b>${T.slide}`}</div>
      <div><h4>${esc(s.title)}</h4><p>${esc(s.how)}</p>${s.text?`<span class="ost">${T.onscreen}: ${esc(s.text)}</span>`:""}</div></li>`).join("");
  const tabs = R.firstTab==="video" ? [["video",T.tabVideo],["carousel",T.tabCar]] : [["carousel",T.tabCar],["video",T.tabVideo]];

  const spotList = () => `<ul class="spots">${others.map(sp=>`<li><a href="${esc(sp.url)}${lang==="zh"?"zh/":""}" data-track="go_spot" data-slot="${esc(sp.slug)}"><span>${esc(sp.name[lang])}${sp.live?"":` <small>${T.soon}</small>`}</span><span aria-hidden="true">→</span></a></li>`).join("")}</ul>
    ${canLocate?`<button class="btn btn-o findme" data-find>${T.find}</button><p class="findmsg" aria-live="polite"></p>`:""}`;

  const more = [];
  if (L.localPick) more.push(`<div class="row pick"><span class="label">${T.pick}</span><h3>${esc(L.localPick.name)}</h3><p>${esc(L.localPick[lang])}</p>${L.localPick.url?`<a class="go" data-track="local_pick" href="${esc(L.localPick.url)}" target="_blank" rel="noopener sponsored">${esc(L.localPick.name)} ↗</a>`:""}</div>`);
  more.push(`<div class="row"><h3>${T.boatH}</h3><p>${T.boatP}</p>${L.boat.url?`<a class="go" data-track="boat" href="${esc(L.boat.url)}" target="_blank" rel="noopener sponsored">${T.boatGo}</a><small>${T.aff}</small>`:""}</div>`);
  more.push(`<div class="row"><h3>${T.featH}</h3><p>${fill(T.featP,{tag:`<b>${esc(tag)}</b>`, handle: handle?` ${lang==="zh"?"并 @":"+ "}<b>${esc(handle)}</b>`:""})}</p></div>`);
  if (others.length) more.push(`<div class="row"><h3>${T.otherH}</h3>${spotList()}</div>`);
  if (lang === "en" && L.signup && L.signup.action) more.push(`<form class="row" id="signup" action="${esc(L.signup.action)}" method="post" target="_blank">
      <h3>${T.sigH}</h3><p>${T.sigP}</p>
      <label class="vh" for="sig-email">Email</label><input id="sig-email" name="email" type="email" required autocomplete="email" placeholder="${T.sigPh}">
      <label class="consent"><input id="sig-consent" type="checkbox" required> ${T.sigConsent}</label>
      <button class="btn btn-ink" type="submit">${T.sigBtn}</button></form>`);

  document.getElementById("app").innerHTML = `
  ${L.draft?`<div class="draft" role="note"><div class="wrap">${fill(T.draft,{n:verified,t:L.posts.length})}</div></div>`:""}
  <header class="wrap head">
    <div class="place">
      <svg class="pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" fill="#D2322B"/><circle cx="12" cy="10" r="2.6" fill="#fff"/></svg>
      <div><strong>${esc(L.name[lang])}</strong><span>${esc(L.area[lang])}</span></div>
    </div>
    <div class="pills">
      ${T.maps().map(([n,u])=>`<a class="pill" data-track="open_map" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join("")}
      <button class="pill pill-ink" id="lang" aria-label="${T.switchAria}">${T.switchTo}</button>
    </div>
  </header>

  <main class="wrap">
    <div class="hero">
      <span class="label live">${T.eyebrow} · ${esc(L.curatedOn)}</span>
      <h1>${T.h1}</h1>
      <p>${T.sub}</p>
    </div>
    <div class="rail" aria-label="${T.eyebrow}">${L.posts.map(post).join("")}</div>
    <a class="btn btn-y cta" href="#make">${T.make} ↓</a>
    <p class="free">${T.free}</p>

    <section id="working">
      <h2>${T.workH}</h2>
      ${month()}
      <ul class="patterns">${L.patterns.map(pt=>{
        const ok = pt.seenIn.filter(n=>L.posts[n-1]&&L.posts[n-1].verified);
        return `<li><span class="ico">${ICON[pt.icon]||""}</span><div><h3>${esc(pt[lang].title)}</h3><p>${esc(pt[lang].body)}</p>
          <span class="ev${ok.length?"":" todo"}">${fill(T.slots,{s:pt.seenIn.join(", ")})}${ok.length?"":` · ${T.check}`}</span></div></li>`;
      }).join("")}</ul>
    </section>

    <section id="make">
      <div class="recipe">
        <span class="label">${T.yourPost}</span>
        <h2>${esc(R.title)}</h2>
        <p class="sub">${esc(R.oneLiner)}</p>
        <div class="facts">${R.facts.map(f=>`<span><small>${esc(f[0])}</small>${esc(f[1])}</span>`).join("")}</div>
        <div class="tabs" role="tablist">${tabs.map(([m,n])=>`<button class="tab" role="tab" data-mode="${m}" aria-controls="panel" aria-selected="${m===mode}">${n}</button>`).join("")}</div>
        <ol class="shots" id="panel" role="tabpanel">${shotList(mode)}</ol>
        <button class="btn btn-y" id="copy-shots">${T.copyShots}</button>
        <ul class="tips">${R.tips.map(t=>`<li>${t}</li>`).join("")}</ul>
      </div>
      ${T.net?`<p class="netnote">${T.net}</p>`:""}

      <div class="caps-h"><h2>${T.capH}</h2><p>${T.capSub}</p></div>
      <div class="caprail">${R.captions.map((c,i)=>`<article class="capcard">
          <div class="cap-top"><span class="angle">${esc(c.angle)}</span><span class="label">${i+1}/${R.captions.length}</span></div>
          <div class="text" id="cap-${i}">${esc(c.text + handleLine)}</div>
          <div class="text tags" id="tag-${i}">${esc(tagsFor(c))}</div>
          <div class="cap-btns"><button class="btn btn-ink" data-copy="all" data-i="${i}">${T.copy}</button><button class="btn btn-ghost" data-copy="tags" data-i="${i}">${T.tagsOnly}</button></div>
        </article>`).join("")}</div>
      <p class="loctag"><span class="label">${T.locTag}</span> ${esc(L.locationTag)}</p>
    </section>

    <section class="more">${more.join("")}</section>
    <footer><p>${T.foot}</p></footer>
  </main>

  <div class="bar off" id="bar"><a class="btn btn-y" href="#make">${T.make}</a></div>
  <div class="sheet" id="moved" hidden role="dialog" aria-modal="true" aria-labelledby="moved-h"><div class="sheet-in">
    <h3 id="moved-h">${T.movedH}</h3><p>${fill(T.movedP,{here:esc(L.name[lang])})}</p>
    ${spotList()}
    <button class="btn btn-o" id="stay">${T.stay}</button>
  </div></div>`;

  /* tabs */
  const panel = document.getElementById("panel");
  document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
    mode = b.dataset.mode;
    document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-selected", String(x===b)));
    panel.innerHTML = shotList(mode);
    track("switch_format", { format: mode });
  }));

  /* copy */
  function doCopy(btn, text, el, ev, props){
    const label = btn.textContent;
    const ok = () => { btn.textContent = T.copied; btn.classList.add("done"); setTimeout(()=>{btn.textContent=label;btn.classList.remove("done")},1600); };
    const fail = () => { const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent=T.selected; setTimeout(()=>{btn.textContent=label},2200); };
    try { navigator.clipboard.writeText(text).then(ok, fail); } catch(e){ fail(); }
    track(ev, props);
  }
  document.querySelectorAll("[data-copy]").forEach(btn=>btn.addEventListener("click",()=>{
    const i = +btn.dataset.i, c = R.captions[i], props = { caption:String(i+1), angle:c.angle };
    if (btn.dataset.copy === "all") doCopy(btn, `${c.text}${handleLine}\n\n${tagsFor(c)}`, document.getElementById("cap-"+i), "copy_caption", props);
    else doCopy(btn, tagsFor(c), document.getElementById("tag-"+i), "copy_hashtags", props);
  }));
  const shotsBtn = document.getElementById("copy-shots");
  shotsBtn.addEventListener("click", ()=>{
    const list = mode==="video"?R.video:R.carousel;
    doCopy(shotsBtn, `${R.title} · ${L.name[lang]}\n` + list.map(s=>`${mode==="video"?s.t:`${s.t}.`} ${s.title}: ${s.how}${s.text?` [${s.text}]`:""}`).join("\n"), panel, "copy_shots", { format: mode });
  });

  /* outbound links */
  document.querySelectorAll("[data-track]").forEach(a=>a.addEventListener("click",()=>track(a.dataset.track, a.dataset.slot?{slot:a.dataset.slot}:{})));

  /* language */
  document.getElementById("lang").addEventListener("click", () => {
    lang = lang === "en" ? "zh" : "en";
    try { localStorage.setItem("board-lang", lang); } catch(e){}
    track("switch_lang"); render(); window.scrollTo(0,0);
  });

  /* moved-on sheet + find my spot (location asked once, on tap, compared on the phone, never sent) */
  const sheet = document.getElementById("moved");
  document.getElementById("stay").addEventListener("click", ()=>{ sheet.hidden = true; openedAt = Date.now(); track("moved_stay"); });
  document.querySelectorAll("[data-find]").forEach(btn=>btn.addEventListener("click", ()=>{
    const msg = btn.nextElementSibling, label = btn.textContent;
    btn.textContent = T.finding;
    navigator.geolocation.getCurrentPosition(pos=>{
      const here=[pos.coords.latitude,pos.coords.longitude]; let best=null;
      SPOTS.filter(sp=>sp.coords&&(sp.live||L.draft)).forEach(sp=>{const d=km(here,sp.coords); if(!best||d<best.d) best={sp,d};});
      btn.textContent = label;
      if (best && best.d < 1.5){ track("find_spot",{found:best.sp.slug}); if (best.sp.slug===L.slug) sheet.hidden=true; else location.href = best.sp.url+(lang==="zh"?"zh/":""); }
      else { msg.textContent = T.notNear; track("find_spot",{found:"none"}); }
    }, ()=>{ btn.textContent = label; msg.textContent = T.locOff; }, { enableHighAccuracy:false, timeout:8000, maximumAge:300000 });
  }));

  /* sticky button: hidden while the main button or the recipe is on screen */
  if (io) io.disconnect();
  const bar = document.getElementById("bar");
  if ("IntersectionObserver" in window){
    const st = { top:true, make:false };
    io = new IntersectionObserver(es=>{ es.forEach(e=>{
      if (e.target.id==="make") st.make = e.isIntersecting;
      else st.top = e.isIntersecting || e.boundingClientRect.top > 0;
    }); bar.classList.toggle("off", st.top || st.make); });
    io.observe(document.querySelector(".cta")); io.observe(document.getElementById("make"));
  } else bar.classList.remove("off");
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  const sheet = document.getElementById("moved");
  const others = SPOTS.some(sp => sp.slug !== L.slug && (sp.live || L.draft));
  if (sheet && others && (Date.now() - openedAt) / 60000 > STALE_MIN) { sheet.hidden = false; track("moved_prompt"); }
});

lang = pickLang();
render();
if (location.hash === "#moved") { const sh = document.getElementById("moved"); if (sh) sh.hidden = false; }
track("board_view");
})();
