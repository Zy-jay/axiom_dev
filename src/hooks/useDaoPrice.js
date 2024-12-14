import { useQuery } from "react-query";
import { GoldRushClient } from "@covalenthq/client-sdk";
import { contracts, DAOs } from "../utils/blockchain";
import { tryMultipleTimes } from "../utils/tryMultipleTimes";
import { getTokenTotalSuply } from "../utils/getTokenTotalSuply";
import { getTokenBalance } from "./getTokenBalance";
import { CrowdModuleARB, CrowdModuleETH } from "../constants/addresses";
import { DAOs_DATA } from "../constants/strategis";
import { getBybitBalance, getAssetInfo } from "../Bybit/endpoints";
import { COVALENT_API_KEY } from "../constants/env";
import { useMemo } from "react";

const TokensSymbolsExclude = ["DOGE"];

const client = new GoldRushClient(COVALENT_API_KEY);
const quryFetch = (daoAddress, axAltPortfolioLpAddress, chainId) => {
  return [
    `dao-price-${daoAddress}-${axAltPortfolioLpAddress}`,
    async () => {
      let tokens = undefined;
      if (!daoAddress || !axAltPortfolioLpAddress) return undefined;
      if (daoAddress === DAOs.axAirdrop) return { price: 1, tokens };
      const dao = Object.values(DAOs_DATA).find(
        (d) => d.currentDaoAddress === daoAddress
      );
      if (!dao) return undefined;
      const BYBIT_API_KEY =
        process.env["REACT_APP_BYBIT_API_KEY_" + dao.symbol];
      const BYBIT_API_SECRET =
        process.env["REACT_APP_BYBIT_API_SECRET_" + dao.symbol];
      let bybitBalance = undefined;
      if (BYBIT_API_KEY && BYBIT_API_SECRET) {
        bybitBalance = await tryMultipleTimes(
          async () => getBybitBalance(BYBIT_API_KEY, BYBIT_API_SECRET),
          5,
          1000
        );
      }
      try {
        // console.debug(axAltPortfolioLpAddress, chainId);

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
        if (!totalSupply || !crowdModuleBalance) return undefined;

        let sumDao = await tryMultipleTimes(
          () =>
            // isBtcDao
            //   ? getTokenBalance(
            //       contracts.AAVEWBTCToken.address,
            //       daoAddress,
            //       chainId
            //     ).then((balance) => Number(balance) / 10 ** 8)
            client.BalanceService.getTokenBalancesForWalletAddress(
              chainId,
              daoAddress
            )
              .then((resp) => {
                console.log("resp: ", resp);
                const items =
                  resp.data?.items.filter(
                    (i) =>
                      i.balance > 0 &&
                      i.contract_name !== "XDAO" &&
                      !i.contract_name.includes("https") &&
                      !i.contract_ticker_symbol.includes("https") &&
                      (isBtcDao
                        ? i.contract_address === contracts.AAVEWBTCToken.address
                        : true)
                  ) || [];
                tokens = items
                  .map((i) => {
                    let symbol = i.contract_ticker_symbol;
                    if (
                      TokensSymbolsExclude.includes(i.contract_ticker_symbol)
                    ) {
                      symbol = i.contract_ticker_symbol.toLowerCase();
                    }
                    const t = bybitBalance
                      ? bybitBalance?.find(
                          (b) => b.coin === i.contract_ticker_symbol
                        )
                      : undefined;
                    const balance =
                      Number(i.balance) / 10 ** i.contract_decimals +
                      (t ? Number(t.walletBalance) : 0);
                    return {
                      img: i.logo_url,
                      symbol,
                      usdValue: !t ? i.quote : balance * i.quote_rate,
                      address: i.contract_address,
                      decimals: i.contract_decimals,
                      balance,
                      name: i.contract_name,
                      price: i.quote_rate,
                    };

                    // amount: i.pretty_quote,
                  })
                  .filter((t) => t.token !== "XDAO");

                return isBtcDao
                  ? Number(items[0]?.balance) / 10 ** 8
                  : undefined;
              })
              .catch(console.error),
          3,
          1000
        );
        // console.log("bybitBalance", bybitBalance, tokens);

        if (!isBtcDao && bybitBalance?.length > 0 && tokens?.length > 0)
          for (const t of bybitBalance) {
            if (tokens.find((i) => i.symbol === t.coin)) continue;
            const tokenInfo = await getAssetInfo(
              BYBIT_API_KEY,
              BYBIT_API_SECRET,
              t.coin
            );
            if (!tokenInfo?.data?.result?.list) continue;
            // console.log("tokenInfo", tokenInfo);
            const price = Number(
              tokenInfo.data.result?.list[0]
                ? tokenInfo.data.result.list[0][4] ??
                    tokenInfo.data.result.list[0][1]
                : 0
            );
            // console.log("price", price);
            const balance = Number(t.walletBalance);
            tokens.push({
              img: undefined,
              symbol: t.coin,
              usdValue: balance * price,
              address: undefined,
              decimals: 8,
              balance: balance,
              name: t.coin,
              price: price,
            });
            console.log("tokenInfo", tokenInfo, price, balance);
          }
        sumDao = isBtcDao
          ? sumDao
          : tokens?.map((i) => i.usdValue).reduce((x, y) => x + y, 0);
        const sumUsersLpTokens = totalSupply - crowdModuleBalance;
        // if (isBtcDao) {
        //   const aaveWbtcBalanceDao =
        //     (await tryMultipleTimes(() =>
        //       getTokenBalance(
        //         contracts.AAVEWBTCToken.address,
        //         daoAddress,
        //         chainId
        //       )
        //     )) ?? 0n;
        //   // const daoLpBalance =
        //   //   (await tryMultipleTimes(() =>
        //   //     getTokenBalance(axAltPortfolioLpAddress, daoAddress, chainId)
        //   //   )) ?? 0n;
        //   // console.log(
        //   //   aaveWbtcBalanceDao,
        //   //   daoLpBalance,
        //   //   sumUsersLpTokens,
        //   //   sumUsersLpTokens - daoLpBalance,
        //   //   (sumUsersLpTokens - daoLpBalance) / 10n ** 10n
        //   // );
        //   tokens = [
        //     {
        //       symbol: "aArbWBTC",
        //       usdValue: 0,
        //       balance: aaveWbtcBalanceDao,
        //       // balance:
        //       //   (Number(aaveWbtcBalanceDao) /
        //       //     10 ** 8 /
        //       //     (Number(sumUsersLpTokens - daoLpBalance) / 10 ** 18)) *
        //       //   10 ** 8,
        //       decimals: 8,
        //       name: "Aave Arbitrum WBTC",
        //     },
        //   ];
        // }
        if (sumDao !== undefined && sumUsersLpTokens !== undefined) {
          const res = sumDao / (Number(sumUsersLpTokens) / 10 ** 18) ?? 1;
          return { price: res ?? undefined, tokens };
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

  return useMemo(() => {
    return {
      daoPrice: data?.price,
      tokens: data?.tokens,
      isDaoPriceLoading: isLoading,
      daoPriceErr: error,
    };
  }, [data, isLoading, error]);
}
