# Step-by-Step Setup Guide

## Quick Start (15 minutes)

### Step 1: Create Your Spreadsheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Rename it to "My Investment Tracker"

### Step 2: Create the 6 Sheets
1. Click the "+" button at the bottom to add new sheets
2. Create these 6 sheets:
   - Portfolio Overview
   - Holdings Detail  
   - Transactions
   - Budget Tracker
   - Performance Dashboard
   - Goals Tracker

### Step 3: Set Up Portfolio Overview Sheet
1. **Add headers** in row 1:
   ```
   A1: Account
   B1: Type  
   C1: Total Value
   D1: Cost Basis
   E1: Gain/Loss
   F1: % Return
   G1: Last Updated
   ```

2. **Add your accounts** starting in row 2:
   ```
   A2: Wealthsimple Personal
   A3: Wealthsimple Trade
   A4: Emergency Fund
   A5: Checking Account
   ```

3. **Add formulas** in row 2:
   ```
   C2: =SUMIFS(Transactions!F:F,Transactions!A:A,A2)
   D2: =SUMIFS(Transactions!G:G,Transactions!A:A,A2)
   E2: =C2-D2
   F2: =IF(D2=0,0,E2/D2)
   G2: =TODAY()
   ```

4. **Copy formulas** down to other rows

### Step 4: Set Up Holdings Detail Sheet
1. **Add headers** in row 1:
   ```
   A1: Symbol
   B1: Name
   C1: Account
   D1: Quantity
   E1: Avg Price
   F1: Current Price
   G1: Market Value
   H1: Cost Basis
   I1: Gain/Loss
   J1: % Return
   K1: Last Updated
   ```

2. **Add your investments** starting in row 2:
   ```
   A2: VEQT
   B2: Vanguard All-Equity ETF
   C2: Wealthsimple Personal
   D2: 100
   E2: 35.50
   F2: =GOOGLEFINANCE(A2)
   ```

3. **Add formulas** in row 2:
   ```
   G2: =D2*F2
   H2: =D2*E2
   I2: =G2-H2
   J2: =IF(H2=0,0,I2/H2)
   K2: =TODAY()
   ```

### Step 5: Set Up Transactions Sheet
1. **Add headers** in row 1:
   ```
   A1: Date
   B1: Type
   C1: Category
   D1: Description
   E1: Account
   F1: Amount
   G1: Cost Basis
   H1: Symbol
   I1: Quantity
   J1: Price
   K1: Tags
   ```

2. **Add data validation** for Type column:
   - Select column B
   - Data → Data validation
   - Criteria: List of items
   - Values: Buy,Sell,Dividend,Deposit,Withdrawal,Expense,Income

3. **Add data validation** for Account column:
   - Select column E
   - Data → Data validation
   - Criteria: List of items
   - Values: Wealthsimple Personal,Wealthsimple Trade,Emergency Fund,Checking Account

### Step 6: Set Up Budget Tracker Sheet
1. **Add headers** in row 1:
   ```
   A1: Category
   B1: Monthly Budget
   C1: Spent
   D1: Remaining
   E1: % Used
   F1: Notes
   ```

2. **Add your budget categories** starting in row 2:
   ```
   A2: Housing
   A3: Food
   A4: Transportation
   A5: Entertainment
   A6: Savings
   A7: Utilities
   A8: Healthcare
   ```

3. **Add formulas** in row 2:
   ```
   C2: =SUMIFS(Transactions!F:F,Transactions!C:C,A2,Transactions!B:B,"Expense")
   D2: =B2-C2
   E2: =IF(B2=0,0,C2/B2)
   ```

4. **Add totals** in row 10:
   ```
   A10: TOTALS
   B10: =SUM(B2:B9)
   C10: =SUM(C2:C9)
   D10: =SUM(D2:D9)
   E10: =IF(B10=0,0,C10/B10)
   ```

### Step 7: Set Up Performance Dashboard Sheet
1. **Add key metrics** in column A:
   ```
   A1: Key Metrics
   A3: Net Worth
   A4: Monthly Savings Rate
   A5: Investment Return (YTD)
   A6: Emergency Fund Status
   A7: Budget Status
   ```

2. **Add formulas** in column B:
   ```
   B3: =Portfolio Overview!C12 + SUMIFS(Transactions!F:F,Transactions!B:B,"Income") - SUMIFS(Transactions!F:F,Transactions!B:B,"Expense")
   B4: =SUMIFS(Transactions!F:F,Transactions!B:B,"Income") / (SUMIFS(Transactions!F:F,Transactions!B:B,"Income") + ABS(SUMIFS(Transactions!F:F,Transactions!B:B,"Expense")))
   B5: =SUMIFS(Transactions!F:F,Transactions!B:B,"Dividend") / Portfolio Overview!D12
   ```

### Step 8: Set Up Goals Tracker Sheet
1. **Add headers** in row 1:
   ```
   A1: Goal
   B1: Target Amount
   C1: Current Amount
   D1: Progress %
   E1: Target Date
   F1: Monthly Contribution
   G1: On Track?
   ```

2. **Add your goals** starting in row 2:
   ```
   A2: Emergency Fund
   B2: 10000
   C2: 7500
   E2: 2024-06-01
   F2: 500
   ```

3. **Add formulas** in row 2:
   ```
   D2: =C2/B2
   G2: =IF(C2+(DATEDIF(TODAY(),E2,"M")*F2)>=B2,"Yes","No")
   ```

## Daily Usage

### Recording Transactions
1. **Investment transactions:**
   - Date: Today's date
   - Type: Buy/Sell/Dividend
   - Category: Investment
   - Description: "VEQT Purchase"
   - Account: Wealthsimple Personal
   - Amount: -3550 (negative for purchases)
   - Cost Basis: -3550
   - Symbol: VEQT
   - Quantity: 100
   - Price: 35.50

2. **Budget transactions:**
   - Date: Today's date
   - Type: Expense/Income
   - Category: Food
   - Description: "Groceries"
   - Account: Checking Account
   - Amount: -150.00
   - Cost Basis: -150.00

### Weekly Review
1. **Check Portfolio Overview** - See total values and returns
2. **Review Budget Tracker** - See spending vs budget
3. **Update Goals Tracker** - Update current amounts
4. **Check Performance Dashboard** - Review key metrics

## Advanced Features (Optional)

### 1. Add Charts
1. **Asset Allocation Pie Chart:**
   - Select Portfolio Overview data
   - Insert → Chart
   - Choose Pie chart
   - Use Account and Total Value columns

2. **Monthly Spending Bar Chart:**
   - Select Budget Tracker data
   - Insert → Chart
   - Choose Bar chart
   - Use Category and Spent columns

### 2. Add Conditional Formatting
1. **Budget alerts:**
   - Select Budget Tracker % Used column
   - Format → Conditional formatting
   - Add rule: "Greater than 0.8" → Red background

2. **Goal progress:**
   - Select Goals Tracker Progress % column
   - Format → Conditional formatting
   - Add rule: "Greater than 0.9" → Green background

### 3. Add Data Validation
1. **Transaction categories:**
   - Select Transactions Category column
   - Data → Data validation
   - List of items: Housing,Food,Transportation,Entertainment,Savings,Investment

## Troubleshooting

### Common Issues:
1. **#N/A errors in GOOGLEFINANCE():**
   - Check stock symbol is correct
   - Some symbols need exchange prefix (e.g., "TSX:VEQT")

2. **Formulas not calculating:**
   - Check for extra spaces in account names
   - Ensure data types match (text vs numbers)

3. **Budget not updating:**
   - Verify transaction types are "Expense" or "Income"
   - Check category names match exactly

### Tips:
- **Backup regularly:** File → Download → Microsoft Excel
- **Use consistent naming:** Keep account and category names consistent
- **Start simple:** Add complexity gradually as you get comfortable
- **Mobile access:** Use Google Sheets app for on-the-go updates

## Next Steps

1. **Start with basic setup** (15 minutes)
2. **Add your current investments** (30 minutes)
3. **Set up your budget categories** (15 minutes)
4. **Start recording transactions** (5 minutes daily)
5. **Review weekly** (10 minutes)

Once you're comfortable with the basic setup, you can add:
- More detailed categories
- Additional accounts
- Advanced charts
- Automation scripts
- Family sharing

Would you like me to help you customize this for your specific investments and budget categories?
