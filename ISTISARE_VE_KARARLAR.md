# 📜 MSK Labs - Sistem Mimarisi, İstişare Notları ve Kararlar Dokümanı
# 📜 MSK Labs - System Architecture, Decision Log & Technical Specifications

> **Doküman Oluşturulma Tarihi / Creation Date:** 10 Eylül 2026 / September 10, 2026  
> **Amaç / Purpose:** MSK Labs web platformu ve 20+ mobil/masaüstü uygulamasının merkezi otomasyon altyapısına ilişkin alınan tüm kararların, veri akış haritalarının, Google E-Tablo entegrasyon detaylarının ve AI asistan yönergelerinin kalıcı rehberi.  
> *English:* A permanent reference guide documenting all architecture decisions, data flow schemas, Google Sheets integration specifications, and AI assistant guidelines for the MSK Labs web platform and 20+ applications.

---

## 🎯 1. Genel Mimari Stratejisi & Vizyon
## 🎯 1. Master Architectural Strategy & Vision

1 kişilik geliştirici ekibinin (MSK Labs) 20+ uygulamayı sıfır sunucu maliyeti ve minimum eforla yönetebilmesi amacıyla **3'lü Entegrasyon Modeli** kararlaştırılmıştır:  
*English:* A **3-Tier Integration Architecture** has been established to enable a single developer (MSK Labs) to manage 20+ apps with zero server costs and minimal operational overhead:

1. **Google E-Tablo (Spreadsheet - Veri Merkezi / Data Center):** Tüm dinamik verilerin (SSS, Duyurular, İndirme Sayaçları, Biletler, Yol Haritası) tek bir E-Tablo üzerinden yönetilmesi.  
   *English:* Centralized dynamic data management (FAQ, Announcements, Download Counters, Support Tickets, Feature Roadmap) via a single Google Spreadsheet.
2. **Cloudflare Pages / Serverless (Yayın Altyapısı / Edge Hosting):** Ücretsiz, sınırsız bant genişliği ve yüksek hızlı kenar sunucu (Edge) yayını.  
   *English:* High-performance static web hosting and serverless edge functions with unlimited bandwidth via Cloudflare Pages.
3. **Telegram Bot Entegrasyonu (Anlık Bildirim / Instant Notifications):** Destek formundan veya kritik hatalardan anında Telegram cebinize bilet bildirimi düşmesi.  
   *English:* Real-time push notifications sent directly to admin's Telegram client via custom Telegram Bot API upon support ticket creation or system alerts.

---

## 📊 2. Google E-Tablo Veri Tabanı Yapısı (Spreadsheet Schema)
## 📊 2. Google Sheets Database Schema

Google E-Tablo üzerinde aşağıdaki 6 sekme tanımlanmıştır. Tüm web sayfaları ve API uç noktaları bu sekmelerle senkronize çalışacak şekilde mimarilendirilmiştir:  
*English:* The following 6 sheets are defined in the Google Spreadsheet. All frontend web pages and backend API endpoints consume data from these sheets:

### 1️⃣ Sekme / Sheet 1: SSS_Listesi
* **Amacı / Purpose:** aq.html sayfasındaki akordeon soruları ve canlı aramayı besler. / Feeds live search and dynamic accordion questions on aq.html.
* **Sütunlar / Columns:** App_ID | Soru_TR | Cevap_TR | Soru_EN | Cevap_EN | Kategori | Aktif_Mi

### 2️⃣ Sekme / Sheet 2: Duyurular
* **Amacı / Purpose:** /api/announcement ve nnouncements.json üzerinden mobil uygulamalara uzaktan canlı duyuru ve zorunlu güncelleme (Force Update) iletir. / Delivers remote announcements and force update triggers to mobile apps via /api/announcement and nnouncements.json.
* **Sütunlar / Columns:** App_ID | Min_Version | Force_Update | Baslik_TR | Mesaj_TR | Buton_URL | Aktif_Mi

### 3️⃣ Sekme / Sheet 3: Destek_Biletleri
* **Amacı / Purpose:** destek.html üzerinden gönderilen tüm talepleri otomatik kaydeder ve Telegram Botuna iletir. / Stores support form submissions from destek.html and triggers instant Telegram bot alerts.
* **Sütunlar / Columns:** Tarih | Bilet_No | App_ID | App_Ver | Kategori | Eposta | Mesaj | Durum

### 4️⃣ Sekme / Sheet 4: Sayaclar_ve_Analiz
* **Amacı / Purpose:** ist.html (Gizli İstatistik Paneli - PIN: 175) sayfasında gösterilecek canlı metrikleri tutar. / Maintains live visitor, download, and AdSense metrics rendered on ist.html (PIN: 175).
* **Sütunlar / Columns:** Tarih | Tekil_Ziyaretci | Sayfa_Goruntuleme | HaydiNamaza_Indirme | RekatSay_Indirme | Emekli_Indirme | AdSense_Goruntuleme

### 5️⃣ Sekme / Sheet 5: Capraz_Promosyon
* **Amacı / Purpose:** promo.html sayfasında hangi uygulamanın altında hangi 3 uygulamanın tavsiye edileceğini belirleyen matristir. / Matrix defining which 3 apps to recommend under a given source app on promo.html.
* **Sütunlar / Columns:** Kaynak_App_ID | Onerilen_App_1 | Onerilen_App_2 | Onerilen_App_3

### 6️⃣ Sekme / Sheet 6: Yol_Haritasi_Oylama
* **Amacı / Purpose:** oadmap.html üzerindeki topluluk özellik isteklerini ve +1 oy sayaçlarını tutar. / Tracks feature request proposals and +1 vote counters on oadmap.html.
* **Sütunlar / Columns:** Feature_ID | App_ID | Baslik | Aciklama | Oy_Sayisi

---

## 🛠️ 3. Tamamlanan 12 Otomasyon Modülü ve URL Haritası
## 🛠️ 3. Completed 12 Automation Modules & URL Map

Tüm modüller ssets/css/global.css?v=25 ile %100 uyumlu, destek.html temiz beyaz kart formatında (#ffffff), koyu okunaklı metinlerle (%80 Slate Black #1e293b) kodlanmıştır:  
*English:* All modules inherit ssets/css/global.css?v=25, utilizing #ffffff white card containers and high-contrast #1e293b (80% Slate Black) typography:

| # | Modül Adı (TR) | Module Name (EN) | Dosya (File) | Query Parameters / Description |
|---|---|---|---|---|
| 1 | **Gizlilik Politikası** | Privacy Policy | privacy.html | ?app=haydinamaza&ver=2.1.0&os=android&lang=tr |
| 2 | **Kullanım Şartları** | Terms of Service | 	erms.html | ?app=haydinamaza&ver=2.1.0&os=android&lang=tr |
| 3 | **Canlı Duyuru API** | Live Announcement API | unctions/api/announcement.js / nnouncements.json | ?app=haydinamaza&ver=2.1.0 (Remote Force Update) |
| 4 | **Çapraz Promosyon Motoru** | Cross-Promotion Engine | promo.html | ?app=haydinamaza (App recommendations matrix) |
| 5 | **Modüler Akıllı SSS** | Modular FAQ | aq.html | ?app=haydinamaza (Live Search + Accordion) |
| 6 | **Akıllı Mağaza Puanlama** | Smart Review Router | eview-route.html | ?app=haydinamaza (5 Stars ➔ Store, 1-4 Stars ➔ Support Form) |
| 7 | **Akıllı İndirme & QR Kod** | Smart Download & QR | dl.html | ?app=haydinamaza (Device detection: Android ➔ Play Store, iOS ➔ App Store) |
| 8 | **Sürüm Günlüğü** | Release Changelog | changelog.html | ?app=haydinamaza (Version release history) |
| 9 | **Topluluk Yol Haritası** | Feature Roadmap | oadmap.html | Community feature request voting board |
| 10 | **Canlı Sistem Durumu** | System Status | status.html | 🟢 Service operational / Maintenance indicators |
| 11 | **Gizli İstatistik Paneli** | Admin Stats Dashboard | ist.html | **Access PIN: 175** (Visitor, Download & AdSense stats) |
| 12 | **Tüm Sayfalar Dizini** | Site Directory | pages.html | Central index map of all repository pages |

---

## 🔐 4. Alınan Özel Güvenlik, Tasarım ve Kodlama Kuralları

### 7️⃣ Mobil Uygulama & Web Reklam Stratejisi Kuralı / Mobile App & Web Monetization Policy Rule
* **Türkçe:** Tüm MSK Labs mobil uygulamaları (Haydi Namaza, RekatSay, Emekli Sayaç, DeskPilot vb.) **%100 ÜCRETSİZ ve REKLAMSIZDIR.** Mobil uygulamaların içine hiçbir şartta reklam konulmaz. Reklamlar sadece web platformu (msklabs.org) üzerindeki reklam alanlarında yayınlanır.
* **English:** All MSK Labs mobile applications are strictly **100% FREE and AD-FREE**. No in-app advertisements shall ever be placed inside mobile apps. Ad units are strictly restricted to the official web portal (msklabs.org).

## 🔐 4. Core Security, Design & AI Assistance Guidelines

İleride geliştirme yapacak tüm AI asistanları ve yazılımcılar aşağıdaki kurallara **%100 uymakla yükümlüdür**:  
*English:* All future AI assistants and developers MUST strictly adhere to the following enforcement rules:

1. **Yönetici PIN Kodu / Admin Access PIN:**  
   ist.html paneli için PIN kodu masaüstü RAR şifresi olan 571 ile karışmaması için **175** olarak kararlaştırılmıştır.  
   *English:* The admin dashboard PIN for ist.html is strictly **175** (differentiated from local archive passwords).
2. **Sıfır İzinsiz Görsel/Stil Değişiklik Kuralı / Strict UI/CSS Immutability Rule:**  
   Geliştiricinin (Kullanıcı) açık talebi veya onayı olmadan hiçbir renk, font, kart arka planı, kenar çizgisi veya CSS kuralı değiştirilemez! Tüm kartlar #ffffff beyaz zemin ve #1e293b (%80 Siyah) okunaklı metin kuralına sadık kalmalıdır.  
   *English:* NEVER modify visual designs, CSS variables, background colors, fonts, or layout alignments without explicit user permission. All containers MUST remain #ffffff white cards with #1e293b (80% Slate Black) high-contrast text.
3. **Sıfır Otomatik Push Kuralı / No Unprompted Git Push Rule:**  
   Kullanıcı açıkça "commit ve push yapalım" emri vermediği sürece yapılan hiçbir değişiklik git push ile uzak sunucuya gönderilemez. Değişiklikler sadece yerel git commit olarak saklanır.  
   *English:* NEVER execute git push without explicit user instruction. All local edits must remain as local git commit until user approves deployment.
4. **Google E-Tablo CORS & JSON Çıktı Standardı / Google Sheets CORS & JSON Protocol:**  
   Google Apps Script tarafında doGet ve doPost fonksiyonları yanıt verirken yanıt tipi ContentService.MimeType.JSON olmalı ve tarayıcı engelini aşmak için JSON string formatında döndürülmelidir.  
   *English:* Google Apps Script doGet/doPost endpoints MUST return ContentService.MimeType.JSON with open CORS handling to allow seamless frontend fetch calls.
5. **Telegram Bot Fallback ve Taslak Koruma Protocol / Telegram Fallback & Draft Preservation Protocol:**  
   destek.html formunda Telegram veya ağ bağlantısı başarısız olsa dahi bilet E-Tabloya yazılmalı, bilet numarası yerel cihazda (localStorage) saklanmalı ve kullanıcıya hata hissettirilmeden bilet makbuzu gösterilmelidir.  
   *English:* If Telegram notification API fails during ticket submission, the ticket payload MUST be persisted locally in localStorage and sent to Google Sheets, ensuring zero ticket loss.
6. **Önbellek Yenileme (Cache-Busting ?v=XX) Standardı / CSS Cache-Busting Rule:**  
   CSS ve script dosyalarında yapılan güncellemelerin kullanıcının tarayıcısına anında yansıması için HTML dosyalarında href="assets/css/global.css?v=XX" sürüm parametresi artırılmalıdır.  
   *English:* Whenever global.css is modified, bump the query parameter ?v=XX across all HTML files to force immediate browser cache eviction.
7. **Token Ekonomisi & Bağlam Optimizasyonu Kuralı / Token Economy & Context Optimization Policy:**  
   AI asistan yanıtları gereksiz uzunluktan arındırılmalı, öz ve nokta atışı olmalıdır. Dosya incelemelerinde tüm dosyayı çekmek yerine `grep_search` veya belirli satır aralıkları (`view_file`) tercih edilmeli; gereksiz araç çağrılarından ve büyük dökümlerden kaçınılarak token tasarrufu sağlanmalıdır.  
   *English:* AI responses MUST remain concise, direct, and token-efficient. Avoid dumping massive file contents or executing redundant tool loops; use targeted searches (`grep_search`) and precise line slices (`view_file`) to preserve model context.

---

## 📌 5. Canlıya Alma Sonrası Yapılacak Adımlar (Deployment Checklists)
## 📌 5. Post-Deployment Setup Checklist

Push yapıldıktan sonra Google ve Telegram tarafında yapılması gereken 2 küçük işlem:  
*English:* Two remaining operational setup tasks to execute after deployment:

1. **Google Apps Script Web App Deployment:**  
   Google E-Tablonuzdaki Apps Script kodunu "Web App" olarak yayınlayıp oluşturulan URL'yi destek.html, aq.html ve ist.html içindeki GOOGLE_SHEET_API_URL değişkenine yazmak.  
   *English:* Deploy Google Apps Script as a public Web App and paste the execution URL into GOOGLE_SHEET_API_URL variable in destek.html, aq.html, and ist.html.
2. **Telegram Bot Token Tanımlama / Telegram Bot Credential Configuration:**  
   Telegram @BotFather üzerinden alınan Bot Token ve Chat ID bilgisinin Apps Script ayarlarında saklanması.  
   *English:* Store Telegram @BotFather API Token and target Chat ID inside Apps Script Script Properties.

---

## 🌐 6. Canlı Yayınlanan Tüm Sayfalara Erişim Haritası (Live URL Map)
## 🌐 6. Live Application & Web Module Directory

Aşağıdaki bağlantılar Cloudflare Pages üzerinde canlı yayında olan tüm dinamik ve statik modüllerin URL haritasıdır:  
*English:* Complete directory of production URL endpoints hosted on Cloudflare Pages:

### 📜 Kurumsal & Yasal Sayfalar / Corporate & Legal Pages
* **Ana Sayfa Portföyü / Main Portfolio:** https://msklabs.org/index.html
* **Hakkımızda / About Us:** https://msklabs.org/about.html
* **Biz Kimiz / Who We Are:** https://msklabs.org/who-we-are.html
* **İletişim / Contact:** https://msklabs.org/contact.html
* **Dinamik Gizlilik Politikası / Dynamic Privacy Policy:** https://msklabs.org/privacy.html?app=haydinamaza
* **Dinamik Kullanım Şartları & EULA / Dynamic Terms of Service:** https://msklabs.org/terms.html?app=haydinamaza

### 🛠️ Mobil Otomasyon Servisleri / Mobile Automation Services
* **Modüler Akıllı SSS (Live Search FAQ):** https://msklabs.org/faq.html?app=haydinamaza
* **Çapraz Promosyon Motoru / Cross-Promotion Engine:** https://msklabs.org/promo.html?app=haydinamaza
* **Akıllı Mağaza Puanlama Yönlendiricisi / Smart Store Review Router:** https://msklabs.org/review-route.html?app=haydinamaza
* **Akıllı İndirme & QR Kodu Yönlendiricisi / Smart Download & QR Router:** https://msklabs.org/dl.html?app=haydinamaza
* **Sürüm Günlüğü & Yenilikler / Release Changelog:** https://msklabs.org/changelog.html?app=haydinamaza
* **Topluluk Yol Haritası & Oylama / Feature Roadmap Voting:** https://msklabs.org/roadmap.html
* **Canlı Sistem Durumu / System Status Monitor:** https://msklabs.org/status.html

### 🔐 Destek & Yönetim Paneli / Support & Administration
* **Canlı Destek & Bilet Formu / Live Support Ticket Form:** https://msklabs.org/destek.html
* **Gizli İstatistik Paneli (PIN: 175) / Admin Stats Dashboard:** https://msklabs.org/ist.html
* **Tüm Sayfalar Dizini / Site Directory Map:** https://msklabs.org/pages.html
* **Canlı Duyuru API (Static JSON) / Announcement Data (JSON):** https://msklabs.org/announcements.json
* **Remote Announcement API (Worker Endpoint):** https://msklabs.org/api/announcement?app=haydinamaza

---

## 🏛️ 8. "BİZCE" FİKİR PLATFORMU VE TEMİZ KLASÖR MİMARİSİ
## 🏛️ 8. "BIZCE" THOUGHT PLATFORM & CLEAN REPOSITORY ARCHITECTURE

### 📌 8.1 Vizyon ve Yayın Çizgisi / Vision & Editorial Focus
* **Türkçe:** MSK Labs portföyü (20-30 uygulama) genel teknoloji, masaüstü otomasyonu (DeskPilot), verimlilik ve günlük araçlardan oluşur (İslami uygulamalar %10-15 civarındadır). Bizce blog platformu; **teknoloji, insanlık, bilim, sosyal yaşam, evrensel değerler ve gelecek** temalarını kaleme alır. Yazarın kendi inanç dünyasından (İslam) süzülen etik ilkeler, tüm insanlığa hitap eden evrensel ve medeni bir dille sunulur.
* **English:** The MSK Labs application portfolio (20-30 apps) primarily consists of general technology, desktop automation (DeskPilot), productivity, and utility tools. The Bizce blog platform focuses on **technology, humanity, science, social dynamics, ethics, and future innovations**. Ethical values from the author's Muslim background are articulated in a universal, inclusive, and civilized tone.

### 📁 8.2 Klasör Düzeni & Çift Dosya Engelleme İlkesi / Directory Structure & Single Source Rules
* **/** (Ana Dizin): Sadece Tip 1 Kurumsal Çekirdek Sayfaları tutar (`index.html`, `about.html`, `contact.html`, `who-we-are.html`, `destek.html`, `status.html`, `pages.html`, `ist.html`, `app.html`). Ana dizinde hiçbir uygulama veya blog yönlendirme dosyası tutulmaz; kök dizin 100% temiz ve yalındır.
* **/apps/** (Uygulama Sayfaları): Tüm aktif uygulama detay sayfalarının TEK YETKİLİ adresidir (`apps/haydinamaza.html`, `apps/rekatsay.html`, `apps/emekli.html`, `apps/enyakin.html`, `apps/deskpilot.html`, `apps/gcpiluyari.html`). Geliştirici ve AI asistanı TÜM uygulama güncellemelerini YALNIZCA `/apps/` klasöründeki bu dosyalar üzerinde gerçekleştirir.
* **/blog/** (Yayın Platformu): `blog.html` (Bizce & Anıltılar platformu), `blog.js` (Yayın motoru ve TTS) dosyalarını barındırır.
* **/assets/**: Ortak JS (`assets/js/`), CSS (`assets/css/`), Data (`assets/js/apps-data.js`), Görseller (`img/`, `media/`).

### 🔊 8.3 Sesli Okuma Motoru (TTS - Text to Speech) Spesifikasyonu
* **Varsayılan Ses:** Erkek (Bay) sesi varsayılan olarak başlar. Kullanıcı dilerse Kadın (Bayan) sesine geçebilir (👨 Erkek / 👩 Kadın).
* **Anadili Diksiyon:** TR, EN ve AR dillerinde o dilin doğal ve fasih sentezleyicisi kullanılır.
* **Okuma Hızı:** 1.0x, 1.25x, 1.5x hız kontrolleri.

### 🔗 8.4 Blogger (Blogspot) Trafik Hunisi & SEO Stratejisi
* Blogger'a yazının tamamı konulmaz (İkiz içerik cezasını engellemek için).
* Sadece ilk 2-3 vurucu paragraf yer alır; altına 👉 [Yazının Tamamını Okumak ve Sesli Dinlemek İçin MSK Labs Bizce'ye Tıklayın →] butonu eklenerek 100% organik trafik msklabs.org/blog/blog.html adresine çekilir.

---

## 🏛️ 9. MODÜLER SAYFA VE ŞABLON MİMARİSİ KARARI
## 🏛️ 9. MODULAR PAGE & TEMPLATE ARCHITECTURE DECISION

### 📌 9.1 Tek Kişilik Geliştirici + AI İşbirliği İlkesi / Solo Developer + AI Operational Policy
* **Türkçe:** MSK Labs bünyesinde tek bir kurucu/geliştirici ve AI asistanı bulunmaktadır. 500+ sayfa ölçeğine ulaşıldığında menü veya kod güncellemelerinin tek tek HTML dosyalarına yapılması sürdürülemez. Tüm sayfa yapıları modüler hale getirilecek, tek bir merkezi JavaScript bileşeninden (`assets/js/layout.js`) beslenecektir.
* **English:** MSK Labs operates with a single founder/developer partnered with an AI assistant. Maintaining 500+ static HTML files individually for header/footer updates is strictly prohibited. The repository adopts a component-driven architecture powered by a single central layout injector (`assets/js/layout.js`).

### 📐 9.2 Sayfa Sınıflandırması / Page Classification Taxonomy
1. **Tip 1: Kurumsal Çekirdek Sayfalar (Static Core Pages):**
   - **Kapsam / Scope:** `index.html`, `about.html`, `destek.html`, `contact.html`, `who-we-are.html`, `faq.html`, `privacy.html`, `terms.html`.
   - **Yapı / Architecture:** Sabit gövde içeriği tutarlar. Header (Logo, Dil Değiştirici, Üst Menü) ve 2 Satırlı Footer bağlantıları `layout.js` tarafından otomatik olarak enjekte edilir.
2. **Tip 2: Dinamik İçerik & Şablon Sayfaları (Dynamic Content & Template Pages):**
   - **Sub-category 2A - Uygulama Şablonu (App Showcase & Doc Template):** `haydinamaza`, `deskpilot`, `enyakin`, `emekli`, `gcpiluyari`, `rekatsay` ve tüm yeni uygulamalar. Tüm içerik `assets/js/apps-data.js` veri dosyasından beslenir.
   - **Sub-category 2B - Yayın & Makale Şablonu (Publishing & Memoir Template):** Bizce ve Anıltılar makaleleri. `blog/blog.html` ve `blog/blog.js` modüler altyapısı üzerinden dinamik olarak sunulur.

### ⚡ 9.3 Otomatik Yetenekler / Automated Features & Quality Guards
- **Otomatik Aktif Menü Vurgulama (Active Link Highlighting):** `layout.js`, aktif URL yoluna göre menüdeki ilgili linke `.active` stilini otomatik olarak uygular.
- **Dinamik Sosyal Medya & SEO Etiketleri (Social OpenGraph Meta):** Dinamik uygulama sayfalarında title, description ve `og:image` verileri WhatsApp ve X paylaşım kartları için otomatik oluşturulur.
- **SEO & FOUC Guard:** `<header id="site-header">` ve `<footer id="site-footer">` semantik etiketleri muhafaza edilerek arama motoru taranabilirliği ve miktar kaybı olmadan görünüm sağlanır.

---

## 🌙 10. KOYU TEMA (DARK MODE) MİMARİSİ VE STİL İLKELERİ
## 🌙 10. DARK THEME ARCHITECTURE & COLOR SYSTEM SPECIFICATIONS

### 📌 10.1 Açık Tema %10-15 Zemin Doygunluk İlkesi / Light Mode 15% Surface Tint Rule
* **Türkçe:** Açık Tema (Default Light Mode) modunda hiçbir kart, banner, bildirim kutusu veya konteyner %10-15 doygunluğu geçen koyu zemin rengi kullanamaz. Tüm zemin renkleri açık gri/mavi tonlarında (`#f8fafc`, `#f1f5f9`) ve ince gri çerçeveli (`#cbd5e1`) tutulacak, metinler her zaman yüksek kontrastlı okunaklı tonlarda (`#0f172a`, `#334155`) olacaktır.
* **English:** In default Light Mode, no container, card, or banner shall use solid dark backgrounds exceeding 10-15% surface tint. All container surfaces must use soft light tones (`#f8fafc`, `#f1f5f9`) with subtle borders (`#cbd5e1`), ensuring high-contrast readable typography (`#0f172a`, `#334155`).

### 🎨 10.2 CSS Değişkenleri (CSS Custom Property Tokens) Mimarisi
* **Türkçe:** Tüm renk tanımlamaları `global.css` içerisindeki `:root` (Açık Tema) ve `[data-theme="dark"]` / `body.dark-theme` (Koyu Tema) CSS değişkenlerinden çekilir:
  - `--bg-page`: Sayfa arka plan rengi (`#f8fafc` ➔ `#0f172a`)
  - `--bg-card`: Kart ve kutu zemin rengi (`#ffffff` ➔ `#1e293b`)
  - `--bg-surface`: İç yüzey zemin rengi (`#f1f5f9` ➔ `#334155`)
  - `--border-color`: Çerçeve çizgisi (`#cbd5e1` ➔ `#475569`)
  - `--text-main`: Ana metin rengi (`#0f172a` ➔ `#f8fafc`)
  - `--text-muted`: İkincil açıklama metin rengi (`#475569` ➔ `#cbd5e1`)
* **English:** All visual color definitions inherit from centralized CSS Custom Properties defined on `:root` (Light Theme) and `[data-theme="dark"]` / `body.dark-theme` (Dark Theme) in `global.css`.

### 🔄 10.3 Tek Merkezden Otomatik Tema Yönetimi (`assets/js/layout.js`)
* **Türkçe:** Kullanıcının tema tercihi (`light` veya `dark`) `localStorage.getItem('user_theme')` anahtarında saklanır ve `layout.js` tarafından sayfa yüklenirken `document.documentElement` etiketine `data-theme` özniteliği enjekte edilir. Gelecekte eklenecek 500+ sayfa tek bir satır ekstra kod yazılmadan otomatik olarak Koyu/Açık Tema moduna uyum sağlar.
* **English:** Theme preference (`light` or `dark`) is persisted in `localStorage.getItem('user_theme')`. `assets/js/layout.js` injects the `data-theme` attribute on `document.documentElement` upon DOM load, ensuring all current and future 500+ pages instantly toggle between Light and Dark modes without individual file maintenance.

---

## 📱 11. BÜTÜNLEŞİK MOBİL VE ERİŞİLEBİLİRLİK (WCAG) STANDARTLARI
## 📱 11. UNIFIED MOBILE USABILITY & ACCESSIBILITY (WCAG) SPECIFICATIONS

### 📌 11.1 %100 Dark Mode ve CSS Değişken Bağlılığı / 100% Dark Mode & Token Binding Rule
* **Türkçe:** Hiçbir CSS dosyasında (`blog.css`, `global.css`) `body` veya temel bileşenler için sabit (hardcoded) arka plan rengi (Örn: `#f8fafc`, `#ffffff`) kullanılamaz. Tüm zemin ve metin renkleri istisnasız CSS değişkenlerine (`var(--bg-page)`, `var(--bg-card)`, `var(--text-main)`) bağlanmak zorundadır.
* **English:** Hardcoded surface background colors (e.g., `#f8fafc`, `#ffffff`) on `body` or core containers in any stylesheet are strictly prohibited. All surface and text colors must bind directly to CSS Custom Properties (`var(--bg-page)`, `var(--bg-card)`, `var(--text-main)`).

### 📱 11.2 Mobil Dokunma Alanı (WCAG 2.5.5 Touch Target) Standardı
* **Türkçe:** Sitedeki tüm butonlar, dil seçiciler, tab sekmeleri ve aksiyon öğeleri mobilde minimum **44x44px** (küçük ikincil butonlar için min **36x36px**) dokunma alanına sahip olmak zorundadır.
* **English:** All interactive mobile buttons, language switchers, tabs, and action links must satisfy WCAG 2.5.5 touch target size of minimum **44x44px** (min **36x36px** for secondary micro-buttons).

### ↔️ 11.3 Sıfır Mobil Taşma (Zero Horizontal Scroll / Fluid Layout) Standardı
* **Türkçe:** Mobil ekranlarda (320px iPhone SE ve 360px Android cihazlar dahil) hiçbir bileşen yatay kaydırma çubuğu oluşturamaz. Grid kolon genişlikleri `minmax(280px, 1fr)` seviyesine ayarlanacak, medya breakpoint'leri `600px` ve `768px` snap-point'leri ile standartlaştırılacaktır.
* **English:** No element shall trigger horizontal viewport scrolling on mobile screens (including 320px and 360px devices). Grid column minimum widths must be set to `minmax(280px, 1fr)`, with standardized breakpoints at `600px` and `768px`.