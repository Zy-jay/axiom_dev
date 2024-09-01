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
import MintchainLogo from "../../assets/images/images_home/mintchain-logo.png";
import ScrollLogo from "../../assets/images/images_home/scroll_logo.png";
import WArpcastLogo from "../../assets/images/images_home/warpcast-logo.png";
import MMLogo from "../../assets/images/images_home/metamask-logo.png";
import GrassLogo from "../../assets/images/images_home/grass_logo_updated.png";
import PolygonLogo from "../../assets/images/images_home/polygon-zkevm-logo.png";
import BaseLogo from "../../assets/images/images_home/base_kinza_logo.png";
import ZoraLogo from "../../assets/images/images_home/zora-logo.png";
import ArbLogo from "../../assets/images/images_home/arbitrum-nova-logo.png";

function roundUpToThousands(number) {
	return Math.ceil(Number(number) * 1000) / 1000;
}
const AIRDROP_DAO_PORTFOLIO_ITEMS = [
	{
		logo: MintchainLogo,
		title: "Mintchain",
		text: "An Ethereum Layer 2 specifically designed for NFTs. A young project with undisclosed investments, but already supported by Celestia and Optimism.",

	}, {
		logo: WArpcastLogo,
		title: "Warpcast",
		text: "A social app on the Farcaster protocol where users share short posts, interact with likes, reposts, and in-app currency. It features Frames for creating mini-apps within posts."
	},
	{
		text: "NFT marketplace that raised around $60M from Paradigm, Haun Ventures, and Coinbase Ventures. Zora may offer incentives like crypto asset airdrops to users, as stated on their website.",
		logo: ZoraLogo,
		title: "Zora",
	}, {
		logo: GrassLogo,
		title: "Grass",
		text: "An infrastructure that sells your unused internet to AI companies via a web extension, earning you tokens. Your data is securely encrypted and used for AI training without impacting your privacy or internet speed."
	}, {
		text: "Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.",
		title: "Base x Kinza",
		logo: BaseLogo,
	},
	{
		logo: ScrollLogo,
		title: "Scroll",
		text: "Ethereum's second-tier scaling solution reduces transaction costs and speeds up transfers, enhancing scalability and accessibility while maintaining security.",
	},

	{
		logo: MMLogo,
		title: "Metamask",
		text: "Is a non-custodial crypto wallet that allow you receive, store and send cryptocurrency asset."
	},

	{
		text: "Polygon zkEVM Beta is the leading ZK scaling solution that is equivalent to Ethereum Virtual",
		title: "Polygon zkEVM",
		logo: PolygonLogo,
	}, {
		text: "Nova powers dapps with high transaction volumes that seek to drive costs even lower, for Game Developers, Social",
		title: "Arbitrum Nova",
		logo: ArbLogo
	}
]

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
			<Header />
			<HowWeWork price={1} dao={"AIR DROP DAO"} />
			<Strategies portfolio={AIRDROP_DAO_PORTFOLIO_ITEMS} />
			<Feedback />
			<Footer />
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
