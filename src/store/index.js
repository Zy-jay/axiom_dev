import { makeAutoObservable, configure } from "mobx";

configure({ enforceActions: "never" });

export class Store {
  daoBalances = {};
  daoPrices = {};
  daoPortfolios = {};
  daoPrices = {};
  hoveringKey = "";
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
  setPortfolio(daoKey, portfolioValue) {
    this.daoPortfolios[daoKey] = portfolioValue; // set the portfolio value for the daoKey | daoKey is the key of the dao | portfolioValue is the portfolio value BigInt
  }
  setPrice(daoKey, priceValue) {
    this.daoPrices[daoKey] = priceValue; // set the price value for the daoKey | daoKey is the key of the dao | priceValue is the price value BigInt
  }
  setHoveringKey(value) {
    this.hoveringKey = value;
  }
  setFotmData(data) {
    this.formData = { ...this.formData, ...data };
  }
}
