# Investment & Budget Tracker - Google Sheets Solution

## Overview
This guide provides a complete Google Sheets-based solution for tracking investments and managing budgets. This approach offers maximum flexibility and ease of use.

## Sheet Structure

### Sheet 1: Portfolio Overview
**Purpose:** High-level view of all investments and net worth

| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| **Account** | **Type** | **Total Value** | **Cost Basis** | **Gain/Loss** | **% Return** | **Last Updated** |
| Wealthsimple Personal | Investment | =SUMIFS(Transactions!F:F,Transactions!A:A,A2) | =SUMIFS(Transactions!G:G,Transactions!A:A,A2) | =C2-D2 | =IF(D2=0,0,E2/D2) | =TODAY() |
| Wealthsimple Trade | Trading | =SUMIFS(Transactions!F:F,Transactions!A:A,A3) | =SUMIFS(Transactions!G:G,Transactions!A:A,A3) | =C3-D3 | =IF(D3=0,0,E3/D3) | =TODAY() |
| Emergency Fund | Cash | 10000 | 10000 | 0 | 0% | =TODAY() |

**Formulas:**
- **Total Portfolio Value:** `=SUM(C2:C10)`
- **Total Gain/Loss:** `=SUM(E2:E10)`
- **Overall Return:** `=IF(SUM(D2:D10)=0,0,SUM(E2:E10)/SUM(D2:D10))`

### Sheet 2: Holdings Detail
**Purpose:** Individual investment holdings with current values

| Symbol | Name | Account | Quantity | Avg Price | Current Price | Market Value | Cost Basis | Gain/Loss | % Return | Last Updated |
|--------|------|---------|----------|-----------|---------------|--------------|------------|-----------|-----------|--------------|
| VEQT | Vanguard All-Equity ETF | Wealthsimple Personal | 100 | 35.50 | =GOOGLEFINANCE(A2) | =D2*F2 | =D2*E2 | =G2-H2 | =IF(H2=0,0,I2/H2) | =TODAY() |
| XGRO | iShares Growth ETF | Wealthsimple Personal | 50 | 28.75 | =GOOGLEFINANCE(A3) | =D3*F3 | =D3*E3 | =G3-H3 | =IF(H3=0,0,I3/H3) | =TODAY() |

**Key Features:**
- **GOOGLEFINANCE()** function automatically fetches current stock prices
- **Automatic calculations** for market value, gains/losses, and returns
- **Easy to add new holdings** by copying rows

### Sheet 3: Transactions
**Purpose:** Record all investment transactions and budget items

| Date | Type | Category | Description | Account | Amount | Cost Basis | Symbol | Quantity | Price | Tags |
|------|------|----------|-------------|---------|--------|------------|--------|----------|-------|------|
| 2024-01-15 | Buy | Investment | VEQT Purchase | Wealthsimple Personal | -3550 | -3550 | VEQT | 100 | 35.50 | monthly |
| 2024-01-16 | Dividend | Income | VEQT Dividend | Wealthsimple Personal | 45.20 | 0 | VEQT | 0 | 0 | dividend |
| 2024-01-17 | Expense | Food | Groceries | Checking | -150.00 | -150.00 | | | | monthly |

**Transaction Types:**
- **Buy/Sell:** Investment transactions
- **Dividend:** Investment income
- **Deposit/Withdrawal:** Cash movements
- **Expense/Income:** Budget items

### Sheet 4: Budget Tracker
**Purpose:** Monthly budget planning and tracking

| Category | Monthly Budget | Spent | Remaining | % Used | Notes |
|----------|----------------|-------|-----------|---------|-------|
| Housing | 2000 | =SUMIFS(Transactions!F:F,Transactions!C:C,A2,Transactions!B:B,"Expense") | =B2-C2 | =IF(B2=0,0,C2/B2) | Rent + utilities |
| Food | 500 | =SUMIFS(Transactions!F:F,Transactions!C:C,A3,Transactions!B:B,"Expense") | =B3-C3 | =IF(B3=0,0,C3/B3) | Groceries + dining |
| Transportation | 300 | =SUMIFS(Transactions!F:F,Transactions!C:C,A4,Transactions!B:B,"Expense") | =B4-C4 | =IF(B4=0,0,C4/B4) | Gas + public transit |
| Entertainment | 200 | =SUMIFS(Transactions!F:F,Transactions!C:C,A5,Transactions!B:B,"Expense") | =B5-C5 | =IF(B5=0,0,C5/B5) | Movies + dining out |
| Savings | 1000 | =SUMIFS(Transactions!F:F,Transactions!C:C,A6,Transactions!B:B,"Income") | =B6-C6 | =IF(B6=0,0,C6/B6) | Investment contributions |

**Totals Row:**
- **Total Budget:** `=SUM(B2:B20)`
- **Total Spent:** `=SUM(C2:C20)`
- **Total Remaining:** `=SUM(D2:D20)`
- **Overall % Used:** `=IF(B22=0,0,C22/B22)`

### Sheet 5: Performance Dashboard
**Purpose:** Visual charts and key metrics

**Key Metrics:**
- **Net Worth:** `=Portfolio Overview!C12 + SUMIFS(Transactions!F:F,Transactions!B:B,"Income") - SUMIFS(Transactions!F:F,Transactions!B:B,"Expense")`
- **Monthly Savings Rate:** `=SUMIFS(Transactions!F:F,Transactions!B:B,"Income") / (SUMIFS(Transactions!F:F,Transactions!B:B,"Income") + ABS(SUMIFS(Transactions!F:F,Transactions!B:B,"Expense")))`
- **Investment Return (YTD):** `=SUMIFS(Transactions!F:F,Transactions!B:B,"Dividend") / Portfolio Overview!D12`

**Charts to Create:**
1. **Asset Allocation Pie Chart** (Portfolio Overview data)
2. **Monthly Spending Bar Chart** (Budget Tracker data)
3. **Net Worth Trend Line Chart** (Historical data)
4. **Investment Performance Comparison** (Holdings Detail data)

### Sheet 6: Goals Tracker
**Purpose:** Track financial goals and progress

| Goal | Target Amount | Current Amount | Progress % | Target Date | Monthly Contribution | On Track? |
|------|--------------|----------------|------------|-------------|---------------------|-----------|
| Emergency Fund | 10000 | 7500 | =C2/B2 | 2024-06-01 | 500 | =IF(C2+(DATEDIF(TODAY(),E2,"M")*F2)>=B2,"Yes","No") |
| Vacation Fund | 5000 | 2000 | =C3/B3 | 2024-08-01 | 300 | =IF(C3+(DATEDIF(TODAY(),E3,"M")*F3)>=B3,"Yes","No") |
| House Down Payment | 50000 | 15000 | =C4/B4 | 2025-12-01 | 1000 | =IF(C4+(DATEDIF(TODAY(),E4,"M")*F4)>=B4,"Yes","No") |

## Advanced Features

### 1. Automatic Price Updates
```javascript
// Google Apps Script to update prices daily
function updatePrices() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Holdings Detail");
  const range = sheet.getRange("A2:A100");
  const symbols = range.getValues().filter(row => row[0] !== "");
  
  symbols.forEach((symbol, index) => {
    const price = getStockPrice(symbol[0]);
    sheet.getRange(index + 2, 6).setValue(price); // Column F = Current Price
  });
}

function getStockPrice(symbol) {
  // Use Google Finance API or external service
  return 0; // Placeholder
}
```

### 2. Monthly Reports
```javascript
// Generate monthly summary
function generateMonthlyReport() {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  
  // Calculate monthly metrics
  const monthlyIncome = calculateMonthlyIncome(month, year);
  const monthlyExpenses = calculateMonthlyExpenses(month, year);
  const monthlySavings = monthlyIncome - monthlyExpenses;
  
  // Create report
  const report = {
    month: month,
    year: year,
    income: monthlyIncome,
    expenses: monthlyExpenses,
    savings: monthlySavings,
    savingsRate: monthlySavings / monthlyIncome
  };
  
  // Add to reports sheet
  addToReports(report);
}
```

### 3. Alerts and Notifications
```javascript
// Check budget limits and send alerts
function checkBudgetAlerts() {
  const budgetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Budget Tracker");
  const data = budgetSheet.getRange("A2:E20").getValues();
  
  data.forEach(row => {
    const category = row[0];
    const budget = row[1];
    const spent = row[2];
    const percentage = row[4];
    
    if (percentage > 0.8) { // 80% of budget used
      sendAlert(`${category} is at ${(percentage * 100).toFixed(1)}% of budget`);
    }
  });
}
```

## Setup Instructions

### Step 1: Create the Spreadsheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Investment & Budget Tracker"

### Step 2: Set Up Sheets
1. Create 6 sheets with the names above
2. Copy the table structures from this guide
3. Add the formulas as shown

### Step 3: Customize for Your Needs
1. **Add your accounts** to Portfolio Overview
2. **Set your budget categories** in Budget Tracker
3. **Add your investment holdings** to Holdings Detail
4. **Set your financial goals** in Goals Tracker

### Step 4: Add Data Validation
1. **Transaction Types:** Create dropdown for Buy/Sell/Dividend/Expense/Income
2. **Categories:** Create dropdown for your budget categories
3. **Accounts:** Create dropdown for your account names

### Step 5: Set Up Automation (Optional)
1. **Enable Google Apps Script** for advanced features
2. **Set up daily price updates**
3. **Create monthly report generation**
4. **Add budget alerts**

## Benefits of This Approach

### **Immediate Benefits:**
- ✅ **Start tracking today** - No development time needed
- ✅ **Familiar interface** - No learning curve
- ✅ **Mobile access** - Update from anywhere
- ✅ **Automatic calculations** - Formulas handle the math
- ✅ **Visual insights** - Built-in charts and graphs

### **Long-term Benefits:**
- ✅ **Scalable** - Easy to add new accounts or categories
- ✅ **Shareable** - Collaborate with family or advisors
- ✅ **Backup** - Google handles data safety
- ✅ **Integration ready** - Can connect to APIs later
- ✅ **Exportable** - Easy to backup or migrate

## Next Steps

1. **Create the spreadsheet** using the structure above
2. **Add your current investments** to the Holdings Detail sheet
3. **Set up your monthly budget** in the Budget Tracker
4. **Start recording transactions** daily
5. **Review the dashboard** weekly to track progress

Would you like me to help you create a specific template for your situation, or would you prefer to start with this general structure and customize it yourself?
