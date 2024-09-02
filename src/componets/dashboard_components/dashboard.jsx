import { useEffect, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import circle_swap from "../../assets/images/images_swap/circle_swap.webp";
import bitcoinLogo from "../../assets/images/images_swap/bitcoin-logo.svg";
import greenbitcoinlogo from "../../assets/images/images_swap/logo2.svg";
import dashboardicon from "../../assets/images/images_swap/dashboard_icon.svg";
import ellipse_one from "../../assets/images/images_swap/ellipse_one.svg";
import ellipse_two from "../../assets/images/images_swap/ellipse_two.svg";
import ellipse_three from "../../assets/images/images_swap/ellipse_three.svg";
import ellipse_fore from "../../assets/images/images_swap/ellipse_fore.svg";
import token_icon from "../../assets/images/images_swap/token_icon.svg";
import down_chevron from "../../assets/images/images_swap/down_chevron.svg";
import vector from "../../assets/images/images_swap/vector.svg";
import parameters_vector from "../../assets/images/images_swap/parameters_vector.svg";
import parameters_one from "../../assets/images/images_swap/parameters_one.webp";
import parameters_two from "../../assets/images/images_swap/parameters_two.webp";
import parameters_three from "../../assets/images/images_swap/parameters_three.webp";
import parameters_fore from "../../assets/images/images_swap/parameters_fore.webp";
import upward_shift from "../../assets/images/images_swap/upward_shift.svg";
import left_green_circle from "../../assets/images/images_swap/left_green_circle.png";
import right_oreng_circle from "../../assets/images/images_swap/right_oreng_circle.png";
import vector_smart_object from "../../assets/images/images_swap/vector_smart_object.svg";
import React from "react";
import ellipse_one_mobile from "../../assets/images/images_swap/ellipse_one_mobille.png";
import ellipse_two_mobile from "../../assets/images/images_swap/ellipse_two_mobile.png";
import up from "../../assets/images/images_safe/up.svg";
import { CustomConnectButton } from "../swap_components/CustomConnect";
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

const Dashboard = () => {
	const [amount, setAmount] = useState(0);
	const [receive, setReceive] = useState(0);
	const [isTxLoading, setIsTxLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [isSwitched, setIsSwitched] = useState(false);

	const { XDAO, XDAOToken, AxiomToken, LPToken, WBTCToken, AAVEWBTCToken } =
		contracts;

	const requiredXDAOTokens = 5000000000000000000;

	const { address, isConnected, chain } = useAccount();

	const saleInfo = useSaleInfo({
		tokenAddress: AxiomToken.address,
		index: CURRENT_DAO_INDEX,
	});

	const feeRate = useRegularFeeRate();

	const WBTCBalance = useBalanceOf({
		tokenAddress: WBTCToken.address,
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
		tokenAddress: LPToken.address,
	});

	const LPBalanceDAO = useBalanceOf({
		tokenAddress: LPToken.address,
		owner: AAVEWBTCOwner,
	});

	const LPBalance = useBalanceOf({
		tokenAddress: LPToken.address,
		owner: !refetch && address,
	});

	const XDAOTokenBalance = useBalanceOf({
		tokenAddress: XDAOToken.address,
		owner: address,
	});

	const WBTCDecimals = 8 //useDecimals({ tokenAddress: WBTCToken.address });

	const AAVEWBTCTokenDecimals = useDecimals({
		tokenAddress: AAVEWBTCToken.address,
	});

	const LPDecimals = useDecimals({ tokenAddress: LPToken.address });

	const WBTCAllowance = useAllowance({
		tokenAddress: WBTCToken.address,
		owner: !refetch && address,
		spender: XDAO.address,
	});

	const XDAOTokenConditions = useMemo(() => {
		return XDAOTokenBalance >= requiredXDAOTokens;
	}, [XDAOTokenBalance, requiredXDAOTokens]);

	const formattedWBTCBalance = useMemo(() => {
		return WBTCBalance !== undefined && WBTCDecimals
			? formatUnits(WBTCBalance, WBTCDecimals)
			: undefined;
	}, [WBTCBalance, WBTCDecimals]);

	const formattedAAVEWBTCTokenBalance = useMemo(() => {
		return AAVEWBTCTokenBalance !== undefined && AAVEWBTCTokenDecimals
			? formatUnits(AAVEWBTCTokenBalance, AAVEWBTCTokenDecimals)
			: undefined;
	}, [AAVEWBTCTokenBalance, AAVEWBTCTokenDecimals]);

	const formattedLPBalance = useMemo(() => {
		return LPBalance !== undefined && LPDecimals
			? formatUnits(LPBalance, LPDecimals)
			: undefined;
	}, [LPBalance, LPDecimals]);

	const parsedAmount = useMemo(() => {
		if (!WBTCDecimals) return undefined;
		if (isNaN(amount) || amount <= 0) return undefined;

		const minAmount = 1 / Math.pow(10, WBTCDecimals);
		if (amount < minAmount) {
			// console.warn(
			//   `Amount ${amount} is too small to convert with ${WBTCDecimals} decimals.`
			// );
			return undefined;
		}

		try {
			return parseUnits(String(amount), WBTCDecimals);
		} catch (error) {
			return undefined;
		}
	}, [amount, WBTCDecimals]);

	// const totalBTCBalance = useMemo(() => {
	// 	return AAVEWBTCTokenBalance + wBTCDAOBalance;
	// }, [AAVEWBTCTokenBalance, wBTCDAOBalance]);

	// const formattedSharePrice = useMemo(() => {
	// 	const LPBalance = lpTokenSupply - LPBalanceDAO;
	// 	const displayShare = totalBTCBalance / LPBalance;

	// 	return displayShare !== undefined && AAVEWBTCTokenDecimals
	// 		? formatUnits(displayShare, AAVEWBTCTokenDecimals)
	// 		: undefined;
	// }, [totalBTCBalance]);

	const {
		data: approveData,
		status: approveStatus,
		txStatus: approveTxStatus,
		write: approveWrite,
	} = useApproveWrite({
		tokenAddress: WBTCToken.address,
		spender: XDAO.address,
		amount: parsedAmount,
	});

	const {
		data: buyData,
		status: buyStatus,
		txStatus: buyTxStatus,
		write: buyWrite,
	} = useBuyWrite({
		tokenAddress: AxiomToken.address,
		amount: parsedAmount,
	});

	const approveText = useMemo(() => {
		if (
			approveStatus === "pending" ||
			(approveData && approveTxStatus !== "success")
		) {
			return "Транзакция в процессе...";
		} else return "Одобрить axBTC";
	}, [approveStatus, approveData, approveTxStatus]);

	const buyText = useMemo(() => {
		if (buyStatus === "pending" || (buyData && buyTxStatus !== "success")) {
			return "Транзакция в процессе...";
		} else return "Обменять";
	}, [buyStatus, buyData, buyTxStatus]);

	const handleSwitch = () => {
		// const _amount = amount;
		// const _receive = receive;

		// setAmount(_receive);
		// setReceive(_amount);
		setIsSwitched((prev) => !prev);
	};

	const handleMax = () => {
		if (isSwitched) {
			setReceive(
				formattedLPBalance ? toOptionalFixed(formattedLPBalance, 8) : 0
			);

			if (saleInfo && feeRate && formattedLPBalance) {
				const fee = feeRate / 100;
				const _amount =
					(((formattedLPBalance * 10 ** WBTCDecimals) /
						Number(saleInfo?.rate)) *
						(100 - fee)) /
					100;
				setAmount(toOptionalFixed(_amount, 8));
			}
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
	};

	const handleChangeAmount = (e) => {
		const _amount = e.target.value;

		if (_amount < 0) {
			setAmount(0);
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
				100
				: (((_amount * 10 ** WBTCDecimals) / Number(saleInfo?.rate)) *
					(100 - fee)) /
				100;
			setReceive(toOptionalFixed(_receive, 8));
		}
	};

	const handleChangeReceive = (e) => {
		const _receive = Number(e.target.value);

		console.debug("handleChangeReceive", _receive, saleInfo, feeRate, amount);

		if (_receive < 0) {
			setReceive(0);
			return;
		}

		setReceive(_receive);

		if (_receive === "") {
			setAmount(0);
		}

		if (saleInfo && feeRate && _receive) {
			const fee = feeRate / 100;
			const _amount = isSwitched
				? (((_receive * 10 ** WBTCDecimals) / Number(saleInfo?.rate)) * 100) /
				(100 + fee)
				: (((_receive * Number(saleInfo?.rate)) / 10 ** WBTCDecimals) * 100) /
				(100 - fee);
			setAmount(toOptionalFixed(_amount, 8));
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

	return (
		<>
			<section id="dashboard" className="dashboard">
				<div className="wrapper">
					<img className="up" src={up} alt="" />
					<div className="dashboard-conteiner">
						<div className="dashboard-conteiner-title">
							<h1 style={{ fontWeight: "800" }}>Мой дашбор</h1>
							<div className="dashboard-conteiner-title-line"></div>
						</div>
						<div className="dashboard-conteiner-content">
							<div className="conteiner-content-briefcase">
								<h2>Инвестиционный портфель</h2>
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
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={greenbitcoinlogo}
																alt=""
																height={63}
																width={63}
															/>
															<p>axBTC</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>
												{isConnected && chain ? (
													<h3>
														На кошельке:{" "}
														{formattedLPBalance !== undefined ? (
															<>
																{toOptionalFixed(formattedLPBalance, 8)}
																<span> axBTC </span>
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
															onChange={handleChangeAmount}
														/>
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={bitcoinLogo}
																alt=""
																height={63}
																width={63}
															/>
															<p>wBTC</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>
												{isConnected && chain ? (
													<h3>
														На кошельке:{" "}
														{formattedWBTCBalance !== undefined ? (
															<>
																{toOptionalFixed(formattedWBTCBalance, 8)}
																<span> wBTC</span>
															</>
														) : (
															"-"
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
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={bitcoinLogo}
																alt=""
																height={63}
																width={63}
															/>
															<p>wBTC</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>

												{isConnected && chain ? (
													<h3>
														На кошельке:{" "}
														{formattedWBTCBalance !== undefined ? (
															<>
																{toOptionalFixed(formattedWBTCBalance, 8)}
																<span> wBTC </span>
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
													</div>
													<div className="deal-select">
														<div className="deal-select-token">
															<img
																src={greenbitcoinlogo}
																alt=""
																height={63}
																width={63}
															/>
															<p>axBTC</p>
														</div>
														<img
															className="down-chevron"
															src={down_chevron}
															alt=""
														/>
													</div>
												</div>

												{isConnected && chain && address ? (
													<h3>
														На кошельке:{" "}
														{formattedLPBalance !== undefined ? (
															<>
																{toOptionalFixed(formattedLPBalance, 8)}
																<span> axBTC</span>
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
									{isConnected && chain && address ? (
										!XDAOTokenConditions ? (
											<button className="content-button inactive button_swap">
												Требуется 5 XDAO
											</button>
										) : isSwitched ? (
											<button className="content-button inactive button_swap">
												Only buy actions now
											</button>
										) : parsedAmount > WBTCBalance ? (
											<button className="content-button inactive button_swap">
												Недостаточно axBTC
											</button>
										) : WBTCAllowance < parsedAmount ? (
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
												onClick={() => buyWrite()}
											>
												{buyText}
											</button>
										)
									) : (
										<CustomConnectButton />
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="parameters-conteiner">
						<div className="parameters-conteiner-content">
							<div className="content_item">
								<img src={parameters_one} alt="" />
								<h3>INS: 45,09%</h3>
							</div>
							<div className="content_item">
								<img src={parameters_two} alt="" />
								<h3>EXC: 29.01%</h3>
							</div>
							<div className="content_item">
								<img src={parameters_three} alt="" />
								<h3>MTV: 29.01%</h3>
							</div>
							<div className="content_item">
								<img src={parameters_fore} alt="" />
								<h3>CLS: 29.01% 1</h3>
							</div>
							<a href="">
								<img className="upward_shift" src={upward_shift} alt="" />
							</a>
						</div>
						<div className="parameters-conteiner-content-mobie">
							<div className="content_item">
								<img src={parameters_one} alt="" />
								<h3>INS: 45,09%</h3>
							</div>
							<div className="content_item">
								<img src={parameters_two} alt="" />
								<h3>EXC: 29.01%</h3>
							</div>
						</div>
						<div className="parameters-conteiner-content-mobie">
							<div className="content_item">
								<img src={parameters_three} alt="" />
								<h3>MTV: 29.01%</h3>
							</div>
							<div className="content_item">
								<img src={parameters_fore} alt="" />
								<h3>CLS: 29.01%</h3>
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
			</section>
		</>
	);
};

export default Dashboard;
