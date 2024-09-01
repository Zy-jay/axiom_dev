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
import { useLocation } from "react-router-dom";

function roundUpToThousands(number) {
	return Math.ceil(Number(number) * 1000) / 1000;
}

export const BtcDao = () => {
	const client = new CovalentClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");
	const [tokens, setTokens] = useState([]);
	const { pathname } = useLocation();

	useEffect(() => {
		client.BalanceService.getTokenBalancesForWalletAddress(
			"arbitrum-mainnet",
			DAOs.axBTC
		).then((resp) => {
			const items = resp.data.items.filter((i) => i.quote > 0);
			const _tokens = items.map((i) => ({
				img: i.logo_url,
				token: i.contract_ticker_symbol,
				amount: formatUnits(i.balance, i.contract_decimals),
			}));
			setTokens(_tokens.filter((t) => t.token === "aArbWBTC"));
		});
	}, []);

	const [result, setResult] = useState(0);
	const totalSupplyLp = useTotalSupply({
		tokenAddress: "0xd1903ee89EF554dDC92cD2C3143F752BC85FDB3c",
	});
	const balanceLP = useBalanceOf({
		tokenAddress: "0xd1903ee89EF554dDC92cD2C3143F752BC85FDB3c",
		owner: "0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7",
	});
	const balanceARBBTC = useBalanceOf({
		tokenAddress: "0x078f358208685046a11C85e8ad32895DED33A249",
		owner: "0xf878D10a8b95bDEe2747BD1FAf7A3f3e2B7f19be",
	});

	useEffect(() => {
		if (balanceLP && balanceARBBTC && totalSupplyLp) {
			const res =
				formatUnits(balanceARBBTC, 8) /
				formatUnits(totalSupplyLp - balanceLP, 18);
			setResult(roundUpToThousands(res));
		}
	}, [balanceARBBTC, balanceLP, totalSupplyLp]);

	return (
		<div className="main">
			<Providers>
				<Header />
				<HowWeWork price={result} isBtc={true} dao={"BTC DAO"} text={"sad"} />
				<Strategies tokens={tokens} />
				<Feedback />
				<Footer />
			</Providers>
		</div>
	);
};
