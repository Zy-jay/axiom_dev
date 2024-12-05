import { fetchBybitApi } from "./api";

// account/wallet-balance?accountType=UNIFIED&coin=BTC
export async function getBybitBalance(apiKey, apiSecret) {
  if (!apiKey || !apiSecret) return undefined;
  const parameters = "accountType=UNIFIED";
  const endpoint = "asset/transfer/query-account-coins-balance";
  try {
    const { data } = await fetchBybitApi(
      apiKey,
      apiSecret,
      parameters,
      endpoint
    );
    console.log("data", data);
    if (data?.result?.balance && data.result.balance?.length > 0) {
      return data.result.balance.filter((i) => Number(i.walletBalance) > 0);
    }

    return undefined;
  } catch (err) {
    console.log(err);

    return undefined;
  }
}

// account/wallet-balance?accountType=UNIFIED&coin=BTC
export async function getAssetInfo(apiKey, apiSecret, coin) {
  if (!coin) return undefined;
  if (coin === "USDT") return { data: { result: { list: [[0, 0, 0, 0, 1]] } } };
  const parameters = "symbol=" + coin + "USDT&interval=1&limit=1";
  const endpoint = "market/mark-price-kline";
  try {
    return await fetchBybitApi(apiKey, apiSecret, parameters, endpoint);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
