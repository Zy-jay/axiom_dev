import { GoldRushClient } from "@covalenthq/client-sdk";
import { useQuery } from "react-query";
const client = new GoldRushClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");

const quryFetch = (address) => {
  return [
    `user-lps-balances-${address}`,
    async () => {
      if (!address) return undefined;
      try {
        const resp =
          await client.BalanceService.getTokenBalancesForWalletAddress(
            "arbitrum-mainnet",
            address
          );
        const items = resp?.data?.items;
        if (!items) return;
        // Создаем объект для хранения данных токенов
        const tokenData = {};
        items.forEach((item) => {
          // console.log(item.contract_name)
          // console.log(typeof(item.balance) + " item balance")

          // console.log(typeof(item.contract_decimals) + " item decimals")
          const balance = Number(item.balance); // BigInt
          const decimals = item.contract_decimals; // Преобразуем в BigInt

          let formattedBalance = Number(balance / 10 ** decimals);
          tokenData[item.contract_ticker_symbol] = formattedBalance;
        });

        // Обновляем состояние complexLPData
        return tokenData;
      } catch (err) {
        // filterRpc(provider._getConnection().url, chainId);
        console.log(err);

        return undefined;
      }
    },
  ];
};

export function useComplexLPData(address) {
  const [queryKey, quryFetcher] = quryFetch(address);
  const { data, isLoading, error } = useQuery(queryKey, quryFetcher, {
    refetchInterval: 30000,
  });

  return {
    userLpBalances: data,
    isUserLpBalancesLoading: isLoading,
    lpBalancesErr: error,
  };
}
