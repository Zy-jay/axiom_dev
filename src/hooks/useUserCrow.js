import { GoldRushClient } from "@covalenthq/client-sdk";
import { useQuery } from "react-query";
const client = new GoldRushClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");

const quryFetch = (daoType) => {
  return [
    `crow-${daoType}`,
    async () => {
      try {
        const resp =
          await client.BalanceService.getTokenBalancesForWalletAddress(
            daoType === "0xeebe6f7fd87ed28748f5e4d3e339ba0f28e90782"
              ? "eth-mainnet"
              : "arbitrum-mainnet",
            daoType
          );
        const items = resp?.data?.items;

        if (!items) return;
        const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);

        return sum.toFixed(2);
      } catch (err) {
        // filterRpc(provider._getConnection().url, chainId);
        console.log(err);

        return undefined;
      }
    },
  ];
};

export function useUserCrowd(daoType) {
  const [queryKey, quryFetcher] = quryFetch(daoType);
  const { data, isLoading, error } = useQuery(queryKey, quryFetcher, {
    refetchInterval: 30000,
  });

  return {
    userCrowd: data,
    isUserCrowd: isLoading,
    crowdErr: error,
  };
}
