import axios from "axios";
import crypto from "crypto";
import { BYBIT_API_KEY } from "../constants/env";

var recvWindow = 5000;
const url = "https://api.bybit.com/v5/";

const timeDiff = 1368;

export function getSignature(parameters, timestamp, apiKey, apiSecret) {
  return crypto
    .createHmac("sha256", apiSecret)
    .update(timestamp + apiKey + recvWindow + parameters)
    .digest("hex");
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
