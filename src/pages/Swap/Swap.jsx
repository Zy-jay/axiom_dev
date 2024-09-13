import { useEffect, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import bitcoinLogo from "../../assets/images/images_swap/bitcoin-logo.svg";
import { toast } from "react-toastify";
import down_chevron from "../../assets/images/images_swap/down_chevron.svg";
import vector from "../../assets/images/images_swap/vector.svg";
import parameters_vector from "../../assets/images/images_swap/parameters_vector.svg";
import upward_shift from "../../assets/images/images_swap/upward_shift.svg";
import left_green_circle from "../../assets/images/images_swap/left_green_circle.png";
import right_oreng_circle from "../../assets/images/images_swap/right_oreng_circle.png";
import vector_smart_object from "../../assets/images/images_swap/vector_smart_object.svg";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import usdt from "../../assets/images/images_safe/usdt.svg";
import { CustomConnectButton } from "../../componets/UI/CustomConnect.jsx";
import {
	useBalanceOf,
	useAllowance,

} from "../../hooks/useContactRead.js";
import {
	contracts,
	DAOs,
} from "../../utils/blockchain.js";
import { useApproveWrite, useBuyWrite } from "../../hooks/useContractWrite.js";
import { toOptionalFixed } from "../../utils/converter.js";
import btcLogo from "../../assets/tokenLogos/BTC.png";
import altLogo from "../../assets/tokenLogos/ALT.png";
import ultraLogo from "../../assets/tokenLogos/ULTRA.png";
import airLogo from "../../assets/tokenLogos/AIRDROP.png";
import safeLogo from "../../assets/tokenLogos/SAFE.png";
import { useSwitchChain } from "wagmi";
import ConfirmModal from "../../componets/UI/confirmModal.jsx";
import {
	notifyError,
	notifySuccess,
} from "../../componets/UI/Toasts.jsx";
import { useDaoPrice } from "../../hooks/useDaoPrice.js";
import { STRATEGI_KEYS } from "../../constants/strategis.js";
import { useTokenBalance } from "../../hooks/useTokenBalances.js";
import { REACT_APP_TELEGRAM_BOT_TOKEN, REACT_APP_TELEGRAM_CHAT_ID } from "../../constants/env.js";
import { useStore } from "../../hooks/useStore.js";
import { TOKENS_COLORS } from "../../constants/tokens.js";
import circle_swap from "../../assets/images/images_swap/circle_swap.webp";




const url =
	"https://api.arbiscan.io/api?module=token&action=tokenholderlist&contractaddress=0x7f1Dd51843D8C4106213d0a4C3a7e96306C5d86F&&apikey=CC8VKJEZ5IES95BEMREN2FT3HUHITIS9IJ";

const GodObject = {
	[STRATEGI_KEYS.ultrdao]: {
		name: "ultraDao",
		token1Name: "USDT",
		token2Name: "axULT",
		chainId: 1,
		token1Logo: usdt,
		token2Logo: ultraLogo,
		logoBottom: ultraLogo,
		addressDao: DAOs.axUltra, // "0xe8740f7786ae2c674e484a71741247ee22fb125a",
		addressLp: DAOs.axUltraLP, // "0x0a240713C9dB821C51f36F4621d6ac1F6e4D3745",
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
		addressDao: DAOs.axSafe,
		addressLp: DAOs.axSafeLP,
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
		addressDao: DAOs.axAirdrop,
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
		// addressUSDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
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
		addressDao: DAOs.axAltPortfolio,
		addressLp: DAOs.axAltPortfolioLP,
		addressUSDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
	},
};


const crowdModuleETH = '0x711e14ebc41a8f1595433fa4409a50bc9838fc03';
const crowdModuleARB = '0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7';


const Swap = ({ daoKey, dao }) => {

	const store = useStore()

	const { chains, switchChain } = useSwitchChain();
	const { address, isConnected, chain, } = useAccount();
	const isBtcDao = dao === STRATEGI_KEYS.btcdao

	const { chainId,
		token2Logo,
		name,
		addressLp,
		addressDao,
		addressUSDT,
		addressWBTC,
		token1Name,
		token2Name,
		token1Logo,
		logoBottom } = GodObject[dao]

	// USDT or WBTC  address
	const tokenAddress = isBtcDao ? addressWBTC : addressUSDT;
	const xdaoAddress = chainId === 1 ? crowdModuleETH : crowdModuleARB;



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


	const { daoPrice, tokens } = useDaoPrice(addressDao, addressLp, chainId)
	const [toValue, setToValue] = useState(0);
	const [fromValue, setFromValue] = useState(0);
	const [isTxLoading, setIsTxLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [isSwitched, setIsSwitched] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { XDAOToken } =
		contracts;

	const requiredXDAOTokens = 5000000000000000000;


	// const saleInfo = useSaleInfo({
	// 	xdaoAddress: xdaoAddress,
	// 	tokenAddress: addressDao,
	// 	index: CURRENT_DAO_INDEX,
	// });

	const fee = 0.95
	const rate = isSwitched ? daoPrice : fee
	// USDT or WBTC balance
	const { balance: tokenBalance } = useTokenBalance(tokenAddress, address, chainId);


	useEffect(() => {
		const getData = async () => {
			fetch(url).then((res) => res.json());
		};
		getData();
	}, []);



	const { balance: LPBalanceUser } = useTokenBalance(addressLp, address, chainId)

	useBalanceOf({
		tokenAddress: addressLp,
		owner: !refetch && address,
	});

	const XDAOTokenBalance = useBalanceOf({
		tokenAddress: XDAOToken.address,
		owner: address,
	});

	const WBTCDecimals = 8 // useDecimals({ tokenAddress: WBTCToken.address }); // should be 8
	const USDTDecimals = 6 // useDecimals({


	const LPDecimals = 18
	// useDecimals({ tokenAddress: addressLp });



	const USDTAllowance = useAllowance({
		tokenAddress: addressUSDT,
		owner: !refetch && address,
		spender: xdaoAddress,
	});

	const XDAOTokenConditions = useMemo(() => {
		return XDAOTokenBalance >= requiredXDAOTokens;
	}, [XDAOTokenBalance, requiredXDAOTokens]);

	// const formattedTokenPrice = useMemo(() => {
	// 	return WBTCBalance !== undefined && WBTCDecimals
	// 		? formatUnits(WBTCBalance, WBTCDecimals)
	// 		: undefined;
	// }, []);

	const formattedTokenBalance = useMemo(() => {
		return tokenBalance !== undefined ? formatUnits(tokenBalance, isBtcDao ? WBTCDecimals : USDTDecimals) : undefined;
	}, [isBtcDao, tokenBalance]);

	const formattedLPBalanceUser = useMemo(() => {
		return LPBalanceUser !== undefined && LPDecimals
			? formatUnits(LPBalanceUser ?? 0n, LPDecimals)
			: undefined;
	}, [LPBalanceUser, LPDecimals]);

	const parsedAmount = useMemo(() => {
		const decimals = isBtcDao ? WBTCDecimals : USDTDecimals;
		if (isNaN(fromValue) || fromValue <= 0) return undefined;
		const minAmount = 1 / Math.pow(10, decimals);
		if (fromValue < minAmount) {
			return undefined;
		}

		try {
			return parseUnits(String(fromValue), decimals);
		} catch (error) {
			return undefined;
		}
	}, [fromValue, isBtcDao]);

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



	const handleChangeFromValue = (value) => {
		if (!value) {
			setToValue(0)
			return
		}
		rate && (!isSwitched ? setToValue(value * fee) : setToValue(value * daoPrice))

	}

	const handleChangeToValue = (value) => {
		if (!value) {
			setFromValue(0)
			return
		}
		rate && (!isSwitched ? setFromValue(value / fee) : setFromValue(value / daoPrice))

	};

	const handleMax = () => {
		const value = isSwitched ? formattedLPBalanceUser : formattedTokenBalance;
		setFromValue(value);
		handleChangeFromValue(value)
		// handleChangeAmount(Number(value))
	}

	useEffect(() => {
		const value = fromValue;
		setToValue(value);
		handleChangeFromValue(value)
	}, [isSwitched]);


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
	const portfolio = tokens ?? store.daoPortfolios[daoKey]

	useEffect(() => {
		if (tokens !== undefined) store.setPortfolio(daoKey, tokens)
	}, [tokens])

	console.debug("portfolio", portfolio)

	const data = portfolio?.map((p) => {
		const isBtcDao = portfolio.length === 1 && p.symbol === "aArbWBTC";
		return {
			name: p.symbol,
			value: isBtcDao ? Number(p.balance) / 10 ** 8 : Number(p.usdValue ?? 0),
			fill: TOKENS_COLORS[p.symbol] ?? "#" + Math.floor(Math.random() * 16777215).toString(16)
		}
	}) ?? []

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

								{!portfolio ? <img src={circle_swap} alt="" /> : <><ResponsiveContainer
									style={{
										backgroundImage: `url(${logoBottom})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "30%",
										backgroundPosition: "center"
									}}
									key={`swap-pie-container-${dao.replaceAll(" ", "-")}-${data.length}`} width={"100%"} height={"90%"}>
									<PieChart
										key={`swap-pie-chart-${dao.replaceAll(" ", "-")}-${data.length}`}

									// width={600} height={600} onMouseEnter={null}
									>
										<Pie
											key={`swap-pie-${dao.replaceAll(" ", "-")}-${data.length}`}
											data={data}
											// cx={120}
											// cy={230}

											innerRadius={"65%"}
											outerRadius={"75%"}
											fill="#8884d8"
											paddingAngle={5}
											dataKey="value"
											cursor={"pointer"}
										>
											{data.map((entry, index) => (
												<Cell

													key={`swap-cell-${dao.replaceAll(" ", "-")}-${index}`}
													fill={entry.fill}

												// style={{
												// 	transform: `scale(${hoveringKey === entry.name ? "1.05" : 1})`,
												// 	transition: "transform 1s ease-in-out",
												// 	transformOrigin: "center"

												// }}
												/>
											))}
											<LabelList dataKey="name" position="outside" angle="0" />
										</Pie>
										<Tooltip />
									</PieChart>

								</ResponsiveContainer></>}


							</div>
							<div className="conteiner-content-deal">
								<h2>Быстрая сделка</h2>
								<div className="content-deal">
									<div className="content-deal-input">

										<>
											<div className="deal-input">
												<div className="deal-input-content">
													<input
														value={fromValue}
														type="number"
														readOnly={isTxLoading}
														min={0}
														onChange={(e) => {
															setFromValue(e.target.value ? Number(e.target.value) : "");
															if (e.target.value) {
																handleChangeFromValue(Number(e.target.value))
															} else {
																setToValue("")
															}
														}}
													/>
												</div>
												<div className="deal-select">
													<div className="deal-select-token">
														<img
															src={!isSwitched ? token1Logo : token2Logo}
															alt=""
															height={63}
															width={63}
														/>
														<p>{!isSwitched ? token1Name : token2Name}</p>
													</div>
													<img
														className="down-chevron"
														src={down_chevron}
														alt=""
													/>
												</div>
											</div>

											{isConnected &&

												formattedTokenBalance !== undefined && !isNaN(formattedTokenBalance) ? (
												<h3 style={{ display: "flex", flexDirection: "column" }}>
													<div>	На кошельке:{" "}
														{toOptionalFixed(!isSwitched ? formattedTokenBalance : formattedLPBalanceUser, isBtcDao ? 6 : 3)}
														<span> {!isSwitched ? token1Name : token2Name}</span></div>
													<button
														onClick={handleMax}
														className="max-button button_swap"
													>
														Max
													</button>

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
														value={toValue}
														type="number"
														readOnly={isTxLoading}
														min={0}
														onChange={(e) => {
															setToValue(e.target.value ? Number(e.target.value) : "")
															if (e.target.value) {
																handleChangeToValue(Number(e.target.value))
															}
														}}
													/>
												</div>
												<div className="deal-select">
													<div className="deal-select-token">
														<img
															src={!isSwitched ? token2Logo : token1Logo}
															alt=""
															height={23}
															width={63}
														/>
														<p>{!isSwitched ? token2Name : token1Name}</p>
													</div>
													<img
														className="down-chevron"
														src={down_chevron}
														alt=""
													/>
												</div>
											</div>

											{isConnected &&
												<h3>
													На кошельке:{" "}
													{formattedLPBalanceUser !== undefined && !isNaN(formattedLPBalanceUser) ? (
														<>
															{toOptionalFixed(!isSwitched ? formattedLPBalanceUser : formattedTokenBalance, 6)}
															<span>
																<span> </span>

																{!isSwitched ? token2Name : token1Name}
															</span>
														</>
													) : (
														"-"
													)}
												</h3>
											}
										</>
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
										) : parsedAmount > tokenBalance ? (
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
								<h3>Current share price: {(toOptionalFixed(daoPrice, isBtcDao ? 3 : 3))}</h3>
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
				<ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={buyWrite} />
			</section>
		</>
	);
};

export default Swap;

