import { useReadContract } from "wagmi";
import { contracts } from "../utils/blockchain.js";

const { XDAO, erc20Abi, crowd } = contracts;

export const useAllowance = ({ tokenAddress, owner, spender }) => {
  const config = {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner, spender],
  };

  const { data } = useReadContract(config);

  return data;
};

export const useBalanceOf = ({ tokenAddress, owner }) => {
  const config = {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [owner],
  };

  const { data } = useReadContract(config);

  return data;
};

export const useTotalSupply = ({ tokenAddress }) => {
  const config = {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "totalSupply",
    args: [],
  };

  const { data } = useReadContract(config);

  return data;
};

export const useDecimals = ({ tokenAddress }) => {
  const config = {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
    args: [],
  };

  const { data } = useReadContract(config);

  return data;
};

export const useSaleInfo = ({ xdaoAddress, tokenAddress, index }) => {
  const config = {
    address: xdaoAddress,
    abi: XDAO.abi,
    functionName: "getSaleInfo",
    args: [tokenAddress, index],
  };

  const { data } = useReadContract(config);

  return data;
};

export const useRegularFeeRate = (xdaoAddress) => {
  const config = {
    address: xdaoAddress,
    abi: XDAO.abi,
    functionName: "regularFeeRate",
    args: [],
  };

  const { data } = useReadContract(config);
  return data;
};

export const useSaleIndex = ({ tokenAddress }) => {
  const config = {
    address: crowd.address,
    abi: crowd.abi,
    functionName: "saleIndexes",
    args: [tokenAddress],
  };

  const { data } = useReadContract(config);

  return data;
};
