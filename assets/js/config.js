/**
 * MSK Labs - Master Configuration & Central Settings
 * Tüm web modülleri ve istemci uç noktaları bu konfigürasyon objesini okur.
 * Master Central Configuration object consumed across all web modules.
 */
const SITE_CONFIG = {
  siteName: "MSK Labs",
  siteUrl: "https://msklabs.org",
  contactEmail: "msklabs.org@gmail.com",
  googleSheetApiUrl: "https://script.google.com/macros/s/AKfycbwwWuURK3MrUez1h7HwF6dVKeggD7CPgCB7dE82hh7_YTXKmgUdBwnb2JO65SmQD-AVYw/exec",
  adminPin: "175",
  version: "1.0.0",
  apps: {
    haydinamaza: { name: "Haydi Namaza", storeUrlAndroid: "https://play.google.com/store/apps/details?id=com.msklabs.haydinamaza" },
    rekatsay: { name: "RekatSay", storeUrlAndroid: "https://play.google.com/store/apps/details?id=com.msklabs.rekatsay" },
    emekli: { name: "Ne Zaman Emekli Olabilirim", storeUrlAndroid: "https://play.google.com/store/apps/details?id=com.msklabs.emekli" },
    enyakin: { name: "En Yakın Hizmet", storeUrlAndroid: "https://play.google.com/store/apps/details?id=com.msklabs.enyakin" },
    deskpilot: { name: "DeskPilot Pro", storeUrlWindows: "https://msklabs.org/dl.html?app=deskpilot" },
    gcpiluyari: { name: "Geç Pil Uyarısı", storeUrlAndroid: "https://play.google.com/store/apps/details?id=com.msklabs.gcpiluyari" }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}