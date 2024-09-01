import { useEffect, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { parseUnits, formatUnits, bytesToString } from "viem";
import circle_swap from "../../assets/images/images_swap/circle_swap.webp";
import bitcoinLogo from "../../assets/images/images_swap/bitcoin-logo.svg";
import BTCDaoLogo from "../../assets/images/images_swap/btcdaologo.png";
import greenbitcoinlogo from "../../assets/images/images_swap/btcdaologo.png";
import dashboardicon from "../../assets/images/images_swap/dashboard_icon.svg";
import ellipse_one from "../../assets/images/images_swap/ellipse_one.svg";
import { toast } from "react-toastify";
import ellipse_two from "../../assets/images/images_swap/ellipse_two.svg";
import ellipse_three from "../../assets/images/images_swap/ellipse_three.svg";
import ellipse_fore from "../../assets/images/images_swap/ellipse_fore.svg";
import token_icon from "../../assets/images/images_swap/token_icon.svg";
import down_chevron from "../../assets/images/images_swap/down_chevron.svg";
import vector from "../../assets/images/images_swap/vector.svg";
import parameters_vector from "../../assets/images/images_swap/parameters_vector.svg";
import upward_shift from "../../assets/images/images_swap/upward_shift.svg";
import left_green_circle from "../../assets/images/images_swap/left_green_circle.png";
import right_oreng_circle from "../../assets/images/images_swap/right_oreng_circle.png";
import vector_smart_object from "../../assets/images/images_swap/vector_smart_object.svg";
import React from "react";
import ellipse_one_mobile from "../../assets/images/images_swap/ellipse_one_mobille.png";
import ellipse_two_mobile from "../../assets/images/images_swap/ellipse_two_mobile.png";
import { useLocation } from "react-router-dom";
import usdt from "../../assets/images/images_safe/usdt.svg";

import { CustomConnectButton } from "./CustomConnect";
import {
	useSaleInfo,
	useBalanceOf,
	useDecimals,
	useAllowance,
	useRegularFeeRate,
	useTotalSupply,
} from "../../hooks/useContactRead";
import {
	contracts,
	AAVEWBTCOwner,
	CURRENT_DAO_INDEX,
} from "../../utils/blockchain.js";
import { useApproveWrite, useBuyWrite } from "../../hooks/useContractWrite";
import { toOptionalFixed } from "../../utils/converter";

import airDaoLogo from "../../assets/images/images_dashboard/air.webp";
import ultraDaoLogo from "../../assets/images/images_dashboard/ultra.webp";
import safeDaoLogo from "../../assets/images/images_dashboard/safedaologo.png";
import altDaoLogo from "../../assets/images/images_dashboard/altportfolio.webp";
import { CovalentClient } from "@covalenthq/client-sdk";
import { getTokenHoldersSum } from "../../api/api.js";
import { useChainId } from "wagmi";
import { useSwitchChain } from "wagmi";
import ConfirmModal from "../UI/confirmModal.jsx";

function roundUpToThousands(number) {
	return Math.ceil(Number(number) * 1000) / 1000;
}
const url =
	"https://api.arbiscan.io/api?module=token&action=tokenholderlist&contractaddress=0x7f1Dd51843D8C4106213d0a4C3a7e96306C5d86F&&apikey=CC8VKJEZ5IES95BEMREN2FT3HUHITIS9IJ";

const crowdAddress = "0x711E14eBC41A8f1595433FA4409a50BC9838Fc03";

const GodObject = {
	"/strategies/ultrdao/swap": {
		name: "ultraDao",
		token1Name: "USDT",
		token2Name: "axULT",
		chainId: 1,
		token1Logo: usdt,
		token2Logo: ultraDaoLogo,
		logoBottom: ultraDaoLogo,
		addressDao: "0x92cb7baef8eddb1d6a02fa236b356124ad0530a5", // "0xe8740f7786ae2c674e484a71741247ee22fb125a",
		addressLp: "0xcB87b5D12CE6239F90992196CedbFCbF8e78ea13", // "0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745",
		addressUSDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
	},
	"/strategies/safedao/swap": {
		name: "safeDao",
		token1Name: "USDT",
		token2Name: "axSAFE",
		token1Logo: usdt,
		chainId: 42161,
		token2Logo: safeDaoLogo,
		logoBottom: safeDaoLogo,
		addressDao: "0xdb95465de86c947f7de927eb604bad526696881b",
		addressLp: "0x72F2fE2dF156ab863200B011A0b008A8a306F926",
		addressUSDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
	},
	"/strategies/airdropdao/swap": {
		name: "airdropDao",
		token1Name: "USDT",
		token2Name: "axAD",
		token1Logo: usdt,
		token2Logo: airDaoLogo,
		logoBottom: airDaoLogo,
		chainId: 42161,
		addressDao: "0xf958e82b5a8e615cb3476b59f9589c45df67acca",
		addressLp: "0x24536722187680Eb71C270c7cC45A44C34162381",
		addressUSDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
	},
	"/strategies/btcdao/swap": {
		name: "btcDao",
		token1Name: "wBTC",
		token2Name: "axBTC",
		token1Logo: bitcoinLogo,
		token2Logo: greenbitcoinlogo,
		logoBottom: BTCDaoLogo,
		chainId: 42161,
		addressDao: "0xf878d10a8b95bdee2747bd1faf7a3f3e2b7f19be",
		addressLp: "0xd1903ee89EF554dDC92cD2C3143F752BC85FDB3c",
		addressUSDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
		addressWBTC: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
	},
	"/strategies/altporfoliodao/swap": {
		name: "altDao",
		token1Name: "USDT",
		token2Name: "axALT",
		token1Logo: usdt,
		token2Logo: altDaoLogo,
		logoBottom: altDaoLogo,
		chainId: 1,
		addressDao: "0xeebe6f7fd87ed28748f5e4d3e339ba0f28e90782",
		addressLp: "0x8C3fce8E9bB082eFe5fB8922A45D0619Cae02435",
		addressUSDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
	},
};


const crowdModuleETH = '0x711e14ebc41a8f1595433fa4409a50bc9838fc03';
const crowdModuleARB = '0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7';

// function isChainSupported(chain, pathname) {
// 	if (chain === undefined) {
// 		return chain;
// 	}
// 	if (chain.id === 42161 && (pathname === "/strategies/altporfoliodao/swap" || pathname === "/strategies/ultrdao/swap")) {
// 		return "eth";
// 	}
// 	return chain;
// }

const Dashboard = () => {
	let { pathname } = useLocation();

	const { chains, switchChain } = useSwitchChain();
	const { address, isConnected, chain } = useAccount();


	let [sumDao, setSumDao] = useState(0);
	const [sumUsersLpTokens, setSumUsersLpTokens] = useState(0);
	const [isBtcDao, setIsBtcDao] = useState(pathname === "/strategies/btcdao/swap");
	const [currentLPAddress, setCurrentLPAddress] = useState(GodObject[pathname].addressLp);
	const xdaoAddress = GodObject[pathname].chainId === 1 ? crowdModuleETH : crowdModuleARB;

	useEffect(() => {
		if (GodObject[pathname]) {
			setCurrentLPAddress(GodObject[pathname].addressLp);
		}
	}, [pathname]);

	useEffect(() => {
		if (pathname === "/strategies/btcdao/swap") {
			setIsBtcDao(true);
			return;
		} else {
			setIsBtcDao(false);
			return;
		}
	}, [pathname]);

	const client = new CovalentClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");
	useEffect(() => {
		client.BalanceService.getTokenBalancesForWalletAddress(
			"arbitrum-mainnet",
			GodObject[pathname].addressDao
		).then((resp) => {
			const items = resp.data.items.filter(
				(i) => i.balance > 0 && i.contract_name !== "XDAO"
			);
			const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
			setSumDao(sum.toFixed(2));
		});
	}, []);

	useEffect(() => {
		const foobar = async () => {
			const sum = await getTokenHoldersSum(GodObject[pathname].addressLp);
			if (sum) {
				setSumUsersLpTokens(sum);
			}
		};
		foobar();
	}, []);

	useEffect(() => {
		// заглушка, делает curent share price 1,
		// убрать когда нужно будет реальное значение
		if (GodObject[pathname].name === "airdropDao") {
			setResult(1);
			return;
		}

		if (sumDao && sumUsersLpTokens) {
			const currentPrice = sumDao / sumUsersLpTokens;
			setResult(currentPrice.toFixed(3));
		}
	}, [sumDao, sumUsersLpTokens, GodObject]);

	const balanceARBBTC = useBalanceOf({
		tokenAddress: "0x078f358208685046a11C85e8ad32895DED33A249",
		owner: "0xf878D10a8b95bDEe2747BD1FAf7A3f3e2B7f19be",
	});

	const totalSupplyLp = useTotalSupply({
		tokenAddress: "0xd1903ee89EF554dDC92cD2C3143F752BC85FDB3c",
	});
	const balanceLP = useBalanceOf({
		tokenAddress: "0xd1903ee89EF554dDC92cD2C3143F752BC85FDB3c",
		owner: xdaoAddress,
	});

	const [amount, setAmount] = useState(0);
	const [receive, setReceive] = useState(0);
	const [isTxLoading, setIsTxLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [isSwitched, setIsSwitched] = useState(false);
	const [result, setResult] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { XDAOToken, WBTCToken, AAVEWBTCToken } =
		contracts;

	const requiredXDAOTokens = 5000000000000000000;


	const saleInfo = useSaleInfo({
		xdaoAddress: xdaoAddress,
		tokenAddress: GodObject[pathname].addressDao,
		index: CURRENT_DAO_INDEX,
	});

	let balanceLPCrowdModule = useBalanceOf({
		tokenAddress: "0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745", // lp token
		owner: "0x711E14eBC41A8f1595433FA4409a50BC9838Fc03", // crowd module
	});

	const feeRate = useRegularFeeRate(xdaoAddress);

	const WBTCBalance = useBalanceOf({
		tokenAddress: WBTCToken.address,
		owner: !refetch && address,
	});

	const USDTBalance = useBalanceOf({
		tokenAddress: GodObject[pathname].addressUSDT,
		owner: !refetch && address,
	});

	const AAVEWBTCTokenBalance = useBalanceOf({
		tokenAddress: AAVEWBTCToken.address,
		owner: AAVEWBTCOwner,
	});

	const wBTCDAOBalance = useBalanceOf({
		tokenAddress: WBTCToken.address,
		owner: AAVEWBTCOwner,
	});

	const lpTokenSupply = useTotalSupply({
		tokenAddress: currentLPAddress,
	});

	useEffect(() => {
		if (balanceLP && balanceARBBTC && totalSupplyLp && isBtcDao && isBtcDao) {
			const res =
				formatUnits(balanceARBBTC, 8) /
				formatUnits(totalSupplyLp - balanceLP, 18);
			setResult(roundUpToThousands(res));
		}
	}, [balanceARBBTC, balanceLP, totalSupplyLp, isBtcDao]);

	useEffect(() => {
		const getData = async () => {
			fetch(url).then((res) => res.json());
		};
		getData();
	}, []);

	const LPBalanceDAO = useBalanceOf({
		tokenAddress: currentLPAddress,
		owner: AAVEWBTCOwner,
	});

	const LPBalanceUser = useBalanceOf({
		tokenAddress: currentLPAddress,
		owner: !refetch && address,
	});

	const XDAOTokenBalance = useBalanceOf({
		tokenAddress: XDAOToken.address,
		owner: address,
	});

	const WBTCDecimals = 8 // useDecimals({ tokenAddress: WBTCToken.address }); // should be 8
	const USDTDecimals = 6 // useDecimals({
	// 	tokenAddress: GodObject[pathname].addressUSDT,
	// }); //should be 6

	const AAVEWBTCTokenDecimals = useDecimals({
		tokenAddress: AAVEWBTCToken.address,
	});

	const LPDecimals = useDecimals({ tokenAddress: currentLPAddress });

	const WBTCAllowance = useAllowance({
		tokenAddress: WBTCToken.address,
		owner: !refetch && address,
		spender: xdaoAddress,
	});

	const USDTAllowance = useAllowance({
		tokenAddress: GodObject[pathname].addressUSDT,
		owner: !refetch && address,
		spender: xdaoAddress,
	});

	const XDAOTokenConditions = useMemo(() => {
		return XDAOTokenBalance >= requiredXDAOTokens;
	}, [XDAOTokenBalance, requiredXDAOTokens]);

	const formattedWBTCBalance = useMemo(() => {
		return WBTCBalance !== undefined && WBTCDecimals
			? formatUnits(WBTCBalance, WBTCDecimals)
			: undefined;
	}, [WBTCBalance, WBTCDecimals]);

	const formattedUSDTBalance = useMemo(() => {
		return USDTBalance !== undefined && USDTDecimals
			? formatUnits(USDTBalance, USDTDecimals)
			: undefined;
	}, [USDTBalance, USDTDecimals]);

	const formattedAAVEWBTCTokenBalance = useMemo(() => {
		return AAVEWBTCTokenBalance !== undefined && AAVEWBTCTokenDecimals
			? formatUnits(AAVEWBTCTokenBalance, AAVEWBTCTokenDecimals)
			: undefined;
	}, [AAVEWBTCTokenBalance, AAVEWBTCTokenDecimals]);

	const formattedLPBalanceUser = useMemo(() => {
		console.debug("LPBalanceUser", LPBalanceUser, LPDecimals);
		return LPBalanceUser !== undefined && LPDecimals
			? formatUnits(LPBalanceUser ?? 0n, LPDecimals)
			: undefined;
	}, [LPBalanceUser, LPDecimals]);

	const parsedAmount = useMemo(() => {
		if (!USDTDecimals) return undefined;
		if (isNaN(amount) || amount <= 0) return undefined;

		const minAmount = 1 / Math.pow(10, USDTDecimals);
		if (amount < minAmount) {
			return undefined;
		}

		try {
			return parseUnits(String(amount), USDTDecimals);
		} catch (error) {
			return undefined;
		}
	}, [amount, USDTDecimals]);

	// const totalBTCBalance = useMemo(() => {
	// 	return AAVEWBTCTokenBalance + wBTCDAOBalance;
	// }, [AAVEWBTCTokenBalance, wBTCDAOBalance]);

	// const formattedSharePrice = useMemo(() => {
	// 	const LPBalance = lpTokenSupply - LPBalanceDAO;
	// 	const displayShare = Number(totalBTCBalance) / LPBalance;

	// 	return displayShare !== undefined && AAVEWBTCTokenDecimals
	// 		? formatUnits(displayShare, AAVEWBTCTokenDecimals)
	// 		: undefined;
	// }, [totalBTCBalance]);

	// let approveToken;
	// // if (isBtcDao) {
	// // 	approveToken = GodObject[pathname].addressWBTC;
	// // } else {
	// // 	approveToken = GodObject[pathname].addressUSDT;
	// // }

	const {
		data: approveData,
		status: approveStatus,
		txStatus: approveTxStatus,
		write: approveWrite,
	} = useApproveWrite({
		tokenAddress: isBtcDao
			? GodObject[pathname].addressWBTC
			: GodObject[pathname].addressUSDT,
		spender: xdaoAddress,
		amount: parsedAmount,
	});

	const {
		data: buyData,
		status: buyStatus,
		txStatus: buyTxStatus,
		write: buyWrite,
	} = useBuyWrite({
		crowdModule: xdaoAddress,
		tokenAddress: GodObject[pathname].addressDao,
		amount: parsedAmount,
	});

	const approveText = useMemo(() => {
		if (
			approveStatus === "pending" ||
			(approveData && approveTxStatus !== "success")
		) {
			return "Транзакция в процессе...";
		} else return `Одобрить ${GodObject[pathname].token1Name}`;
	}, [approveStatus, approveData, approveTxStatus]);

	const buyText = useMemo(() => {
		if (buyStatus === "pending" || (buyData && buyTxStatus !== "success")) {
			return "Транзакция в процессе...";
		} else return "Обменять";
	}, [buyStatus, buyData, buyTxStatus]);

	const handleSwitch = () => {
		setIsSwitched((prev) => !prev);
	};

	const handleSell = () => {
		toast("Заявка отправлена на обработку");
	};

	const handleSwitchChain = () => {
		if (!GodObject[pathname].chainId) return
		switchChain({ chainId: GodObject[pathname].chainId });
	};
	useEffect(() => {

	}, [])

	const handleMaxUSDT = () => {
		if (!isBtcDao) {
			if (isSwitched) {
				setReceive(
					formattedLPBalanceUser
						? toOptionalFixed(formattedLPBalanceUser, 8)
						: 0
				);

				const fee = feeRate / 100;
				const _amount = formattedLPBalanceUser * result;
				setAmount(toOptionalFixed(_amount, 8));
			} else {
				setAmount(formattedUSDTBalance);

				if (saleInfo && feeRate && formattedUSDTBalance) {
					const fee = feeRate / 100;
					const _receive =
						(((formattedUSDTBalance * 10 ** WBTCDecimals) /
							Number(saleInfo?.rate)) *
							(100 - fee)) /
						10000;
					setReceive(toOptionalFixed(_receive, 8));
				}
			}
		} else if (isBtcDao) {
			if (isSwitched) {
				setReceive(
					formattedLPBalanceUser
						? toOptionalFixed(formattedLPBalanceUser, 8)
						: 0
				);
				const fee = feeRate / 100;
				const _amount = isSwitched
					? formattedLPBalanceUser * result
					: (((formattedLPBalanceUser * Number(saleInfo?.rate)) /
						10 ** WBTCDecimals) *
						100) /
					(100 - fee);
				setAmount(toOptionalFixed(_amount, 8));
			} else {
				setAmount(formattedWBTCBalance);

				if (saleInfo && feeRate && formattedWBTCBalance) {
					const fee = feeRate / 100;
					const _receive =
						(((formattedWBTCBalance * 10 ** WBTCDecimals) /
							Number(saleInfo?.rate)) *
							(100 - fee)) /
						100;
					setReceive(toOptionalFixed(_receive, 8));
				}
			}
		}
	};

	const handleChangeAmount = (e) => {
		const _amount = Number(e.target.value);
		console.debug(_amount, feeRate, saleInfo);
		if (!isBtcDao) {
			if (_amount <= 0) {
				setAmount(0);
				setReceive(0);
				return;
			}

			setAmount(_amount);

			if (_amount === "") {
				setReceive(0);
			}
			if (saleInfo && feeRate && _amount) {
				const fee = feeRate / 100;
				const _receive = isSwitched
					? (((_amount * Number(saleInfo?.rate)) / 10 ** WBTCDecimals) *
						(100 + fee)) /
					10000
					: (((_amount * 10 ** WBTCDecimals) / Number(saleInfo?.rate)) *
						(100 - fee)) /
					10000;
				setReceive(toOptionalFixed(_receive, 8));
			}
		} else {
			// ЕСЛИ БТК ДАО
			if (_amount < 0) {
				setAmount(0);
				setReceive(0);
				return;
			}
			setAmount(_amount);
			if (_amount === "") {
				setReceive(0);
				setAmount(0);
			}
			if (saleInfo && feeRate && _amount) {
				const fee = feeRate / 100;
				const _receive = isSwitched
					? (((_amount * Number(saleInfo?.rate)) / 10 ** WBTCDecimals) *
						(100 + fee)) /
					10000
					: (((_amount * 10 ** WBTCDecimals) / Number(saleInfo?.rate)) *
						(100 - fee)) /
					10000;
				setReceive(toOptionalFixed(_receive, 8));
			}
		}
	};

	const handleChangeReceive = (e) => {
		const _receive = Number(e.target.value);
		if (!isBtcDao) {
			if (_receive < 0) {
				setReceive(0);
				setAmount(0);
				return;
			}

			setReceive(_receive);

			if (_receive === "") {
				setAmount(0);
				setReceive(0);
				return;

			}
			console.debug(saleInfo, feeRate, _receive);
			if (saleInfo && feeRate && _receive) {
				const fee = feeRate / 100;
				const _amount = isSwitched
					? _receive * result
					: (((_receive * Number(saleInfo?.rate)) / 10 ** WBTCDecimals) * 10000) /
					(100 - fee);
				setAmount(toOptionalFixed(_amount, 8));
			}
		} else {
			if (_receive < 0) {
				setReceive(0);
				return;
			}

			setReceive(_receive);

			if (_receive) {
				const fee = feeRate / 100;
				const _amount = isSwitched
					? _receive * result
					: (((_receive * Number(saleInfo?.rate)) / 10 ** WBTCDecimals) * 100) /
					(100 - fee);
				setAmount(toOptionalFixed(_amount, 8));
			}
		}
	};

	useEffect(() => {
		if (isSwitched) {
			if (saleInfo && feeRate && amount) {
				const fee = feeRate / 100;
				const _receive =
					(((amount * Number(saleInfo?.rate)) / 10 ** WBTCDecimals) *
						(100 + fee)) /
					100;
				setReceive(toOptionalFixed(_receive, 8));
			}
		} else {
			if (saleInfo && feeRate && receive) {
				const fee = feeRate / 100;
				const _receive =
					(((amount * 10 ** WBTCDecimals) / Number(saleInfo?.rate)) *
						(100 - fee)) /
					100;
				setReceive(toOptionalFixed(_receive, 8));
			}
		}
	}, [isSwitched]);

	useEffect(() => {
		if (
			approveStatus === "success" &&
			approveData &&
			approveTxStatus === "success"
		) {
			buyWrite();
		}
	}, [approveStatus, approveData, approveTxStatus]);

	useEffect(() => {
		if (
			approveStatus === "pending" ||
			(approveData && approveTxStatus !== "success") ||
			buyStatus === "pending" ||
			(buyData && buyTxStatus !== "success")
		) {
			setIsTxLoading(true);
		} else {
			setIsTxLoading(false);
			setRefetch(true);
			setTimeout(() => {
				setRefetch(false);
			}, 100);
		}
	}, [
		approveStatus,
		approveData,
		approveTxStatus,
		buyStatus,
		buyData,
		buyTxStatus,
	]);

	// useEffect(() => {
	// 	if (GodObject[pathname]) {
	// 		setCurrentLPAddress(GodObject[pathname].addressLp);
	// 	}
	// }, [currentLPAddress]);

	const isChainSupported = chain && chain.id === GodObject[pathname].chainId;

	return (
		<>
			<section id="dashboard" className="dashboard">
				<div className="wrapper">
					<div className="dashboard-conteiner">
						<div className="dashboard-conteiner-title">
							<h1 style={{ fontWeight: "800" }}>Купить/продать</h1>
							<div className="dashboard-conteiner-title-line"></div>
						</div>
						<div className="dashboard-conteiner-content">
							<div className="conteiner-content-briefcase">
								<h2>Инвестиционный портфель {GodObject[pathname].name}</h2>
								<img src={circle_swap} alt="" />
							</div>
							<div className="conteiner-content-deal">
								<h2>Быстрая сделка</h2>
								<div className="content-deal">
									<div className="content-deal-input">
										{isSwitched ? (
											<>
												<div className="deal-input">
													<div className="deal-input-content">
														<input
															value={receive}
															type="number"
															readOnly={isTxLoading}
															min={0}
															onChange={handleChangeReceive}
														/>
														{/*<p>7 533,10 USD</p> */}
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={GodObject[pathname].token2Logo}
																alt=""
																height={23}
																width={23}
															/>
															<p>{GodObject[pathname].token2Name}</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>
												{isConnected &&
													isChainSupported ? (
													<h3>
														На кошельке:{" "}
														{formattedLPBalanceUser !== undefined ? (
															<>
																{toOptionalFixed(formattedLPBalanceUser, 8)}
																<span> {GodObject[pathname].token2Name} </span>
																<button
																	onClick={handleMaxUSDT}
																	className="max-button button_swap"
																>
																	Max
																</button>
															</>
														) : (
															"-"
														)}
													</h3>
												) : (
													<div style={{ height: "1vw" }} />
												)}

												<img
													className="vector_swap"
													src={vector}
													alt=""
													onClick={handleSwitch}
												/>
												<div className="deal-input">
													<div className="deal-input-content">
														<input
															value={amount}
															type="number"
															readOnly={isTxLoading}
															min={0}
															onChange={handleChangeAmount}
														/>
														{/* <p>700,0 USD</p> */}
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={GodObject[pathname].token1Logo}
																alt=""
																height={63}
																width={63}
															/>
															<p> {GodObject[pathname].token1Name}</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>
												{isConnected &&
													isChainSupported ? (
													<h3>
														На кошельке:{" "}
														{/* {formattedUSDTBalance !== undefined ? (
															<>
																{toOptionalFixed(formattedUSDTBalance, 6)}
																<span> {GodObject[pathname].token1Name}</span>
															</>
														) : (
															"-"
														)} */}
														{!isBtcDao ? (
															<>
																{toOptionalFixed(formattedUSDTBalance, 2)}
																<span> {GodObject[pathname].token1Name}</span>
															</>
														) : (
															<>
																{toOptionalFixed(formattedWBTCBalance, 6)}

																<span> {GodObject[pathname].token1Name}</span>
															</>
														)}
													</h3>
												) : (
													<div style={{ height: "1vw" }} />
												)}
											</>
										) : (
											<>
												<div className="deal-input">
													<div className="deal-input-content">
														<input
															value={amount}
															type="number"
															readOnly={isTxLoading}
															min={0}
															onChange={handleChangeAmount}
														/>
														{/* <p>700,0 USD</p> */}
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={GodObject[pathname].token1Logo}
																alt=""
																height={63}
																width={63}
															/>
															<p>{GodObject[pathname].token1Name}</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>

												{isConnected &&
													isChainSupported ? (
													<h3>
														На кошельке:{" "}
														{!isBtcDao ? (
															<>
																{toOptionalFixed(formattedUSDTBalance, 2)}
																<span> {GodObject[pathname].token1Name} </span>
																<button
																	onClick={handleMaxUSDT}
																	className="max-button button_swap"
																>
																	Max
																</button>
															</>
														) : (
															<>
																{toOptionalFixed(formattedWBTCBalance, 6)}
																<span> {GodObject[pathname].token1Name} </span>
																<button
																	onClick={handleMaxUSDT}
																	className="max-button button_swap"
																>
																	Max
																</button>
															</>
														)}
													</h3>
												) : (
													<div style={{ height: "1vw" }} />
												)}
												<img
													className="vector_swap"
													src={vector}
													alt=""
													onClick={() => setIsSwitched((prev) => !prev)}
												/>
												<div className="deal-input">
													<div className="deal-input-content">
														<input
															value={receive}
															type="number"
															readOnly={isTxLoading}
															min={0}
															onChange={handleChangeReceive}
														/>
														{/* <p>7 533,10 USD</p> */}
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={GodObject[pathname].token2Logo}
																alt=""
																height={23}
																width={63}
															/>
															<p>{GodObject[pathname].token2Name}</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>

												{isConnected &&
													isChainSupported ? (
													<h3>
														На кошельке:{" "}
														{formattedLPBalanceUser !== undefined ? (
															<>
																{toOptionalFixed(formattedLPBalanceUser, 8)}
																<span>
																	<span> </span>

																	{GodObject[pathname].token2Name}
																</span>
															</>
														) : (
															"-"
														)}
													</h3>
												) : (
													<div style={{ height: "1vw" }} />
												)}
											</>
										)}
									</div>
								</div>
								<div className="conteiner-content-button">
									{isConnected &&
										isChainSupported ? (
										!XDAOTokenConditions ? (
											<button className="content-button inactive button_swap">
												Требуется 5 XDAO
											</button>
										) : isSwitched ? (
											<button
												className={`content-button button_swap ${!parsedAmount ? "inactive" : ""
													} `}
												disabled={!parsedAmount || isTxLoading}
												onClick={handleSell}
											>
												Оставить заявку на вывод
											</button>
										) : parsedAmount > USDTBalance ? (
											<button className="content-button inactive button_swap">
												Недостаточно {GodObject[pathname].token1Name}
											</button>
										) : USDTAllowance < parsedAmount ? (
											<button
												className="content-button button_swap"
												disabled={isTxLoading}
												onClick={() => approveWrite()}
											>
												{approveText}
											</button>
										) : (
											<button
												className={`content-button button_swap ${!parsedAmount ? "inactive" : ""
													} `}
												disabled={!parsedAmount || isTxLoading}
												onClick={() => setIsModalOpen(true)}
											>
												{buyText}
											</button>
										)
									) : !isChainSupported && isConnected ? (
										<button
											onClick={handleSwitchChain}
											className="content-button wrong-network text button_swap"
											type="button"
										>
											{`Переключить на ${GodObject[pathname].chainId === 1 ? "Ethereum" : "Arbitrum"}`}
										</button>
									) : (
										<CustomConnectButton />
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="parameters-conteiner">
						<div className="parameters-conteiner-vector">
							<img src={parameters_vector} alt="" />
						</div>
						<div className="parameters-conteiner-content">
							<div className="content_item btc">
								<img src={GodObject[pathname].logoBottom} alt="" />
								<h3>Current share price: {result}</h3>
							</div>

							<a href="">
								<img className="upward_shift" src={upward_shift} alt="" />
							</a>
						</div>
						<div className="parameters-conteiner-content-mobie">
							<div className="conteiner-content-item">
								<div className="content_item btc">
									<img src={GodObject[pathname].logoBottom} alt="" />
									<h3>Current share price: {result}</h3>
								</div>
							</div>
						</div>
					</div>
					<img className="left_green_circle" src={left_green_circle} alt="" />
					<img className="right_oreng_circle" src={right_oreng_circle} alt="" />
					<img
						className="vector_smart_object"
						src={vector_smart_object}
						alt=""
					/>
				</div>
				<ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={() => buyWrite()} />
			</section>
		</>
	);
};

export default Dashboard;

// useEffect(() => {
// 	if (
// 		balanceLP &&
// 		sumDao &&
// 		totalSupplyLp &&
// 		balanceLPCrowdModule &&
// 		!isBtcDao
// 	) {
// 		sumDao = bigInt(Math.round(sumDao));

// 		balanceLPCrowdModule = balanceLPCrowdModule / 1000n;
// 		//
// 		console.log("sumDAO is " + sumDao);
// 		console.log(typeof sumDao + " is typeof sumdao");

// 		console.log("totalSupplyLp is " + totalSupplyLp);
// 		console.log(typeof totalSupplyLp + " is typeof totalSupplyLp");

// 		console.log("balanceLP is " + balanceLP);
// 		console.log(typeof balanceLP + " is typeof balanceLP");

// 		console.log("balanceLPCrowdModule is " + balanceLPCrowdModule);
// 		console.log(
// 			typeof balanceLPCrowdModule + " is typeof balanceLPCrowdModule"
// 		);

// 		console.log(totalSupplyLp);
// 		console.log(balanceLPCrowdModule);
// 		console.log("VALUE IS  " + (2n * totalSupplyLp - balanceLPCrowdModule));
// 		console.log(
// 			formatUnits(totalSupplyLp * 2n - balanceLPCrowdModule, 18) +
// 				"is formatUNITS"
// 		);
// 		//

// 		const res =
// 			sumDao / formatUnits(2n * totalSupplyLp - balanceLPCrowdModule, 18);
// 		setResult(res);
// 		return;
// 	}
// 	if (!isBtcDao) {
// 		setResult(sumDao);
// 	}
// }, [, balanceLP, totalSupplyLp, balanceLPCrowdModule, sumDao, isBtcDao]);

// let finalValue;

// const newCalculateSharePrice= useMemo(() => {

//   console.log("dao address " + AAVEWBTCOwner)

//   // const totalBTCBalance = AAVEWBTCTokenBalance + wBTCDAOBalance

//   // const LPBalance = lpTokenSupply - LPBalanceDAO;

//   // const displayShare = totalBTCBalance / LPBalance;

//   // console.log("AAVEWBTCTokenBalance " + AAVEWBTCTokenBalance);
//   // console.log("wBTCDAOBalance " + wBTCDAOBalance);
//   // console.log("total btc balance " + totalBTCBalance);
//   // console.log("lpTokenSupply " + lpTokenSupply);
//   // console.log("LPBalance " + LPBalance);
//   // console.log("lp balance dao " + LPBalanceDAO)
//   // console.log("displayShare " + displayShare);

//   const totalBTCBalance = AAVEWBTCTokenBalance

//   const finalValue = totalBTCBalance

//   console.log("newTotalBTCBalance " + totalBTCBalance)

//   return finalValue !== undefined && AAVEWBTCTokenDecimals
//     ? formatUnits(finalValue, AAVEWBTCTokenDecimals)
//     : undefined;
// }, [finalValue]);

/* <div className="content_item">
				<img src={parameters_two} alt="" />
				<h3>EXC: 29.01%</h3>
			  </div>
			  <div className="content_item">
				<img src={parameters_three} alt="" />
				<h3>MTV: 29.01%</h3>
			  </div>
			  <div className="content_item">
				<img src={parameters_fore} alt="" />
				<h3>CLS: 29.01%</h3>
			  </div> */

// const handleMax = () => {

// 	if(!isBtcDao) {
// 		console.log("HANDLEMAX NOT BTC DAO")
// 		// ЕСЛИ НЕ БТК ДАО

// 		if (isSwitched) {
// 			setReceive(
// 				formattedLPBalanceUser ? toOptionalFixed(formattedLPBalanceUser, 8) : 0
// 			);

// 			if (saleInfo && feeRate && formattedLPBalanceUser) {
// 				const fee = feeRate / 100;
// 				const _amount =
// 					(((formattedLPBalanceUser * 10 ** WBTCDecimals) /
// 						Number(saleInfo?.rate)) *
// 						(100 - fee)) /
// 					100;
// 				setAmount(toOptionalFixed(_amount, 8));
// 			}
// 		} else {
// 			setAmount(formattedWBTCBalance);

// 			if (saleInfo && feeRate && formattedWBTCBalance) {
// 				const fee = feeRate / 100;
// 				const _receive =
// 					(((formattedWBTCBalance * 10 ** WBTCDecimals) /
// 						Number(saleInfo?.rate)) *
// 						(100 - fee)) /
// 					100;
// 				setReceive(toOptionalFixed(_receive, 8));
// 			}
// 		}

// 	} else {
// 		// ЕСЛИ БТК ДАО
// 		console.log("HANDLEMAX  BTC DAO")

// 		if (isSwitched) {
// 			setReceive(
// 				formattedLPBalanceUser ? toOptionalFixed(formattedLPBalanceUser, 8) : 0
// 			);

// 			if (saleInfo && feeRate && formattedLPBalanceUser) {
// 				const fee = feeRate / 100;
// 				const _amount =
// 					(((formattedLPBalanceUser * 10 ** WBTCDecimals) /
// 						Number(saleInfo?.rate)) *
// 						(100 - fee)) /
// 					100;
// 				setAmount(toOptionalFixed(_amount, 8));
// 			}
// 		} else {
// 			setAmount(formattedWBTCBalance);

// 			if (saleInfo && feeRate && formattedWBTCBalance) {
// 				const fee = feeRate / 100;
// 				const _receive =
// 					(((formattedWBTCBalance * 10 ** WBTCDecimals) /
// 						Number(saleInfo?.rate)) *
// 						(100 - fee)) /
// 					100;
// 				setReceive(toOptionalFixed(_receive, 8));
// 			}
// 		}

// 	}

// };
