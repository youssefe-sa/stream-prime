// Fonction utilitaire pour enregistrer les logs dans une feuille de calcul
function logToSheet(logMessage) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let logSheet = ss.getSheetByName("Logs");
    
    if (!logSheet) {
      logSheet = ss.insertSheet("Logs");
      logSheet.appendRow(["Date/Heure", "Message"]);
    }
    
    logSheet.appendRow([new Date(), logMessage]);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'écriture dans le log:", error);
    return false;
  }
}

function doPost(e) {
  try {
    // Journaliser les données reçues pour le débogage
    console.log('=== NOUVELLE REQUÊTE REÇUE ===');
    logToSheet('Nouvelle requête reçue');
    
    // Enregistrer les en-têtes et les paramètres
    console.log('En-têtes de la requête:', JSON.stringify(e, null, 2));
    logToSheet('En-têtes: ' + JSON.stringify(e, null, 2));
    
    // Récupérer la feuille de calcul active
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName("Commandes");
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Commandes");
      // Ajouter les en-têtes avec la colonne 'adultes'
      sheet.appendRow([
        "Date", 
        "Nom", 
        "Téléphone", 
        "Email", 
        "Appareil", 
        "Application", 
        "Adresse MAC", 
        "Forfait", 
        "Prix", 
        "Statut",  // Nouveau ou Renouvellement
        "Adultes"   // Oui ou Non
      ]);
    }
    
    // Récupérer les paramètres du formulaire
    let params = {};
    
    // Vérifier si les données sont dans e.parameter (méthode GET) ou dans e.postData (méthode POST)
    if (e.postData) {
      // Si les données sont envoyées en POST
      const contentType = e.postData.type || '';
      const postData = e.postData.getDataAsString();
      console.log('Type de contenu:', contentType);
      console.log('Données POST brutes:', postData);
      
      if (contentType.includes('application/x-www-form-urlencoded')) {
        // Parser les données POST au format x-www-form-urlencoded
        postData.split('&').forEach(function(keyValue) {
          const keyValueArr = keyValue.split('=');
          if (keyValueArr.length > 1) {
            try {
              const key = decodeURIComponent(keyValueArr[0].replace(/\+/g, ' '));
              const value = decodeURIComponent((keyValueArr[1] || '').replace(/\+/g, ' '));
              params[key] = value;
            } catch (error) {
              console.error('Erreur lors du décodage:', keyValue, error);
            }
          }
        });
      } else if (contentType.includes('application/json')) {
        // Si les données sont au format JSON
        try {
          params = JSON.parse(postData);
        } catch (error) {
          console.error('Erreur lors de l\'analyse JSON:', error);
          throw new Error('Format de données JSON invalide');
        }
      }
    } else if (e.parameter) {
      // Si les données sont dans les paramètres de requête (GET)
      params = e.parameter;
    }
    
    // Journaliser les paramètres extraits
    console.log('Paramètres extraits:', JSON.stringify(params));
    
    // Vérifier si les paramètres requis sont présents
    if (Object.keys(params).length === 0) {
      const errorMsg = 'Aucune donnée valide reçue';
      console.error(errorMsg);
      logToSheet(errorMsg);
      throw new Error(errorMsg);
    }
    
    // Enregistrer les paramètres reçus
    console.log('Paramètres reçus:', JSON.stringify(params, null, 2));
    logToSheet('Paramètres: ' + JSON.stringify(params, null, 2));
    
    // Journaliser tous les paramètres reçus pour le débogage
    console.log('=== PARAMÈTRES REÇUS ===');
    Object.keys(params).forEach(key => {
      console.log(`${key}: ${params[key]} (type: ${typeof params[key]})`);
    });
    
    // Déterminer les valeurs pour les champs spéciaux avec des vérifications plus robustes
    const adultChannels = (params.adultChannels === 'true' || 
                          params.adultChannels === 'Oui' || 
                          params.adultChannels === true) ? 'Oui' : 'Non';
    
    const renewal = (params.renewal === 'true' || 
                    params.renewal === 'Oui' || 
                    params.customerType === 'Renewal' ||
                    params.renewal === true) ? 'Oui' : 'Non';
    
    const customerType = params.customerType || 'New Customer';
    
    // Déterminer la valeur pour 'adultes' (Oui/Non)
    const adultes = (params.adultChannels === 'true' || 
                    params.adultChannels === 'Oui' || 
                    params.adultChannels === true) ? 'Oui' : 'Non';

    // Préparer la nouvelle ligne avec la colonne 'adultes'
    const newRow = [
      new Date(),  // Date d'ajout
      params.fullName || "",
      params.phone || "",
      params.email || "",
      params.device || "",
      params.application || "",
      params.macAddress || "",
      params.plan || "",
      parseFloat(params.price) || 0,
      params.customerType === 'Renewal' ? 'Renouvellement' : 'Nouveau',  // Statut
      adultes  // Oui ou Non pour les chaînes adultes
    ];
    
    try {
      // Vérifier si la feuille est accessible en écriture
      try {
        // Ajouter la ligne à la feuille
        sheet.appendRow(newRow);
        
        // Obtenir la référence de la ligne ajoutée
        const lastRow = sheet.getLastRow();
        const range = sheet.getRange(lastRow, 1, 1, newRow.length);
        const values = range.getValues()[0];
        
        // Journaliser la ligne ajoutée pour le débogage
        console.log('=== NOUVELLE LIGNE AJOUTÉE ===');
        console.log('Numéro de ligne:', lastRow);
        console.log('Valeurs ajoutées:');
        
        const headers = [
          'Date', 'Nom', 'Téléphone', 'Email', 'Appareil', 'Application', 
          'Adresse MAC', 'Forfait', 'Prix', 'Statut', 'Adultes'
        ];
        
        let logMessage = 'Nouvelle entrée ajoutée:\n';
        values.forEach((value, index) => {
          const logLine = `  ${headers[index] || `Colonne ${index + 1}`}: ${value} (type: ${typeof value})`;
          console.log(logLine);
          logMessage += logLine + '\n';
        });
        
        // Enregistrer dans le log
        logToSheet(logMessage);
        
        return ContentService
          .createTextOutput(JSON.stringify({
            result: "success",
            message: "Commande enregistrée avec succès",
            row: lastRow,
            data: values
          }))
          .setMimeType(ContentService.MimeType.JSON);
        
      } catch (sheetError) {
        const errorMsg = `Erreur lors de l'ajout à la feuille: ${sheetError.message}`;
        console.error(errorMsg);
        logToSheet(errorMsg);
        throw new Error(errorMsg);
      }
        
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ligne:", error);
      throw new Error("Erreur lors de l'enregistrement dans la feuille de calcul: " + error.message);
    }
      
  } catch (error) {
    // En cas d'erreur
    console.error('Erreur:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        result: "error",
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour tester le script
function testDoGet() {
  const testData = {
    parameter: {
      fullName: "Test User",
      phone: "1234567890",
      email: "test@example.com",
      device: "Android Box",
      application: "IPTV Smarters",
      macAddress: "00:1A:2B:3C:4D:5E",
      plan: "12 Months • 1 Device",
      price: "49.99",
      status: "Nouvelle",
      adultChannels: "Non",
      customerType: "New Customer",
      timestamp: new Date().toISOString()
    }
  };
  
  return doPost(testData);
}

// Fonction utilitaire pour vider la feuille (à utiliser avec précaution)
function clearSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Commandes");
  if (sheet) {
    sheet.clear();
    sheet.appendRow([
      "Date", 
      "Nom", 
      "Téléphone", 
      "Email", 
      "Appareil", 
      "Application", 
      "Adresse MAC", 
      "Forfait", 
      "Prix", 
      "Statut", 
      "Chaînes pour adultes", 
      "Type de client",
      "Horodatage"
    ]);
  }
}
