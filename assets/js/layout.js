/**
 * MSK Labs - Central Layout Component & Dynamic Header/Footer Injector
 * Single Source of Truth for Top Header, Navigation Bar & 2-Row Footer
 * 
 * Supports:
 * - Dynamic relative path detection for subfolders (/blog/, /apps/)
 * - Active page link highlighting
 * - Dynamic OpenGraph metadata updates for social media sharing
 */

(function () {
  // 1. Detect path depth to dynamically resolve relative links
  var pathname = window.location.pathname.replace(/\\/g, '/');
  var isSubfolder = pathname.indexOf('/blog/') !== -1 || pathname.indexOf('/apps/') !== -1;
  var basePath = isSubfolder ? '../' : './';

  // Extract current file name for active link highlighting
  var pageName = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';

  // Helper for link active state styling
  function getLinkStyle(hrefKeyword, isFooterRow2) {
    var defaultColor = isFooterRow2 ? '#64748b' : '#475569';
    var isCurrent = false;

    if (hrefKeyword === 'index' && (pageName === 'index.html' || pageName === '')) {
      isCurrent = true;
    } else if (hrefKeyword !== 'index' && pageName.indexOf(hrefKeyword) !== -1) {
      isCurrent = true;
    }

    if (isCurrent) {
      return 'color: #2563eb; font-weight: 700; text-decoration: none; margin: 0 0.35rem;';
    }
    return 'color: ' + defaultColor + '; text-decoration: none; margin: 0 0.35rem;';
  }

  // 2. Build Header HTML (Logo, Language Switcher, Sub-Nav)
  function renderHeader() {
    var headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    var headerHTML = `
      <div class="site-header-inner" style="max-width: 900px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem;">
        <div class="header-logo-block">
          <a href="${basePath}index.html" style="text-decoration: none;">
            <img src="${basePath}img/MSKLabsLogo.svg" alt="MSK Labs Logo" class="site-header-logo" style="height: 55px; width: auto; vertical-align: middle;">
          </a>
        </div>
        <div class="lang-switcher" style="display: flex; gap: 10px; align-items: center;">
          <button class="lang-btn" onclick="setLang('tr')" title="Türkçe" style="font-size: 0.84rem; padding: 3px 8px;">TR</button>
          <button class="lang-btn" onclick="setLang('en')" title="English" style="font-size: 0.84rem; padding: 3px 8px;">EN</button>
          <button class="lang-btn arabic-btn" onclick="setLang('ar')" title="العربية" style="font-size: 0.84rem; padding: 3px 8px; display: inline-flex; align-items: center;">
            <img src="${basePath}img/ElArabiye.svg" alt="العربية" class="arabic-btn-icon" style="height: 22px; width: auto;">
          </button>
        </div>
      </div>
      <!-- Standart Ust Ana Navigasyon Menusu -->
      <nav class="site-subnav" style="text-align: center; margin: 0.5rem 0 1.25rem 0; font-size: 0.88rem; font-weight: 600;">
        <a href="${basePath}index.html" style="${getLinkStyle('index', false)}"><span class="lang-tr">Ana Sayfa</span><span class="lang-en">Home</span><span class="lang-ar">الرئيسية</span></a> |
        <a href="${basePath}blog/blog.html?type=bizce" style="${getLinkStyle('bizce', false)}"><span class="lang-tr">Bizce</span><span class="lang-en">Bizce</span><span class="lang-ar">بيزجه</span></a> |
        <a href="${basePath}blog/blog.html?type=anilts" style="${getLinkStyle('anilts', false)}"><span class="lang-tr">Anıltılar</span><span class="lang-en">Anıltılar</span><span class="lang-ar">Anıltılar</span></a> |
        <a href="${basePath}index.html#apps" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Uygulamalarımız</span><span class="lang-en">Our Apps</span><span class="lang-ar">تطبيقاتنا</span></a> |
        <a href="${basePath}about.html" style="${getLinkStyle('about', false)}"><span class="lang-tr">Hakkımızda</span><span class="lang-en">About Us</span><span class="lang-ar">عن الشركة</span></a> |
        <a href="${basePath}destek.html" style="${getLinkStyle('destek', false)}"><span class="lang-tr">Destek &amp; Talep</span><span class="lang-en">Support &amp; Feedback</span><span class="lang-ar">الدعم والطلبات</span></a> |
        <a href="${basePath}contact.html" style="${getLinkStyle('contact', false)}"><span class="lang-tr">İletişim</span><span class="lang-en">Contact</span><span class="lang-ar">اتصل بنا</span></a>
      </nav>
    `;

    headerEl.innerHTML = headerHTML;
  }

  // 3. Build 2-Row Footer HTML
  function renderFooter() {
    var footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    var footerHTML = `
      <div class="footer-links-row1" style="margin-bottom: 0.4rem; font-weight: 600;">
        <a href="${basePath}index.html" style="${getLinkStyle('index', false)}"><span class="lang-tr">Ana Sayfa</span><span class="lang-en">Home</span><span class="lang-ar">الرئيسية</span></a> |
        <a href="${basePath}blog/blog.html?type=bizce" style="${getLinkStyle('bizce', false)}"><span class="lang-tr">Bizce</span><span class="lang-en">Bizce</span><span class="lang-ar">بيزجه</span></a> |
        <a href="${basePath}blog/blog.html?type=anilts" style="${getLinkStyle('anilts', false)}"><span class="lang-tr">Anıltılar</span><span class="lang-en">Anıltılar</span><span class="lang-ar">Anıltılar</span></a> |
        <a href="${basePath}index.html#apps" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Uygulamalarımız</span><span class="lang-en">Our Apps</span><span class="lang-ar">تطبيقاتنا</span></a> |
        <a href="${basePath}about.html" style="${getLinkStyle('about', false)}"><span class="lang-tr">Hakkımızda</span><span class="lang-en">About Us</span><span class="lang-ar">عن الشركة</span></a> |
        <a href="${basePath}who-we-are.html" style="${getLinkStyle('who-we-are', false)}"><span class="lang-tr">Biz Kimiz</span><span class="lang-en">Who We Are</span><span class="lang-ar">من نحن</span></a> |
        <a href="${basePath}contact.html" style="${getLinkStyle('contact', false)}"><span class="lang-tr">İletişim</span><span class="lang-en">Contact</span><span class="lang-ar">اتصل بنا</span></a>
      </div>
      <div class="footer-links-row2" style="margin-bottom: 0.75rem; font-weight: 500; font-size: 0.8rem;">
        <a href="${basePath}destek.html" style="${getLinkStyle('destek', true)}"><span class="lang-tr">Destek &amp; Talep</span><span class="lang-en">Support &amp; Feedback</span><span class="lang-ar">الدعم والطلبات</span></a> |
        <a href="${basePath}faq.html" style="${getLinkStyle('faq', true)}"><span class="lang-tr">SSS</span><span class="lang-en">FAQ</span><span class="lang-ar">الأسئلة الشائعة</span></a> |
        <a href="${basePath}privacy.html" style="${getLinkStyle('privacy', true)}"><span class="lang-tr">Gizlilik Politikası</span><span class="lang-en">Privacy Policy</span><span class="lang-ar">سياسة الخصوصية</span></a> |
        <a href="${basePath}terms.html" style="${getLinkStyle('terms', true)}"><span class="lang-tr">Kullanım Koşulları</span><span class="lang-en">Terms of Service</span><span class="lang-ar">شروط الخدمة</span></a>
      </div>
      <p class="copyright-line" style="margin: 0; font-size: 0.85rem; color: #64748b;">© 2026 MSK Labs. Tüm hakları saklıdır.</p>
    `;

    footerEl.innerHTML = footerHTML;
    footerEl.style.textAlign = 'center';
    footerEl.style.padding = '1.5rem 1rem';
    footerEl.style.borderTop = '1px solid #cbd5e1';
    footerEl.style.marginTop = '2.5rem';
  }

  // Auto-execute layout injection on DOMReady
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderHeader();
      renderFooter();
    });
  } else {
    renderHeader();
    renderFooter();
  }
})();
