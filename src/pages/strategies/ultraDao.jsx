import "../../css/safe.css";
import Header from "../../componets/safe_components/header";
import HowWeWork from "../../componets/safe_components/howWeWork";
import Strategies from "../../componets/safe_components/strategies";
import Feedback from "../../componets/safe_components/feedback";
import Footer from "../../componets/safe_components/footer";
import { DAOs } from "../../utils/blockchain";
import { CovalentClient } from "@covalenthq/client-sdk";
import { useState } from "react";
import { useEffect } from "react";
import { parseUnits, formatUnits } from "viem";
import { useBalanceOf, useTotalSupply } from "../../hooks/useContactRead";
import { Providers } from "../../Providers";
import { getTokenHoldersSum } from "../../api/api";
import { useLocation } from "react-router-dom";

export const UltraDao = () => {
	const client = new CovalentClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");
	const [tokens, setTokens] = useState([]);
	const [sumDao, setSum] = useState(0);
	const [sumUsersLpTokens, setSumUsersLpTokens] = useState(0);
	const { pathname } = useLocation();

	useEffect(() => {
		client.BalanceService.getTokenBalancesForWalletAddress(
			"arbitrum-mainnet",
			DAOs.axUltra
		).then((resp) => {
			const items = resp.data.items.filter(
				(i) => i.balance > 0 && i.contract_name !== "XDAO"
			);
			const _tokens = items.map((i) => ({
				img: i.logo_url,
				token: i.contract_ticker_symbol,
				amount: i.quote.toFixed(2),
			}));
			const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
			setSum(sum.toFixed(0));
			setTokens(_tokens.filter((t) => t.token !== "XDAO"));
		});
	}, [pathname]);

	useEffect(() => {
		const foobar = async () => {
			const sum = await getTokenHoldersSum(
				"0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745"
			);
			if (sum) {
				setSumUsersLpTokens(sum);
			}
		};
		foobar();
	}, [pathname]);

	const [result, setResult] = useState(0);
	const totalSupplyLp = useTotalSupply({
		tokenAddress: "0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745", // lp token
	});
	const balanceLPCrowdModule = useBalanceOf({
		tokenAddress: "0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745", // lp token
		owner: "0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7", // crowd module
	});

	const balanceLPDAO = useBalanceOf({
		tokenAddress: "0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745", // lp token
		owner: "0xe8740f7786ae2c674e484a71741247ee22fb125a", // dao
	});

	useEffect(() => {
		if (sumDao && sumUsersLpTokens) {
			const currentPrice = sumDao / sumUsersLpTokens;
			setResult(currentPrice.toFixed(3));
		}
	}, [sumDao, sumUsersLpTokens, pathname]);

	return (
		<div className="main">
			<Providers>
				<Header />
				<HowWeWork price={result} dao={"ULTRA DAO"} />
				<Strategies tokens={tokens} />
				<Feedback />
				<Footer />
			</Providers>
		</div>
	);
};

// useEffect(() => {
// 	console.log("sum: ", sumDao);
// 	console.log("balanceLP: ", balanceLPCrowdModule);
// 	console.log("totalSupplyLp: ", totalSupplyLp);
// 	console.log("balanceLPDAO: ", balanceLPDAO);

// 	if (balanceLPCrowdModule && sumDao && totalSupplyLp && balanceLPDAO == 0) {
// 		const dif =
// 			formatUnits(totalSupplyLp, 18) -
// 			formatUnits(balanceLPCrowdModule, 18) -
// 			formatUnits(balanceLPDAO, 18) +
// 			1;
// 		// const dif = formatUnits(
// 		// 	totalSupplyLp - balanceLPCrowdModule - balanceLPDAO,
// 		// 	18
// 		// );
// 		console.log("dif: ", dif);
// 		const res = sumDao / dif;

// 		setResult(res);
// 		return;
// 	}
// 	setResult(sumDao);
// }, [sumDao, balanceLPCrowdModule, totalSupplyLp, balanceLPDAO]);
