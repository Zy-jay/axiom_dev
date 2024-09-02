import { useQuery } from "react-query";
import { GoldRushClient } from "@covalenthq/client-sdk";
import { contracts, DAOs } from "../utils/blockchain";
import { tryMultipleTimes } from "../utils/tryMultipleTimes";
import { getTokenTotalSuply } from "../utils/getTokenTotalSuply";
import { getEthersProvider } from "../utils/provider";
import { getTokenBalance } from "./getTokenBalance";
import { CrowdModuleARB, CrowdModuleETH } from "../constants/addresses";
const client = new GoldRushClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");

const quryFetch = (daoAddress, axAltPortfolioLpAddress, chainId) => {
  return [
    `dao-price-${daoAddress}-${axAltPortfolioLpAddress}`,
    async () => {
      if (!daoAddress || !axAltPortfolioLpAddress) return undefined;
      if (daoAddress === DAOs.axAirdrop) return 1;
      try {
        console.debug(axAltPortfolioLpAddress, chainId);

        const provider = getEthersProvider(chainId);
        const crowdModuleAddress =
          chainId === 1 ? CrowdModuleETH : CrowdModuleARB;
        const crowdModuleBalance = await tryMultipleTimes(
          () =>
            getTokenBalance(
              axAltPortfolioLpAddress,
              crowdModuleAddress,
              provider
            ),
          5,
          1000
        );
        const totalSupply = await tryMultipleTimes(
          () => getTokenTotalSuply(axAltPortfolioLpAddress, provider),
          5,
          1000
        );

        const isBtcDao = daoAddress === DAOs.axBTC;
        console.debug(totalSupply, crowdModuleBalance);
        const sumDao = await tryMultipleTimes(
          () =>
            isBtcDao
              ? getTokenBalance(
                  contracts.AAVEWBTCToken.address,
                  daoAddress,
                  provider
                ).then((balance) => Number(balance) / 10 ** 8)
              : client.BalanceService.getTokenBalancesForWalletAddress(
                  chainId === 1 ? "eth-mainnet" : "arbitrum-mainnet",
                  daoAddress
                ).then((resp) => {
                  console.log("resp: ", resp);
                  const items = resp.data.items.filter(
                    (i) => i.balance > 0 && i.contract_name !== "XDAO"
                  );

                  return items?.map((i) => i.quote).reduce((x, y) => x + y, 0);
                }),
          3,
          1000
        );

        if (!totalSupply || !crowdModuleBalance) return undefined;
        const sumUsersLpTokens = totalSupply - crowdModuleBalance;
        console.debug(sumDao, sumUsersLpTokens);
        provider.destroy();
        if (sumDao !== undefined && sumUsersLpTokens !== undefined) {
          const res = sumDao / (Number(sumUsersLpTokens) / 10 ** 18 ?? 1);
          console.debug(res);
          return res;
        }
      } catch (err) {
        // filterRpc(provider._getConnection().url, chainId);
        console.log(err);

        return undefined;
      }
    },
  ];
};

export function useDaoPrice(daoAddress, axAltPortfolioLpAddress, chainId) {
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
