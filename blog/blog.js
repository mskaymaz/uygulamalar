/**
 * MSK Labs - Bizce & Anıltılar Platform Engine
 * Dynamic post rendering, filtering, language switching, and Text-to-Speech (TTS)
 */
var currentLang = 'tr';
var currentSection = 'bizce'; // 'bizce' or 'anilts'
var currentSubFilter = 'all';
var currentPost = null;
var synth = window.speechSynthesis;
var currentUtterance = null;

var blogPostsData = [
  {
    "id": 1,
    "type": "bizce",
    "category": "Teknoloji & İnsanlık",
    "category_en": "Tech & Humanity",
    "category_ar": "التكنولوجيا والإنسانية",
    "date": "10 Eylül 2026",
    "readTime": "3 dk okuma",
    "icon": "🤖",
    "tr": {
      "title": "MAKALE 1: Yapay Zeka Çağında İnsani Değerler",
      "summary": "Teknolojinin sunduğu kolaylıklar ile insanın ahlaki sorumlulukları arasındaki dengeyi nasıl kuracağımıza dair inceleme.",
      "content": "<p>Günümüz dünyası, tarih boyunca görülmemiş bir teknolojik dönüşümün içerisinden geçiyor. Yapay zeka algoritmaları ve otomatik sistemler gündelik hayatımızın her alanını şekillendiriyor. Ancak bu hızlı gelişim beraberinde temel bir soruyu getiriyor: Teknoloji ilerlerken insani değerlerimizi nasıl koruyacağız? Geliştirdiğimiz yazılımlar sadece birer araçtır. Amaç insanın yaşam kalitesini artırmak ve faydalı işler üretmektir.</p>"
    },
    "en": {
      "title": "ARTICLE 1: Human Values in the Age of AI",
      "summary": "An essay on how to balance technological convenience with human moral responsibilities.",
      "content": "<p>Today's world is experiencing an unprecedented technological transformation. Artificial intelligence algorithms and automated systems shape every aspect of our daily lives. However, this rapid progress brings a fundamental question: As technology advances, how do we preserve our human values?</p>"
    },
    "ar": {
      "title": "المقال 1: القيم الإنسانية في عصر الذكاء الاصطناعي",
      "summary": "نص نموذجي حول كيفية إحداث التوازن بين التسهيلات التكنولوجية والمسؤوليات الأخلاقية.",
      "content": "<p>يمر عالمنا اليوم بتحول تكنولوجي غير مسبوق في التاريخ. تشكل خوارزميات الذكاء الاصطناعي والأنظمة المستقلة كل جانب من جوانب حياتنا اليومية.</p>"
    }
  },
  {
    "id": 2,
    "type": "bizce",
    "category": "Sosyal Yaşam & Gelecek",
    "category_en": "Social Life & Future",
    "category_ar": "الحياة الاجتماعية والمستقبل",
    "date": "08 Eylül 2026",
    "readTime": "4 dk okuma",
    "icon": "🧠",
    "tr": {
      "title": "MAKALE 2: Dijital Gürültü ve Zihinsel Odaklanma",
      "summary": "Sürekli bildirimlerin olduğu bir çağda zihinsel berraklığı yeniden kazanmanın yolları üzerine çalışma.",
      "content": "<p>Her gün binlerce dijital uyarıcı zihnimizi bölüyor. Odaklanma süresinin kısaldığı günümüzde, derinlemesine düşünmek ve kaliteli iş üretmek bir sanata dönüştü. Teknoloji hayatımızı kolaylaştırırken zihinsel yükümüzü de artırıyor.</p>"
    },
    "en": {
      "title": "ARTICLE 2: Digital Noise and Mental Focus",
      "summary": "A study on ways to reclaim mental clarity in an era of constant notifications.",
      "content": "<p>Every day, thousands of digital stimuli fragment our attention. In an age where attention spans are shrinking, deep thinking and producing quality work have become a fine art.</p>"
    },
    "ar": {
      "title": "المقال 2: الضوضاء الرقمية والتركيز الذهني",
      "summary": "مقال حول سبل استعادة الصفاء الذهني في عصر التنبيهات المستمرة.",
      "content": "<p>في كل يوم، تتسبب آلاف المنبهات الرقمية وتنبيهات البريد الإلكتروني في تشتيت أذهاننا.</p>"
    }
  },
  {
    "id": 3,
    "type": "bizce",
    "category": "Yazılım & Verimlilik",
    "category_en": "Software & Productivity",
    "category_ar": "البرمجيات والإنتاجية",
    "date": "05 Eylül 2026",
    "readTime": "5 dk okuma",
    "icon": "🖥️",
    "tr": {
      "title": "MAKALE 3: Sade Yaşam ve Minimalist Çalışma Düzeni",
      "summary": "Masaüstünüzdeki karmaşayı azaltarak verimliliği artırma felsefesi.",
      "content": "<p>Göz önündeki karmaşa, zihindeki karmaşayı tetikler. Bilgisayar masaüstümüzde biriken onlarca simge aslında zihinsel enerjimizi tüketir. Sadelik bir tercih değil, kaliteli bir yaşamın gerekliliğidir.</p>"
    },
    "en": {
      "title": "ARTICLE 3: Simple Living and Minimalist Workflow",
      "summary": "The philosophy of increasing productivity by reducing desktop clutter.",
      "content": "<p>Visual clutter triggers mental clutter. Dozens of icons accumulated on our computer desktops drain our mental energy.</p>"
    },
    "ar": {
      "title": "المقال 3: الحياة البسيطة وتنظيم العمل الأدنى",
      "summary": "مقال حول فلسفة زيادة الإنتاجية من خلال تقليل الفوضى.",
      "content": "<p>الفوضى البصرية تثير الفوضى الذهنية. العشرات من الأيقونات المتراكمة تستهلك طاقتنا الذهنية.</p>"
    }
  },
  {
    "id": 4,
    "type": "anilts",
    "category": "Yaşanmış Anı",
    "category_en": "Real Memoir",
    "category_ar": "ذكريات واقعية",
    "date": "11 Eylül 2026",
    "readTime": "6 dk okuma",
    "icon": "📖",
    "tr": {
      "title": "ANILTILAR 1: İsimsiz Bir Nezaket ve Unutulmayan Ders",
      "summary": "Gerçek isimler verilmeden kaleme alınmış, yoğun bir çalışma gününde yaşanan ve hayata bakışı değiştiren samimi bir tecrübe hikayesi.",
      "content": "<p>Yıllar önce yoğun bir projenin tam ortasındayken, beklenmedik bir aksaklıkla karşılaştık. Herkesin stresli olduğu o anlarda, kurumdaki sessiz bir çalışan hiç yükümlülüğü olmadığı halde yanımıza gelip tek bir soru sordu: 'Nasıl yardımcı olabilirim?'</p><p>O gün bize gösterilen o karşılıksız destek, unvanların ve hiyerarşinin ötesinde insani dayanışmanın ne kadar kıymetli olduğunu öğretti. Gerçek liderlik ve ahlak, kimsenin görmediği anlarda gösterilen karşılıksız nezakette saklıdır.</p>"
    },
    "en": {
      "title": "ANILTILAR 1: An Anonymous Act of Kindness & Unforgettable Lesson",
      "summary": "A sincere memoir story written anonymously, reflecting a life-changing experience on a hectic work day.",
      "content": "<p>Years ago, right in the middle of an intense project, we encountered an unexpected breakdown. At a moment when everyone was stressed, a quiet colleague walked up to us with a single question: 'How can I help?'</p>"
    },
    "ar": {
      "title": "ANILTILAR 1: موقف إنساني ودرس لا يُنسى",
      "summary": "قصة واقيعة مجهولة الأسماء تعكس تجربة إنسانية غيرت وجهة نظرنا في الحياة.",
      "content": "<p>قبل سنوات، وفي منتصف مشروع مكثف، واجهنا عقبة غير متوقعة. في لحظة كان فيها الجميع متوتراً، تقدم زميل هادئ بسؤال واحد: 'كيف يمكنني المساعدة؟'</p>"
    }
  },
  {
    "id": 5,
    "type": "bizce",
    "category": "Teknoloji & İnsanlık",
    "category_en": "Tech & Humanity",
    "category_ar": "التكنولوجيا والإنسانية",
    "date": "04 Eylül 2026",
    "readTime": "4 dk okuma",
    "icon": "⚡",
    "tr": {
      "title": "MAKALE 4: Geleceğin Yazılım Mimarileri",
      "summary": "Modüler ve ölçeklenebilir sistem tasarımlarında dikkat edilmesi gereken temel prensipler.",
      "content": "<p>Yazılım geliştirmede sürdürülebilirlik en önemli kriterdir.</p>"
    },
    "en": {
      "title": "ARTICLE 4: Future Software Architectures",
      "summary": "Core principles in building modular and scalable systems.",
      "content": "<p>Sustainability is key in modern software engineering.</p>"
    },
    "ar": {
      "title": "المقال 4: معماريات البرمجيات المستقبلية",
      "summary": "المبادئ الأساسية لبناء أنظمة قابلة للتوسع.",
      "content": "<p>الاستدامة هي المفتاح في هندسة البرمجيات الحديثة.</p>"
    }
  },
  {
    "id": 6,
    "type": "bizce",
    "category": "Düşünce & Fikir",
    "category_en": "Thought & Idea",
    "category_ar": "الفكر والأفكار",
    "date": "01 Eylül 2026",
    "readTime": "3 dk okuma",
    "icon": "🌱",
    "tr": {
      "title": "MAKALE 5: Sürekli Öğrenme ve Gelişim Kültürü",
      "summary": "Teknoloji dünyasında güncel kalmanın ve kişisel gelişimin sürdürülebilir yolları.",
      "content": "<p>Öğrenmek ömür boyu devam eden bir yolculuktur.</p>"
    },
    "en": {
      "title": "ARTICLE 5: Culture of Continuous Learning",
      "summary": "Sustainable approaches to personal growth in tech.",
      "content": "<p>Learning is a lifelong journey.</p>"
    },
    "ar": {
      "title": "المقال 5: ثقافة التعلم المستمر",
      "summary": "نهج مستدام للنمو الشخصي في التكنولوجيا.",
      "content": "<p>التعلم رحلة مدى الحياة.</p>"
    }
  }
];

function switchSection(sec) {
  currentSection = sec;
  currentSubFilter = 'all';

  var btnBizce = document.getElementById('tabBizce');
  var btnAnilts = document.getElementById('tabAnilts');

  if (sec === 'anilts') {
    if (btnBizce) btnBizce.className = 'section-tab-btn';
    if (btnAnilts) btnAnilts.className = 'section-tab-btn active-anilts';
    var mainTitle = document.getElementById('headerMainTitle');
    var subSlogan = document.getElementById('subSlogan');
    if (mainTitle) mainTitle.innerText = '📖 ANILTILAR';
    if (subSlogan) subSlogan.innerText = (currentLang === 'ar' ? 'قصص وحكايات واقعية وتجارب إنسانية' : (currentLang === 'en' ? 'Real-life Memoirs & Inspiring Life Stories' : 'Yaşanmış Tecrübeler, Hayat Dersleri ve İz Bırakan Anılar'));
  } else {
    if (btnBizce) btnBizce.className = 'section-tab-btn active-bizce';
    if (btnAnilts) btnAnilts.className = 'section-tab-btn';
    var mainTitle = document.getElementById('headerMainTitle');
    var subSlogan = document.getElementById('subSlogan');
    if (mainTitle) mainTitle.innerText = '✍️ BİZCE';
    if (subSlogan) subSlogan.innerText = (currentLang === 'ar' ? 'نظرة عميقة على التكنولوجيا والحياة' : (currentLang === 'en' ? 'A Deep Perspective on Tech, Life & Humanity' : 'Teknolojiye, Hayata ve İnsanlığa Derin Bakış'));
  }

  renderSubCategories();
  renderPosts();
}

function renderSubCategories() {
  var pillsContainer = document.getElementById('subCategoryPills');
  if (!pillsContainer) return;

  if (currentSection === 'anilts') {
    pillsContainer.innerHTML = 
      '<button class="cat-pill ' + (currentSubFilter === 'all' ? 'active' : '') + '" onclick="setSubFilter(\'all\')">🌟 Tüm Anıltılar</button>' +
      '<button class="cat-pill ' + (currentSubFilter === 'life' ? 'active' : '') + '" onclick="setSubFilter(\'life\')">🌿 Hayat Dersleri</button>' +
      '<button class="cat-pill ' + (currentSubFilter === 'work' ? 'active' : '') + '" onclick="setSubFilter(\'work\')">🤝 Çalışma Hayatı</button>';
  } else {
    pillsContainer.innerHTML = 
      '<button class="cat-pill ' + (currentSubFilter === 'all' ? 'active' : '') + '" onclick="setSubFilter(\'all\')">🌟 Tüm Bizce Yazıları</button>' +
      '<button class="cat-pill ' + (currentSubFilter === 'tech' ? 'active' : '') + '" onclick="setSubFilter(\'tech\')">💻 Teknoloji</button>' +
      '<button class="cat-pill ' + (currentSubFilter === 'thought' ? 'active' : '') + '" onclick="setSubFilter(\'thought\')">🧠 Düşünce & Fikir</button>';
  }
}

function setSubFilter(sub) {
  currentSubFilter = sub;
  renderSubCategories();
  renderPosts();
}

function setLang(lang) {
  currentLang = lang;
  var btns = document.querySelectorAll('.lang-switcher button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  
  var activeBtn = document.querySelector('.lang-switcher button[data-lang="' + lang + '"]');
  if (activeBtn) activeBtn.classList.add('active');

  if (lang === 'ar') {
    document.body.setAttribute('dir', 'rtl');
    var lbl = document.getElementById('lblBack');
    if (lbl) lbl.innerText = 'العودة إلى القائمة';
  } else if (lang === 'en') {
    document.body.removeAttribute('dir');
    var lbl = document.getElementById('lblBack');
    if (lbl) lbl.innerText = 'Back to List';
  } else {
    document.body.removeAttribute('dir');
    var lbl = document.getElementById('lblBack');
    if (lbl) lbl.innerText = 'Listeye Dön';
  }

  switchSection(currentSection);
}

function renderPosts() {
  var grid = document.getElementById('postsGrid');
  var listSection = document.getElementById('postsListSection');
  var listContainer = document.getElementById('postsListContainer');
  var listTitle = document.getElementById('listSectionTitle');

  if (!grid) return;
  grid.innerHTML = '';
  if (listContainer) listContainer.innerHTML = '';

  // KESİN AYRIŞTIRMA: Sadece geçerli section ('bizce' veya 'anilts') filtrelenir!
  var filtered = blogPostsData.filter(function(p) {
    return p.type === currentSection;
  });

  var featuredPosts = filtered.slice(0, 4);
  var remainingPosts = filtered.slice(4);

  // 1. İLK 4 ÖNE ÇIKAN KART
  for (var i = 0; i < featuredPosts.length; i++) {
    var post = featuredPosts[i];
    var langData = post[currentLang] || post['tr'];
    var category = post['category_' + currentLang] || post.category;
    var isAnilts = (post.type === 'anilts');

    var card = document.createElement('div');
    card.className = 'post-card';
    card.setAttribute('data-id', post.id);
    card.onclick = (function(pId) {
      return function() { openPost(pId); };
    })(post.id);

    var btnText = (currentLang === 'ar' ? 'اقرأ المزيد ←' : (currentLang === 'en' ? 'Read Story →' : 'Devamını Oku →'));
    var ttsText = (currentLang === 'ar' ? 'استماع' : (currentLang === 'en' ? 'Listen' : 'Sesli Dinle'));

    var imgClass = 'card-img-placeholder' + (isAnilts ? ' card-img-anilts' : '');
    var tagClass = 'post-tag' + (isAnilts ? ' post-tag-anilts' : '');
    var readMoreClass = 'read-more-btn' + (isAnilts ? ' read-more-anilts' : '');

    card.innerHTML = '<div class="' + imgClass + '">' + (post.icon || '📝') + '</div>' +
      '<div class="card-body">' +
        '<div>' +
          '<div class="post-meta">' +
            '<span class="' + tagClass + '">' + category + '</span>' +
            '<span>' + post.readTime + '</span>' +
          '</div>' +
          '<h2 class="post-title">' + langData.title + '</h2>' +
          '<p class="post-excerpt">' + langData.summary + '</p>' +
        '</div>' +
        '<div class="card-actions">' +
          '<span class="' + readMoreClass + '">' + btnText + '</span>' +
          '<span class="card-tts-badge">🔊 ' + ttsText + '</span>' +
        '</div>' +
      '</div>';
    grid.appendChild(card);
  }

  // 2. 4'TEN SONRAKİ YAZILAR İÇİN KOMPAKT LİSTE
  if (remainingPosts.length > 0 && listSection && listContainer) {
    listSection.style.display = 'block';
    if (listTitle) {
      listTitle.innerText = (currentLang === 'ar' ? '📋 مقالات أخرى' : (currentLang === 'en' ? '📋 Other Articles' : '📋 Diğer Tüm Yazılar'));
    }

    for (var j = 0; j < remainingPosts.length; j++) {
      var rPost = remainingPosts[j];
      var rLangData = rPost[currentLang] || rPost['tr'];
      var rCategory = rPost['category_' + currentLang] || rPost.category;
      var rIsAnilts = (rPost.type === 'anilts');

      var listItem = document.createElement('div');
      listItem.className = 'post-list-item';
      listItem.setAttribute('data-id', rPost.id);
      listItem.onclick = (function(pId) {
        return function() { openPost(pId); };
      })(rPost.id);

      var iconClass = 'list-item-icon' + (rIsAnilts ? ' anilts-icon' : '');
      var rTagClass = 'post-tag' + (rIsAnilts ? ' post-tag-anilts' : '');

      listItem.innerHTML = '<div class="' + iconClass + '">' + (rPost.icon || '📝') + '</div>' +
        '<div class="list-item-content">' +
          '<h4 class="list-item-title">' + rLangData.title + '</h4>' +
          '<div class="list-item-meta">' +
            '<span class="' + rTagClass + '">' + rCategory + '</span>' +
            '<span>📅 ' + rPost.date + '</span>' +
            '<span>⏱️ ' + rPost.readTime + '</span>' +
          '</div>' +
        '</div>';

      listContainer.appendChild(listItem);
    }
  } else if (listSection) {
    listSection.style.display = 'none';
  }
}

function openPost(id) {
  stopTTS();
  currentPost = blogPostsData.find(function(p) { return p.id === id; });
  if (!currentPost) return;

  var langData = currentPost[currentLang] || currentPost['tr'];
  var category = currentPost['category_' + currentLang] || currentPost.category;

  var elCategory = document.getElementById('readCategory');
  var elTitle = document.getElementById('readTitle');
  var elDate = document.getElementById('readDate');
  var elTime = document.getElementById('readTime');
  var elContent = document.getElementById('readContent');

  if (elCategory) elCategory.innerText = category;
  if (elTitle) elTitle.innerText = langData.title;
  if (elDate) elDate.innerText = currentPost.date;
  if (elTime) elTime.innerText = '⏱️ ' + currentPost.readTime;
  if (elContent) elContent.innerHTML = langData.content;

  var listView = document.getElementById('listView');
  var readerView = document.getElementById('readerView');
  if (listView) listView.style.display = 'none';
  if (readerView) readerView.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showList() {
  stopTTS();
  currentPost = null;
  var readerView = document.getElementById('readerView');
  var listView = document.getElementById('listView');
  if (readerView) readerView.style.display = 'none';
  if (listView) listView.style.display = 'block';
  renderPosts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function playTTS() {
  if (!synth) return alert("Tarayıcınız sesli okuma özelliğini desteklemiyor.");
  if (synth.speaking && synth.paused) {
    synth.resume();
    var wave = document.getElementById('audioWave');
    if (wave) wave.style.display = 'inline-flex';
    return;
  }

  synth.cancel();

  var readContent = document.getElementById('readContent');
  var articleText = readContent ? readContent.innerText : '';
  currentUtterance = new SpeechSynthesisUtterance(articleText);

  if (currentLang === 'tr') currentUtterance.lang = 'tr-TR';
  else if (currentLang === 'en') currentUtterance.lang = 'en-US';
  else if (currentLang === 'ar') currentUtterance.lang = 'ar-SA';

  var speedEl = document.getElementById('voiceSpeed');
  var speed = parseFloat(speedEl ? speedEl.value : '1.0');
  currentUtterance.rate = speed;

  var voices = synth.getVoices();
  var genderEl = document.getElementById('voiceGender');
  var genderPref = genderEl ? genderEl.value : 'male';
  
  var matchedVoice = voices.find(function(v) {
    return v.lang.startsWith(currentUtterance.lang.slice(0, 2)) && 
    (genderPref === 'female' ? (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Yelda')) : (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Tolga')));
  });
  
  if (!matchedVoice) {
    matchedVoice = voices.find(function(v) { return v.lang.startsWith(currentUtterance.lang.slice(0, 2)); });
  }
  if (matchedVoice) currentUtterance.voice = matchedVoice;

  currentUtterance.onstart = function() {
    var wave = document.getElementById('audioWave');
    if (wave) wave.style.display = 'inline-flex';
  };
  currentUtterance.onend = function() {
    var wave = document.getElementById('audioWave');
    if (wave) wave.style.display = 'none';
  };

  synth.speak(currentUtterance);
}

function pauseTTS() {
  if (synth && synth.speaking) {
    synth.pause();
    var wave = document.getElementById('audioWave');
    if (wave) wave.style.display = 'none';
  }
}

function stopTTS() {
  if (synth) {
    synth.cancel();
    var wave = document.getElementById('audioWave');
    if (wave) wave.style.display = 'none';
  }
}

function restartTTSIfPlaying() {
  if (synth && synth.speaking) {
    playTTS();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('cat') === 'anilts' || params.get('type') === 'anilts') {
    switchSection('anilts');
  } else {
    switchSection('bizce');
  }
});
