import { getErc20Contract } from "./getErc20Contract";

export const getTokenInfo = async (address, chainId) => {
  const contract = getErc20Contract(address, chainId);
  return {
    address,
    chainId,
    decimals: await contract.decimals(),
    name: await contract.name(),
    symbol: await contract.symbol(),
    url: "",
  };
};

