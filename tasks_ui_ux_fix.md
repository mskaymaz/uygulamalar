# 📋 MSK Labs - Master UI/UX, Dark Mode & Mobil Optimizasyon Görev Listesi
# 📋 MSK Labs - Master UI/UX, Dark Mode & Mobile Optimization Roadmap

> **Doküman Tarihi / Date:** 12 Eylül 2026 / September 12, 2026  
> **Durum / Status:** 🚀 Aktif Uygulama / Active Execution  

---

## 🏛️ MIMARI KARAR VE GENEL PRENSIPLER / ARCHITECTURAL DECISION & PRINCIPLES

### 🇹🇷 Türkçe: Bütünleşik Tasarım ve Mobil Standartlar Kararı
Gelen 23 maddelik Genel Teknik Analiz Raporu ile Mobil Yapı Detaylı Raporu tek bir bütünleşik görev listesi halinde birleştirilmiştir. Tüm geliştirme çalışmaları şu 4 temel ilkeye göre yürütülecektir:
1. **%100 Dark Mode Uyumluğu:** `blog.css` ve `global.css` içerisindeki tüm sabit (hardcoded) renkler CSS değişkenlerine (`var(--bg-page)`, `var(--bg-card)`, `var(--text-color)`) bağlanarak karanlık modda oluşan kırılma ve beyazlaşmalar engellenecektir.
2. **WCAG Erişilebilirlik & Dokunma Alanı (Touch Target):** Tüm mobil butonlar, dil seçiciler ve aksiyon elemanları WCAG 2.5.5 standardı olan minimum **44x44px** (küçük ikincil butonlar min **36x36px**) dokunma alanına çıkarılacaktır. Dil rozeti kontrastı (1.5:1 -> 4.5:1 AA) düzeltilecektir.
3. **Sıfır Yatay Taşma (Zero Mobile Overflow):** 320px mobil cihazlarda (iPhone SE vb.) `minmax(360px)` kuralından kaynaklanan tüm yatay kaydırma çubukları `minmax(280px, 1fr)` kuralı ile tamamen önlenecektir.
4. **Kod Temizliği & Özgüllük (Specificity):** `!important` kullanımı temizlenecek, kopyalanmış mükerrer CSS kural blokları silinecektir.

### 🇬🇧 English: Master UI/UX & Mobile Usability Policy
The 23-point Technical Audit and the Detailed Mobile Architecture Report have been unified into a single execution roadmap. Implementation follows 4 core principles:
1. **100% Dark Mode Compatibility:** All hardcoded background and text colors in `blog.css` and `global.css` will be refactored to CSS custom properties (`var(--bg-page)`, `var(--bg-card)`, `var(--text-color)`).
2. **WCAG Accessibility & Touch Targets:** All interactive mobile buttons and switchers will meet WCAG 2.5.5 minimum **44x44px** standards. Contrast ratios (e.g. pending badges) will be raised to AA compliance (4.5:1).
3. **Zero Horizontal Overflow:** Mobile grid layouts (`minmax(360px)`) causing side-scrolling on 320px devices will be adjusted to `minmax(280px, 1fr)`.
4. **Clean CSS Architecture:** Over 100 redundant `!important` declarations and duplicated CSS blocks will be purged.

---

## 📋 UYGULAMA ADIMLARI VE GÖREV LİSTESİ / TASK CHECKLIST

### Faz 1: Dark Mode, CSS Mimarisi ve Renk Değişkenleri
- [ ] `assets/css/blog.css:14` satırındaki hardcoded `background: #f8fafc;` kaldırıp `var(--bg-page)` ve `var(--text-color)` değişkenlerine bağla.
- [ ] `assets/css/global.css` içinde `.site-header` ve `.bizce-header` sabit renklerini CSS değişkenlerine (`var(--bg-card)`, `var(--text-color)`, `var(--border-color)`) çevir.
- [ ] `assets/css/global.css` 282-299 satırları arasındaki mükerrer dil (TR/EN/AR) kural bloğunu sil.
- [ ] `assets/css/global.css` mobil breakpoint'lerdeki gereksiz `!important` yığınını ve `.app-icon` 11x `!important` deklarasyonunu temizle.

### Faz 2: Mobil Dokunmatik Alanlar (WCAG Touch Targets) & Erişilebilirlik
- [ ] `.lang-switcher button` ve `.top-main-nav a` bağlantılarına WCAG 2.5.5 gereği `min-height: 44px; min-width: 44px;` dokunma alanı tanımla.
- [ ] `blog/blog.html` font kontrol butonlarına (`A+`, `A-`, `Sıfırla`) `min-height: 36px; min-width: 36px;` dokunma alanı ekle.
- [ ] TTS Oynatıcı butonlarına (`.tts-btn`) minimum 44x44px dokunma yüksekliği ekle.
- [ ] Dil rozeti `.lang-badge.pending` renk kontrastını WCAG AA (4.5:1) seviyesine çıkar.

### Faz 3: Mobil Responsive Düzen & Taşma Önleme (Layout & Overflow)
- [ ] `assets/css/blog.css` `.posts-grid` kuralındaki `minmax(360px, 1fr)` değerini mobilde `minmax(280px, 1fr)` yap.
- [ ] `assets/css/blog.css` `680px` breakpoint'ini global `600px` / `768px` snap-point'leri ile hizala.
- [ ] Section Tab Bar ("✍️ BİZCE") başlıklarına mobilde `white-space: nowrap; text-overflow: ellipsis; overflow: hidden;` ekle.
- [ ] `.main-logo` boyutunu `width: clamp(190px, 40vw, 240px);` fluid yapısına geçir.
- [ ] `dl.html` QR kod görselini mobilde (`max-width: 600px`) 120px'e düşür.
- [ ] `destek.html` `.receipt-card` için mobilde `padding: 20px 16px;` responsive kuralı ekle.
- [ ] `apps/haydinamaza.html` ve Tip 2 Şablonlarında `.app-header` mobil hizalamasını esnek responsive yığılmaya göre düzenle.

### Faz 4: Performans & HTML Inline Style Temizliği
- [ ] `@media (prefers-reduced-motion: reduce)` kuralını ekle.
- [ ] HTML sayfalarındaki çakışan inline style'ları temizleyip CSS sınıflarına taşı.
- [ ] Script etiketlerine (`config.js`, `analytics.js`) `defer` attribute ekle.
