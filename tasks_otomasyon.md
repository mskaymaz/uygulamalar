# Bismillahirrahmânirrâhîm

# MSK Labs 20+ Uygulama Merkezi Otomasyon Yol Haritası & İstemci Sözleşmesi (tasks_otomasyon.md)

Bu dosya, hem **msklabs.org merkezi web altyapısını** hem de **20+ Mobil Uygulamanın entegrasyon standartlarını** tanımlayan ana sözleşmedir (Master API & Client Specification). 

1 kişi tarafından yönetilen tüm uygulamalar (Flutter, Kotlin, Swift, React Native vb.) görsel Google E-Tablo paneli ve bu dokümandaki URL yapılarını birebir uygulayacaktır.

---

## 📱 MOBİL UYGULAMA ENTEGRASYON STANDARDI (Client Specification)

Tüm MSK Labs uygulamalarında **"Ayarlar" (Settings)** ve **"Hakkında"** ekranlarında bulunması gereken standart web yönlendirme ve dinamik parametre mimarisi:

### 1. Standart URL Parametre Yapısı (Her İstekte Gönderilecek Değişkenler)
* {APP_ID}: Uygulama kimliği (Örn: haydinamaza, ekatsay, emekli, enyakin, deskpilot, gcpiluyari)
* {APP_VER}: Uygulama sürümü (Örn: 2.1.0)
* {OS}: İşletim sistemi (ndroid, ios, windows, web)
* {LANG}: Kullanıcı cihaz dili (	r, en, r)

---

### 2. Mobil Uygulama "Ayarlar" Menüsü Standart Bağlantı Tablosu

| Menü Elemanı (UI Text) | Aksiyon | Hedef URL Formatı | Açıklama |
| :--- | :--- | :--- | :--- |
| **Biz Kimiz / Hakkımızda** | External Browser | https://msklabs.org/who-we-are.html | Merkezi kurumsal tanıtım |
| **Gizlilik Politikası** | External Browser | https://msklabs.org/privacy.html?app={APP_ID}&ver={APP_VER}&os={OS}&lang={LANG} | Uygulamaya özel dinamik yasal metin & izinler |
| **Kullanım Şartları (Terms)** | External Browser | https://msklabs.org/terms.html?app={APP_ID}&lang={LANG} | Uygulama kullanım sözleşmesi |
| **Destek & Talep Oluştur** | External Browser | https://msklabs.org/destek.html?app={APP_ID}&ver={APP_VER}&os={OS}&lang={LANG} | Telegram bağlantılı canlı bilet sistemi |
| **Diğer Uygulamalarımız** | External Browser | https://msklabs.org/index.html | MSK Labs tüm uygulamalar portföyü |
| **Öne Çıkanlar / Günün Tavsiyesi** | External / In-App | https://msklabs.org/promo.html?app={APP_ID} | E-Tablodan yönetilen çapraz promosyon |
| **Sürüm Yenilikleri (Changelog)**| External Browser | https://msklabs.org/changelog.html?app={APP_ID}&ver={APP_VER} | Sürüm geçmişi ve yenilikler metni |
| **Uygulamayı Değerlendir**| In-App / Browser | https://msklabs.org/review-route.html?app={APP_ID}&os={OS} | 5 Yıldız ➔ Mağaza / 1-3 Yıldız ➔ Destek Formu |
| **Sık Sorulan Sorular (SSS)** | External Browser | https://msklabs.org/faq.html?app={APP_ID}&lang={LANG} | E-Tablodan yönetilen akıllı SSS filtresi |
| **Gelecek Özellikleri Oyla** | External Browser | https://msklabs.org/roadmap.html?app={APP_ID} | Kullanıcı fikir oylama panosu |

---

## 📊 MERKEZİ GÖRSEL YÖNETİM PANELİ (Google E-Tablo Mimarisi)

Tüm web ve mobil içerikler tek bir Google E-Tablo üzerinden kod yazmadan görsel olarak yönetilir:

1. **Biletler Sekmesi:** Telegram botu ile senkronize canlı destek biletleri.
2. **SSS_Listesi Sekmesi:** Uygulama bazlı Soru-Cevap ikilileri (pp_id, soru, cevap).
3. **Duyurular Sekmesi:** Mağaza güncellemesiz canlı uyarı ve zorunlu güncelleme bayrakları.
4. **Capraz_Promosyon Sekmesi:** Hangi uygulamada hangi diğer uygulamanın öne çıkarılacağı matrisi.

---

## 📌 WEB ALTYAPI GELİŞTİRME GÖREV LİSTESİ

### 📌 FAZ 1: Yasal & Kurumsal Temeller (Uygulama Boyutunu Düşürme)

#### Adım 1: Dinamik Gizlilik Politikası Motoru (privacy.html)
- [x] 1.1 privacy.html temel modern duyarlı (responsive) şablonunun oluşturulması.
- [x] 1.2 URL parametresinden (?app=...&ver=...&os=...&lang=...) uygulama adı, versiyon ve dil bilgisinin dinamik okunması.
- [x] 1.3 Uygulamalara özel izinler tablosunun (GPS Konum, Bildirim, Depolama, Kamera vb.) dinamik yükleme mimarisi.
- [x] 1.4 Çoklu dil desteği (TR / EN / AR) ve otomatik Google Play / App Store yasal standart uyumu.
- [x] 1.5 Yazdırılabilir / PDF çıktı alınabilir temiz görünüm seçeneği (@media print).

#### Adım 2: Dinamik Kullanım Şartları & Sözleşmeler Motoru (	erms.html)
- [ ] 2.1 	erms.html duyarlı yasal sözleşme şablonunun hazırlanması.
- [ ] 2.2 Uygulama parametresine göre (?app=...) kullanım şartları ve telif metinlerinin dinamik basılması.
- [ ] 2.3 Çoklu dil (TR / EN / AR) ve PDF yazdırma desteği.

---

### 📌 FAZ 2: Canlı Kontrol & Kullanıcı İletişimi (Mağaza Güncellemesi Yapmadan)

#### Adım 3: Dinamik Duyuru & Canlı Güncelleme Banner Engine (nnouncements.json / Sheet API)
- [ ] 3.1 Google E-Tablo Duyurular sekmesi entegrasyonu.
- [ ] 3.2 Uygulamalar için hafif API uç noktası (msklabs.org/api/announcement).
- [ ] 3.3 Kritik Güncelleme (Force Update) / Genel Duyuru / Bakım Modu bayrakları.

#### Adım 4: Çapraz Promosyon & Trafik Motoru (promo.html / Banner System)
- [ ] 4.1 20+ Uygulama arasında organik kullanıcı trafiği döndürecek Öne Çıkan Uygulama kartı bileşeni.
- [ ] 4.2 E-Tablo Capraz_Promosyon sekmesi matris konfigürasyonu.
- [ ] 4.3 Tıklama ve yönlendirme sayacı (Basic Cross-Promo Analytics).

---

### 📌 FAZ 3: Destek & Mağaza Puanı Optimizasyonu (1 Kişilik Ekip Yükünü Azaltma)

#### Adım 5: Google E-Tablo Bağlantılı Akıllı SSS Engine (aq.html)
- [ ] 5.1 aq.html modüler akordeon bileşeni ve canlı arama çubuğu.
- [ ] 5.2 Google E-Tablo SSS_Listesi sekmesinden ?app=haydinamaza özel sorularını otomatik çekme.
- [ ] 5.3 destek.html destek formu öncesinde SSS öneri akordeon bloğunun gösterilmesi (Bilet azaltma).

#### Adım 6: Akıllı Mağaza Puanlama & Yorum Yönlendirme (eview-route.html)
- [ ] 6.1 İnteraktif 5 Yıldızlı derecelendirme kartı.
- [ ] 6.2 **5 Yıldız:** Doğrudan Google Play / App Store mağaza sayfasına yönlendirme (Puan tavan yaptırma).
- [ ] 6.3 **1-3 Yıldız:** Mağaza yerine doğrudan Telegram bağlantılı destek.html formuna yönlendirme (Kötü yorum engelleme).

---

### 📌 FAZ 4: Dağıtım & Akıllı Bağlantı Otomasyonu

#### Adım 7: Akıllı İndirme & QR Bağlantıları (msklabs.org/dl/app)
- [ ] 7.1 Cihaz algılama betiği (Android ➔ Play Store, iOS ➔ App Store, Masaüstü ➔ Web Portföyü).
- [ ] 7.2 Uygulamaya özel kısa indirme ve dinamik QR kod oluşturma motoru.

#### Adım 8: Sürüm & Değişiklik Günlüğü (changelog.html)
- [ ] 8.1 changelog.html kronolojik versiyon geçmişi görünümü.
- [ ] 8.2 Uygulama bazlı sürüm yenilikleri filtreleme (?app=rekatsay).

---

### 📌 FAZ 5: İleri Düzey Yönetim & Geri Bildirim

#### Adım 9: Kullanıcı Fikir Oylama & Yol Haritası (oadmap.html)
- [ ] 9.1 Topluluk fikir önerme ve oylama (+1) kart yapısı.
- [ ] 9.2 En çok istenen 3 özelliğin E-Tablo ve Telegram üzerinden 1 kişilik ekibe raporlanması.

#### Adım 10: Sistem Durumu Sayfası (status.html)
- [ ] 10.1 "Tüm Sistemler Çalışıyor" / "Bakım Çalışması Var" durum rozetleri.
- [ ] 10.2 Olumsuz bir durumda destek.html üzerinde otomatik uyarı yayınlanması.