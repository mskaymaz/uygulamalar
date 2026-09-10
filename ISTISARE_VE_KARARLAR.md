# 📜 MSK Labs - Sistem Mimarisi, İstişare Notları ve Kararlar Dokümanı

> **Doküman Oluşturulma Tarihi:** 10 Eylül 2026  
> **Amaç:** MSK Labs web platformu ve 20+ mobil/masaüstü uygulamasının merkezi otomasyon altyapısına ilişkin alınan tüm kararların, veri akış haritalarının ve Google E-Tablo entegrasyon detaylarının kalıcı rehberi.

---

## 🎯 1. Genel Mimari Stratejisi & Vizyon

1 kişilik geliştirici ekibinin (MSK Labs) 20+ uygulamayı sıfır sunucu maliyeti ve minimum eforla yönetebilmesi amacıyla **3'lü Entegrasyon Modeli** kararlaştırılmıştır:

1. **Google E-Tablo (Spreadsheet - Veri Merkezi):** Tüm dinamik verilerin (SSS, Duyurular, İndirme Sayaçları, Biletler, Yol Haritası) tek bir E-Tablo üzerinden yönetilmesi.
2. **Cloudflare Pages / Serverless (Yayın Altyapısı):** Ücretsiz, sınırsız bant genişliği ve yüksek hızlı kenar sunucu (Edge) yayını.
3. **Telegram Bot Entegrasyonu (Anlık Bildirim):** Destek formundan veya kritik hatalardan anında Telegram cebinize bilet bildirimi düşmesi.

---

## 📊 2. Google E-Tablo Veri Tabanı Yapısı (Spreadsheet Schema)

Google E-Tablo üzerinde aşağıdaki 6 sekme tanımlanmıştır. Tüm web sayfaları ve API uç noktaları bu sekmelerle senkronize çalışacak şekilde mimarilendirilmiştir:

### 1️⃣ Sekme: SSS_Listesi
* **Amacı:** aq.html sayfasındaki akordeon soruları ve canlı aramayı besler.
* **Sütunlar:** App_ID | Soru_TR | Cevap_TR | Soru_EN | Cevap_EN | Kategori | Aktif_Mi

### 2️⃣ Sekme: Duyurular
* **Amacı:** /api/announcement ve nnouncements.json üzerinden mobil uygulamalara uzaktan canlı duyuru ve zorunlu güncelleme (Force Update) iletir.
* **Sütunlar:** App_ID | Min_Version | Force_Update | Baslik_TR | Mesaj_TR | Buton_URL | Aktif_Mi

### 3️⃣ Sekme: Destek_Biletleri
* **Amacı:** destek.html üzerinden gönderilen tüm talepleri otomatik kaydeder ve Telegram Botuna iletir.
* **Sütunlar:** Tarih | Bilet_No | App_ID | App_Ver | Kategori | Eposta | Mesaj | Durum

### 4️⃣ Sekme: Sayaclar_ve_Analiz
* **Amacı:** ist.html (Gizli İstatistik Paneli - PIN: 175) sayfasında gösterilecek canlı metrikleri tutar.
* **Sütunlar:** Tarih | Tekil_Ziyaretci | Sayfa_Goruntuleme | HaydiNamaza_Indirme | RekatSay_Indirme | Emekli_Indirme | AdSense_Goruntuleme

### 5️⃣ Sekme: Capraz_Promosyon
* **Amacı:** promo.html sayfasında hangi uygulamanın altında hangi 3 uygulamanın tavsiye edileceğini belirleyen matristir.
* **Sütunlar:** Kaynak_App_ID | Onerilen_App_1 | Onerilen_App_2 | Onerilen_App_3

### 6️⃣ Sekme: Yol_Haritasi_Oylama
* **Amacı:** oadmap.html üzerindeki topluluk özellik isteklerini ve +1 oy sayaçlarını tutar.
* **Sütunlar:** Feature_ID | App_ID | Baslik | Aciklama | Oy_Sayisi

---

## 🛠️ 3. Tamamlanan 11 Otomasyon Modülü ve URL Haritası

Tüm modüller ssets/css/global.css?v=25 ile %100 uyumlu, destek.html temiz beyaz kart formatında (#ffffff), koyu okunaklı metinlerle (%80 Slate Black #1e293b) kodlanmıştır:

| # | Modül Adı | Dosya Adı | URL Parametresi / Açıklama |
|---|---|---|---|
| 1 | **Gizlilik Politikası** | privacy.html | ?app=haydinamaza&ver=2.1.0&os=android&lang=tr |
| 2 | **Kullanım Şartları** | 	erms.html | ?app=haydinamaza&ver=2.1.0&os=android&lang=tr |
| 3 | **Canlı Duyuru API** | unctions/api/announcement.js / nnouncements.json | ?app=haydinamaza&ver=2.1.0 (Remote Force Update) |
| 4 | **Çapraz Promosyon Motoru** | promo.html | ?app=haydinamaza (Tavsiye uygulamalar matrisi) |
| 5 | **Modüler Akıllı SSS** | aq.html | ?app=haydinamaza (Canlı arama + akordeon) |
| 6 | **Akıllı Mağaza Puanlama** | eview-route.html | ?app=haydinamaza (5 Yıldız ➔ Mağaza, 1-4 Yıldız ➔ Destek Bilet Formu) |
| 7 | **Akıllı İndirme & QR Kod** | dl.html | ?app=haydinamaza (Cihaz algılama: Android ➔ Play Store, iOS ➔ App Store) |
| 8 | **Sürüm Günlüğü (Changelog)** | changelog.html | ?app=haydinamaza (Kronolojik sürüm yenilikleri) |
| 9 | **Topluluk Yol Haritası** | oadmap.html | Özellik önerme ve +1 oy verme board'u |
| 10 | **Canlı Sistem Durumu** | status.html | 🟢 Tüm sistemler çalışıyor / Bakım modu göstergesi |
| 11 | **Gizli İstatistik Paneli** | ist.html | **Giriş PIN Kodu: 175** (Ziyaretçi, İndirme ve AdSense metrikleri) |
| 12 | **Tüm Sayfalar Dizi Haritası** | pages.html | Tüm sayfa URL'lerinin arşivlendiği indeks haritası |

---

## 🔐 4. Alınan Özel Güvenlik ve Tasarım Kararları

1. **Yönetici PIN Kodu:** ist.html paneli için PIN kodu masaüstü RAR şifresi olan 571 ile karışmaması ve güvenlik riski oluşturmaması için **175** olarak kararlaştırılmıştır.
2. **Tasarım Standardı:** 
   - Tüm kartlar destek.html standardında **temiz beyaz zemin (#ffffff)** ve açık gri çerçeve (#cbd5e1) ile yapılandırılmıştır.
   - Tüm yazılar **%80 - %90 Siyah / Slate Black (#0f172a ve #1e293b)** olarak kodlanarak okunabilirlik tavan yaptırılmıştır.
   - Sayfa altı footer linkleri belirgin koyu tonla okunabilir kılınmıştır.
3. **Sıfır Git Push Kuralı:** Geliştiricinin (Kullanıcı) açık talimatı gelmeden **hiçbir kod git push ile Cloudflare sunucularına gönderilmeyecektir.** Tüm geliştirmeler yerel git commit olarak saklanacaktır.

---

## 📌 5. Canlıya Alma Sonrası Adımlar (Deployment Checklists)

Push yapıldıktan sonra yapılması gereken 2 küçük işlem:
1. **Google Apps Script Web App Deployment:** E-Tablonuz üzerindeki Apps Script kodunun yayınlanıp URL'sinin destek.html, aq.html ve ist.html dosyalarına GOOGLE_SHEET_API_URL olarak yazılması.
2. **Telegram Bot Token:** Telegram @BotFather üzerinden alınan Bot Token ve Chat ID bilgisinin Apps Script script özelliklerine eklenmesi.
