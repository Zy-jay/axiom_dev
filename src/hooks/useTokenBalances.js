import { useQuery } from "react-query";
import { getEthersProvider } from "../utils/provider";
import { getTokenBalance } from "./getTokenBalance";
import { tryMultipleTimes } from "../utils/tryMultipleTimes";

const quryFetch = (address, owner, chainId) => {
  return [
    `token-balance-${address}-${owner}-${chainId}`,
    async () => {
      try {
        const provider = getEthersProvider(chainId);
        const balance = await tryMultipleTimes(
          () => getTokenBalance(address, owner, chainId),
          3,
          1000
        );
        provider.destroy();
        console.log("balance", balance);
        return balance;
      } catch (err) {
        console.log(err);
        return undefined;
      }
    },
  ];
};

export function useTokenBalance(address, owner, chainId) {
  const [queryKey, quryFetcher] = quryFetch(address, owner, chainId);
  const { data, isLoading, error } = useQuery(queryKey, quryFetcher, {});

  return {
    balance: data,
    isBalanceLoading: isLoading,
    balanceErr: error,
  };
}

