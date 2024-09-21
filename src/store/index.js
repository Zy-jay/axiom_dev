import { makeAutoObservable, configure } from "mobx";
import { TOKENS_COLORS } from "../constants/tokens";

configure({ enforceActions: "never" });

export class Store {
  daoBalances = {};
  daoPrices = {};
  daoPortfolios = {};
  tokenColors = {};
  hoveringKey = "";
  btcRate = null;
  formData = {
    text: "",
    phone: "",
    name: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setDaoBalance(daoKey, balanceValue) {
    this.daoBalances[daoKey] = balanceValue; // set the balance value for the daoKey | daoKey is the key of the dao | balanceValue is the balance value BigInt
  }
  setDaoPrice(daoKey, priceValue) {
    this.daoPrices[daoKey] = priceValue; // set the price value for the daoKey | daoKey is the key of the dao | priceValue is the price value BigInt
  }
  setPortfolio(daoKey, portfolioTokens) {
    this.daoPortfolios[daoKey] = portfolioTokens; // set the portfolio value for the daoKey | daoKey is the key of the dao | portfolioValue is the portfolio value BigInt
  }
  setPrice(daoKey, priceValue) {
    this.daoPrices[daoKey] = priceValue; // set the price value for the daoKey | daoKey is the key of the dao | priceValue is the price value BigInt
  }
  setHoveringKey(value) {
    this.hoveringKey = value;
  }
  setFormData(data) {
    this.formData = { ...this.formData, ...data };
  }
  setBtcRate(rate) {
    this.btcRate = rate;
  }

  getTokenColor(addressOrSymbol) {
    if (this.tokenColors[addressOrSymbol]) {
      return this.tokenColors[addressOrSymbol];
    }
    const color =
      TOKENS_COLORS[addressOrSymbol] ??
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.tokenColors[addressOrSymbol] = color;
    return color;
  }
}
