import axios from "axios";
import CryptoJS from "crypto-js";

var recvWindow = 10000;
const url = "https://api.bybit.com/v5/";

const timeDiff = 1733740748268 - 1733740744184;

export function getSignature(parameters, timestamp, apiKey, apiSecret) {
  const data = timestamp + apiKey + recvWindow + parameters;
  return CryptoJS.HmacSHA256(data, apiSecret).toString(CryptoJS.enc.Hex);
}
export async function fetchBybitApi(apiKey, apiSecret, parameters, endpoint) {
  if (!apiKey || !apiSecret) return undefined;

  const timestamp = Date.now() - timeDiff;
  const fullendpoint = url + endpoint + "?" + parameters;
  const sign = getSignature(parameters, timestamp, apiKey, apiSecret);
  const headers = {
    "X-BAPI-SIGN-TYPE": "2",
    "X-BAPI-SIGN": sign,
    "X-BAPI-API-KEY": apiKey,
    "X-BAPI-TIMESTAMP": timestamp,
    "X-BAPI-RECV-WINDOW": recvWindow,
  };
  const config = {
    method: "GET",
    url: fullendpoint,
    headers: headers,
  };

  try {
    return await axios(config);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
