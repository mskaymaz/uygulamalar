# MSK Labs 20+ Uygulama Merkezi Otomasyon Yol Haritası (tasks_otomasyon.md)

Bu dosya hem **msklabs.org merkezi web altyapısını** hem de **20+ Mobil Uygulamanın entegrasyon standartlarını** tanımlayan ana sözleşmedir (API & Client Specification). 

1 kişi tarafından yönetilen tüm uygulamalar (Flutter, Kotlin, Swift, React Native vb.) bu dokümandaki URL yapılarını ve menü standartlarını birebir uygulayacaktır.

---

## 📱 MOBİL UYGULAMA ENTEGRASYON STANDARDI (Client Specification)

Tüm MSK Labs uygulamalarında **"Ayarlar" (Settings)** ve **"Hakkında"** ekranlarında bulunması gereken standart web yönlendirme mimarisi:

### 1. Dinamik Parametre Yapısı (Her İskekte Gönderilecek Standart Değişkenler)
* {APP_ID}: Uygulama kimliği (Örn: haydinamaza, ekatsay, emekli, enyakin, deskpilot, gcpiluyari)
* {APP_VER}: Uygulama sürümü (Örn: 2.1.0)
* {OS}: İşletim sistemi (ndroid, ios, windows, web)
* {LANG}: Kullanıcı cihaz dili (	r, en, r)

---

### 2. Uygulama İçi Ayarlar Menüsü Standart Bağlantı Tablosu

| Menü Elemanı (UI Text) | Aksiyon | Hedef URL Formatı | Açıklama |
| :--- | :--- | :--- | :--- |
| **Biz Kimiz / Hakkımızda** | External Browser | https://msklabs.org/who-we-are.html | Merkezi kurumsal tanıtım |
| **Gizlilik Politikası** | External Browser | https://msklabs.org/privacy.html?app={APP_ID}&ver={APP_VER}&os={OS}&lang={LANG} | Uygulamaya özel dinamik gizlilik metni |
| **Destek & Talep Oluştur** | External Browser | https://msklabs.org/destek.html?app={APP_ID}&ver={APP_VER}&os={OS}&lang={LANG} | Telegram bağlantılı bilet destek sistemi |
| **Diğer Uygulamalarımız** | External Browser | https://msklabs.org/index.html | MSK Labs tüm uygulamalar portföyü |
| **Uygulamayı Değerlendir**| In-App / Browser | https://msklabs.org/review-route.html?app={APP_ID}&os={OS} | 5 Yıldız ➔ Mağaza / 1-3 Yıldız ➔ Destek Formu |
| **Sık Sorulan Sorular** | External Browser | https://msklabs.org/faq.html?app={APP_ID}&lang={LANG} | Uygulamaya özel SSS filtresi |

---

### 3. Otomatik Açılış Kontrolleri (App Launch / Splash Logic)
Uygulama açılırken (Splash/Main Screen):
* **Duyuru & Güncelleme Kontrolü:** https://msklabs.org/api/announcement?app={APP_ID}&ver={APP_VER} adresinden JSON kontrolü yapılır. 
  * orce_update: true gelirse kullanıcı mağazaya yönlendirilir.
  * ctive_announcement varsa diyalog/modal pencere gösterilir.

---

## 📌 WEB ALTYAPI GELİŞTİRME YOL HARİTASI (tasks_otomasyon.md)

### 📌 FAZ 1: Yasal & Kurumsal Temeller (Uygulama Boyutunu Düşürme)

#### Adım 1: Dinamik Gizlilik Politikası & Kullanım Şartları Motoru (privacy.html)
- [x] 1.1 privacy.html temel modern duyarlı (responsive) şablonunun oluşturulması.
- [x] 1.2 URL parametresinden (?app=...&ver=...&os=...&lang=...) uygulama adı, versiyon ve dil bilgisinin dinamik okunması.
- [x] 1.3 Uygulamalara özel izinler tablosunun (Konum, Bildirim, Depolama, Kamera vb.) dinamik yükleme mimarisi (JSON/Data-config).
- [x] 1.4 Çoklu dil desteği (TR / EN / AR) ve otomatik Google Play / App Store yasal standart uyumu.
- [x] 1.5 Yazdırılabilir / PDF çıktı alınabilir temiz görünüm seçeneği (@media print).

---

### 📌 FAZ 2: Canlı Kontrol & Kullanıcı İletişimi (Mağaza Güncellemesi Yapmadan)

#### Adım 2: Dinamik Duyuru & Canlı Güncelleme Banner'ı (nnouncements.json / Web Engine)
- [ ] 2.1 Merkezi duyuru veritabanı şablonu (Google Sheet / JSON API entegrasyonu).
- [ ] 2.2 Uygulamalar için hafif (lightweight) Duyuru & Bakım API uç noktası (msklabs.org/api/announcement).
- [ ] 2.3 Kritik Güncelleme (Force Update) / Genel Duyuru / Özel Gün Kutlaması bayrakları ve aksiyon linkleri.

#### Adım 3: Çapraz Promosyon & Trafik Motoru (promo.html / Banner System)
- [ ] 3.1 20+ Uygulama arasında organik kullanıcı trafiği döndürecek Öne Çıkan Uygulama kartı bileşeni.
- [ ] 3.2 E-Tablo üzerinden "Hangi uygulamada hangi diğer uygulama önerilecek" matris konfigürasyonu.
- [ ] 3.3 Tıklama ve yönlendirme sayacı (Basic Cross-Promo Analytics).

---

### 📌 FAZ 3: Destek & Mağaza Puanı Optimizasyonu (1 Kişilik Ekip Yükünü Azaltma)

#### Adım 4: Akıllı SSS & Destek Ön Filtresi (aq.html)
- [ ] 4.1 aq.html modüler akordeon bileşeni ve arama çubuğu.
- [ ] 4.2 URL parametresine göre (?app=haydinamaza) uygulamaya özel sık sorulan soruları filtreleme.
- [ ] 4.3 Sorunun altında "Çözüm yardımcı olmadı mı? Destek Talebi Oluştur" buton yönlendirmesi.

#### Adım 5: Akıllı Mağaza Puanlama & Yorum Yönlendirme (eview-route.html)
- [ ] 5.1 Kullanıcı memnuniyet ölçer (5 Yıldızlı İnteraktif Derecelendirme).
- [ ] 5.2 **5 Yıldız:** Doğrudan Google Play / App Store mağaza sayfasına yönlendirme (Puan tavan yaptırma).
- [ ] 5.3 **1-3 Yıldız:** Mağaza yerine doğrudan Telegram bağlantılı destek.html formuna yönlendirme (Kötü yorum engelleme).

---

### 📌 FAZ 4: Dağıtım & Akıllı Bağlantı Otomasyonu

#### Adım 6: Akıllı İndirme & QR Bağlantıları (msklabs.org/dl/app)
- [ ] 6.1 Cihaz algılama betiği (Android ➔ Play Store, iOS ➔ App Store, Masaüstü ➔ Tanıtım Sayfası).
- [ ] 6.2 Uygulamaya özel kısa indirme ve dinamik QR kod oluşturma motoru.

#### Adım 7: Sürüm & Değişiklik Günlüğü (changelog.html)
- [ ] 7.1 changelog.html zamandizinsel (chronological) versiyon geçmişi görünümü.
- [ ] 7.2 Uygulama bazlı sürüm yenilikleri filtreleme (?app=rekatsay).

---

### 📌 FAZ 5: İleri Düzey Yönetim & Geri Bildirim

#### Adım 8: Kullanıcı Fikir Oylama & Yol Haritası (oadmap.html)
- [ ] 8.1 Topluluk fikir önerme ve oylama (+1) kart yapısı.
- [ ] 8.2 En çok istenen 3 özelliğin E-Tablo ve Telegram üzerinden 1 kişilik ekibe raporlanması.

#### Adım 9: Merkezi Dil & Lokalleşme String Kütüphanesi (i18n.json)
- [ ] 9.1 Ortak terimlerin (Hakkımızda, Destek, Gizlilik, İletişim vb.) tek merkezden Türkçe, İngilizce, Arapça yönetimi.

#### Adım 10: Sistem Durumu Sayfası (status.html)
- [ ] 10.1 "Tüm Sistemler Çalışıyor" / "Bakım Çalışması Var" durum rozetleri.
- [ ] 10.2 Olumsuz bir durumda destek.html üzerinde otomatik uyarı yayınlanması.