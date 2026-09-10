/**
 * MSK Labs - Lightweight Live Web Analytics & Event Tracker
 * Sitedeki her sayfa gösterimini ve buton tıklamalarını canlı kaydeder.
 * Non-blocking 1KB client tracking engine.
 */
(function() {
  const STORAGE_KEY = 'msklabs_analytics_v1';
  
  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function getStats() {
    let data = {};
    try {
      data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) {}
    return data;
  }

  function saveStats(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch(e) {}
  }

  function trackPageView() {
    const data = getStats();
    const today = getTodayKey();
    if (!data[today]) {
      data[today] = { views: 0, unique: 0, downloads: 0, tickets: 0, apps: {} };
    }
    
    data[today].views = (data[today].views || 0) + 1;

    // Track unique session
    if (!sessionStorage.getItem('msklabs_session_tracked')) {
      data[today].unique = (data[today].unique || 0) + 1;
      sessionStorage.setItem('msklabs_session_tracked', '1');
    }

    saveStats(data);
  }

  function trackEvent(eventName, appId) {
    const data = getStats();
    const today = getTodayKey();
    if (!data[today]) {
      data[today] = { views: 0, unique: 0, downloads: 0, tickets: 0, apps: {} };
    }

    if (eventName === 'download') {
      data[today].downloads = (data[today].downloads || 0) + 1;
      if (appId) {
        data[today].apps[appId] = (data[today].apps[appId] || 0) + 1;
      }
    } else if (eventName === 'ticket') {
      data[today].tickets = (data[today].tickets || 0) + 1;
    }

    saveStats(data);

    // Asynchronously ping backend API if configured
    if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.googleSheetApiUrl && !SITE_CONFIG.googleSheetApiUrl.includes('placeholder')) {
      try {
        fetch(SITE_CONFIG.googleSheetApiUrl + '?action=track&event=' + encodeURIComponent(eventName) + '&app=' + encodeURIComponent(appId || 'web'), { mode: 'no-cors' });
      } catch(e) {}
    }
  }

  // Expose global object
  window.MSK_Analytics = {
    trackPageView: trackPageView,
    trackEvent: trackEvent,
    getStats: getStats
  };

  // Auto-run page view track
  trackPageView();
})();