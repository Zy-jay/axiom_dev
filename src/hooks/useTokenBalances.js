import { useQuery } from "react-query";
import { getEthersProvider } from "../utils/provider";
import { getTokenBalance } from "./getTokenBalance";
import { tryMultipleTimes } from "../utils/tryMultipleTimes";

const quryFetch = (address, owner, chainId) => {
  return [
    `balance-${address}-${owner}-${chainId}`,
    async () => {
      try {
        const provider = getEthersProvider(chainId);
        const balance = await tryMultipleTimes(() =>
          getTokenBalance(address, owner, chainId)
        );
        provider.destroy();
        return balance;
      } catch (err) {
        console.log(err);
        return undefined;
      }
    },
  ];
};

export function useTokenBalance(daoAddress, axAltPortfolioLpAddress, chainId) {
  const [queryKey, quryFetcher] = quryFetch(
    daoAddress,
    axAltPortfolioLpAddress,
    chainId
  );
  const { data, isLoading, error } = useQuery(queryKey, quryFetcher, {
    refetchInterval: 30000,
  });

  return {
    daoPrice: data,
    isDaoPriceLoading: isLoading,
    daoPriceErr: error,
  };
}

