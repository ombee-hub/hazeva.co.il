// Builds every page of the Hazeva site (content + templates). Usage, from the site folder: node tools/build.mjs .
import fs from "fs"; import path from "path";
const WEB = process.argv[2];


// ---------- helpers ----------
const SITE = "מושב חצבה - ערבה תיכונה";
const RENAMES = {"pic_1s":"hero-girl-desert","page2":"gallery-camel","page3":"gallery-desert-lilies","page4":"gallery-jeep-tour","page5":"gallery-greenhouse-building","page6":"gallery-harvest-crates","page7":"gallery-irrigation-reels","page8":"gallery-family-campfire","page9":"gallery-date-palms","page10":"gallery-pool-inflatables","page11":"gallery-acacia-tree","page12":"gallery-cherry-tomatoes","page13":"gallery-reservoir-aerial","page14":"gallery-community-event","page15":"gallery-rainbow-acacia","page16":"gallery-red-peppers","page17":"gallery-flower-field","page18":"gallery-desert-pool","page19":"gallery-onion-flowers","page20":"gallery-desert-landscape","page21":"gallery-watermelon-market","p2":"about-children","p3":"about-produce-trucks","p4":"about-library","delek":"history-water-tower","p6":"history-1965-tents","p7":"history-1967-moshavutz","p8":"history-1970-convoy","p9":"history-1972-tractor-carts","p10":"history-volunteers","p11":"history-today","p12":"founding-scroll","p12-b":"founding-scroll-date","4pics1":"agri-crops","air":"agri-storks","hamamot2":"agri-greenhouses","michzur":"agri-recycling","pepper_big1":"agri-red-pepper","shtil1":"agri-seedling","bird":"tourism-bird","gamal":"tourism-camel","romantica":"tourism-romantic","barel":"stay-derech-haarava","beti-manor":"stay-shayeret-gmalim","brin":"stay-hahan","elbaz":"stay-yaarat-hadvash","hasida":"stay-betzel-hachasida","haziz":"stay-beveita-bamidbar","luria":"stay-betzel-hatamar","madar":"stay-shalva-bamidbar","muching":"stay-bar-bamidbar","oz":"stay-shvilim-bamidbar","ozer":"stay-la-siesta","rashashita":"stay-ras-hashita","eger":"guide-tzviki-egger","ezik":"guide-itzik-bashetah","yuval":"guide-yuval-baarava","ofrit":"therapy-ofrit-maoz","rvital":"therapy-bikvot-haguf","Ami":"business-amichai-rotem","Sun-Gourmet":"business-sun-gourmet","ambar":"business-bad-bevad","blanshrose":"business-blanche-rose","fredi":"business-fredi-naftali","fresco":"business-fresco","gulitek":"business-gulitek","hagareen":"business-hagarin","machbesa":"business-laundry","moofapub":"business-moofa-pub","ofna-avira":"business-ofna-veavira","rama":"business-rama-flowers","ronit":"business-ronit-bondi","shvilim":"business-studio-shvilim","woodtoys":"business-woodtoys"};
const copied = new Set();
function img(rel) {                       // old-site image path -> its path in /images (site-root relative)
  const base = rel.split("/").pop().replace(/&/g, "-").replace(/.(jpe?g|png|gif)$/i, "");
  const p = "images/" + (RENAMES[base] || base) + ".webp";
  if (!fs.existsSync(path.join(WEB, ...p.split("/")))) throw new Error("missing image " + p);
  copied.add(p);
  return p;
}
const telHref = n => "tel:+972" + n.replace(/\D/g, "").replace(/^0/, "");
const ICON = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  web: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
};

// ---------- data: directory listings ----------
// contacts: [label, [numbers]] ; transcribed from the old "צור קשר" images
const TOURISM_GROUPS = [
  { key: "stay", title: "צימרים ואירוח", items: [
    { id: "hasida", name: "בצל החסידה", sub: "בית קטן בערבה", img: "tourism/images/hasida.jpg",
      text: ["2 יחידות מיוחדות ומושקעות לזוגות ו/או משפחות המחפשות אווירה כפרית שקטה ואינטימית בלב גינה פורחת."],
      contacts: [["חסידה", ["052-3666396"]], ["ניר", ["08-6581340", "052-3666340"]]], mail: "hasida@arava.co.il" },
    { id: "elbaz", name: "יערת הדבש", sub: "אירוח כפרי ומוצרים טבעיים", img: "tourism/images/elbaz.jpg",
      text: ["מוזמנים ומוזמנות להתארח ביערת הדבש בבקתות העץ המפנקות, ליהנות מהבוסתן ולטעום מן הדבש."],
      contacts: [["הילה אלבז", ["052-8804033"]]], mail: "hillaelbaz@arava.co.il" },
    { id: "barel", name: "דרך הערבה", sub: "הגן השקט והחמצן, אוויר של כפר, שקט של מדבר", img: "tourism/images/barel.jpg",
      text: ["5 יחידות אירוח במתחם מפנק בדרך הערבה."],
      contacts: [["תמי בראל", ["052-8666157"]], ["דני בראל", ["052-8311002"]]], mail: "aravaroutes@arava.co.il" },
    { id: "brin", name: "החאן", sub: "צימרים בערבה", img: "tourism/images/brin.jpg",
      text: ["6 יחידות אירוח (3 נגישות) הבנויות מחדר שינה נפרד לזוג וסלון המארח בנוחות שלושה עד ארבעה ילדים, הפונות למתחם מרכזי מרווח ומפנק עם פינת זולה מרגיעה."],
      contacts: [["יהודית ברין", ["052-3665922"]]], mail: "hahan19@gmail.com", web: "http://www.hahan.co.il" },
    { id: "haziz", name: "בביתה במדבר", sub: "יחידות רומנטיות לזוגות", img: "tourism/images/haziz.jpg",
      text: ["3 יחידות רומנטיות, מפנקות ומאובזרות בקפדנות במיוחד לזוגות, בפינה חמה ופסטורלית בלב המדבר בין עצי התמר."],
      contacts: [["תמר חזיז", ["08-6581431", "052-8666001"]]], mail: "haziz@arava.co.il", web: "http://my.weekend.co.il/בביתה_במדבר/" },
    { id: "luria", name: "בצל התמר", sub: "משפחת לוריא", img: "tourism/images/luria.jpg",
      text: ["שישה צימרים מפנקים בסגנון כפרי עם מתחם סגור, ממוזג ומרווח בעיצוב מיוחד, ומטבח מרכזי לשירות עצמי.", "ג'קוזי גדול מרכזי המשקיף לנוף המדברי הקסום ומתקנים לילדים."],
      contacts: [["ענת ודודי לוריא", ["050-6452502"]]], web: "http://www.mhnr.co.il" },
    { id: "beti", name: "שיירת גמלים", sub: "בטי מנור", img: "tourism/images/beti-manor.jpg",
      text: ["יחידות משפחתיות עם פינת ישיבה מיוחדת. לינה לקבוצות גדולות במתחם יפהפה.", "פינת משחקים לילדים – והכל באווירה כפרית מפנקת."],
      contacts: [["בטי מנור", ["052-3908973"]]], web: "http://my.weekend.co.il/שיירת_גמלים/" },
    { id: "muchnik", name: "בר במדבר", sub: "משפחת מוצ'ניק", img: "tourism/images/muching.jpg",
      text: ["בקתות עץ לחוויה רומנטית מושלמת עם ג'קוזי גדול וסאונה יבשה.", "סוויטות מרווחות למשפחות וזוגות, אוהל בדואי גדול ומסעדה בשרית מדברית."],
      contacts: [["אטי ופיני מוצ'ניק", ["08-6581406", "052-3338646", "052-3868916"]]], mail: "desertbar@arava.co.il", web: "http://www.desertbar.co.il" },
    { id: "madar", name: "שלווה במדבר", sub: "משפחת מדר", img: "tourism/images/madar.jpg",
      text: ["צימרים וחדרי אירוח מפנקים ושלווים עם ג'קוזי רפואי מרווח, טיפולי ספא ופינה לילדים.", "רחבת דשא גדולה, גינה אורגנית וחדר אוכל גם לכנסים. המקום מתאים גם לציבור הדתי."],
      contacts: [["דינה ודודו מדר", ["08-6581323", "052-3666323"]]], mail: "dudum2@013net.net", web: "http://www.shalvabamidbar.com" },
    { id: "ozer", name: "לה סיאסטה", sub: "קארין וניל עוזר", img: "tourism/images/ozer.jpg",
      text: ["בין הרי אדום והרי הנגב, מול נופי מדבר אין-סופיים, בנינו ארבעה צימרים המקיפים מתחם מרווח ומפנק בסגנון מקסיקני, המשקיף למדבר הקסום."],
      contacts: [["קארין וניל עוזר", ["08-6581566", "052-3666415"]]], mail: "neil@lasiesta.co.il", web: "http://www.lasiesta.co.il" },
    { id: "oz", name: "שבילים במדבר", sub: "סיגי ובועז עוז", img: "tourism/images/oz.jpg",
      text: ["אירוח בסגנון מדברי, כמעט כמו בסיני... בלילות – נרות, קטורת ואווירה מיוחדת.", "בשטחו של חאן רחב ידיים עם ערסלים ומחצלות וג'קוזי מרכזי גדול."],
      contacts: [["סיגי ובועז עוז", ["08-6581829", "052-3665927"]]], mail: "b_oz@arava.co.il", web: "http://www.shvilimbamidbar.com" },
    { id: "rashashita", name: "ראס השיטה", sub: "קמפינג מדברי", img: "tourism/images/rashashita.jpg",
      text: ["בנוף מדברי קסום, קמפינג אוהלים בשטח פתוח, חושות וסוכה מרכזית גדולה.", "צוות המקום כולל מורי דרך מקצועיים, טיולי ג'יפים והדרכות."],
      contacts: [["סיגי ובועז עוז", ["08-6581829", "052-3665927"]]], mail: "b_oz@arava.co.il" },
  ]},
  { key: "guides", title: "מורי דרך", items: [
    { id: "egger", name: "צביקי אגר", sub: "מורה דרך ארצי מוסמך", img: "tourism/images/eger.jpg",
      text: ["מורה דרך ארצי מוסמך. התמחות: מדבר יהודה, נגב, ערבה, הרי אילת וירדן.", "ברגל, בג'יפ, ברכב פרטי או באוטובוס – לקבוצות ולבודדים. טיולי גמלים בירדן."],
      contacts: [["צביקי אגר", ["08-6581265", "052-3868996"]]], mail: "tzvikiegger@walla.com", web: "http://www.egger.co.il" },
    { id: "ezik", name: "איציק בשטח", sub: "איציק מעוז", img: "tourism/images/ezik.jpg",
      text: ["הובלת טיולים, מנהלות, טיול נודד, טיולי אופניים, טיולי סוסים, ארגון ארוחות ייחודיות ושירותי קייטרינג בשטח.", "למשפחות ולקבוצות מאורגנות."],
      contacts: [["איציק מעוז", ["08-6581781", "052-3666453"]]], mail: "maoz@arava.co.il", web: "http://www.cuponofesh.co.il/zimcity.php?zid=1315" },
    { id: "yuval", name: "יובל בערבה", sub: "יובל מזור", img: "tourism/images/yuval.jpg",
      text: ["\"סוד יופיו של המדבר, שהוא צופן אי שם בחובו מקור מים חיים\" – הנסיך הקטן.", "מורה דרך ארצי (תו תקן משרד החינוך) עם רכב מדברי גדול. אוהב לטייל עם ילדים ומשפחות במסלולי ג'יפים ובטיולים רגליים."],
      contacts: [["יובל מזור", ["052-4260001"]]], mail: "789gym@gmail.com" },
  ]},
  { key: "care", title: "מטפלים", items: [
    { id: "ofrit", name: "עופרית מעוז", sub: "טיפול משולב", img: "tourism/images/ofrit.jpg",
      text: ["שיאצו, מסאז' תאילנדי וטווינה: סדרת טיפולים מכף רגל ועד ראש.", "טיפול בכאבי גב, צוואר, רגליים ועוד. טיפולי מתנה ופינוק אצל מטפלת מוסמכת."],
      contacts: [["עופרית מעוז", ["052-2707889"]]] },
    { id: "revital", name: "בעקבות הגוף", sub: "רויטל צור", img: "tourism/images/rvital.jpg",
      text: ["שיטת גרינברג, עיסויים בשמנים ארומתרפיים ורפלקסולוגיה להנאה ורגיעה.", "הפקת אירועים, טיפולים לקבוצות וסדנאות מגע."],
      contacts: [["רויטל צור", ["052-3666734"]]], mail: "revitall@arava.co.il" },
  ]},
];

const BUSINESS_GROUPS = [
  { key: "biz", title: "עסקים ויוצרים", items: [
    { id: "ofna", old: "index", name: "אופנה ואווירה", sub: "חנות ובית קפה", img: "business/images/ofna&avira.jpg",
      text: ["חנות ביגוד של חברת FOX ומתנות לכל המשפחה, ובית קפה שמגיש ארוחות בוקר.", "פלאפל, פיצה, המבורגר ונקניקיות בחצר מופלאה עם מתקני משחק לילדים, מגלשות ונדנדות."],
      contacts: [["נירית", ["052-4260970"]], ["יהודית", ["050-5250900"]]] },
    { id: "ambar", name: "בד בבד", sub: "מיקי אמבר, יוצרת ותופרת", img: "business/images/ambar.jpg",
      text: ["מפות שולחן, ראנרים, כריות, וילונות, צעיפים, תיקים, שמיכות, אפודות ומעילים לילדים (פליז) – והכל בהזמנה."],
      contacts: [["מיקי אמבר", ["08-6581249", "054-458124"]]], mail: "ambar@arava.co.il" },
    { id: "ami", name: "עמיחי רותם", sub: "צילום ועריכת וידאו", img: "business/images/Ami.jpg",
      text: ["עריכת קליפים וכתבות דיוקן: אלבום התמונות הישן של ההורים על DVD, סרטי תדמית על מוצר, מקום או אישיות, סרטי אמנות מהנוף הסובב אותנו ועוד."],
      contacts: [["עמיחי רותם", ["052-2880198"]]], mail: "ami038@bezeqint.net.il" },
    { id: "blanshrose", name: "בלאנש רוז", sub: "דברים יפים, קפה ועוגה", img: "business/images/blanshrose.jpg",
      text: ["בחצר הנעימה פתחנו מקום אינטימי קסום ובו דברים יפים, אותם ליקטנו בהמון תשומת לב ואהבה – עם מוסיקה, קפה ועוגה המנעימים את חוויית הקנייה."],
      contacts: [["תמר חזיז", ["052-8666001"]], ["אילנה שגיא", ["052-3666184"]]], mail: "haziz@arava.co.il" },
    { id: "fredi", name: "פרדי נפתלי", sub: "צלם", img: "business/images/fredi.jpg",
      text: ["בעברו היה בעל סטודיו מקצועי ודיגיטלי לצילום, פרסום, תעשייה ואמנות.", "לימד בקמרה אובסקורה, במדרשה לאמנות בית ברל ואמנות חזותית במכללת קיי. הנחה סדנאות שטח לצילום טבע במדבר."],
      contacts: [["פרדי נפתלי", ["052-2745446"]]] },
    { id: "fresco", name: "פרסקו", sub: "פרסקו חצבה 2006 בע\"מ", img: "business/images/fresco.jpg",
      text: ["חברה המתמחה בגידול, שטיפה, חיתוך, אריזה וייצור סלטים ורטבים טריים הבאים ישר מהשדה.", "מוצרים לדוגמה: סלט עלי BABY, חסות למיניהן, רוטב פסטו, צ'ימיצ'ורי ועוד המון דברים משובחים. המוצרים משווקים בכל רשתות השיווק."],
      contacts: [["משרד", ["08-6582075"]], ["פקס", ["08-6581674"]]], mail: "fresco@arava.co.il", web: "http://www.frescofarm.co.il" },
    { id: "golan", name: "גוליטק", sub: "משקלים בערבה", img: "business/images/gulitek.jpg",
      text: ["טכנאי אלקטרוניקה המתמחה במשקלים אלקטרוניים ומחשבים – מכירה, תיקון ושדרוג.", "שירות ללא מתחרים, זמינות מיידית לכל תקלה. אמינות, אדיבות ומחירים נוחים."],
      contacts: [["גולן קרקוקלי", ["052-4260555"]]] },
    { id: "hagarein", name: "הגרעין", sub: "סניף חצבה", img: "business/images/hagareen.jpg",
      text: ["רשת מקצועית לגינון וחקלאות, המונה כ-38 סניפים בפריסה ארצית מקריית שמונה ועד אילת.", "יבוא ושיווק מוצרי גינון, השקיה, חקלאות, מזון לחיות מחמד, כלי עבודה מנועיים וידניים ועוד."],
      contacts: [["מרכזייה", ["08-9320400"]], ["חדר הזמנות", ["08-9320439"]], ["פקס", ["08-9320424"]], ["דני טבע – מנהל שיווק וסחר", ["08-9320472", "054-6752423"]]] },
    { id: "machbesa", name: "נקי נקי אצל חסידה", sub: "מכבסה", img: "business/images/machbesa.jpg",
      text: ["מכבסה נעימה בה ניתנת תשומת לב לכל פריט.", "ניתן לכבס ולגהץ כביסה פרטית, כביסת צימרים, שמיכות ועוד."],
      contacts: [["חסידה", ["052-3666396"]], ["ניר", ["052-3666340"]]], mail: "hasida@arava.co.il" },
    { id: "moofapub", name: "Moofa Pub", sub: "פאב", img: "business/images/moofapub.jpg",
      text: ["הפאב פתוח בעיקר בימי שישי ומתקיימות בו מסיבות והופעות של מיטב האמנים.", "כל יום שישי, משעת הדמדומים ועד לשקיעה, הפאב פתוח לבירה של \"שישי שקיעה\"."],
      contacts: [["סער", ["052-4666670"]]] },
    { id: "niv", name: "WoodToys", sub: "צעצועי עץ ונגרות", img: "business/images/woodtoys.jpg",
      text: ["צעצועי עץ ומוצרים שונים מעץ מקומי ואחר. סדנת נגרות וחנות מכר צמודה, עם מכירה גם בדואר דרך האתר.", "כמו כן אפשר להשיג \"שמניב\" – שמנים מתובלים בבקבוקים של 375 סמ\"ק."],
      contacts: [["הוריה ניב", ["052-3666444"]], ["בית", ["08-6581464"]], ["פקס", ["08-6582411"]]], web: "http://www.woodtoys.co.il" },
    { id: "rama", name: "ר.מ.ה", sub: "עיצוב ושזירת פרחים", img: "business/images/rama.jpg",
      text: ["זרים וסידורי פרחים לכל אירוע ולכל מטרה, בשלל צבעים ובעטיפת מתנה נאה, בהזמנה טלפונית."],
      contacts: [["רונית גבעון", ["052-3666412"]], ["מרב מנור", ["052-4260730"]]] },
    { id: "ronit", name: "רונית בונדי", sub: "מעצבת תכשיטים", img: "business/images/ronit.jpg",
      text: ["מעצבת וצורפת תכשיטי כסף בשילוב זהב ואבנים טובות, בעיצוב ייחודי ובעבודת יד.", "ניתן גם לתקן ולנקות תכשיטים בתיאום מראש."],
      contacts: [["רונית בונדי", ["08-6581087", "052-3442796"]]] },
    { id: "shvilim", name: "סטודיו שבילים", sub: "סטודיו לתנועה", img: "business/images/shvilim.jpg",
      text: ["בסטודיו \"שבילים\" מגוון פעילויות: אייקידו, פילאטיס, אירובי וקפוארה."],
      contacts: [["סיגי עוז", ["052-8310933"]]], mail: "b_oz@arava.co.il" },
    { id: "sungourmet", name: "Sun-Gourmet", sub: "ייבוש בשמש הערבה", img: "business/images/Sun-Gourmet.jpg",
      text: ["מתמחה בגידול מוצרים חקלאיים משובחים ובייבושם בשמש הערבה:", "עגבניות שרי מובחרות, פלפלים צבעוניים מתוקים, חצילים קלאסיים, עלי תבלין שלמים, פטריות שיטאקי ועוד."],
      contacts: [["רוני וחגן אורן", ["052-3666598"]]], mail: "sungourmet@arava.co.il", web: "http://www.sun-gourmet.com" },
  ]},
];

const GALLERY = Array.from({ length: 20 }, (_, i) => `gallery/images/page${i + 2}.jpg`);

// ---------- layout ----------
const NAV = [
  ["about.html", "על המושב", "about"],
  ["tourism.html", "חופשה בחצבה", "tourism"],
  ["agri.html", "החקלאות שלנו", "agri"],
  ["business.html", "עסקים ויוצרים", "business"],
  ["gallery.html", "גלריה", "gallery"],
];
// mobile side drawer: [label, href, key, submenu?]; submenu items: [label, href, image]
const DRAWER = [
  ["על המושב", "about.html", "about", [
    ["חצבה במספרים", "about.html", "about/images/p2.jpg"],
    ["כך הכל התחיל", "history.html", "about/images/p6.jpg"],
    ["מגילת היסוד", "history.html#scroll", "about/images/p12.jpg"]]],
  ["חופשה בחצבה", "tourism.html", "tourism", [
    ["לצאת לחופשה בערבה", "tourism.html", "tourism/images/gamal.jpg"],
    ["צימרים ואירוח", "tourism.html#stay", "tourism/images/luria.jpg"],
    ["מורי דרך", "tourism.html#guides", "tourism/images/eger.jpg"],
    ["מטפלים", "tourism.html#care", "tourism/images/ofrit.jpg"],
    ["חופשה רומנטית", "tourism.html#romantic", "tourism/images/romantica.jpg"],
    ["אירוח קבוצות וארגונים", "tourism.html#groups", "tourism/images/bird.jpg"]]],
  ["החקלאות שלנו", "agri.html", "agri", [
    ["חקלאות מתקדמת", "agri.html", "agri/images/shtil1.jpg"],
    ["ענפי הגידול", "agri.html#crops", "agri/images/4pics1.jpg"],
    ["חדשנות בחקלאות", "agri.html#innovation", "agri/images/pepper_big1.jpg"],
    ["חקלאות ירוקה", "agri.html#green", "agri/images/michzur.jpg"],
    ["חקלאות אורגנית", "agri.html#organic", "agri/images/air.jpg"]]],
  ["עסקים ויוצרים", "business.html", "business"],
  ["גלריה", "gallery.html", "gallery"],
];
const drawer = (R, active) => `
<div class="scrim" hidden></div>
<aside class="drawer" id="drawer" aria-label="תפריט" aria-hidden="true">
  <div class="dr-head">
    <a href="${R}index.html" class="dr-brand"><img src="${R}images/hazeva-logo.webp" alt=""><span>מושב חצבה<small>ערבה תיכונה</small></span></a>
    <button class="dr-x" aria-label="סגירת התפריט"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </div>
  <nav class="dr-nav">
${DRAWER.map(([t, h, k, sub]) => sub ? `    <div class="dr-group${k === active ? " open" : ""}">
      <button class="dr-toggle${k === active ? " on" : ""}" aria-expanded="${k === active}">${t}<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
      <div class="dr-sub">${sub.map(([st, sh, si]) => `
        <a href="${R}${sh}"><img loading="lazy" src="${R}${img(si)}" alt=""><span>${st}</span></a>`).join("")}
      </div>
    </div>` : `    <a class="dr-link${k === active ? " on" : ""}" href="${R}${h}">${t}</a>`).join("\n")}
  </nav>
  <div class="dr-foot">
    <a class="btn primary${active === "contact" ? " on" : ""}" href="${R}contact.html">יצירת קשר<svg class="plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></a>
    <a class="dr-mail" href="mailto:hazeva@arava.co.il" dir="ltr">hazeva@arava.co.il</a>
  </div>
</aside>`;

function page({ file, title, desc, active, color, body }) {
  const R = file.includes("/") ? "../" : "";
  const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title ? title + " | " + SITE : SITE}</title>
<meta name="description" content="${desc.replace(/"/g, "&quot;")}">
<link rel="icon" type="image/webp" href="${R}images/hazeva-logo.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R}assets/site.css">
</head>
<body id="top"${color ? ` style="--c:var(--${color})"` : ""}>
<a class="skip" href="#content">דילוג לתוכן הראשי</a>

<nav class="bar">
  <div class="bar-in">
    <button class="burger" aria-label="תפריט" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    <a href="${R}index.html" class="logo"><img src="${R}images/hazeva-logo.webp" alt="חצבה – מושב עובדים"></a>
    <ul class="menu">
${NAV.map(([h, t, k]) => `      <li><a href="${R}${h}"${k === active ? ' class="on"' : ""}>${t}</a></li>`).join("\n")}
    </ul>
    <a class="cta${active === "contact" ? " on" : ""}" href="${R}contact.html">יצירת קשר<svg class="plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></a>
  </div>
</nav>
${drawer(R, active)}
${body(R).replace("<main", "<main id=\"content\"")}

<footer id="contact">
  <svg class="dunes" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 90V52c120-30 260-44 400-22s250 40 390 18 260-50 400-40 200 26 250 30V90z" fill="#a8703c"/><path d="M0 90V66c160-22 300-26 450-8s300 26 450 6 330-34 540-10V90z" fill="var(--brown)"/></svg>
  <div class="foot-main">
    <div class="foot-top">
      <a href="${R}index.html" class="foot-logo"><img src="${R}images/hazeva-logo-white.webp" alt="חצבה – מושב עובדים"></a>
      <div>
        <h3>מושב חצבה</h3>
        <p>מושב עובדים בערבה התיכונה – חקלאות מתקדמת, אירוח מדברי ושלוות הכפר.</p>
      </div>
    </div>
    <div class="foot">
      <div>
        <h4>באתר</h4>
        <ul>
${NAV.map(([h, t]) => `          <li><a href="${R}${h}">${t}</a></li>`).join("\n")}
          <li><a href="${R}contact.html">יצירת קשר</a></li>
        </ul>
      </div>
      <div>
        <h4>חופשה בחצבה</h4>
        <ul>
          <li><a href="${R}tourism.html#stay">צימרים ואירוח</a></li>
          <li><a href="${R}tourism.html#guides">מורי דרך</a></li>
          <li><a href="${R}tourism.html#care">מטפלים</a></li>
          <li><a href="${R}tourism.html#romantic">חופשה רומנטית</a></li>
          <li><a href="${R}tourism.html#groups">אירוח קבוצות</a></li>
        </ul>
      </div>
      <div>
        <h4>יצירת קשר</h4>
        <p>מזכירות המושב</p>
        <p><a href="mailto:hazeva@arava.co.il" dir="ltr">hazeva@arava.co.il</a></p>
      </div>
    </div>
    <div class="foot-bt"><span>© 1965-${new Date().getFullYear()} כל הזכויות שמורות למושב חצבה - הערבה תיכונה</span><span class="legal-links"><a href="${R}accessibility.html">הצהרת נגישות</a><a href="${R}privacy.html">מדיניות פרטיות</a></span><a class="credit" href="https://ombee.co.il" target="_blank" rel="noopener"><span>עיצוב ובנייה ע"י</span><img src="${R}images/ombee-logo-white.webp" alt="OMBee – Graphic Design and UI/UX"></a></div>
  </div>
</footer>
<script src="${R}assets/site.js"></script>
<script src="${R}assets/a11y.js"></script>
</body>
</html>
`;
  const out = path.join(WEB, ...file.split("/"));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  built.push(file);
}
const built = [];
const phead = (R, { crumbs, kicker, title, lead, pic, alt = "", crop = "" }) => `
<header class="phead">
  <div class="phead-in">
    <div>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
    </div>
    <div class="pic ${crop}"><img src="${R}${img(pic)}" alt="${alt || title}"></div>
  </div>
</header>`;
const firstTel = it => it.contacts.flatMap(c => c[1]).find(n => n.startsWith("05")) || it.contacts[0][1][0];
const card = (R, dir, it) => `
      <a class="card" href="${R}${it.id}.html">
        <div class="th"><img loading="lazy" src="${R}${img(it.img)}" alt=""></div>
        <div class="bd"><h3>${it.name}</h3><span class="who">${it.sub}</span><p>${it.text[0]}</p><span class="tel">${firstTel(it)}</span></div>
      </a>`;
const grid = (R, dir, items) => `<div class="grid">${items.map(it => card(R, dir, it)).join("")}\n    </div>`;
const shead = (h, p, extra = "") => `<div class="shead"><div><h2><i></i>${h}</h2>${p ? `<p>${p}</p>` : ""}</div>${extra}</div>`;

// ---------- listing pages ----------
function listingPages(groups, dir, sectionTitle, color) {
  const all = groups.flatMap(g => g.items.map(it => ({ ...it, group: g })));
  all.forEach((it, i) => {
    const prev = all[(i - 1 + all.length) % all.length], next = all[(i + 1) % all.length];
    const siblings = it.group.items.filter(x => x !== it).slice(0, 4);
    page({
      file: `${it.id}.html`, title: `${it.name} – ${sectionTitle}`, desc: it.text[0], active: dir, color,
      body: R => `
<main class="wrap">
  <div class="listing">
    <div class="l-head">
      <h1>${it.name}</h1>
      <div class="tag">${it.sub}</div>
    </div>
    <div class="l-row">
    <div class="pic"><img src="${R}${img(it.img)}" alt="${it.name}"></div>
    <aside class="contact">
      <h2>פרטי התקשרות</h2>
      <ul>
${it.contacts.map(([who, nums]) => `        <li>${ICON.phone}<div><span class="lbl">${who}</span><span class="nums">${nums.map(n => `<a href="${telHref(n)}">${n}</a>`).join("")}</span></div></li>`).join("\n")}
${it.mail ? `        <li>${ICON.mail}<div><span class="lbl">דוא"ל</span><a href="mailto:${it.mail}" dir="ltr">${it.mail}</a></div></li>` : ""}
${it.web ? `        <li>${ICON.web}<div><span class="lbl">אתר אינטרנט</span><a href="${it.web}" target="_blank" rel="noopener">לאתר</a></div></li>` : ""}
      </ul>
    </aside>
    </div>
    <div class="desc">${it.text.map(t => `<p>${t}</p>`).join("")}</div>
  </div>
  ${siblings.length ? `<section class="block">${shead("עוד ב" + it.group.title)}${grid(R, dir, siblings)}</section>` : ""}
  <nav class="pager">
    <a href="${R}${prev.id}.html"><span>הקודם</span><b>${prev.name}</b></a>
    <a class="nx" href="${R}${next.id}.html"><span>הבא</span><b>${next.name}</b></a>
  </nav>
</main>`});
  });
}

// ---------- pages ----------
// home
page({
  file: "index.html", title: "", active: "",
  desc: "מושב חצבה בערבה התיכונה: חקלאות מתקדמת, צימרים ותיירות מדברית, עסקים ויוצרים מקומיים.",
  body: R => `
<header class="hero">
  <img src="images/hero-girl-desert.webp" alt="ילדה מול נוף המדבר בחצבה">
  <div class="hero-in">
    <h1>מושב חצבה</h1>
    <p>מושב בערבה התיכונה, בין הרי הנגב להרי אדום. לצד חקלאות מתקדמת, המושב מציע פעילות תיירותית ענפה, צימרים מטופחים ומפנקים ושפע אטרקציות לילדים ולמשפחות.</p>
    <div class="btns">
      <a class="btn primary" href="tourism.html">לחופשה בחצבה</a>
      <a class="btn ghost" href="about.html">להכיר את המושב</a>
    </div>
  </div>
</header>

<main class="wrap">
  <section class="block">
    <div class="split">
      <div class="prose">
        <h2 style="font-size:clamp(30px,4vw,44px);margin-bottom:18px">מושב חקלאי בלב המדבר</h2>
        <p>מושב חצבה נמצא בערבה התיכונה, סמוך לכביש הערבה, 100 ק"מ דרומית לבאר שבע ו-150 ק"מ צפונית לאילת, וצופה ממערב על הרי הנגב וממזרח על הרי אדום.</p>
        <p>חצבה הוא מהמושבים האחרונים בארץ שרוב תושביו מתפרנסים מחקלאות. בגני הירק שלנו, המשתרעים על כ-6,000 דונם, גדלים ירקות, פרחים, תמרים, גפנים, מנגו, תבלינים, גידולים אורגניים ודגי נוי, המיועדים בעיקר לייצוא לאירופה וגם לשוק המקומי.</p>
        <p><strong>שמורות הטבע הייחודיות בסביבת המושב – ארץ המכתשים, שיזף וגדרון – ומראה הגבעות המבצבצות מעבר לנחל ערבה, יוצרים תפאורה טבעית נפלאה, המשלימה את אווירת המדבר, שלוות הכפר והאירוח הידידותי.</strong></p>
      </div>
      <div class="facts">
        <div class="fact"><b>1965</b><span>שנת העלייה לקרקע כהיאחזות נח"ל</span></div>
        <div class="fact"><b>~150</b><span>משפחות מתגוררות במושב</span></div>
        <div class="fact"><b>6,000</b><span>דונם של גידולים חקלאיים</span></div>
        <div class="fact"><b>365</b><span>ימי שמש בשנה</span></div>
      </div>
    </div>
  </section>

  <section class="block">
    ${shead("לגלות את חצבה")}
    <div class="tiles">
      <a class="tile" href="about.html" style="--c:var(--about)"><img src="${img("about/images/p2.jpg")}" alt=""><div><i></i><h3>על המושב</h3><p>נתונים, מוסדות וסיפור ההתיישבות מאז 1965.</p></div></a>
      <a class="tile" href="tourism.html" style="--c:var(--tourism)"><img src="${img("tourism/images/gamal.jpg")}" alt=""><div><i></i><h3>חופשה בחצבה</h3><p>צימרים, קמפינג מדברי, מורי דרך וטיפולים.</p></div></a>
      <a class="tile" href="agri.html" style="--c:var(--agri)"><img src="${img("agri/images/pepper_big1.jpg")}" alt=""><div><i></i><h3>החקלאות שלנו</h3><p>חקלאות מתקדמת, ירוקה ואורגנית.</p></div></a>
      <a class="tile" href="business.html" style="--c:var(--business)"><img src="${img("business/images/woodtoys.jpg")}" alt=""><div><i></i><h3>עסקים ויוצרים</h3><p>העסקים, היוצרים ובעלי המלאכה של המושב.</p></div></a>
    </div>
  </section>

  <section class="block" style="--c:var(--tourism)">
    ${shead("לינה בחצבה", "מגוון רחב של אפשרויות אירוח לכל טעם ולכל כיס.", `<a class="btn line" href="tourism.html#stay">לכל המקומות</a>`)}
    ${grid(R, "tourism", TOURISM_GROUPS[0].items.slice(0, 4))}
  </section>

  <section class="block" style="--c:var(--gallery)">
    ${shead("הצצה לחצבה", "", `<a class="btn line" href="gallery.html">לגלריה המלאה</a>`)}
    <div class="masonry">${GALLERY.slice(0, 8).map(g => `<a href="gallery.html" style="display:block;margin-bottom:14px;border-radius:12px;overflow:hidden;box-shadow:var(--shadow);break-inside:avoid"><img loading="lazy" src="${img(g)}" alt=""></a>`).join("")}</div>
  </section>
</main>
<div class="cookie" id="cookie" role="region" aria-label="הודעה על עוגיות" hidden>
  <div class="cookie-txt">
    <svg class="cookie-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01"/></svg>
    <p>אתר זה משתמש בעוגיות (Cookies) כדי לשפר את חוויית הגלישה שלך. לפרטים נוספים ניתן לעיין <a href="privacy.html">במדיניות הפרטיות</a>.</p>
  </div>
  <div class="cookie-act">
    <button class="btn primary" data-cookie="accept">מאשר/ת</button>
    <button class="btn cookie-no" data-cookie="decline">ביטול</button>
  </div>
</div>`});

// about
page({
  file: "about.html", title: "על המושב", active: "about", color: "about",
  desc: "מושב חצבה במספרים: אוכלוסייה, אקלים ומוסדות הישוב.",
  body: R => `${phead(R, { crumbs: [[null, "על המושב"]], kicker: "על המושב", title: "חצבה במספרים", pic: "about/images/p2.jpg",
    lead: "מושב חצבה הוא המושב השני מבין חמשת מושבי הערבה התיכונה – צעיר מעין יהב וותיק מפארן, צופר, עידן, ספיר וצוקים." })}
<main class="wrap">
  <section class="block">
    ${shead("האנשים")}
    <div class="facts">
      <div class="fact"><b>~150</b><span>משפחות מתגוררות במושב (נכון ל-2009)</span></div>
      <div class="fact"><b>~115</b><span>ילדים עד גיל צבא</span></div>
      <div class="fact"><b>~40</b><span>בני ובנות המושב בשירות צבאי או בשנת שירות</span></div>
    </div>
    <p class="prose" style="margin-top:24px">כ-40 מבני ובנות המושב משרתים בצה"ל או מתנדבים בתנועות נוער, בארגונים ובמוסדות שונים ברחבי הארץ במסגרת שנת שירות (י"ג) שלפני השירות הצבאי.</p>
  </section>

  <section class="block">
    ${shead("אקלים מדברי")}
    <div class="split">
      <div class="facts">
        <div class="fact"><b>40-45°</b><span>טמפרטורה ביום קיץ</span></div>
        <div class="fact"><b>18-20°</b><span>ממוצע בימי החורף</span></div>
        <div class="fact"><b>0°</b><span>בלילות חורף קרים</span></div>
        <div class="fact"><b>15 מ"מ</b><span>גשם בשנה, בכ-15 ימים</span></div>
      </div>
      <div class="pic"><img src="${R}${img("about/images/p3.jpg")}" alt="משאיות ותוצרת חקלאית בבית האריזה"></div>
    </div>
    <div class="prose" style="margin-top:24px">
      <p>בהתאם לאזור המדברי בו שוכן המושב, בעונת הקיץ הטמפרטורות מטפסות ל-40-45 מעלות ביום. ימי החורף נעימים ביותר והטמפרטורה הממוצעת היא 18-20 מעלות. בלילות החורף הטמפרטורות יורדות עד לאפס מעלות, ומתחת לכך בלילות קרה.</p>
      <p>גשם הוא חיזיון נדיר – כ-15 מ"מ גשם בכ-15 ימים בשנה.</p>
    </div>
  </section>

  <section class="block">
    ${shead("מוסדות הישוב")}
    <div class="split rev">
      <div class="prose">
        <p>המושב מנוהל על ידי מועצה בת 7 חברים וחברות, הנבחרת אחת לשנתיים. המועצה ממנה מרכז משק בשכר וועדות שונות שחבריהן פועלים בהתנדבות לטובת הקהילה: תרבות, חינוך, בריאות ועוד.</p>
        <p>במושב מתקיימת פעילות נוער ענפה במסגרת תנועת "בני המושבים" ובליווי ועדת הנוער של המושב.</p>
      </div>
      <div class="pic"><img src="${R}${img("about/images/p4.jpg")}" alt="ילדים בספריית המושב"></div>
    </div>
    <div class="sub">המוסדות הציבוריים במושב</div>
    <ul class="chips-list">${["צרכנייה", "מוסך", "מסגרייה", "מחסן לציוד חקלאי", "פעוטונים", "ספרייה", "בריכת שחייה", "חדר כושר", "מגרשי ספורט", "מרפאת קופת חולים כללית – אחות מדי יום ורופא 3 פעמים בשבוע"].map(x => `<li>${x}</li>`).join("")}</ul>
  </section>

  <section class="block">
    <a class="tile" href="history.html" style="aspect-ratio:auto;min-height:260px;--c:var(--about)"><img src="${R}${img("about/images/p6.jpg")}" alt=""><div><i></i><h3>כך הכל התחיל</h3><p>מהיאחזות נח"ל ב-1965 ועד המושב של היום – סיפור ההתיישבות ומגילת היסוד</p></div></a>
  </section>
</main>`});

const TL = [
  ["1965", "9.12.1965", "עלייה על הקרקע", "about/images/p6.jpg", [
    "<strong>מושב חצבה עלה על הקרקע כהיאחזות הנח\"ל ה-33 ביום חמישי, 9.12.1965, סמוך מאוד לכביש הערבה, במקום בו נמצא היום בית ספר שדה חצבה. המייסדים היו חיילי גרעין \"חצבה\" של תנועת בני המושבים, שנאספו ממושבים ומבתי ספר חקלאיים מכל רחבי הארץ.</strong>",
    "בשלב הראשון הקימו הנח\"לאים משק חקלאי קטן שכלל פרה אחת, לול, חמור, סוס, מספר ברווזים וגן ירק קטן בן 50 דונם שבו גידלו מלפפונים, עגבניות וחצילים.",
    "בין שירות צבאי פעיל בסיירת הנח\"ל, ששמרה בשנים 1966-1968 על כביש הערבה, ובגדוד הנח\"ל המוצנח, לחימה במלחמת ששת הימים ובמלחמת ההתשה ושירות בהיאחזויות נח\"ל בגולן ובבקעה – פיתחו החברים את ההיאחזות, ובעיקר את גן הירק שהפך עם הזמן לענף החקלאי העיקרי."]],
  ["1967", "21.11.1967", "עולים על אזרחי", "about/images/p7.jpg", [
    "<strong>בח' בחשוון תשכ\"ח, 21.11.1967, אוזרחה היאחזות הנח\"ל \"חצבה\" והפכה ל\"מושבוץ\" – מושב-קיבוץ – לאחר שיצאו ממנה המפקדים, המדים והמשטר הצבאי.</strong>",
    "המשק החקלאי, אליו נוסף גם ענף גידול תרנגולי הודו, המטבח וחדר האוכל, עובדו ונוהלו במשותף על ידי כלל החברים, שהיו אז כולם רווקים.",
    "לזכות כל חבר נרשמו ימי העבודה שעבד, והוא נהנה מחשבון הוצאות אישי – כשעיני כולם נשואות אל היום בו יהפוך ה\"מושבוץ\" למושב עובדים אמיתי."]],
  ["1970", "27.5.1970", "אבן הפינה ומושב עובדים", "about/images/p8.jpg", [
    "בכ\"א באייר תש\"ל, 27.5.1970, הונחה אבן הפינה ליישוב הקבע, כ-5 ק\"מ מהמקום בו ישבה חצבה אז, וכקילומטר אחד מגבול ירדן.",
    "בעודנו מחכים קצרי רוח לסיום הבנייה ולמעבר ליישוב הקבע, התחתנו ראשוני הזוגות ונולדו ראשוני הילדים. בספטמבר 1971, בערב יום הכיפורים תשל\"ב, חילקנו את גן הירק המשותף לחלקות משפחתיות והפכנו למושב עובדים.",
    "<strong>ארבעה חודשים לאחר מכן, ב-18.1.1972, ארזנו את מעט החפצים שהיו לנו, ובשיירת טרקטורים ארוכה נסענו ממקום ההיאחזות הארעי ליד כביש הערבה אל יישוב הקבע, שבו אנו נמצאים עד היום.</strong>"]],
  ["1972", "18.1.1972", "על עגלות הטרקטורים", "about/images/p9.jpg", [
    "על עגלות הטרקטורים היו אז 26 זוגות נשואים, 10 רווקים ו-12 ילדים, שהגדולים ביניהם כבני שנתיים.",
    "הגבעה הייתה חשופה וצהובה, ועליה נטועים 36 בתים כקוביות משחק בארגז חול – ללא שיח, עץ או מדרכה. רק כביש אספלט שחור וגדר תיל מוארת הקיפו את היישוב שזה עתה נולד."]],
  ["1973+", "אחרי מלחמת יום הכיפורים", "ובינתיים במושב", "about/images/p10.jpg", [
    "בשנים הראשונות התבצעה העבודה החקלאית בכוחות עצמיים, כשכל בני המשפחה לוקחים בה חלק.",
    "לאחר מלחמת יום הכיפורים החלו לסייע במשקי המגדלים \"מתנדבים\" – תיירים צעירים שהגיעו בעיקר מאירופה, מאוסטרליה ומדרום אפריקה, שרצו לבלות את חודשי החורף במזג אוויר חמים תמורת מגורים, משכורת צנועה וחיי חברה תוססים.",
    "עם השנים התחלפו ה\"מתנדבים\" בעובדים זרים, בעיקר מתאילנד, המגיעים לארץ בצורה חוקית ומסודרת, ואנו מקפידים לדאוג לכל זכויותיהם."]],
  ["היום", "השנים האחרונות", "ובשנים האחרונות", "about/images/p11.jpg", [
    "בשנים האחרונות התפתח במושב ענף התיירות, וכיום ניתן ליהנות ממגוון חדרי אירוח, שירותי הסעדה, מדריכי טיולים וחברות לטיולי ג'יפים."]],
];
page({
  file: "history.html", title: "כך הכל התחיל – תולדות המושב", active: "about", color: "about",
  desc: "סיפור ההתיישבות של מושב חצבה: מהיאחזות נח\"ל ב-1965 ועד היום, ומגילת היסוד.",
  body: R => `${phead(R, { crumbs: [["about.html", "על המושב"], [null, "כך הכל התחיל"]], kicker: "תולדות המושב", title: "כך הכל התחיל", pic: "about/images/delek.jpg", crop: "crop-top",
    lead: "מהיאחזות נח\"ל קטנה ליד כביש הערבה ב-1965, דרך שיירת הטרקטורים של 1972, ועד המושב של היום." })}
<main class="wrap">
  <section class="block">
    <div class="timeline">
${TL.map(([y, d, h, p, txt]) => `      <article class="tl">
        <div class="yr">${y}<small>${d}</small></div>
        <div class="txt"><h3>${h}</h3>${txt.map(t => `<p>${t}</p>`).join("")}</div>
        <div class="pic"><img loading="lazy" src="${R}${img(p)}" alt="${h}"></div>
      </article>`).join("\n")}
    </div>
  </section>

  <section class="block" id="scroll">
    ${shead("מגילת היסוד של חצבה", "נכתבה ונטמנה עם הנחת אבן הפינה ליישוב הקבע.")}
    <div class="split">
      <div class="quote">
        <h3>מגילת היסוד</h3>
        <p><span class="date">היום, כ"א באייר תש"ל, 27.5.1970,</span>
        אנו מניחים אבן פינה ליישוב הקבע של מושב חצבה.<br>
        מולדתנו הקטנה הגדולה, עשירת מסורת מפעלי גאולה, התיישבות ובנייה.<br>
        בחרנו להמשיך בדרך זו ובאנו אלייך ערבה, אלייך ארץ לא נושבת, ארץ קוראת לבנייה ולחיבוק.<br>
        אבן פינה זו, שאנו טומנים היום, היא קצה והתחלה כאחד של התגשמות שאיפות בדרך הארוכה יחד, מימי ההיאחזות, דרך ביסוס ועד היום.<br>
        תהא אבן זו יסוד איתן לבתים שמחים, שדות מוריקים ותרומה לביטחון גבולנו.</p>
      </div>
      <div style="display:grid;gap:14px">
        <div class="pic"><img src="${R}${img("about/images/p12.jpg")}" alt="מגילת היסוד של חצבה"></div>
        <img class="scroll-date" src="${R}${img("about/images/p12-b.jpg")}" alt="מגילת היסוד – תאריך">
      </div>
    </div>
  </section>
</main>`});

// agri
page({
  file: "agri.html", title: "החקלאות שלנו", active: "agri", color: "agri",
  desc: "חקלאות מתקדמת, ירוקה ואורגנית במושב חצבה שבערבה התיכונה.",
  body: R => `${phead(R, { crumbs: [[null, "החקלאות שלנו"]], kicker: "החקלאות שלנו", title: "חקלאות מתקדמת במדבר", pic: "agri/images/shtil1.jpg",
    lead: "התאמת הגידולים – בעיקר ירקות ופרחים – לאקלים המדברי החם והיבש גם בחורף, מעניקה למגדלים יתרון משמעותי: תוצרת מובחרת לאירופה ולשוק המקומי בחודשי החורף הקרים." })}
<main class="wrap">
  <section class="block">
    <div class="cols prose" style="max-width:none">
      <p>על מנת להבטיח את איכות היבולים, רוב הגידולים גדלים בחממות ובמבנים סגורים אחרים, המגינים עליהם מפני מזיקים ומפגעי מזג האוויר. התוצרת נבדקת, ממוינת ונארזת בבתי האריזה של המגדלים בהתאם לדרישות הלקוח.</p>
      <p>העבודה החקלאית מתבצעת תוך מחויבות לשמירה על איכות הסביבה ולצריכה חסכונית של מים.</p>
    </div>
  </section>

  <section class="block" id="crops">
    ${shead("ענפי הגידול במושב")}
    <div class="split">
      <div class="feature" style="grid-template-columns:1fr 1fr">
${[["ירקות", "פלפל, עגבנייה, אבטיח, מלון, חציל, בצל, קישוא."], ["ירקות אורגניים", "פלפל, עגבנייה, חציל, אבטיח, תמרים."], ["פרחים", "טרכליום, חמניות, מנתור, לימוניום, ורדים."], ["מטעים", "תמרים, גפנים, מנגו."], ["תבלינים", "בזיליקום, נענע, אורגנו, קורנית, רוזמרין, רוקט."], ["דגי נוי", "גופי, סקלר, פלטי, סייפן, קוי, אנציסטרוס, דגי מים מלוחים."]].map(([h, p]) => `        <div><h3>${h}</h3><p>${p}</p></div>`).join("\n")}
      </div>
      <div class="pic"><img src="${R}${img("agri/images/4pics1.jpg")}" alt="גידולים בחצבה"></div>
    </div>
  </section>

  <section class="block" id="innovation">
    ${shead("חדשנות בחקלאות")}
    <div class="split rev">
      <div class="prose">
        <p>רוב שטחי הגידול מכוסים בבתי צמיחה ובחממות. בחלק ניכר מהם נעשה שימוש בטכנולוגיה מתקדמת של בקרת אקלים, צינון, חימום ומיחזור מים.</p>
        <p>חקלאי המושב נמצאים בחזית הפיתוח של זנים חדשים, והם הראשונים לבחון ולאמץ חידושים בשיטות הגידול, ההשקיה והדברת המזיקים.</p>
        <p><strong>פיתוחים מקוריים לדוגמה:</strong> הפרח "כסופית המדבר" של צ'יצ'י ינאי, ומגוון רחב של סלטים חתוכים ורטבים תחת המותג <a href="fresco.html">"פרסקו"</a> של משק שטרן.</p>
      </div>
      <div class="pic"><img src="${R}${img("agri/images/pepper_big1.jpg")}" alt="פלפלים בחממה"></div>
    </div>
  </section>

  <section class="block" id="green">
    ${shead("חקלאות ירוקה", "החקלאות בחצבה היא חלק בלתי נפרד מהסביבה ומהקהילה, והמגדלים מחויבים לעקרונות הבאים:")}
    <div class="feature">
      <div><h3>תוצרת נקייה</h3><p>אנו נמנעים משימוש בחומרי ריסוס המסכנים את הבריאות ובחומרים המזהמים את הקרקע, ועושים שימוש נרחב בהדברה ביולוגית – כדי שהפרי שאנו משווקים יהיה נקי ובריא יותר.</p></div>
      <div><h3>חיסכון במים</h3><p>חלק ניכר מהשדות מושקים במים שאובים שאינם ראויים לשתייה בשל רמת מליחות גבוהה מדי.</p></div>
      <div><h3>מיחזור</h3><p>אנו מפרידים את הפסולת החקלאית – שאריות ניילון, חוטי הדליה וקרטונים – ומעבירים אותה למיחזור. הפסולת האורגנית נקצצת והופכת לדשן.</p></div>
    </div>
    <div class="pic" style="margin-top:20px;border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);max-width:680px"><img src="${R}${img("agri/images/michzur.jpg")}" alt="אתר מיחזור"></div>
  </section>

  <section class="block" id="organic">
    ${shead("חקלאות אורגנית", "החקלאות האורגנית פורחת בחצבה, והירקות האורגניים יפים, טעימים ובריאים בזכות אוסף תנאים ייחודי:")}
    <div class="feature">
      <div><h3>אזור מבודד עם אוויר צלול</h3><p>חצבה מרוחקת מכל יישוב עירוני ומתעשייה, והגידולים נהנים מאוויר צלול ללא שאריות זיהום. שטחי הגידול האורגני מרוחקים משטחי הגידול הרגילים, כך שהחשיפה לשאריות ריסוס ולהעברת מזיקים קטנה ביותר.</p></div>
      <div><h3>יותר אור, פחות קרינה</h3><p>הגידולים נהנים מ-365 ימי שמש בשנה. גובה המושב – 300 מ' מתחת לפני הים – מוסיף מרווח סינון משמעותי לקרינה אולטרה-סגולה מזיקה.</p></div>
      <div><h3>יותר יובש, יותר בריאות</h3><p>האקלים המדברי היבש מונע התפתחות של מחלות עלים ומאפשר להימנע מריסוסים.</p></div>
      <div><h3>מים צלולים, פרי מתוק</h3><p>הגידולים מושקים במי מעיינות מקומיים הנשאבים ממעמקי האדמה המדברית. המים זכים, אינם מכילים שאריות מזהמים ומאופיינים ברמת מליחות גבוהה, הגורמת לפירות ולירקות להיות מתוקים וטעימים יותר.</p></div>
      <div><h3>עומדים בתקן</h3><p>המגדלים האורגניים מצויים בחזית הטכנולוגיה החקלאית. כל הגידולים גדלים בבתי צמיחה עם רשתות נגד חרקים ומוגנים בהדברה ביולוגית, ובתי האריזה עומדים בתקני האיכות המחמירים ביותר – כך שהלקוח מקבל תוצרת שטופה, שקולה וארוזה לפי דרישותיו.</p></div>
    </div>
    <div class="split" style="margin-top:20px">
      <div class="pic"><img src="${R}${img("agri/images/air.jpg")}" alt="חסידות בשמי חצבה"></div>
      <div class="pic"><img src="${R}${img("agri/images/hamamot2.jpg")}" alt="חממות בשדות חצבה"></div>
    </div>
  </section>
</main>`});

// tourism hub
page({
  file: "tourism.html", title: "חופשה בחצבה", active: "tourism", color: "tourism",
  desc: "צימרים, קמפינג מדברי, מורי דרך וטיפולי גוף במושב חצבה שבערבה.",
  body: R => `${phead(R, { crumbs: [[null, "חופשה בחצבה"]], kicker: "חופשה בחצבה", title: "לצאת לחופשה בערבה", pic: "tourism/images/gamal.jpg",
    lead: "מושב חצבה מציע מגוון רחב של אפשרויות נופש ואירוח לכל טעם ולכל כיס: מתחמי תיירות, צימר רומנטי, יחידת אירוח משפחתית ואפילו קמפינג מדברי." })}
<main class="wrap">
  <section class="block">
    <div class="feature">
      <div><h3>הסביבה קוראת?</h3><p>מהמושב אפשר לצאת לטיולים רגליים מרהיבים בשמורות הטבע הסמוכות, טיולי ג'יפים, טיולי אופניים, סיורים חקלאיים במשקי המגדלים ושלל אטרקציות נוספות.</p></div>
      <div><h3>ואחר כך?</h3><p>אפשר לקפוץ עם הילדים ראש לבריכת המושב, לגלוש במגלשת המים הגדולה, לטבול בבריכת הילדים ובבריכת הפעוטות, לקנות ארטיק במזנון ולהתרווח על כיסאות החוף באזורים המוצלים. מכאן אפשר להמשיך לגן השעשועים ולמגרשי הספורט.</p></div>
      <div><h3>ומה אוכלים?</h3><p>הבשלנים והבשלניות של המושב ישמחו להכין ארוחות גורמה במסעדות, בצימר או אפילו בשטח באמצע הטיול. בישול עצמי? הצימרים מצוידים במטבח מרכזי ו/או עמדות מנגל ומדורה, ואת המצרכים ניתן לרכוש ב"סופר חצבה".</p></div>
    </div>
  </section>

${TOURISM_GROUPS.map(g => `  <section class="block" id="${g.key}">
    ${shead(g.title)}
    ${grid(R, "tourism", g.items)}
  </section>`).join("\n")}

  <section class="block" id="romantic">
    ${shead("חופשה רומנטית בלב הערבה")}
    <div class="split">
      <div class="pic"><img src="${R}${img("tourism/images/romantica.jpg")}" alt="חופשה רומנטית"></div>
      <div class="poem" style="grid-template-columns:1fr;gap:22px">
        <p>כבר בירידות סדום<br>הותרתם מאחור את כל טרדות היום<br>המדבר פרוש במלוא הדרו אל מול עיניכם<br>והשקט ממלא אתכם.</p>
        <p>הרי אדום נושקים לשמיים זרועי כוכבים<br>ואתם זרועות משלבים<br>מתלטפים ברוח הטובה<br>נסחפים בתשוקה, מתמלאים באהבה.</p>
        <p>ואנחנו ניתן לכם מרחב מעוצב להיות זוג נאהב<br>ידיים רגישות לשחרר שרירים ולהעיר פרפרים<br>ארוחות מרגשות במיטה או מול נוף בראשית<br>וטיולים, אם תרצו, מצאת החמה עד אשמורת שלישית.</p>
      </div>
    </div>
  </section>

  <section class="block" id="groups">
    ${shead("אירוח קבוצות וארגונים", "במושב חצבה מתחמי צימרים וקמפינג מדברי המתאימים לאירוח קבוצתי של עובדים ועובדות, לקוחות ומשפחות, באווירה ייחודית וברמה גבוהה.")}
    <div class="split rev">
      <div class="prose">
        <p>השקט המדברי, המרחבים האינסופיים ותחושת הניתוק מהיומיום יסחפו את הקבוצה למחוזות חדשים ויעניקו חוויה בלתי נשכחת.</p>
        <div class="sub" style="margin-top:8px">אפשרויות האירוח כוללות</div>
        <ul class="ticks">
          <li>חדרי הרצאות ומועדוני פעילות מרווחים וממוזגים.</li>
          <li>מגוון רחב של אפשרויות הסעדה, מטבח מרכזי ועמדות מנגל לבישול עצמי.</li>
          <li>כניסה חופשית לבריכת המושב ולמגרשי הספורט. אפשרות לרחצת לילה או לפעילות סגורה לחברי הקבוצה בבריכה, בתשלום נוסף.</li>
          <li>נקודת יציאה אידיאלית לטיולים רגליים ולטיולי ג'יפים, אופניים, אופנועים וטרקטורונים.</li>
          <li>טיולים מאורגנים: השכרת אופניים, ג'יפים ומשאית שטח לטיולים בשמורות הטבע שבאזור, כולל הובלת ציוד, אספקת מים ומנהלות.</li>
          <li>הדרכה צמודה של מדריכי טיולים מנוסים ומלהיבים.</li>
          <li>סיור מרתק בשטחי החקלאות לצפייה בזנים חדשים ובפיתוחים מקוריים.</li>
          <li>טיפולי גוף ונפש בחדרי טיפולים נעימים ובטבע.</li>
        </ul>
      </div>
      <div class="pic"><img src="${R}${img("tourism/images/bird.jpg")}" alt="ציפור במדבר"></div>
    </div>
  </section>
</main>`});
listingPages(TOURISM_GROUPS, "tourism", "חופשה בחצבה", "tourism");

// business hub
page({
  file: "business.html", title: "עסקים ויוצרים", active: "business", color: "business",
  desc: "העסקים, היוצרים ובעלי המלאכה של מושב חצבה.",
  body: R => `${phead(R, { crumbs: [[null, "עסקים ויוצרים"]], kicker: "משלנו", title: "עסקים ויוצרים", pic: "business/images/woodtoys.jpg",
    lead: "חנויות, בתי קפה, אמנים, בעלי מלאכה ונותני שירותים – העסקים שצמחו בחצבה." })}
<main class="wrap">
  <section class="block">
    ${grid(R, "business", BUSINESS_GROUPS[0].items)}
  </section>
</main>`});
listingPages(BUSINESS_GROUPS, "business", "עסקים ויוצרים", "business");

// contact
page({
  file: "contact.html", title: "יצירת קשר", active: "contact",
  desc: "יצירת קשר עם מושב חצבה – מזכירות המושב, דרכי הגעה ופרטי התקשרות.",
  body: R => `
<header class="phead"><div class="phead-in" style="grid-template-columns:1fr">
  <div>
    <h1>נשמח לשמוע מכם ומכן</h1>
    <p class="lead" style="max-width:640px">שאלה למזכירות, בקשה לאירוח קבוצה או סתם רצון להכיר – אפשר להשאיר הודעה, ונחזור בהקדם.</p>
  </div>
</div></header>

<main class="wrap">
  <div class="contact-grid">
    <form class="cform" id="cform" novalidate>
      <h2>שליחת הודעה</h2>
      <div class="row2">
        <label>שם מלא<input name="name" required autocomplete="name"></label>
        <label>טלפון<input name="phone" type="tel" dir="ltr" autocomplete="tel"></label>
      </div>
      <label>דוא"ל<input name="email" type="email" dir="ltr" autocomplete="email"></label>
      <label>נושא
        <select name="topic">
          <option>פנייה כללית למזכירות</option>
          <option>אירוח ותיירות</option>
          <option>אירוח קבוצות וארגונים</option>
          <option>חקלאות</option>
          <option>עסקים ויוצרים</option>
          <option>אחר</option>
        </select>
      </label>
      <label>הודעה<textarea name="msg" rows="6" required></textarea></label>
      <p class="err" id="cerr" hidden>נא למלא שם והודעה.</p>
      <button class="btn primary" type="submit">שליחה<svg class="plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></button>
      <p class="hint">הלחיצה על "שליחה" תפתח את תוכנת הדואר במכשיר, עם ההודעה מוכנה לשליחה אל hazeva@arava.co.il.</p>
    </form>

    <aside class="cinfo">
      <div class="ibox">
        <h3>מזכירות המושב</h3>
        <ul>
          <li>${ICON.mail}<div><span class="lbl">דוא"ל</span><a href="mailto:hazeva@arava.co.il" dir="ltr">hazeva@arava.co.il</a></div></li>
          <li>${ICON.pin}<div><span class="lbl">מיקום</span>מושב חצבה, הערבה התיכונה</div></li>
        </ul>
      </div>
      <div class="ibox">
        <h3>איך מגיעים</h3>
        <p>המושב נמצא סמוך לכביש הערבה (90), 100 ק"מ דרומית לבאר שבע ו-150 ק"מ צפונית לאילת.</p>
        <div class="map"><iframe title="מפה – מושב חצבה" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=%D7%9E%D7%95%D7%A9%D7%91%20%D7%97%D7%A6%D7%91%D7%94&amp;z=11&amp;output=embed"></iframe></div>
      </div>
      <div class="ibox">
        <h3>פרטי קשר של העסקים</h3>
        <p>פרטי ההתקשרות של בעלי הצימרים, מורי הדרך והעסקים נמצאים בדף של כל אחד מהם.</p>
        <div class="ilinks">
          <a class="btn line" href="${R}tourism.html" style="--c:var(--tourism)">חופשה בחצבה</a>
          <a class="btn line" href="${R}business.html" style="--c:var(--business)">עסקים ויוצרים</a>
        </div>
      </div>
    </aside>
  </div>
</main>`});

// legal pages – same structure as agrosoft.co.il: header, intro box with date, "בעמוד זה" contents, numbered sections
const legal = (R, { title, sub, updated, intro, sections }) => `
<header class="page-hdr"><h1>${title}</h1><p>${sub}</p></header>
<main class="wrap">
  <div class="legal-content">
    <div class="legal-intro"><p class="legal-date">עודכן לאחרונה: ${updated}</p><p>${intro}</p></div>
    <nav class="legal-toc" aria-label="תוכן העמוד"><strong>בעמוד זה</strong><ol>${sections.map(([h], i) => `<li><a href="#sec-${i + 1}">${h}</a></li>`).join("")}</ol></nav>
${sections.map(([h, html], i) => `    <h2 id="sec-${i + 1}">${h}</h2>\n    ${html}`).join("\n")}
  </div>
</main>`;
const MAIL = `<a href="mailto:hazeva@arava.co.il" dir="ltr">hazeva@arava.co.il</a>`;

page({
  file: "accessibility.html", title: "הצהרת נגישות", active: "",
  desc: "הצהרת הנגישות של אתר מושב חצבה – התאמות הנגישות באתר, תו הנגישות ודרכי פנייה בנושא נגישות.",
  body: R => legal(R, {
    title: "הצהרת נגישות", sub: "מחויבים לנגישות מלאה עבור כולם", updated: "נובמבר 2026",
    intro: `מושב חצבה רואה חשיבות רבה בכך שכל אחד ואחת יוכלו להשתמש באתר בקלות ובנוחות, כולל אנשים עם מוגבלויות. אנו פועלים כל הזמן לשיפור נגישות האתר, ומזמינים אתכם לפנות אלינו בכל בעיה או הצעה.`,
    sections: [
      ["רמת הנגישות באתר", `<p>האתר הונגש בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ולתקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG ברמה AA. האתר מותאם לתצוגה בדפדפנים הנפוצים ולשימוש בטלפון הנייד ובטאבלט.</p>`],
      ["מה עשינו כדי להנגיש את האתר", `<ul class="legal-list">
        <li>מבנה עמודים ברור, עם כותרות ותגיות HTML לפי משמעותן, כדי שקוראי מסך יוכלו לנווט בקלות</li>
        <li>ניווט מלא במקלדת – Tab מעביר בין קישורים, Enter מפעיל קישור ו-Esc סוגר תפריטים וחלונות</li>
        <li>קישור "דילוג לתוכן הראשי" בראש כל עמוד</li>
        <li>טקסט חלופי לתמונות שמעבירות מידע</li>
        <li>ניגודיות צבעים מספקת בין הטקסט לרקע</li>
        <li>תוויות ברורות לכל שדה בטופס יצירת הקשר</li>
        <li>האתר רספונסיבי וניתן להגדלה בדפדפן בלי שהתוכן ייחתך</li>
    </ul>`],
      ["תו הנגישות", `<p>בכל עמוד באתר יש כפתור נגישות קבוע בפינה השמאלית התחתונה. הוא פותח את תו הנגישות, שבו אפשר להפעיל את ההתאמות הבאות:</p>
    <ul class="legal-checklist">
        <li>הגברת ניגודיות (שתי רמות, כולל היפוך צבעים)</li>
        <li>הדגשת קישורים</li>
        <li>טקסט גדול (שלוש רמות)</li>
        <li>ריווח טקסט</li>
        <li>ביטול הנפשות</li>
        <li>הסתרת תמונות</li>
        <li>גופן פשוט וקריא (תמיכה בדיסלקסיה)</li>
        <li>סמן עכבר מוגדל</li>
        <li>הגדלת גובה השורה (שתי רמות)</li>
        <li>יישור טקסט</li>
        <li>תצוגה בגווני אפור</li>
        <li>קו קריאה שעוקב אחרי הסמן</li>
    </ul>
    <p>אפשר להפעיל את תו הנגישות גם מהמקלדת ולסגור אותו במקש Esc. כפתור אחד מאפס את כל ההגדרות, וההגדרות שבחרתם נשמרות בדפדפן ויופעלו שוב בביקור הבא.</p>`],
      ["הגדלת התצוגה בדפדפן", `<p>להגדלת התצוגה אפשר ללחוץ בו-זמנית על <strong>Ctrl</strong> ועל <strong>+</strong>, ולהקטנתה על <strong>Ctrl</strong> ועל <strong>-</strong>. מקש <strong>F11</strong> מציג את האתר במסך מלא, ולחיצה נוספת מחזירה את התצוגה הרגילה.</p>`],
      ["מגבלות ידועות", `<p>למרות מאמצינו, ייתכן שחלקים מסוימים באתר עדיין אינם נגישים במלואם. חלק מהתמונות הועברו מהאתר הקודם של המושב והן ברזולוציה נמוכה. המפה בעמוד יצירת הקשר מוטמעת מ-Google Maps והגופנים נטענים מ-Google Fonts, ואיננו שולטים באופן מלא באופן הצגתם. קישורים לאתרי בעלי העסקים מובילים לאתרים שאינם בשליטתנו. נתקלתם בבעיה? נשמח לשמוע ולתקן.</p>`],
      ["פנייה לרכז הנגישות", `<p>נתקלתם בבעיית נגישות או שיש לכם הצעה לשיפור? פנו אלינו ונטפל בפנייה בהקדם. כדי שנוכל לעזור, כדאי לציין באיזה עמוד הייתה הבעיה ומה ניסיתם לעשות.</p>
    <div class="legal-contact">
        <div><strong>רכז הנגישות</strong><span>מזכירות מושב חצבה</span></div>
        <div><strong>דוא"ל</strong>${MAIL}</div>
        <div><strong>כתובת</strong><span>מושב חצבה, ערבה תיכונה</span></div>
    </div>
    <p>אפשר לפנות גם דרך <a href="${R}contact.html">טופס יצירת הקשר</a>.</p>`],
    ],
  })});

page({
  file: "privacy.html", title: "מדיניות פרטיות", active: "",
  desc: "מדיניות הפרטיות של אתר מושב חצבה – איזה מידע נאסף, איך הוא משמש ומה הזכויות שלך.",
  body: R => legal(R, {
    title: "מדיניות פרטיות", sub: "מושב חצבה – ערבה תיכונה", updated: "נובמבר 2026",
    intro: `מדיניות זו מסבירה איזה מידע נאסף באתר מושב חצבה, כיצד הוא משמש ואילו זכויות עומדות לכם. המדיניות מנוסחת בלשון רבים מטעמי נוחות בלבד וחלה על כל המינים.`,
    sections: [
      ["מהי מדיניות הפרטיות?", `<p>מושב חצבה (להלן: "המושב") מתייחס בכבוד לפרטיות המשתמשים באתר המושב (להלן: "האתר").</p>
    <p>תנאים אלה ילמדו אתכם מהי מדיניות הפרטיות הנהוגה באתר. הם סוקרים, בין השאר, את האופן שבו המושב משתמש במידע שתמסרו לו ובמידע שנאסף בעת שתשתמשו באתר. במדיניות זו, הביטוי "מידע אישי" פירושו כל מידע שניתן לעשות בו שימוש באופן סביר כדי לזהות אתכם, לרבות שמכם, כתובתכם, מספר הטלפון שלכם וכתובת הדוא"ל שלכם.</p>
    <p>מדיניות זו מהווה חלק בלתי נפרד מתנאי השימוש באתר, ונכתבה בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, ולתקנותיו.</p>`],
      ["דיווח על פגיעה בפרטיות", `<p>אם אתם חושבים שפרטיותכם נפגעה במהלך השימוש באתר, אנא פנו אלינו:</p>
    <div class="legal-contact"><div><strong>דוא"ל</strong>${MAIL}</div><div><strong>כתובת</strong><span>מזכירות מושב חצבה, ערבה תיכונה</span></div></div>`],
      ["מסירת פרטים ומידע אישי למושב", `<p>השימוש באתר אינו כרוך ברישום או במסירת פרטים ומידע אישי. ניתן לגלוש באתר ולצפות בכל התכנים ללא הרשמה.</p>
    <p>פנייה דרך טופס יצירת הקשר כרוכה במסירת פרטים כגון שם, טלפון, כתובת דוא"ל ותוכן הפנייה. הטופס אינו שולח את הפרטים ישירות מהאתר ואינו שומר אותם על שרת: לחיצה על "שליחה" פותחת את תוכנת הדואר במכשיר שלכם עם ההודעה מוכנה, וההודעה נשלחת לתיבת הדואר של מזכירות המושב רק אם תבחרו לשלוח אותה.</p>
    <p>אינכם חייבים על-פי חוק למסור את הפרטים, ומסירתם תלויה בהסכמתכם וברצונכם החופשי. עם זאת, ללא פרטי התקשרות לא נוכל לחזור אליכם בתשובה.</p>
    <p>כאשר אתם מוסרים מידע אישי של צד שלישי, אתם מצהירים כי קיבלתם את הסכמתו למסירת המידע למושב, לשם השימוש בו בהתאם למדיניות זו.</p>`],
      ["מידע שנאסף במהלך השימוש באתר", `<p>האתר אינו משתמש בכלי מעקב, בכלי סטטיסטיקה או בפרסום מותאם אישית, ואינו אוסף מידע על דפוסי הגלישה שלכם.</p>
    <p>כמו בכל אתר אינטרנט, שרת האירוח והשירותים החיצוניים שנטענים בעמודים (ראו בהמשך) עשויים לקבל מידע טכני בסיסי, כגון כתובת ה-IP, סוג הדפדפן ומערכת ההפעלה, לצורך הצגת העמוד בלבד.</p>`],
      ["קישורים ושירותים חיצוניים", `<p>האתר עושה שימוש בשירותים חיצוניים, הכפופים לנוהגי הפרטיות של הספקים שלהם:</p>
    <ul class="legal-list">
        <li><strong>Google Fonts</strong> – לטעינת הגופן של האתר</li>
        <li><strong>Google Maps</strong> – להצגת המפה בעמוד יצירת הקשר</li>
    </ul>
    <p>באתר מופיעים גם קישורים לאתרים חיצוניים, כגון אתרי בעלי העסקים והצימרים במושב. השימוש באתרים אלה חיצוני ונפרד מהאתר, והמושב אינו אחראי למדיניות הפרטיות שלהם.</p>`],
      ["השימוש במידע", `<p>בפרטים ובמידע האישי שתמסרו למושב ייעשה שימוש למטרות הבאות בלבד:</p>
    <ul class="legal-list">
        <li>כדי לענות לפנייה שלכם ולטפל בה</li>
        <li>ליצירת קשר איתכם בנוגע לפנייה, כשיש בכך צורך</li>
        <li>לשם תפעולו התקין של האתר</li>
        <li>כדי למלא אחר דרישות כל דין</li>
    </ul>
    <p>המידע לא ישמש לדיוור שיווקי ולא יימכר לאיש.</p>`],
      ["מסירת מידע לצדדים שלישיים", `<p>המושב לא יעביר לצדדים שלישיים את המידע האישי שמסרתם, אלא במקרים הבאים:</p>
    <ul class="legal-list">
        <li>ככל שהדבר דרוש לטיפול בפנייה שלכם (למשל, העברתה לבעל העסק שאליו פניתם)</li>
        <li>אם יתקבל צו שיפוטי או דרישה של רשות מוסמכת</li>
        <li>בכל מחלוקת, טענה, תביעה או הליכים משפטיים ביניכם לבין המושב</li>
        <li>כשהמושב יסבור כי מסירת המידע נחוצה כדי למנוע נזק חמור</li>
        <li>על-פי בקשתכם המפורשת</li>
    </ul>`],
      ["היכן נשמר המידע?", `<p>פניות שנשלחות בדוא"ל נשמרות בתיבת הדואר של מזכירות המושב, אצל ספק שירותי הדוא"ל שלה. האתר עצמו אינו שומר מידע אישי על שרתים.</p>`],
      ["Cookies (עוגיות) ואחסון בדפדפן", `<p>האתר אינו משתמש בעוגיות (Cookies) לצורכי מעקב, פרסום או סטטיסטיקה.</p>
    <p>הגדרות תו הנגישות שבחרתם נשמרות באחסון המקומי של הדפדפן (Local Storage), כדי שיישארו פעילות במעבר בין עמודים ובביקור הבא. מידע זה נשמר במכשיר שלכם בלבד ואינו נשלח אלינו. אפשר למחוק אותו בכל עת בכפתור האיפוס שבתו הנגישות, או בניקוי נתוני הדפדפן.</p>
    <p>הבחירה בהודעת העוגיות בעמוד הבית נשמרת בדפדפן לזמן הביקור בלבד (Session Storage), ובכל כניסה חדשה לאתר ההודעה תוצג שוב.</p>`],
      ["אבטחת מידע", `<p>המושב נוקט אמצעים סבירים כדי לשמור על המידע שמגיע אליו, ולמזער את הסיכונים מפני גניבה, פגיעה, אובדן או גישה בלתי מורשית למידע.</p>
    <p>עם זאת, אין ודאות שאמצעים אלה מבטיחים באופן מוחלט שמידע אישי לא ייחשף. בעצם השימוש באתר, אתם מודעים ומסכימים למגבלות אלו.</p>`],
      ["זכות לעיין במידע", `<p>על-פי חוק הגנת הפרטיות, התשמ"א-1981, כל אדם זכאי לעיין במידע שעליו המוחזק במאגר מידע. אדם שעיין במידע שעליו ומצא שאינו נכון, שלם, ברור או מעודכן, רשאי לבקש לתקן את המידע או למחוק אותו. לשם כך ניתן לפנות אלינו בדוא"ל ${MAIL}.</p>`],
      ["שינויים במדיניות הפרטיות", `<p>המושב רשאי לשנות מעת לעת את תנאי מדיניות הפרטיות. הנוסח המעודכן יפורסם בעמוד זה, עם תאריך העדכון האחרון. המשך השימוש באתר לאחר השינוי מעיד על הסכמתכם למדיניות המתוקנת.</p>`],
    ],
  })});

// gallery
page({
  file: "gallery.html", title: "גלריה", active: "gallery", color: "gallery",
  desc: "הצצה לחצבה – גלריית תמונות מהמושב ומהערבה.",
  body: R => `
<header class="phead"><div class="phead-in" style="grid-template-columns:1fr">
  <div>
    <h1>הצצה לחצבה</h1>
    <p class="lead">${GALLERY.length} תמונות מהמושב ומהערבה. לחיצה על תמונה פותחת אותה בגדול.</p>
  </div>
</div></header>
<main class="wrap">
  <section class="block" style="padding-top:36px">
    <div class="masonry">${GALLERY.map((g, i) => `<button aria-label="תמונה ${i + 1}"><img loading="lazy" src="${R}${img(g)}" alt=""></button>`).join("")}</div>
  </section>
</main>
<div class="lb" role="dialog" aria-modal="true">
  <img alt="">
  <button class="x" aria-label="סגירה">✕</button>
  <button class="pv" aria-label="הקודם">›</button>
  <button class="nx" aria-label="הבא">‹</button>
  <div class="cnt"></div>
</div>`});

console.log(built.length, "pages;", copied.size, "images used");
