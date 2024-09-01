import "../../css/safe.css";
import Header from "../../componets/safe_components/header";
import HowWeWork from "../../componets/safe_components/howWeWork";
import Strategies from "../../componets/safe_components/strategies";
import Feedback from "../../componets/safe_components/feedback";
import Footer from "../../componets/safe_components/footer";
import { DAOs } from "../../utils/blockchain";
import { GoldRushClient } from "@covalenthq/client-sdk";
import { useState } from "react";
import { useEffect } from "react";
import { parseUnits, formatUnits } from "viem";
import { useBalanceOf, useTotalSupply } from "../../hooks/useContactRead";
import { Providers } from "../../Providers";
import { getTokenHoldersSum } from "../../api/api";
import { useLocation } from "react-router-dom";

function roundUpToThousands(number) {
	return Math.ceil(Number(number) * 1000) / 1000;
}

export const AirDao = () => {
	const { pathname } = useLocation();
	const client = new GoldRushClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");
	const [tokens, setTokens] = useState([]);
	const [sumDao, setSumDao] = useState(0);
	const [sumUsersLpTokens, setSumUsersLpTokens] = useState(0);

	useEffect(() => {
		client.BalanceService.getTokenBalancesForWalletAddress(
			"arbitrum-mainnet",
			DAOs.axAirdrop
		).then((resp) => {
			const items = resp.data.items.filter(
				(i) => i.balance > 0 && i.contract_name !== "XDAO"
			);
			const _tokens = items.map((i) => ({
				img: i.logo_url,
				token: i.contract_ticker_symbol,
				// amount: i.pretty_quote,
			}));

			const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
			setTokens(_tokens.filter((t) => t.token !== "XDAO"));
			setSumDao(sum.toFixed(0));
		});
	}, [pathname]);

	useEffect(() => {
		const foobar = async () => {
			const sum = await getTokenHoldersSum(
				"0x72F2fE2dF156ab863200B011A0b008A8a306F926"
			);
			if (sum) {
				setSumUsersLpTokens(sum);
			}
		};
		foobar();
	}, [pathname]);

	const [result, setResult] = useState(0);
	const totalSupplyLp = useTotalSupply({
		tokenAddress: "0x24536722187680Eb71C270c7cC45A44C34162381", // lp token
	});
	const balanceLPCrowdModule = useBalanceOf({
		tokenAddress: "0x24536722187680Eb71C270c7cC45A44C34162381", // lp token
		owner: "0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7", // crowd module
	});

	const balanceLPDAO = useBalanceOf({
		tokenAddress: "0x24536722187680Eb71C270c7cC45A44C34162381", // lp token
		owner: "0xf958e82b5a8e615cb3476b59f9589c45df67acca", // dao
	});

	useEffect(() => {
		if (sumDao && sumUsersLpTokens) {
			console.log("sumDau: ", sumDao);
			console.log("sumUsersLpTokens: ", sumUsersLpTokens);

			const currentPrice = sumDao / sumUsersLpTokens;
			setResult(currentPrice.toFixed(3));
		}
	}, [sumDao, sumUsersLpTokens, pathname]);

	return (
		<div className="main">
			<Providers>
				<Header />
				<HowWeWork price={1} dao={"AIR DROP DAO"} />
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
// 	}
// }, [sumDao, balanceLPCrowdModule, totalSupplyLp, balanceLPDAO]);
