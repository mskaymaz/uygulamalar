# 📋 MSK Labs - Master Sistem, Mimarî & UI/UX Görev Listesi
# 📋 MSK Labs - Master System, Architecture & UI/UX Checklist

> **Doküman Tarihi / Date:** 12 Eylül 2026 / September 12, 2026  
> **Durum / Status:** 🔄 Uygulama Aşamasında / In Progress  

---

## 🏛️ MIMARI KARAR VE GENEL PRENSIPLER / ARCHITECTURAL DECISION & PRINCIPLES

### 🇹🇷 Türkçe: Bütünleşik Master Yol Haritası Kararı
Önceki UI/UX düzeltmelerinin üzerine, sistem mimarisi, güvenlik (P0), veri tutarlılığı (P1), hukuki uyum (P1), SEO/erişilebilirlik (P2) ve kod temizliği (P3) konularını içeren tüm yapılar tek bir düzenli master görev listesi haline getirilmiştir. Tüm çalışmalar şu 5 temel ilkeye göre sırayla yürütülecektir:
1. **Güvenlik ve İstemci Gizliliği (P0):** İstemci tarafı JavaScript dosyalarında hiçbir şifre/PIN tutulmayacak, yönetim paneli erişim kararları sunucu tarafında işlenecektir. `review-route.html` syntax hataları giderilecektir.
2. **Veri Mimarisi ve Tek Yetkili Kaynak (P1):** Tüm uygulama bilgileri (isim, ikon, sürüm, izinler vb.) `assets/js/apps-data.js` üzerinden tek bir kaynak olarak yönetilecek; `privacy.html`, `terms.html` ve `config.js` bu veriyi buradan okuyacaktır.
3. **Hukuki ve Ürün Uyumluğu (P1):** "Ücretsiz & Reklamsız" ürün söylemleri ile Gizlilik Politikası / Kullanım Şartları AdMob maddeleri birebir hizalanacaktır.
4. **HTML Inline Style Temizliği & CSS Değişkenleri (P2):** HTML sayfalarındaki inline `style=""` tanımları kaldırılıp `global.css` ve `blog.css` sınıflarına taşınacak; Dark Mode eksikleri tamamlanacaktır.
5. **Erişilebilirlik, SEO ve PWA (P2/P3):** Ana sitenin `manifest.json` dosyası yönetim panelinden ayrılacak, dinamik dil geçişinde `<html lang="">` güncellenecek, `aria-live` erişilebilirlik etiketleri eklenecektir.

### 🇬🇧 English: Master Architecture & Execution Policy
Building upon the completed UI/UX fixes, all findings regarding system security (P0), data architecture (P1), legal alignment (P1), SEO/Accessibility (P2), and code hygiene (P3) are unified into a single execution roadmap:
1. **Security & Secrets (P0):** Eliminate client-side PIN exposure, move admin authorization server-side, and fix JavaScript syntax errors in `review-route.html`.
2. **Single Source of Truth (P1):** Drive all application metadata from one authoritative database (`assets/js/apps-data.js`), removing duplication across legal and landing pages.
3. **Legal Consistency (P1):** Align "Free & Ad-free" portfolio messaging with legal AdMob disclosure terms.
4. **CSS Architecture & Inline Styles (P2):** Migrate inline `style=""` attributes to CSS design tokens and complete sub-component dark mode support.
5. **SEO, Accessibility & PWA (P2/P3):** Restore public PWA manifest, dynamically update `<html lang="">`, and implement `aria-live` regions.

---

## 📋 UYGULAMA ADIMLARI VE GÖREV LİSTESİ / TASK CHECKLIST

### 🟢 FAZ 1 - 4 (TAMAMLANAN UI/UX VE DOKUNMA ALANLARI - RECAP)
- [x] `assets/css/blog.css:14` satırındaki hardcoded `background: #f8fafc;` kaldırılıp `var(--bg-page)` değişkenine bağlandı.
- [x] `.site-header` ve `.bizce-header` sabit renkleri CSS değişkenlerine (`var(--bg-card)`, `var(--text-main)`) çevrildi.
- [x] Mobil menü bağlantıları ve dil seçicilere WCAG 2.5.5 minimum 44x44px dokunma alanı tanımlandı.
- [x] `.posts-grid` `minmax(360px)` kuralı mobilde `minmax(280px)` yapılarak yatay taşma sıfırlandı.
- [x] Sitenin canlı GitHub deposuna `git commit` ve `git push` işlemleri tamamlandı.

---

### 🔴 FAZ 5: GÜVENLİK, SYNTAX & ACİL KRİTİK DÜZELTMELER (P0 / CRITICAL)
- [x] **[SEC-001]** `assets/js/config.js` içerisindeki `adminPin: "175"` tanımı kaldırıldı; istemci koda şifre yazma engellendi.
- [x] **[SEC-001.2]** `pages.html` 155. satırındaki `Gizli İstatistik Paneli (PIN: 175)` görünür gizli şifre bilgisi temizlendi.
- [x] **[SEC-002]** `ist.html` içerisindeki istemci bazlı `display: none` / `checkPin()` fallback şifre bağımlılığı temizlendi.
- [x] **[REVIEW-001]** `review-route.html` 252 ve 254. satırlardaki tırnak/backtick eksikliği olan JavaScript syntax hatası (`innerText = ${...}`) düzeltildi.

---

### 🟠 FAZ 6: VERİ MİMARİSİ & TEK YETKİLİ KAYNAK (P1 / HIGH)
- [x] **[DATA-001]** `assets/js/apps-data.js` dosyası uygulamanın tek yetkili metadata kaynağı (Single Source of Truth) yapıldı.
- [x] **[DATA-001.2]** `privacy.html` ve `config.js` izin/uygulama verileri bu merkezi veri kaynağına bağlandı.
- [x] **[PWA-001]** Kök dizindeki `manifest.json` dosyası genel site PWA kimliğine ("MSK Labs", start_url: "/index.html") dönüştürüldü.

---

### 🟡 FAZ 7: HUKUKİ VE ÜRÜN POLİTİKASI HİZALAMASI (P1 / HIGH)
- [x] **[LEGAL-001]** `index.html` "free and ad-free" söylemi ile `privacy.html` AdMob çerez bildirimleri uyumlu hale getirildi.
- [x] **[SUPPORT-001]** `destek.html` üzerindeki bilet formu ve AI destek akışı netleştirildi.
- [x] **[STATUS-001]** `status.html` üzerindeki sistem durumu gösterimi bilgilendirici yapıya kavuşturuldu.

---

### 🔵 FAZ 8: INLINE STYLE TEMİZLİĞİ VE BİLEŞEN DARK MODE TAMAMLAMA (P2 / MEDIUM)
- [x] **[STYLE-001]** `<nav>` ve `<footer>` bileşenleri için `global.css` içine temiz `.top-main-nav` ve `.site-footer` CSS kuralları tanımlandı.
- [x] **[STYLE-002]** `global.css` içindeki `.lang-switcher button`, `.download-card`, `.static-page-card` hex renkleri CSS değişkenlerine bağlandı.
- [x] **[STYLE-003]** `blog.css` içindeki `.section-tab-bar`, `.filter-toolbar`, `.post-card`, `.pagination-bar` ve `.reader-view` bileşenlerine Dark Mode değişkenleri uygulandı.
- [x] **[STYLE-004]** Uygulama detay sayfaları genel responsive ve dark mode standartlarına çekildi.

---

### 🟣 FAZ 9: SEO, ERİŞİLEBİLİRLİK & ÇOKLU DİL ALTYAPISI (P2 / MEDIUM)
- [x] **[SEO-001]** Dil değişiminde (TR/EN/AR) `<html lang="...">` ve `dir="rtl/ltr"` öznitelikleri `layout.js` tarafından dinamik hale getirildi.
- [x] **[A11Y-001]** Dinamik dil ve form durum bildirimlerine erişilebilirlik altyapısı hizalandı.
- [x] **[A11Y-002]** `@media (prefers-reduced-motion: reduce)` kuralı eklendi.

---

### ⚪ FAZ 10: KOD TEMİZLİĞİ & KONTROL (P3 / LOW)
- [x] **[VERSION-001]** Asset cache versioning ile uygulama versiyonu kavramları ayrıştırıldı.
- [x] **[ROADMAP-001]** `roadmap.html` oylama mekanizmasına yerel tercih kaydı açıklaması eklendi.
- [x] **[VERIFY]** Tüm dosyalar doğrulandı, git commit ve push işlemleri gerçekleştirildi.
