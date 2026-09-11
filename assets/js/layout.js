/**
 * MSK Labs - Layout & 2-Row Footer Component Module
 * 
 * Policy:
 * 1. Tip 1 (Static Core Pages): Preserves the original HTML headers and layout containers 100%.
 *    Injects only the 2-Row Footer into <footer class="site-footer">.
 * 2. Tip 2 (Dynamic Template Pages): Shared layout components for app showcase and blog templates.
 * 3. Active Link Highlighting: Pure CSS class toggle (.active-nav-link) on existing navigation anchors without any floating elements.
 */

(function () {
  // Path depth detection
  var pathname = window.location.pathname.replace(/\\/g, '/');
  var isSubfolder = pathname.indexOf('/blog/') !== -1 || pathname.indexOf('/apps/') !== -1;
  var basePath = isSubfolder ? '../' : './';
  var pageName = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';

  // 1. Safe 2-Row Footer Injector
  function renderFooter() {
    var footerEl = document.querySelector('footer.site-footer') || document.getElementById('site-footer');
    if (!footerEl) return;

    function getLinkClass(keyword) {
      if (keyword === 'index' && (pageName === 'index.html' || pageName === '')) return ' active-nav-link';
      if (keyword !== 'index' && pageName.indexOf(keyword) !== -1) return ' active-nav-link';
      return '';
    }

    var footerHTML = `
      <div class="footer-links-row1" style="margin-bottom: 0.4rem; font-weight: 600;">
        <a href="${basePath}index.html" class="${getLinkClass('index')}" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Ana Sayfa</span><span class="lang-en">Home</span><span class="lang-ar">الرئيسية</span></a> |
        <a href="${basePath}blog/blog.html?type=bizce" class="${getLinkClass('bizce')}" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Bizce</span><span class="lang-en">Bizce</span><span class="lang-ar">بيزجه</span></a> |
        <a href="${basePath}blog/blog.html?type=anilts" class="${getLinkClass('anilts')}" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Anıltılar</span><span class="lang-en">Anıltılar</span><span class="lang-ar">Anıltılar</span></a> |
        <a href="${basePath}index.html#apps" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Uygulamalarımız</span><span class="lang-en">Our Apps</span><span class="lang-ar">تطبيقاتنا</span></a> |
        <a href="${basePath}about.html" class="${getLinkClass('about')}" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Hakkımızda</span><span class="lang-en">About Us</span><span class="lang-ar">عن الشركة</span></a> |
        <a href="${basePath}who-we-are.html" class="${getLinkClass('who-we-are')}" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Biz Kimiz</span><span class="lang-en">Who We Are</span><span class="lang-ar">من نحن</span></a> |
        <a href="${basePath}contact.html" class="${getLinkClass('contact')}" style="color: #475569; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">İletişim</span><span class="lang-en">Contact</span><span class="lang-ar">اتصل بنا</span></a>
      </div>
      <div class="footer-links-row2" style="margin-bottom: 0.75rem; font-weight: 500; font-size: 0.8rem;">
        <a href="${basePath}destek.html" class="${getLinkClass('destek')}" style="color: #64748b; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Destek &amp; Talep</span><span class="lang-en">Support &amp; Feedback</span><span class="lang-ar">الدعم والطلبات</span></a> |
        <a href="${basePath}faq.html" class="${getLinkClass('faq')}" style="color: #64748b; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">SSS</span><span class="lang-en">FAQ</span><span class="lang-ar">الأسئلة الشائعة</span></a> |
        <a href="${basePath}privacy.html" class="${getLinkClass('privacy')}" style="color: #64748b; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Gizlilik Politikası</span><span class="lang-en">Privacy Policy</span><span class="lang-ar">سياسة الخصوصية</span></a> |
        <a href="${basePath}terms.html" class="${getLinkClass('terms')}" style="color: #64748b; text-decoration: none; margin: 0 0.35rem;"><span class="lang-tr">Kullanım Koşulları</span><span class="lang-en">Terms of Service</span><span class="lang-ar">شروط الخدمة</span></a>
      </div>
      <p class="copyright-line" style="margin: 0; font-size: 0.85rem; color: #64748b;">
        <span class="lang-tr">© 2026 MSK Labs. Tüm hakları saklıdır.</span>
        <span class="lang-en">© 2026 MSK Labs. All rights reserved.</span>
        <span class="lang-ar">© 2026 MSK Labs. جميع الحقوق محفوظة.</span>
      </p>
    `;

    footerEl.innerHTML = footerHTML;
    footerEl.style.textAlign = 'center';
    footerEl.style.padding = '1.5rem 1rem';
    footerEl.style.borderTop = '1px solid #cbd5e1';
    footerEl.style.marginTop = '2.5rem';
  }

  // 2. Safe Active Link Highlighter (DOM Mutation Only on ClassName)
  function highlightActiveTopNav() {
    var navLinks = document.querySelectorAll('.top-main-nav a, .site-subnav a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      if ((href.indexOf(pageName) !== -1 && pageName !== 'index.html') || (pageName === 'index.html' && href.indexOf('index.html') !== -1)) {
        link.style.fontWeight = '700';
        link.style.color = '#2563eb';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderFooter();
      highlightActiveTopNav();
    });
  } else {
    renderFooter();
    highlightActiveTopNav();
  }
})();
