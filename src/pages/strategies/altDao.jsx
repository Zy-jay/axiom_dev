import "../../css/safe.css";
import Header from "../../componets/safe_components/header";
import HowWeWork from "../../componets/safe_components/howWeWork";
import Strategies from "../../componets/safe_components/strategies";
import Feedback from "../../componets/safe_components/feedback";
import Footer from "../../componets/safe_components/footer";
import { DAOs } from "../../utils/blockchain";
import { CovalentClient, GoldRushClient } from "@covalenthq/client-sdk";
import { useState } from "react";
import { useEffect } from "react";
import { parseUnits, formatUnits } from "viem";
import { useBalanceOf, useTotalSupply } from "../../hooks/useContactRead";
import { Providers } from "../../Providers";
import { getTokenHoldersSum } from "../../api/api";
import { useLocation } from "react-router-dom";

export const AltDao = () => {
	const { pathname } = useLocation();
	const client = new GoldRushClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");
	const [tokens, setTokens] = useState([]);
	const [sumDao, setSumDao] = useState(0);
	const [sumUsersLpTokens, setSumUsersLpTokens] = useState(0);

	useEffect(() => {
		client.BalanceService.getTokenBalancesForWalletAddress(
			"eth-mainnet",
			DAOs.axAltPortfolio
		).then((resp) => {
			const items = resp.data.items.filter(
				(i) => i.balance > 0 && i.contract_name !== "XDAO"
			);
			console.log("items: ", items);
			const _tokens = items.map((i) => ({
				img: i.logo_url,
				token: i.contract_ticker_symbol,
				amount: i.quote.toFixed(2),
			}));
			setTokens(_tokens.filter((t) => t.token !== "XDAO"));

			const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
			setSumDao(sum.toFixed(0));
		});
	}, [pathname]);

	// geting summ of all tokens which users have
	useEffect(() => {
		const foobar = async () => {
			const sum = await getTokenHoldersSum(
				DAOs.axAltPortfolioLP // лп токен адрес
			);
			if (sum) {
				setSumUsersLpTokens(sum);
			}
		};
		foobar();
	}, [pathname]);

	const [result, setResult] = useState(0);
	const totalSupplyLp = useTotalSupply({
		tokenAddress: "0x058ECb8723A77D22E331D1e0e01625B18BD33354", // lp token
	});
	const balanceLPCrowdModule = useBalanceOf({
		tokenAddress: "0x058ECb8723A77D22E331D1e0e01625B18BD33354", // lp token
		owner: "0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7", // crowd module
	});

	const balanceLPDAO = useBalanceOf({
		tokenAddress: "0x058ECb8723A77D22E331D1e0e01625B18BD33354", // lp token
		owner: "0xbf60a62a31f72df0806eaaf73d698a3862c8aa44", // dao
	});

	// seting final price
	useEffect(() => {
		console.log("sumDao: ", sumDao);
		console.log("sumUsersLpTokens: ", sumUsersLpTokens);
		console.log("totalSupplyLp: ", pathname);
		if (sumDao && sumUsersLpTokens) {
			const currentPrice = sumDao / sumUsersLpTokens;
			setResult(currentPrice.toFixed(2));
		}
	}, [sumDao, sumUsersLpTokens, pathname]);

	return (
		<div className="main">
			<Providers>
				<Header />
				<HowWeWork price={result} dao={"ALTPORFOLIO DAO"} />
				<Strategies tokens={tokens} />
				<Feedback />
				<Footer />
			</Providers>
		</div>
	);
};

// old formula
// useEffect(() => {
// 	console.log("sum: ", sumDau);
// 	console.log("balanceLP: ", balanceLPCrowdModule);
// 	console.log("totalSupplyLp: ", totalSupplyLp);
// 	console.log("balanceLPDAO: ", balanceLPDAO);

// 	if (balanceLPCrowdModule && sumDau && totalSupplyLp && balanceLPDAO == 0) {
// 		const dif =
// 			formatUnits(totalSupplyLp, 18) -
// 			formatUnits(balanceLPCrowdModule, 18) -
// 			formatUnits(balanceLPDAO, 18) +
// 			1;
// 		console.log("dif: ", dif);
// 		const res = sumDau / dif;

// 		setResult(res.toFixed(2));
// 	}
// }, [sumDau, balanceLPCrowdModule, totalSupplyLp, balanceLPDAO]);
