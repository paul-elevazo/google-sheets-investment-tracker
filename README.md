# Investment & Budget Tracker

A comprehensive investment and budget tracking system using Google Sheets with automated data updates via GitHub Actions.

## 🚀 Features

- **Google Sheets Integration** - Familiar spreadsheet interface
- **Automated Updates** - Daily stock prices and portfolio data
- **Wealthsimple Integration** - Automated data extraction
- **Budget Tracking** - Monthly spending and savings analysis
- **Goal Tracking** - Financial goals with progress monitoring
- **Real-time Charts** - Visual insights and performance metrics
- **Mobile Access** - Update from anywhere with Google Sheets app

## 📊 What You Get

### 6 Integrated Sheets:
1. **Portfolio Overview** - Total net worth and account summaries
2. **Holdings Detail** - Individual investments with live prices
3. **Transactions** - All financial transactions and budget items
4. **Budget Tracker** - Monthly spending vs budget analysis
5. **Performance Dashboard** - Key metrics and visual charts
6. **Goals Tracker** - Financial goals with progress tracking

### Automation Features:
- ✅ **Daily stock price updates** via Yahoo Finance API
- ✅ **Wealthsimple portfolio sync** via web scraping
- ✅ **Automatic calculations** for gains/losses and returns
- ✅ **Budget alerts** when spending approaches limits
- ✅ **Daily reports** with key metrics
- ✅ **GitHub Actions** for reliable automation

## 📊 Your Spreadsheet

**Template**: Create your own Google Sheet using the setup guide below.

Follow the setup guide to create your own spreadsheet with all 6 integrated sheets and automated formulas.

## 🛠️ Quick Start

### Option 1: Google Sheets Only (Recommended)
1. **Follow the [Setup Guide](docs/setup-guide.md)**
2. **Create your spreadsheet** in 15 minutes
3. **Start tracking immediately**

### Option 2: Full Automation
1. **Set up Google Sheets** using the setup guide
2. **Follow the [GitHub Integration Guide](docs/github-integration-guide.md)**
3. **Configure automated updates**

## 📁 Project Structure

```
investment-tracker/
├── docs/                          # Documentation
│   ├── setup-guide.md             # Step-by-step setup
│   ├── github-integration-guide.md # Automation setup
│   ├── data-architecture.md       # System design
│   ├── wealthsimple-integration.md # Wealthsimple scraping
│   └── google-sheets-integration.md # Sheets API guide
├── scripts/                       # Automation scripts
│   └── update-sheets.js           # Main update script
├── .github/                       # GitHub Actions
│   └── workflows/
│       └── daily-update.yml       # Daily automation
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🔧 Setup Instructions

### Prerequisites
- Google account
- GitHub account (for automation)
- Wealthsimple account (optional)

### Basic Setup (15 minutes)
1. **Create Google Sheet** using [setup guide](docs/setup-guide.md)
2. **Add your investments** to Holdings Detail sheet
3. **Set up budget categories** in Budget Tracker
4. **Start recording transactions**

### Advanced Setup (30 minutes)
1. **Follow basic setup** above
2. **Set up Google Cloud Project** for API access
3. **Configure GitHub repository** for automation
4. **Add GitHub Secrets** for secure credentials
5. **Test automation** with manual trigger

## 🔐 Security

### Credential Management
- ✅ **GitHub Secrets** for sensitive data
- ✅ **Service account** for Google Sheets access
- ✅ **No credentials** stored in code
- ✅ **Secure API connections**

### Data Protection
- ✅ **Google's security** for spreadsheet data
- ✅ **Encrypted connections** for all APIs
- ✅ **Access logging** and monitoring
- ✅ **Regular backups** recommended

## 📈 Daily Usage

### Recording Transactions (5 minutes)
1. **Add investment transactions** to Transactions sheet
2. **Record budget items** (expenses/income)
3. **Update goal progress** as needed

### Weekly Review (10 minutes)
1. **Check Portfolio Overview** for total values
2. **Review Budget Tracker** for spending analysis
3. **Update Goals Tracker** with current amounts
4. **Review Performance Dashboard** for insights

## 🤖 Automation

### What Runs Daily
- **Stock price updates** for all holdings
- **Wealthsimple portfolio sync** (if configured)
- **Daily report generation**
- **Budget calculations**
- **Goal progress updates**

### Manual Triggers
- **Run updates on demand** via GitHub Actions
- **Test automation** without waiting for schedule
- **Debug issues** with manual execution

## 📊 Key Metrics Tracked

### Investment Metrics
- **Total Portfolio Value**
- **Individual Holding Performance**
- **Asset Allocation**
- **Gain/Loss by Account**
- **Dividend Income**

### Budget Metrics
- **Monthly Spending by Category**
- **Budget vs Actual**
- **Savings Rate**
- **Expense Trends**

### Goal Metrics
- **Progress Toward Goals**
- **On-Track Status**
- **Monthly Contributions**
- **Target Dates**

## 🔧 Customization

### Adding New Features
- **Additional accounts** - Easy to add new investment accounts
- **Custom categories** - Flexible budget categories
- **New goals** - Track any financial goal
- **Advanced charts** - Create custom visualizations

### Integration Options
- **Other investment platforms** - Extend scraping capabilities
- **Bank accounts** - Add transaction import
- **Credit cards** - Include spending tracking
- **Real estate** - Track property values

## 🐛 Troubleshooting

### Common Issues
1. **#N/A errors in GOOGLEFINANCE()**
   - Check stock symbol format
   - Some symbols need exchange prefix

2. **Automation failures**
   - Check GitHub Actions logs
   - Verify credentials in secrets
   - Test locally with `npm start`

3. **Wealthsimple login issues**
   - Update selectors if website changes
   - Check for 2FA requirements
   - Verify credentials

### Getting Help
1. **Check the documentation** in `/docs`
2. **Review GitHub Actions logs**
3. **Test locally** with `npm start`
4. **Verify Google Cloud setup**

## 📚 Documentation

- **[Setup Guide](docs/setup-guide.md)** - Get started in 15 minutes
- **[GitHub Integration](docs/github-integration-guide.md)** - Set up automation
- **[Data Architecture](docs/data-architecture.md)** - System design details
- **[Wealthsimple Integration](docs/wealthsimple-integration.md)** - Scraping guide
- **[Google Sheets Integration](docs/google-sheets-integration.md)** - API details

## 🤝 Contributing

This is a personal project, but suggestions are welcome:
1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Submit a pull request**

## 📄 License

MIT License - feel free to use and modify for your personal needs.

## 🙏 Acknowledgments

- **Google Sheets API** for spreadsheet automation
- **Puppeteer** for web scraping capabilities
- **GitHub Actions** for reliable automation
- **Yahoo Finance API** for stock price data

---

**Start tracking your investments and budget today!** 🚀

Follow the [Setup Guide](docs/setup-guide.md) to get started in 15 minutes.
