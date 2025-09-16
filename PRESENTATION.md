# 🚀 Automated Investment Tracking: From Manual to Magic

## The Problem
Manual portfolio tracking across multiple accounts is time-consuming and error-prone.

## The Solution
Built an automated system that transforms CSV exports into live, updating Google Sheets.

### 🎯 **What It Does**
- **CSV Processing**: Automatically imports Wealthsimple exports
- **Live Price Updates**: Real-time stock prices via GOOGLEFINANCE
- **Smart Calculations**: Auto-calculates gains/losses, returns, market values
- **Multi-Account Support**: Handles RRSP, TFSA, non-registered accounts

### 📸 **4-Screenshot Presentation Strategy**

#### **Screenshot 1: The Problem (Before)**
```
Title: "Manual Portfolio Tracking Nightmare"
Content: Empty Holdings Detail tab with just headers
- Show the blank slate that requires manual data entry
- Highlight the tedious nature of manual tracking
```

#### **Screenshot 2: The Solution (Automation in Action)**
```
Title: "Automation Script Running"
Content: Terminal showing your update-sheets.js execution
- Console output with "Processing CSV files..."
- "Setting up GOOGLEFINANCE formulas..."
- "Set up formulas for row X"
- Show the automation doing the heavy lifting
```

#### **Screenshot 3: The Results (After)**
```
Title: "Live, Automated Portfolio Dashboard"
Content: Fully populated Holdings Detail tab with:
- Live stock prices from GOOGLEFINANCE
- Automatic calculations (Market Value, Gain/Loss, % Return)
- Multiple account types (RRSP, TFSA, Non-registered)
- Real-time data with timestamps
```

#### **Screenshot 4: The Magic (Formulas)**
```
Title: "Smart Formulas at Work"
Content: Click on a cell showing the live formula
- =GOOGLEFINANCE("TSE:SHOP") for Canadian stocks
- =D2*F2 for Market Value calculation
- =IF(H2=0,0,I2/H2) for percentage return
- Show the intelligence behind the automation
```

### 🛠️ **Tech Stack**
- Node.js + Google Sheets API
- GOOGLEFINANCE for live market data
- GitHub Actions for automation
- Smart CSV processing

### 📈 **Impact**
- **Time Saved**: 2+ hours per week
- **Accuracy**: Zero calculation errors
- **Real-time**: Live portfolio updates
- **Scalable**: Easy to add new investments

### 🎬 **Screenshot Capture Instructions**

1. **Screenshot 1**: Open your Google Sheet, go to Holdings Detail tab, show empty state
2. **Screenshot 2**: Run `node scripts/update-sheets.js` in terminal, capture console output
3. **Screenshot 3**: Show the populated Holdings Detail tab with live data
4. **Screenshot 4**: Click on a cell with a formula (like F2 or G2) to show the formula bar

### 📝 **Social Media Captions**

#### **LinkedIn Post**
```
🚀 Just automated my entire investment tracking workflow!

From spending 2+ hours weekly on manual portfolio updates to having real-time data at my fingertips.

Built with Node.js + Google Sheets API, this system:
✅ Processes CSV exports automatically
✅ Updates stock prices in real-time
✅ Calculates gains/losses automatically
✅ Handles multiple account types

The result? Zero manual work, 100% accuracy, and instant insights.

#Automation #FinTech #InvestmentTracking #GoogleSheets #NodeJS
```

#### **GitHub README Addition**
```markdown
## 🎯 Project Showcase

This project demonstrates how automation can transform tedious financial tracking into a seamless, real-time experience.

### Key Features
- **Automated CSV Processing**: Wealthsimple exports → Google Sheets
- **Live Price Updates**: Real-time stock prices via GOOGLEFINANCE
- **Smart Calculations**: Automatic gains/losses and returns
- **Multi-Account Support**: RRSP, TFSA, non-registered accounts

### Impact
- **Time Saved**: 2+ hours per week
- **Accuracy**: Zero calculation errors
- **Real-time**: Live portfolio updates
```

---

*From manual tracking to automated insights in minutes.*
