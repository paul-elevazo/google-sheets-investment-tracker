require('dotenv').config();
const { google } = require('googleapis');
const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

class InvestmentTrackerUpdater {
  constructor() {
    this.sheets = null;
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
    this.setupGoogleSheets();
  }

  async setupGoogleSheets() {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      this.sheets = google.sheets({ version: 'v4', auth });
      console.log('Google Sheets API initialized');
    } catch (error) {
      console.error('Error setting up Google Sheets:', error);
    }
  }

  async setupSheetHeaders() {
    try {
      console.log('Setting up sheet headers...');
      
      // Set up simple, original headers
      const headers = [
        'Symbol',
        'Name',
        'Account',
        'Quantity',
        'Avg Price',
        'Current Price',
        'Market Value',
        'Cost Basis',
        'Gain/Loss',
        '% Return',
        'Last Updated'
      ];
      
      // Update the header row
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Holdings Detail!A1:K1',
        valueInputOption: 'USER_ENTERED',
        resource: { values: [headers] }
      });
      
      console.log('Headers set up successfully');
    } catch (error) {
      console.error('Error setting up headers:', error);
    }
  }

  async updateStockPrices() {
    try {
      console.log('Setting up GOOGLEFINANCE formulas...');
      
      // Read current holdings from Google Sheets
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Holdings Detail!A2:A100' // Symbol column is now A
      });

      const symbols = response.data.values?.filter(row => row[0]) || [];
      
      // Clear formula columns first to avoid conflicts (excluding I which comes from CSV)
      if (symbols.length > 0) {
        const lastRow = symbols.length + 1;
        
        // Clear F-H range
        await this.sheets.spreadsheets.values.clear({
          spreadsheetId: this.spreadsheetId,
          range: `Holdings Detail!F2:H${lastRow}`
        });
        
        // Clear J-K range
        await this.sheets.spreadsheets.values.clear({
          spreadsheetId: this.spreadsheetId,
          range: `Holdings Detail!J2:K${lastRow}`
        });
        
        console.log(`Cleared formula columns F-H and J-K for rows 2-${lastRow}`);
      }
      
      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i][0];
        const rowNumber = i + 2; // Start from row 2 (after headers)
        
        // Set up simple formulas
        const formulas = {
          F: `=GOOGLEFINANCE(A${rowNumber})`,           // Current Price - Column F
          G: `=D${rowNumber}*F${rowNumber}`,            // Market Value = Quantity × Current Price - Column G
          H: `=D${rowNumber}*E${rowNumber}`,            // Cost Basis = Quantity × Avg Price - Column H
          // I: Gain/Loss comes from CSV, not formula
          J: `=IF(H${rowNumber}=0,0,I${rowNumber}/H${rowNumber})`, // % Return = Gain/Loss ÷ Cost Basis - Column J
          K: `=TODAY()`                                 // Last Updated - Column K
        };
        
        // Update each column with its formula and set proper formatting
        for (const [column, formula] of Object.entries(formulas)) {
          await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: `Holdings Detail!${column}${rowNumber}`,
            valueInputOption: 'USER_ENTERED',
            resource: { values: [[formula]] }
          });
          
          
          console.log(`  ${column}${rowNumber}: ${formula}`);
        }
        
        console.log(`Set up all formulas for ${symbol} in row ${rowNumber}`);
      }
      
      // Debug: Check what values are actually in the formula columns
      if (symbols.length > 0) {
        const lastRow = symbols.length + 1;
        const debugResponse = await this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: `Holdings Detail!F2:K${lastRow}`
        });
        
        console.log('Formula column values:');
        debugResponse.data.values?.forEach((row, index) => {
          console.log(`Row ${index + 2}:`, row);
        });
      }
    } catch (error) {
      console.error('Error setting up stock price formulas:', error);
    }
  }

  async getStockPrice(symbol) {
    try {
      // Use Google Sheets GOOGLEFINANCE function
      // This will be handled by the sheet formulas, not the script
      console.log(`Using GOOGLEFINANCE formula for ${symbol}`);
      return null; // Let the sheet handle the price updates
    } catch (error) {
      console.error(`Error getting price for ${symbol}:`, error);
      return null;
    }
  }

  async clearHoldingsData() {
    try {
      console.log('Clearing existing holdings data...');
      
      // Clear all data from row 2 onwards (keep headers in row 1)
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: 'Holdings Detail!A2:K1000' // Clear a large range to ensure all data is removed
      });
      
      console.log('Holdings data cleared successfully');
    } catch (error) {
      console.error('Error clearing holdings data:', error);
    }
  }

  async processCSVFiles() {
    try {
      console.log('Processing CSV files...');
      
      const csvDir = path.join(__dirname, '..', 'CSV');
      
      // Check if CSV directory exists
      if (!fs.existsSync(csvDir)) {
        console.log('CSV directory not found, skipping CSV processing');
        return;
      }
      
      // Get all CSV files
      const files = fs.readdirSync(csvDir).filter(file => file.endsWith('.csv'));
      
      if (files.length === 0) {
        console.log('No CSV files found in CSV directory');
        return;
      }
      
      for (const file of files) {
        console.log(`Processing ${file}...`);
        await this.processCSVFile(path.join(csvDir, file));
      }
      
      console.log('CSV processing completed');
    } catch (error) {
      console.error('Error processing CSV files:', error);
    }
  }

  async processCSVFile(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            console.log(`Found ${results.length} records in ${path.basename(filePath)}`);
            
            // Prepare batch data for all records
            const dataRows = [];
            const formulaRows = [];
            
            for (let i = 0; i < results.length; i++) {
              const record = results[i];
              const rowNumber = i + 2; // Start from row 2 (after headers)
              
              console.log(`Processing record ${i + 1}: ${record.Symbol} - ${record['Account Name']}`);
              
              // Skip if no symbol
              if (!record.Symbol) {
                console.log(`Skipping record ${i + 1}: No symbol found`);
                continue;
              }
              
              // Map Wealthsimple CSV columns to simple Google Sheets structure
              const quantity = parseFloat(record.Quantity) || 0;
              const bookValue = parseFloat(record['Book Value (Market)']) || 0;
              const avgPrice = quantity > 0 ? (bookValue / quantity).toFixed(2) : 0;
              
              // Determine the correct GOOGLEFINANCE symbol format
              let financeSymbol = record.Symbol;
              if (record.Exchange === 'TSX' || record.Symbol.includes('.TO')) {
                const cleanSymbol = record.Symbol.replace('.TO', '');
                financeSymbol = `TSE:${cleanSymbol}`;
              } else if (record.Exchange === 'NASDAQ') {
                financeSymbol = record.Symbol;
              } else if (record.Exchange === 'NYSE') {
                financeSymbol = record.Symbol;
              }
              
              // Prepare data row (A, B, C, D, E, I columns)
              const dataRow = [
                record.Symbol,                           // A: Symbol
                record.Name,                             // B: Name
                record['Account Name'],                  // C: Account
                record.Quantity,                         // D: Quantity
                avgPrice,                                // E: Avg Price
                '', '',                                  // F, G: Current Price, Market Value (formulas)
                '',                                      // H: Cost Basis (formula)
                record['Market Unrealized Returns'],     // I: Gain/Loss (from CSV)
                '', ''                                   // J, K: % Return, Last Updated (formulas)
              ];
              
              // Prepare formula row (F, G, H, J, K columns)
              const formulaRow = [
                `=GOOGLEFINANCE("${financeSymbol}")`,    // F: Current Price
                `=D${rowNumber}*F${rowNumber}`,          // G: Market Value
                `=D${rowNumber}*E${rowNumber}`,          // H: Cost Basis
                `=IF(H${rowNumber}=0,0,I${rowNumber}/H${rowNumber})`, // J: % Return
                `=TODAY()`                               // K: Last Updated
              ];
              
              dataRows.push(dataRow);
              formulaRows.push({ row: rowNumber, formulas: formulaRow });
              
              console.log(`Prepared row ${rowNumber}: ${record.Symbol} (${financeSymbol})`);
            }
            
            // Batch update all data rows
            if (dataRows.length > 0) {
              console.log(`Batch updating ${dataRows.length} data rows...`);
              await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: `Holdings Detail!A2:K${dataRows.length + 1}`,
                valueInputOption: 'USER_ENTERED',
                resource: { values: dataRows }
              });
              console.log('Data rows updated successfully');
            }
            
            // Batch update formulas with delays to avoid rate limits
            console.log('Setting up formulas with rate limiting...');
            for (const { row, formulas } of formulaRows) {
              try {
                // Update F column (Current Price)
                await this.sheets.spreadsheets.values.update({
                  spreadsheetId: this.spreadsheetId,
                  range: `Holdings Detail!F${row}`,
                  valueInputOption: 'USER_ENTERED',
                  resource: { values: [[formulas[0]]] }
                });
                
                // Update G column (Market Value)
                await this.sheets.spreadsheets.values.update({
                  spreadsheetId: this.spreadsheetId,
                  range: `Holdings Detail!G${row}`,
                  valueInputOption: 'USER_ENTERED',
                  resource: { values: [[formulas[1]]] }
                });
                
                // Update H column (Cost Basis)
                await this.sheets.spreadsheets.values.update({
                  spreadsheetId: this.spreadsheetId,
                  range: `Holdings Detail!H${row}`,
                  valueInputOption: 'USER_ENTERED',
                  resource: { values: [[formulas[2]]] }
                });
                
                // Update J column (% Return)
                await this.sheets.spreadsheets.values.update({
                  spreadsheetId: this.spreadsheetId,
                  range: `Holdings Detail!J${row}`,
                  valueInputOption: 'USER_ENTERED',
                  resource: { values: [[formulas[3]]] }
                });
                
                // Update K column (Last Updated)
                await this.sheets.spreadsheets.values.update({
                  spreadsheetId: this.spreadsheetId,
                  range: `Holdings Detail!K${row}`,
                  valueInputOption: 'USER_ENTERED',
                  resource: { values: [[formulas[4]]] }
                });
                
                console.log(`Set up formulas for row ${row}`);
                
                // Add delay to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 100));
                
              } catch (error) {
                console.error(`Error setting formulas for row ${row}:`, error);
              }
            }
            
            console.log('CSV processing completed');
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });
  }

  async generateDailyReport() {
    try {
      console.log('Generating daily report...');
      
      // Get current date
      const today = new Date().toISOString().split('T')[0];
      
      // Read current metrics
      const metricsResponse = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Performance Dashboard!A3:B7'
      });
      
      const metrics = metricsResponse.data.values || [];
      
      // Create report
      const report = {
        date: today,
        netWorth: metrics[0]?.[1] || 'N/A',
        savingsRate: metrics[1]?.[1] || 'N/A',
        investmentReturn: metrics[2]?.[1] || 'N/A'
      };
      
      // Add to reports sheet
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Daily Reports!A:D',
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[report.date, report.netWorth, report.savingsRate, report.investmentReturn]] }
      });
      
      console.log('Daily report generated');
    } catch (error) {
      console.error('Error generating daily report:', error);
    }
  }

  async debugSheetStructure() {
    try {
      console.log('Debugging sheet structure...');
      
      // Read the first few rows to see what's actually there
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Holdings Detail!A1:W3'
      });
      
      const rows = response.data.values || [];
      console.log('Current sheet structure:');
      rows.forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row);
      });
    } catch (error) {
      console.error('Error debugging sheet structure:', error);
    }
  }

  async run() {
    console.log('Starting daily investment tracker update...');
    
    try {
      // Set up headers first
      await this.setupSheetHeaders();
      
      // Clear existing holdings data
      await this.clearHoldingsData();
      
      // Process CSV files (if any) - formulas are set up during processing
      await this.processCSVFiles();
      
      // Skip Wealthsimple and Daily Report for now
      console.log('Skipping Wealthsimple integration (not configured)');
      console.log('Skipping daily report (Daily Reports sheet not created yet)');
      
      console.log('Daily update completed successfully');
    } catch (error) {
      console.error('Error in daily update:', error);
      throw error;
    }
  }
}

// Run the updater
if (require.main === module) {
  const updater = new InvestmentTrackerUpdater();
  updater.run().catch(console.error);
}

module.exports = InvestmentTrackerUpdater;
