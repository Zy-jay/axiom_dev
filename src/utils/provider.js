import { ALL_RPC_URLS } from "../constants/chains";
import { randomChoice } from "./randomChoice";
import { ethers } from "ethers";

export const getEthersProvider = (chainId) => {
  const url = randomChoice(ALL_RPC_URLS[chainId]);
  if (!url) throw new Error("No RPC URL found");
  return new ethers.JsonRpcProvider(url);
};
