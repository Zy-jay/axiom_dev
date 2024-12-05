import { useQuery } from "react-query";
import { getBybitBalance, getAssetInfo } from "../Bybit/endpoints";

const quryFetch = () => {
  return [
    `bybit-account`,
    async () => {
      const balances = await getBybitBalance();
      console.log("balances", balances);
      if (!balances) return undefined;
      console.log("balances", balances);
      for (let i = 0; i < balances.length; i++) {
        const { data } = await getAssetInfo(balances[i].coin);
        console.log("getAssetInfo", data);
        if (data?.result?.list?.length > 0) {
          const price = data.result.list[0][4] ?? data.result.list[0][1];
          if (price) balances[i].price = Number(price);
        } else {
          balances[i].price = undefined;
        }
      }
      return balances;
    },
  ];
};

export function useByBitCoinsBalance() {
  const [queryKey, quryFetcher] = quryFetch();
  const { data, isLoading, error } = useQuery(queryKey, quryFetcher, {
    refetchInterval: 30000,
  });

  return {
    res: data,
    isResLoading: isLoading,
    resErr: error,
  };
}
