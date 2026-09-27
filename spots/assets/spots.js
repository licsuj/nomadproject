/* All board locations. Shared by every page for "Moved on? Pick your spot".
   live:false = not shown to visitors (only in draft previews).
   coords: [lat, lng] — long-press the spot in Google Maps to copy. Needed for "Find my spot". */
window.SPOTS = [
  { slug: "blue-grotto", url: "/blue-grotto/", live: true,  coords: null,
    name: { en: "Blue Grotto viewpoint", zh: "蓝洞观景台" } },
  { slug: "golden-bay",  url: "/golden-bay/",  live: false, coords: null,
    name: { en: "Golden Bay", zh: "黄金湾 Golden Bay" } }
];
