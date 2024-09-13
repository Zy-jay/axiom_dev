import { useQuery } from "react-query";
import { GoldRushClient } from "@covalenthq/client-sdk";
import { contracts, DAOs } from "../utils/blockchain";
import { tryMultipleTimes } from "../utils/tryMultipleTimes";
import { getTokenTotalSuply } from "../utils/getTokenTotalSuply";
import { getTokenBalance } from "./getTokenBalance";
import { CrowdModuleARB, CrowdModuleETH } from "../constants/addresses";
const client = new GoldRushClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");

const quryFetch = (daoAddress, axAltPortfolioLpAddress, chainId) => {
  return [
    `dao-price-${daoAddress}-${axAltPortfolioLpAddress}`,
    async () => {
      let tokens = undefined;
      if (!daoAddress || !axAltPortfolioLpAddress) return undefined;
      if (daoAddress === DAOs.axAirdrop) return { price: 1, tokens };
      try {
        console.debug(axAltPortfolioLpAddress, chainId);

        const crowdModuleAddress =
          chainId === 1 ? CrowdModuleETH : CrowdModuleARB;
        const crowdModuleBalance = await tryMultipleTimes(
          () =>
            getTokenBalance(
              axAltPortfolioLpAddress,
              crowdModuleAddress,
              chainId
            ),
          5,
          1000
        );
        const totalSupply = await tryMultipleTimes(
          () => getTokenTotalSuply(axAltPortfolioLpAddress, chainId),
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
                  chainId
                ).then((balance) => Number(balance) / 10 ** 8)
              : client.BalanceService.getTokenBalancesForWalletAddress(
                  chainId === 1 ? "eth-mainnet" : "arbitrum-mainnet",
                  daoAddress
                ).then((resp) => {
                  console.log("resp: ", resp);
                  const items = resp.data.items.filter(
                    (i) =>
                      i.balance > 0 &&
                      i.contract_name !== "XDAO" &&
                      !i.contract_name.includes("https") &&
                      !i.contract_ticker_symbol.includes("https")
                  );
                  tokens = items
                    .map((i) => ({
                      img: i.logo_url,
                      symbol: i.contract_ticker_symbol,
                      usdValue: i.quote,
                      address: i.contract_address,
                      decimals: i.contract_decimals,
                      balance: i.balance,
                      name: i.contract_name,

                      // amount: i.pretty_quote,
                    }))
                    .filter((t) => t.token !== "XDAO");

                  return items?.map((i) => i.quote).reduce((x, y) => x + y, 0);
                }),
          3,
          1000
        );

        if (!totalSupply || !crowdModuleBalance) return undefined;
        const sumUsersLpTokens = totalSupply - crowdModuleBalance;
        if (isBtcDao) {
          const aaveWbtcBalanceDao =
            (await tryMultipleTimes(() =>
              getTokenBalance(
                contracts.AAVEWBTCToken.address,
                daoAddress,
                chainId
              )
            )) ?? 0n;
          // const daoLpBalance =
          //   (await tryMultipleTimes(() =>
          //     getTokenBalance(axAltPortfolioLpAddress, daoAddress, chainId)
          //   )) ?? 0n;
          // console.log(
          //   aaveWbtcBalanceDao,
          //   daoLpBalance,
          //   sumUsersLpTokens,
          //   sumUsersLpTokens - daoLpBalance,
          //   (sumUsersLpTokens - daoLpBalance) / 10n ** 10n
          // );
          tokens = [
            {
              symbol: "aArbWBTC",
              usdValue: 0,
              balance: aaveWbtcBalanceDao,
              // balance:
              //   (Number(aaveWbtcBalanceDao) /
              //     10 ** 8 /
              //     (Number(sumUsersLpTokens - daoLpBalance) / 10 ** 18)) *
              //   10 ** 8,
              decimals: 8,
              name: "Aave Arbitrum WBTC",
            },
          ];
        }
        if (sumDao !== undefined && sumUsersLpTokens !== undefined) {
          const res = sumDao / (Number(sumUsersLpTokens) / 10 ** 18) ?? 1;
          return { price: res, tokens };
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
  const { data, isLoading, error } = useQuery(queryKey, quryFetcher);

  return {
    daoPrice: data?.price,
    tokens: data?.tokens,
    isDaoPriceLoading: isLoading,
    daoPriceErr: error,
  };
}
