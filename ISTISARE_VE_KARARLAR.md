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
6. **Önbellek Yenileme (Cache-Busting =XX) Standardı / CSS Cache-Busting Rule:**  
   CSS ve script dosyalarında yapılan güncellemelerin kullanıcının tarayıcısına anında yansıması için HTML dosyalarında href="assets/css/global.css?v=XX" sürüm parametresi artırılmalıdır.  
   *English:* Whenever global.css is modified, bump the query parameter ?v=XX across all HTML files to force immediate browser cache eviction.

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
