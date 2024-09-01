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

export const SafeDao = () => {
	const client = new CovalentClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");
	const [tokens, setTokens] = useState([]);
	const [sumDao, setSumDao] = useState(0);
	const [sumUsersLpTokens, setSumUsersLpTokens] = useState(0);
	useEffect(() => {
		client.BalanceService.getTokenBalancesForWalletAddress(
			"arbitrum-mainnet",
			DAOs.axSafe
		).then((resp) => {
			const items = resp.data.items.filter(
				(i) => i.balance > 0 && i.contract_name !== "XDAO"
			);
			const _tokens = items.map((i) => ({
				img: i.logo_url,
				token: i.contract_ticker_symbol,
				amount: i.quote.toFixed(2),
			}));
			setTokens(_tokens.filter((t) => t.token !== "XDAO"));
			const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
			console.log("getting balances: ", sum);
			setSumDao(sum.toFixed(0));
		});
	}, []);

	useEffect(() => {
		const foobar = async () => {
			const sum = await getTokenHoldersSum(
				"0x72F2fE2dF156ab863200B011A0b008A8a306F926"
			);
			if (sum) {
				console.log("getting holders balances:", sum);
				setSumUsersLpTokens(sum);
			}
		};
		foobar();
	}, []);

	const [result, setResult] = useState(0);
	const totalSupplyLp = useTotalSupply({
		tokenAddress: "0x72F2fE2dF156ab863200B011A0b008A8a306F926", // lp token
	});
	const balanceLPCrowdModule = useBalanceOf({
		tokenAddress: "0x72F2fE2dF156ab863200B011A0b008A8a306F926", // lp token
		owner: "0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7", // crowd module
	});

	const balanceLPDAO = useBalanceOf({
		tokenAddress: "0x72F2fE2dF156ab863200B011A0b008A8a306F926", // lp token
		owner: "0xbf60a62a31f72df0806eaaf73d698a3862c8aa44", // dao
	});

	useEffect(() => {
		console.log("set result");
		if (sumDao && sumUsersLpTokens) {
			const currentPrice = sumDao / sumUsersLpTokens;
			setResult(currentPrice.toFixed(3));
		}
	}, [sumDao, sumUsersLpTokens]);

	return (
		<div className="main">
			<Providers>
				<Header />
				<HowWeWork price={result} dao={"SAFE DAO"} />
				<Strategies tokens={tokens} />
				<Feedback />
				<Footer />
			</Providers>
		</div>
	);
};

// useEffect(() => {
// 	console.log("sum: ", sum);
// 	console.log("balanceLPCrowdModule: ", balanceLPCrowdModule);
// 	console.log("totalSupplyLp: ", totalSupplyLp);
// 	console.log("balanceLPDAO: ", balanceLPDAO);

// 	if (balanceLPCrowdModule && sum && totalSupplyLp && balanceLPDAO == 0) {
// 		console.log("!!!!in if else!!!!!");
// 		const dif =
// 			formatUnits(totalSupplyLp, 18) -
// 			formatUnits(balanceLPCrowdModule, 18) -
// 			formatUnits(balanceLPDAO, 18) +
// 			1;
// 		console.log("dif: ", dif);
// 		const res = sum / dif;

// 		setResult(res.toFixed(3));
// 		return;
// 	}
// 	console.log(111);
// 	setResult(sum);
// }, [sum, balanceLPCrowdModule, totalSupplyLp, balanceLPDAO]);
