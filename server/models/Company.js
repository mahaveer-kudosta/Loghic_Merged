import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    symbol: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    sector: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    logoUrl: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      trim: true,
    },
    marketCap: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    change: {
      type: Number,
      default: 0,
    },
    priceHistory: [
      {
        date: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    financials: {
      revenue: Number,
      profit: Number,
      cashFlow: Number,
      debt: Number,
      assets: Number,
      liabilities: Number,
      yearlyGrowth: Number,
      quarterlyGrowth: Number,
    },
    keyStats: {
      eps: Number,
      peRatio: Number,
      dividendYield: Number,
      beta: Number,
      fiftyTwoWeekHigh: Number,
      fiftyTwoWeekLow: Number,
      averageVolume: Number,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    ipoDate: Date,
    headquarters: {
      city: String,
      country: String,
    },
    employees: Number,
    ceo: String,
  },
  {
    timestamps: true,
  }
);

// Method to get company's public profile 
companySchema.methods.getPublicProfile = function () {
  return this.toObject();
};

// Method to calculate price change percentage
companySchema.methods.calculateChangePercentage = function () {
  if (this.priceHistory && this.priceHistory.length >= 2) {
    const currentPrice = this.priceHistory[this.priceHistory.length - 1].price;
    const previousPrice = this.priceHistory[this.priceHistory.length - 2].price;
    
    const changePercentage = ((currentPrice - previousPrice) / previousPrice) * 100;
    this.change = parseFloat(changePercentage.toFixed(2));
    return this.change;
  }
  return 0;
};

// Static method to find trending companies
companySchema.statics.findTrending = async function (limit = 10) {
  return this.find({ trending: true })
    .sort({ marketCap: -1 })
    .limit(limit);
};

// Static method to find companies by sector
companySchema.statics.findBySector = async function (sector) {
  return this.find({ sector });
};

// Static method to find top gainers
companySchema.statics.findTopGainers = async function (limit = 5) {
  return this.find({ change: { $gt: 0 } })
    .sort({ change: -1 })
    .limit(limit);
};

// Static method to find top losers
companySchema.statics.findTopLosers = async function (limit = 5) {
  return this.find({ change: { $lt: 0 } })
    .sort({ change: 1 })
    .limit(limit);
};

const Company = mongoose.model("Company", companySchema);

export default Company;