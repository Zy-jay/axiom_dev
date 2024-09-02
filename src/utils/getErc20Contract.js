import { ethers, getAddress } from "ethers";
import { getEthersProvider } from "./provider";
import ERC_20ABI from "./abi/erc20.json";

export function getErc20Contract(address, chainIdOrProvider) {
  const provider =
    typeof chainIdOrProvider === "number"
      ? getEthersProvider(chainIdOrProvider)
      : chainIdOrProvider;
  const erc20Contract = new ethers.Contract(
    getAddress(address),
    ERC_20ABI,
    provider
  );
  return erc20Contract;
}
