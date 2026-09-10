/**
 * MSK Labs - Google Apps Script Master Auto-Setup & Ticket Handler
 * Bu kodu Google E-Tablonuzun Uzantılar > Apps Script bölümüne yapıştırın.
 * 
 * Özellikler:
 * 1. 1-Click Setup Menu: "🚀 MSK Labs > Tabloyu Otomatik Kur"
 * 2. 6 Sekmenin Güvenli Kurulumu (Var olan verilere dokunmaz)
 * 3. Telegram Bot Bildirim & Canlı Bilet Handler (doPost)
 * 4. Canlı Duyuru & SSS Serve Handler (doGet)
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 MSK Labs')
    .addItem('⚡ Tabloyu Otomatik Kur / Onar', 'setupDatabase')
    .addToUi();
}

function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const sheets = [
    { name: 'SSS_Listesi', headers: ['App_ID', 'Soru_TR', 'Cevap_TR', 'Soru_EN', 'Cevap_EN', 'Kategori', 'Aktif_Mi'] },
    { name: 'Duyurular', headers: ['App_ID', 'Min_Version', 'Force_Update', 'Baslik_TR', 'Mesaj_TR', 'Buton_URL', 'Aktif_Mi'] },
    { name: 'Destek_Biletleri', headers: ['Tarih', 'Bilet_No', 'App_ID', 'App_Ver', 'Kategori', 'Eposta', 'Mesaj', 'Durum'] },
    { name: 'Sayaclar_ve_Analiz', headers: ['Tarih', 'Tekil_Ziyaretci', 'Sayfa_Goruntuleme', 'HaydiNamaza_Indirme', 'RekatSay_Indirme', 'Emekli_Indirme', 'AdSense_Goruntuleme'] },
    { name: 'Capraz_Promosyon', headers: ['Kaynak_App_ID', 'Onerilen_App_1', 'Onerilen_App_2', 'Onerilen_App_3'] },
    { name: 'Yol_Haritasi_Oylama', headers: ['Feature_ID', 'App_ID', 'Baslik', 'Aciklama', 'Oy_Sayisi'] }
  ];

  sheets.forEach(s => {
    let sheet = ss.getSheetByName(s.name);
    if (!sheet) {
      sheet = ss.insertSheet(s.name);
      sheet.getRange(1, 1, 1, s.headers.length).setValues([s.headers]);
      sheet.getRange(1, 1, 1, s.headers.length).setFontWeight('bold').setBackground('#f1f5f9');
    }
  });

  SpreadsheetApp.getUi().alert('✅ MSK Labs E-Tablo Veritabanı Başarıyla Kuruldu / Kontrol Edildi!');
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Destek_Biletleri');
    
    const ticketNo = 'MSK-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toISOString();
    
    if (sheet) {
      sheet.appendRow([dateStr, ticketNo, data.app || 'web', data.ver || '1.0', data.category || 'Destek', data.email, data.message, 'Açık']);
    }

    // Telegram Bot Notification Ping
    const botToken = PropertiesService.getScriptProperties().getProperty('TELEGRAM_BOT_TOKEN');
    const chatId = PropertiesService.getScriptProperties().getProperty('TELEGRAM_CHAT_ID');

    if (botToken && chatId) {
      const tgMsg = 📩 *YENİ DESTEK BİLETİ*\n\n +
                    🎫 *Bilet No:* \n +
                    📱 *Uygulama:* \n +
                    📧 *E-Posta:* \n +
                    📝 *Mesaj:* ;
      
      UrlFetchApp.fetch(https://api.telegram.org/bot/sendMessage, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({ chat_id: chatId, text: tgMsg, parse_mode: 'Markdown' })
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', ticketNo: ticketNo }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  const appId = e.parameter.app;
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let responseData = { status: 'ok' };

  if (action === 'faq') {
    const sheet = ss.getSheetByName('SSS_Listesi');
    const rows = sheet ? sheet.getDataRange().getValues() : [];
    responseData.items = rows.slice(1).filter(r => !appId || r[0] === appId);
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}