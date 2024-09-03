import { useEffect, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import circle_swap from "../../assets/images/images_swap/circle_swap.webp";
import bitcoinLogo from "../../assets/images/images_swap/bitcoin-logo.svg";
import BTCDaoLogo from "../../assets/images/images_swap/btcdaologo.png";
import greenbitcoinlogo from "../../assets/images/images_swap/btcdaologo.png";
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
import usdt from "../../assets/images/images_safe/usdt.svg";


import { CustomConnectButton } from "./CustomConnect";
import {
	useSaleInfo,
	useBalanceOf,
	useDecimals,
	useAllowance,

} from "../../hooks/useContactRead";
import {
	contracts,
	CURRENT_DAO_INDEX,
	DAOs,
} from "../../utils/blockchain.js";
import { useApproveWrite, useBuyWrite } from "../../hooks/useContractWrite";
import { toOptionalFixed } from "../../utils/converter";

import btcLogo from "../../assets/tokenLogos/BTC.png";
import altLogo from "../../assets/tokenLogos/ALT.png";
import ultraLogo from "../../assets/tokenLogos/ULTRA.png";
import airLogo from "../../assets/tokenLogos/AIRDROP.png";
import safeLogo from "../../assets/tokenLogos/SAFE.png";



import airDaoLogo from "../../assets/images/images_dashboard/air.webp";
import ultraDaoLogo from "../../assets/images/images_dashboard/ultra.webp";
import safeDaoLogo from "../../assets/images/images_dashboard/safedaologo.png";
import altDaoLogo from "../../assets/images/images_dashboard/altportfolio.webp";
import { useSwitchChain } from "wagmi";
import ConfirmModal from "../UI/confirmModal.jsx";
import {
	notifyError,
	notifySuccess,
} from "../swap_components/Toasts.jsx";
import { useDaoPrice } from "../../hooks/useDaoPrice.js";
import { STRATEGI_KEYS } from "../../constants/strategis.js";



const url =
	"https://api.arbiscan.io/api?module=token&action=tokenholderlist&contractaddress=0x7f1Dd51843D8C4106213d0a4C3a7e96306C5d86F&&apikey=CC8VKJEZ5IES95BEMREN2FT3HUHITIS9IJ";

const crowdAddress = "0x711E14eBC41A8f1595433FA4409a50BC9838Fc03";

const GodObject = {
	[STRATEGI_KEYS.ultrdao]: {
		name: "ultraDao",
		token1Name: "USDT",
		token2Name: "axULT",
		chainId: 1,
		token1Logo: usdt,
		token2Logo: ultraLogo,
		logoBottom: ultraLogo,
		addressDao: "0x92cb7baef8eddb1d6a02fa236b356124ad0530a5", // "0xe8740f7786ae2c674e484a71741247ee22fb125a",
		addressLp: "0xcB87b5D12CE6239F90992196CedbFCbF8e78ea13", // "0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745",
		addressUSDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
	},
	[STRATEGI_KEYS.safedao]: {
		name: "safeDao",
		token1Name: "USDT",
		token2Name: "axSAFE",
		token1Logo: usdt,
		chainId: 42161,
		token2Logo: safeLogo,
		logoBottom: safeLogo,
		addressDao: "0xdb95465de86c947f7de927eb604bad526696881b",
		addressLp: "0x72F2fE2dF156ab863200B011A0b008A8a306F926",
		addressUSDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
	},
	[STRATEGI_KEYS.airdropdao]: {
		name: "airdropDao",
		token1Name: "USDT",
		token2Name: "axAD",
		token1Logo: usdt,
		token2Logo: airLogo,
		logoBottom: airLogo,
		chainId: 42161,
		addressDao: "0xf958e82b5a8e615cb3476b59f9589c45df67acca",
		addressLp: "0x24536722187680Eb71C270c7cC45A44C34162381",
		addressUSDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
	},
	[STRATEGI_KEYS.btcdao]: {
		name: "btcDao",
		token1Name: "wBTC",
		token2Name: "axBTC",
		token1Logo: bitcoinLogo,
		token2Logo: btcLogo,
		logoBottom: btcLogo,
		chainId: 42161,
		addressDao: DAOs.axBTC,
		addressLp: DAOs.axBTCLP,
		addressUSDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
		addressWBTC: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
	},
	[STRATEGI_KEYS.altporfoliodao]: {
		name: "altDao",
		token1Name: "USDT",
		token2Name: "axALT",
		token1Logo: usdt,
		token2Logo: altLogo,
		logoBottom: altLogo,
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

const Dashboard = ({ daoKey, dao }) => {

	const { chains, switchChain } = useSwitchChain();
	const { address, isConnected, chain, } = useAccount();
	console.log(GodObject[dao])
	const { chainId,
		token2Logo,
		name,
		addressLp,
		addressDao,
		addressUSDT,
		addressWBTC, token1Name, token2Name,
		token1Logo, logoBottom } = GodObject[dao]

	// let [sumDao, setSumDao] = useState(0);
	// const [sumUsersLpTokens, setSumUsersLpTokens] = useState(0);
	const isBtcDao = dao === STRATEGI_KEYS.btcdao
	const xdaoAddress = chainId === 1 ? crowdModuleETH : crowdModuleARB;

	const REACT_APP_TELEGRAM_BOT_TOKEN = "7473485923:AAFbC0hvSPoOMCbocIIS33C4PjF8HfyJIfY"
	const REACT_APP_TELEGRAM_CHAT_ID = "-4589260105"

	function getPayableTokenName() {
		if (isBtcDao) {
			return "wBTC"
		} else {
			return "USDT"
		}
	}

	const sendMessageToTelegram = async () => {
		const message = `<b>НОВАЯ ЗАЯВКА НА ВЫВОД</b> <b>Адрес:</b><code>${address}</code>                 <b>Сумма: </b><code>${Number(parsedAmount) / 1000000}</code> <b> <code>${getPayableTokenName()}</code> </b>   <b>Стратегия </b><code>${dao}</code>  `;
		// const message = `<b>НОВАЯ ЗАЯВКА НА ВЫВОД</b>`;

		const url = `https://api.telegram.org/bot${REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${REACT_APP_TELEGRAM_CHAT_ID}&text=${message}&parse_mode=HTML`;
		// setIsSending(true);
		try {
			const res = await fetch(url)

			res.ok && notifySuccess("Сообщение отправлено!");

		}
		catch (error) {
			console.error('Ошибка:', error);
			notifyError("Ошибка при отправке сообщения!");
		} finally {
			// setIsSending(false);
		}
	}


	const { daoPrice, } = useDaoPrice(addressDao, addressLp, chainId)
	const [amount, setAmount] = useState(0);
	const [receive, setReceive] = useState(0);
	const [isTxLoading, setIsTxLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [isSwitched, setIsSwitched] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { XDAOToken, WBTCToken } =
		contracts;

	const requiredXDAOTokens = 5000000000000000000;


	const saleInfo = useSaleInfo({
		xdaoAddress: xdaoAddress,
		tokenAddress: addressDao,
		index: CURRENT_DAO_INDEX,
	});

	const fee = 0.95

	const WBTCBalance = useBalanceOf({
		tokenAddress: WBTCToken.address,
		owner: !refetch && address,
	});

	const USDTBalance = useBalanceOf({
		tokenAddress: addressUSDT,
		owner: !refetch && address,
	});


	useEffect(() => {
		const getData = async () => {
			fetch(url).then((res) => res.json());
		};
		getData();
	}, []);



	const LPBalanceUser = useBalanceOf({
		tokenAddress: addressLp,
		owner: !refetch && address,
	});

	const XDAOTokenBalance = useBalanceOf({
		tokenAddress: XDAOToken.address,
		owner: address,
	});

	const WBTCDecimals = 8 // useDecimals({ tokenAddress: WBTCToken.address }); // should be 8
	const USDTDecimals = 6 // useDecimals({


	const LPDecimals = useDecimals({ tokenAddress: addressLp });



	const USDTAllowance = useAllowance({
		tokenAddress: addressUSDT,
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


	const {
		data: approveData,
		status: approveStatus,
		txStatus: approveTxStatus,
		write: approveWrite,
		isSuccess: approveIsSuccess,
		isPending: approveIsPending,
	} = useApproveWrite({
		tokenAddress: isBtcDao
			? addressWBTC
			: addressUSDT,
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
		tokenAddress: addressDao,
		amount: parsedAmount,
	});

	const approveText = useMemo(() => {
		if (
			approveStatus === "pending" ||
			(approveData && approveTxStatus !== "success")
		) {
			return "Транзакция в процессе...";
		} else return `Одобрить ${token1Name}`;
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
		if (!chainId) return
		switchChain({ chainId });
	};
	useEffect(() => {

	}, [])



	const handleChangeAmount = (_amount) => {
		console.debug(_amount, saleInfo);

		if (_amount <= 0) {
			setAmount(0);
			setReceive(0);
			return;
		}
		setAmount(_amount);

		if (_amount === "") {
			setReceive(0);
		}
		if (daoPrice && _amount) {
			const _receive = isSwitched
				? (_amount / daoPrice) * fee
				: _amount / daoPrice;
			setReceive(toOptionalFixed(_receive, isBtcDao ? 8 : 3));

		};


	}

	const handleChangeReceive = (_receive) => {
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
		if (daoPrice && _receive) {
			const _amount = isSwitched
				? (_receive * daoPrice) * fee
				: _receive * daoPrice;
			setAmount(toOptionalFixed(_amount, 8));
		}

	};

	const handleMax = () => {
		const value = isSwitched ? formattedLPBalanceUser : (isBtcDao ? formattedWBTCBalance : formattedUSDTBalance);
		handleChangeAmount(value)
	}


	useEffect(() => {
		const value = amount;
		setAmount(receive)
		handleChangeAmount(value)
	}, [isSwitched]);

	// useEffect(() => {
	// 	if (
	// 		approveStatus === "success" &&
	// 		approveData &&
	// 		approveTxStatus === "success"
	// 	) {
	// 		setIsModalOpen(true)
	// 	}
	// }, [approveStatus, approveData, approveTxStatus]);

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

	useEffect(() => {
		if (approveIsSuccess) {
			setIsModalOpen(true)
		}
	}, [approveIsSuccess])

	const isChainSupported = chain && chain.id === chainId;

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
								<h2>Инвестиционный портфель {name}</h2>
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
															onChange={(e) => handleChangeReceive(Number(e.target.value))}
														/>
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={token2Logo}
																alt=""
																height={23}
																width={23}
															/>
															<p>{token2Name}</p>
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
																<span> {token2Name} </span>
																<button
																	onClick={handleMax}
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
															onChange={(e) => handleChangeAmount(Number(e.target.value))}
														/>
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={token1Logo}
																alt=""
																height={63}
																width={63}
															/>
															<p> {token1Name}</p>
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
																<span> {token1Name}</span>
															</>
														) : (
															<>
																{toOptionalFixed(formattedWBTCBalance, 6)}

																<span> {token1Name}</span>
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
															onChange={(e) => handleChangeAmount(Number(e.target.value))}
														/>
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={token1Logo}
																alt=""
																height={63}
																width={63}
															/>
															<p>{token1Name}</p>
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
																<span> {token1Name} </span>
																<button
																	onClick={handleMax}
																	className="max-button button_swap"
																>
																	Max
																</button>
															</>
														) : (
															<>
																{toOptionalFixed(formattedWBTCBalance, 6)}
																<span> {token1Name} </span>
																<button
																	onClick={handleMax}
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
															onChange={(e) => handleChangeReceive(Number(e.target.value))}
														/>
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={token2Logo}
																alt=""
																height={23}
																width={63}
															/>
															<p>{token2Name}</p>
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

																	{token2Name}
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
												onClick={() => {
													handleSell();
													sendMessageToTelegram();
												}}
											>
												Оставить заявку на вывод
											</button>
										) : parsedAmount > USDTBalance ? (
											<button className="content-button inactive button_swap">
												Недостаточно {token1Name}
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
											{`Переключить на ${chainId === 1 ? "Ethereum" : "Arbitrum"}`}
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
								<img src={logoBottom} alt="" />
								<h3>Current share price: { (toOptionalFixed(daoPrice, isBtcDao ? 3 : 3)) }</h3>
							</div>

							<a href="">
								<img className="upward_shift" src={upward_shift} alt="" />
							</a>
						</div>
						<div className="parameters-conteiner-content-mobie">
							<div className="conteiner-content-item">
								<div className="content_item btc">
									<img src={logoBottom} alt="" />
									<h3>Current share price: {toOptionalFixed(daoPrice, isBtcDao ? 3 : 3)}</h3>
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

