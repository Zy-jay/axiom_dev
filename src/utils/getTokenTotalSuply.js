import { getErc20Contract } from "./getErc20Contract";

export const getTokenTotalSuply = async (address, chainIdOrProvider) => {
  const contract = getErc20Contract(address, chainIdOrProvider);
  return await contract.totalSupply();
};
