import { getErc20Contract } from "../utils/getErc20Contract";

export async function getTokenBalance(tokenAddress, owner, chainIdOrProvider) {
  const contract = getErc20Contract(tokenAddress, chainIdOrProvider);
  return await contract.balanceOf(owner);
}
