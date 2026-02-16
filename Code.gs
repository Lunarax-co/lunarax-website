const SHEET_ID = "1lP07xoixtKupVTmf3zoA0PD3GlpgpLYAVUHw0DWQ77E";
const SHEET_NAME = "Form Yanıtları 1";
const ADMIN_EMAIL = "info@hilunarax.co";

// ========== CORS HELPER ==========
function corsify(output) {
  return output
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ========== GET (Health Check) ==========
function doGet() {
  try {
    return corsify(ContentService.createTextOutput(JSON.stringify({ ok: true, message: "Apps Script Web App aktif" }))
      .setMimeType(ContentService.MimeType.JSON));
  } catch (err) {
    return corsify(ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON));
  }
}

// ========== OPTIONS (Preflight) ==========
function doOptions() {
  return corsify(ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON));
}

// ========== DATA PARSING ==========
function parseIncomingData(e) {
  const post = (e && e.postData) ? e.postData : null;
  const raw = post && typeof post.contents === "string" ? post.contents : "";
  const ct = post && post.type ? String(post.type) : "";
  Logger.log("RAW_POST: " + (raw || "(empty)"));

  let parsed = {};
  if (ct && ct.indexOf("application/json") >= 0) {
    try {
      parsed = JSON.parse(raw || "{}") || {};
    } catch (err) {
      Logger.log("JSON_PARSE_ERROR: " + err);
      parsed = {};
    }
  }

  const p = (e && e.parameter) ? e.parameter : {};
  const ps = (e && e.parameters) ? e.parameters : {};

  const parseArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      try {
        const maybeJson = JSON.parse(val);
        if (Array.isArray(maybeJson)) return maybeJson;
      } catch (err) {}
      if (val.includes("||")) return val.split("||").map(s => s.trim()).filter(Boolean);
      if (val.includes(",")) return val.split(",").map(s => s.trim()).filter(Boolean);
      return [val].filter(Boolean);
    }
    return [];
  };

  const pick = (k, alt) => {
    if (parsed[k] !== undefined && parsed[k] !== null) return parsed[k];
    if (parsed[alt] !== undefined && parsed[alt] !== null) return parsed[alt];
    if (p[k] !== undefined && p[k] !== null) return p[k];
    if (p[alt] !== undefined && p[alt] !== null) return p[alt];
    return "";
  };

  const data = {
    serviceType: pick("serviceType", "hizmetTipi"), // Yeni alan eklendi
    companyName: pick("companyName", "firmaAdi"),
    contactName: pick("contactName", "yetkiliKisi"),
    phone: pick("phone", "telefon"),
    email: pick("email", "eposta"),
    companyType: pick("companyType", "firmaTuru"),
    sector: pick("sector", "sektor"),
    ledgerType: pick("ledgerType", "defterTuru"),
    bookType: pick("bookType", "defterTuru"), // Ön muhasebede bookType kullanılıyor
    invoiceCount: pick("invoiceCount", "aylikFatura"),
    employeeCount: pick("employeeCount", "ekipSayisi"),
    hasMultipleBranches: pick("hasMultipleBranches", "cokluSube"),
    challenges: parseArray(pick("challenges", "zorlanilanKonular")),
    expectations: parseArray(pick("expectations", "lunaraxBeklenti")),
    documentMethod: pick("documentMethod", "belgeIletim"),
    additionalNotes: pick("additionalNotes", "notlar"),
    // Diğer servisler için alanlar
    incorporationType: pick("incorporationType", "kurulusTipi"),
    operationNeeds: parseArray(pick("operationNeeds", "operasyonIhtiyaci")),
    incentiveTargets: parseArray(pick("incentiveTargets", "tesvikHedef")),
    legalConcerns: parseArray(pick("legalConcerns", "hukukiEndise")),
    legalPriority: pick("legalPriority", "hukukiOncelik"),
    addressType: pick("addressType", "adresTipi"),
    operationModel: parseArray(pick("operationModel", "operasyonModel")),
    timestamp: pick("timestamp", "zamanDamgasi")
  };

  Logger.log("PARSED_DATA: " + JSON.stringify(data));
  return data;
}

// ========== SHEET HEADER ENSURE ==========
function ensureHeaderRow(sheet, serviceType) {
  let headers = [];
  
  // Servis tipine göre header belirle
  switch(serviceType) {
    case 'on-muhasebe':
      headers = [
        "Zaman Damgası",
        "Firma Adı",
        "Yetkili Kişi (Ad Soyad)",
        "Telefon",
        "E-posta",
        "Firma Türü",
        "Sektör",
        "Defter Türü",
        "Aylık Fatura",
        "Ekip Sayısı",
        "Çoklu Şube",
        "Zorlanılan Konular",
        "Lunarax'tan Beklenti",
        "Belge İletim Yolu",
        "Ek Not"
      ];
      break;
    case 'kurulus':
      headers = [
        "Zaman Damgası",
        "Yetkili Kişi",
        "Telefon",
        "E-posta",
        "Kuruluş Tipi",
        "Operasyon İhtiyaçları",
        "Ek Not"
      ];
      break;
    case 'tesvik':
      headers = [
        "Zaman Damgası",
        "Yetkili Kişi",
        "Telefon",
        "E-posta",
        "Sektör",
        "Teşvik Hedefleri",
        "Ek Not"
      ];
      break;
    case 'hukuk':
      headers = [
        "Zaman Damgası",
        "Yetkili Kişi",
        "Telefon",
        "E-posta",
        "Hukuki Endişeler",
        "Öncelik",
        "Ek Not"
      ];
      break;
    case 'adres':
      headers = [
        "Zaman Damgası",
        "Yetkili Kişi",
        "Telefon",
        "E-posta",
        "Adres Tipi",
        "Operasyon Modeli",
        "Ek Not"
      ];
      break;
    default:
      headers = [
        "Zaman Damgası",
        "Firma Adı",
        "Yetkili Kişi (Ad Soyad)",
        "Telefon",
        "E-posta",
        "Firma Türü",
        "Sektör",
        "Defter Türü",
        "Aylık Fatura",
        "Zorlanılan Konular",
        "Lunarax'tan Beklenti",
        "Belge İletim Yolu",
        "Ek Not"
      ];
  }
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const looksEmpty = firstRow.every(v => String(v || "").trim() === "");
  if (looksEmpty) sheet.getRange(1,1,1,headers.length).setValues([headers]);
}

// ========== POST (Form Submission) ==========
function doPost(e) {
  let mailSentToAdmin = false;
  let mailSentToUser = false;
  let mailErrors = [];

  try {
    const data = parseIncomingData(e);
    const serviceType = data.serviceType || 'genel';

    if (!data.phone) {
      return corsify(ContentService.createTextOutput(JSON.stringify({
        ok: false,
        mailSentToAdmin,
        mailSentToUser,
        error: "Telefon numarası gereklidir."
      })).setMimeType(ContentService.MimeType.JSON));
    }

    // Servis tipine göre sheet adı belirle
    let sheetName;
    switch(serviceType) {
      case 'on-muhasebe':
        sheetName = 'Ön Muhasebe';
        break;
      case 'kurulus':
        sheetName = 'Şirket Kuruluşu';
        break;
      case 'tesvik':
        sheetName = 'Teşvik ve Destekler';
        break;
      case 'hukuk':
        sheetName = 'Hukuki Danışmanlık';
        break;
      case 'adres':
        sheetName = 'Adres Optimizasyonu';
        break;
      default:
        sheetName = SHEET_NAME; // Genel form için eski sheet
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(sheetName);
    
    // Eğer sheet yoksa oluştur
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    ensureHeaderRow(sheet, serviceType);

    // Servis tipine göre satır oluştur
    let row = [];
    switch(serviceType) {
      case 'on-muhasebe':
        row = [
          new Date(),
          data.companyName,
          data.contactName,
          data.phone,
          data.email,
          data.companyType,
          data.sector,
          data.bookType || data.ledgerType,
          data.invoiceCount,
          data.employeeCount,
          data.hasMultipleBranches,
          (data.challenges || []).join(", "),
          (data.expectations || []).join(", "),
          data.documentMethod,
          data.additionalNotes
        ];
        break;
      case 'kurulus':
        row = [
          new Date(),
          data.contactName,
          data.phone,
          data.email,
          data.incorporationType,
          (data.operationNeeds || []).join(", "),
          data.additionalNotes
        ];
        break;
      case 'tesvik':
        row = [
          new Date(),
          data.contactName,
          data.phone,
          data.email,
          data.sector,
          (data.incentiveTargets || []).join(", "),
          data.additionalNotes
        ];
        break;
      case 'hukuk':
        row = [
          new Date(),
          data.contactName,
          data.phone,
          data.email,
          (data.legalConcerns || []).join(", "),
          data.legalPriority,
          data.additionalNotes
        ];
        break;
      case 'adres':
        row = [
          new Date(),
          data.contactName,
          data.phone,
          data.email,
          data.addressType,
          (data.operationModel || []).join(", "),
          data.additionalNotes
        ];
        break;
      default:
        row = [
          new Date(),
          data.companyName,
          data.contactName,
          data.phone,
          data.email,
          data.companyType,
          data.sector,
          data.ledgerType,
          data.invoiceCount,
          (data.challenges || []).join(", "),
          (data.expectations || []).join(", "),
          data.documentMethod,
          data.additionalNotes
        ];
    }
    
    sheet.appendRow(row);

    // Admin mail - Servis tipini ekle
    const serviceTitles = {
      'on-muhasebe': 'Ön Muhasebe',
      'kurulus': 'Şirket Kuruluşu',
      'tesvik': 'Teşvik ve Destekler',
      'hukuk': 'Hukuki Danışmanlık',
      'adres': 'Adres Optimizasyonu'
    };
    const serviceTitle = serviceTitles[serviceType] || 'Genel';

    // Admin mail
    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: `Yeni ${serviceTitle} Başvurusu — ${data.contactName || data.companyName || 'İsimsiz'}`,
        body: [
          `Yeni ${serviceTitle} Başvurusu`,
          "=".repeat(50),
          "",
          `Yetkili Kişi: ${data.contactName}`,
          `Telefon: ${data.phone}`,
          `E-posta: ${data.email}`,
          data.companyName ? `Firma Adı: ${data.companyName}` : "",
          data.sector ? `Sektör: ${data.sector}` : "",
          data.incorporationType ? `Kuruluş Tipi: ${data.incorporationType}` : "",
          data.addressType ? `Adres Tipi: ${data.addressType}` : "",
          "",
          `Detaylar: Lütfen '${sheetName}' sheet'ini kontrol edin.`,
          "",
          "=".repeat(50),
          "Gönderim Zamanı: " + new Date()
        ].filter(Boolean).join("\n")
      });
      mailSentToAdmin = true;
    } catch (err) {
      Logger.log("MAIL_ERROR_ADMIN: " + err);
      mailErrors.push(String(err));
    }

    // Kullanıcı maili
    if (data.email) {
      try {
        MailApp.sendEmail({
          to: data.email,
          subject: `Lunarax — ${serviceTitle} Başvurunuz alındı`,
          body: [
            `Merhaba ${data.contactName || ""},`,
            "",
            `${serviceTitle} başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.`,
            "",
            "Teşekkürler,",
            "Lunarax Ekibi"
          ].join("\n")
        });
        mailSentToUser = true;
      } catch (err) {
        Logger.log("MAIL_ERROR_USER: " + err);
        mailErrors.push(String(err));
      }
    }

    const response = {
      ok: true,
      mailSentToAdmin,
      mailSentToUser,
    };
    if (mailErrors.length) {
      response.error = mailErrors.join(" | ");
    }

    return corsify(ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON));

  } catch (err) {
    Logger.log("SERVER_ERROR: " + err);
    return corsify(ContentService.createTextOutput(JSON.stringify({
      ok: false,
      mailSentToAdmin,
      mailSentToUser,
      error: String(err && err.message ? err.message : err)
    })).setMimeType(ContentService.MimeType.JSON));
  }
}
