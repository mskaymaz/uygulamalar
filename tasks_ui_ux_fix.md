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
- [ ] **[SEC-001]** `assets/js/config.js` içerisindeki `adminPin: "175"` tanımını kaldır; istemci koda şifre yazma.
- [ ] **[SEC-001.2]** `pages.html` 155. satırındaki `Gizli İstatistik Paneli (PIN: 175)` görünür gizli şifre bilgisini temizle.
- [ ] **[SEC-002]** `ist.html` içerisindeki istemci bazlı `display: none` / `checkPin()` kontrolünü güvenli hale getir.
- [ ] **[REVIEW-001]** `review-route.html` 252 ve 254. satırlardaki tırnak/backtick eksikliği olan JavaScript syntax hatasını (`innerText = ${...}`) düzelt.

---

### 🟠 FAZ 6: VERİ MİMARİSİ & TEK YETKİLİ KAYNAK (P1 / HIGH)
- [ ] **[DATA-001]** `assets/js/apps-data.js` dosyasını uygulamanın tek yetkili metadata kaynağı (Single Source of Truth) yap.
- [ ] **[DATA-001.2]** `privacy.html` ve `terms.html` içindeki izin tablolarını ve `index.html` kartlarını bu merkezi veri kaynağına bağla.
- [ ] **[PWA-001]** Kök dizindeki `manifest.json` dosyasını yönetim panelinden (`/ist.html`) ayır; genel site PWA kimliğini ("MSK Labs", start_url: "/") tanımla.

---

### 🟡 FAZ 7: HUKUKİ VE ÜRÜN POLİTİKASI HİZALAMASI (P1 / HIGH)
- [ ] **[LEGAL-001]** `index.html` üzerindeki "free and ad-free" söylemi ile `privacy.html` / `terms.html` AdMob/AdSense çerez bildirimlerini uyumlu hale getir.
- [ ] **[SUPPORT-001]** `destek.html` üzerindeki "Gemini Flash AI Analiz Kuyruğu" söylemini gerçek durumla hizala.
- [ ] **[STATUS-001]** `status.html` üzerindeki statik yeşil rozetleri bilgilendirici/gerçekleşen duruma dönüştür.

---

### 🔵 FAZ 8: INLINE STYLE TEMİZLİĞİ VE BİLEŞEN DARK MODE TAMAMLAMA (P2 / MEDIUM)
- [ ] **[STYLE-001]** `index.html`, `about.html`, `contact.html`, `destek.html`, `app.html` ve tüm sayfalardaki `<nav style="...">` ve `<footer style="...">` inline stillerini `global.css` içindeki `.top-main-nav` ve `.site-footer` sınıflarına taşı.
- [ ] **[STYLE-002]** `global.css` içinde `.lang-switcher button`, `.download-card`, `.static-page-card` ve `.page-title` hardcoded hex renklerini CSS değişkenlerine (`var(--bg-card)`, `var(--text-main)`) çevir.
- [ ] **[STYLE-003]** `blog.css` içinde `.section-tab-bar`, `.filter-toolbar`, `.pagination-bar` ve `.article-body blockquote` alt bileşenlerine Dark Mode zemin/yazı değişkenlerini uygula.
- [ ] **[STYLE-004]** `apps/haydinamaza.html` ve diğer uygulama detay sayfalarındaki inline `<style>` bloklarını genel responsive ve dark mode standartlarına çek.

---

### 🟣 FAZ 9: SEO, ERİŞİLEBİLİRLİK & ÇOKLU DİL ALTYAPISI (P2 / MEDIUM)
- [ ] **[SEO-001]** Dil değişiminde (TR/EN/AR) `<html lang="...">` özniteliğini dinamik güncelle; canonical etiket altyapısını kontrol et.
- [ ] **[A11Y-001]** Dinamik dil ve form durum bildirimlerine `aria-live="polite"` erişilebilirlik özniteliği ekle.
- [ ] **[A11Y-002]** `@media (prefers-reduced-motion: reduce)` kuralının `blog.css` animasyonlarını da kapsamasını sağla.

---

### ⚪ FAZ 10: KOD TEMİZLİĞİ & KONTROL (P3 / LOW)
- [ ] **[VERSION-001]** Asset cache versioning (`?v=25`) ile uygulama versiyonu (`SITE_CONFIG.version`) kavramlarını birbirinden ayır.
- [ ] **[ROADMAP-001]** `roadmap.html` oylama mekanizmasının yerel/demo niteliğinde olduğunu kullanıcıya açıkça bildiren açıklamayı güncelle.
- [ ] **[VERIFY]** Tüm sayfaları tarayıcıda test et, console error olmadığını doğrula, git commit ve push işlemlerini gerçekleştir.
