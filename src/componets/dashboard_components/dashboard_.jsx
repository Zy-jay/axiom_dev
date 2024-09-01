import { useEffect, useState, useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";
// import { useContractRead } from '@wagmi/core'
// import { CovalentClient } from "@covalenthq/client-sdk";
// import { parseUnits, formatUnits } from "viem";
import circle_swap from "../../assets/images/images_swap/circle_swap.webp";
// import bitcoinLogo from "../../assets/images/images_swap/bitcoin-logo.svg";
import greenbitcoinlogo from "../../assets/images/images_swap/logo2.svg";
// import dashboardicon from "../../assets/images/images_swap/dashboard_icon.svg";
// import ellipse_one from "../../assets/images/images_swap/ellipse_one.svg";
// import ellipse_two from "../../assets/images/images_swap/ellipse_two.svg";
// import ellipse_three from "../../assets/images/images_swap/ellipse_three.svg";
// import ellipse_fore from "../../assets/images/images_swap/ellipse_fore.svg";
// import token_icon from "../../assets/images/images_swap/token_icon.svg";
import down_chevron from "../../assets/images/images_swap/down_chevron.svg";
// import vector from "../../assets/images/images_swap/vector.svg";
// import parameters_vector from "../../assets/images/images_swap/parameters_vector.svg";
import safeImg from "../../assets/images/images_swap/parameters_one.webp";
import altImg from "../../assets/images/images_swap/parameters_five.png";
import airImg from "../../assets/images/images_swap/parameters_two.webp";
import ultraImg from "../../assets/images/images_swap/parameters_three.webp";
import btcImg from "../../assets/images/images_swap/parameters_fore.webp";
import upward_shift from "../../assets/images/images_swap/upward_shift.svg";
import left_green_circle from "../../assets/images/images_swap/left_green_circle.png";
import right_oreng_circle from "../../assets/images/images_swap/right_oreng_circle.png";
import vector_smart_object from "../../assets/images/images_swap/vector_smart_object.svg";
import React from "react";
// import ellipse_one_mobile from "../../assets/images/images_swap/ellipse_one_mobille.png";
// import ellipse_two_mobile from "../../assets/images/images_swap/ellipse_two_mobile.png";
import up from "../../assets/images/images_safe/up.svg";
// import { CustomConnectButton } from "../swap_components/CustomConnect";
// import { address } from "../swap_components/dashboard";
// import bigInt from "big-integer";
import { useUserCrowd } from "../../hooks/useUserCrow.js";
import { useComplexLPData } from "../../hooks/useComplexLPData.js";
// import Moralis from 'moralis';
// import { EvmChain } from '@moralisweb3/common-evm-utils';
// import { useNFTsByOwner } from 'ankr-react';

// import {
// 	useSaleInfo,
// 	useBalanceOf,
// 	useDecimals,
// 	useAllowance,
// 	useRegularFeeRate,
// 	useTotalSupply,
// } from "../../hooks/useContactRead";
import {
	// contracts,
	// AAVEWBTCOwner,
	// CURRENT_DAO_INDEX,
	DAOs,
} from "../../utils/blockchain.js";
// import { useApproveWrite, useBuyWrite } from "../../hooks/useContractWrite";
// import { toOptionalFixed } from "../../utils/converter";
import btc from "../../assets/images/images_dashboard/btc.webp";
import altportfolio from "../../assets/images/images_dashboard/altportfolio.webp";
import air from "../../assets/images/images_dashboard/air.webp";
import safe from "../../assets/images/images_dashboard/safedaologo.png";
import ultra from "../../assets/images/images_dashboard/ultra.webp";
// import bigInt from "big-integer";

const Dashboard = () => {
	// const client = new CovalentClient("cqt_rQD8qf993P8D6rGM68tRFqYVbdbM");

	const { address } = useAccount();

	const isTxLoading = false; // Пример значения, заменить по необходимости
	const handleChangeReceive = (strategyName) => {
		console.log("Selected strategy:", strategyName);
	};
	const [selectedStrategy, setSelectedStrategy] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	// const [complexLPDataUser, setComplexLPDataUser] = useState({});
	// const [complexCrowdData, setComplexCrowdData] = useState({});

	const strategies = [
		{ name: "BTC", logo: btc },
		{ name: "ALTPORTFOLIO", logo: altportfolio },
		{ name: "ULTRA", logo: ultra },
		{ name: "AIR DROP", logo: air },
		{ name: "SAFE", logo: safe },
	];


	// const [BTCDAOLPUser, setBTCDAOLPUser] = useState(0);
	// const [totalSupplyLps, setTotalSupplyLps] = useState({});
	const [displayUserShare, setDisplayUserShare] = useState({});

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleStrategySelect = (strategyName) => {
		setSelectedStrategy(strategyName);
		setIsDropdownOpen(false);
		handleChangeReceive(strategyName);
	};

	// const fetchTotalSupplies = async (addresses) => {
	// 	const results = {};

	// 	for (const addr of addresses) {
	// 	  try {
	// 		const response = await client.BalanceService.getTokenBalancesForWalletAddress(
	// 		  "arbitrum-mainnet",
	// 		  addr
	// 		);

	// 		const items = response.data.items;
	// 		const totalSupply = items.reduce((sum, item) => sum + parseFloat(item.balance), 0); // Суммируем балансы
	// 		results[addr] = totalSupply; // Сохраняем результат в объект
	// 	  } catch (error) {
	// 		console.error(`Error fetching total supply for ${addr}:`, error);
	// 		results[addr] = null; // В случае ошибки сохраняем null
	// 	  }
	// 	}

	// 	setTotalSupplyData(results); // Обновляем состояние
	//   };

	// const useFetchTotalSupplies = async (addresses) => {
	// 	const results = {};

	// 	for (const addr of addresses) {
	// 	  // Используем useContractRead для получения totalSupply
	// 	  const { data: totalSupply, error } = useContractRead({
	// 		address: addr,
	// 		abi: [
	// 		  {
	// 			name: 'totalSupply',
	// 			type: 'function',
	// 			stateMutability: 'view',
	// 			inputs: [],
	// 			outputs: [{ name: '', type: 'uint256' }],
	// 		  },
	// 		],
	// 		functionName: 'totalSupply',
	// 	  });

	// 	  if (error) {
	// 		console.error(`Error fetching total supply for ${addr}:`, error);
	// 		results[addr] = null; // В случае ошибки сохраняем null
	// 	  } else {
	// 		results[addr] = totalSupply; // Сохраняем результат в объект
	// 	  }
	// 	}

	// 	setTotalSupplyData(results); // Обновляем состояние
	//   };

	const addresses = [
		DAOs.axBTCLP,
		DAOs.axAltPortfolioLP,
		DAOs.axUltraLP,
		DAOs.axAirdropLP,
		DAOs.axSafeLP,
	];

	const LPNames = ["axBTC", "AXALT", "axULT", "axAD", "axSAFE"];

	const LPTotalSupplyFix = {
		axBTC: 9500,
		AXALT: 9500003.34899,
		axULT: 9500002.39899,
		axAD: 9500002.39899,
		axSAFE: 9500002.39899,
	};

	const { data, error, isPending } = useReadContracts({
		contracts: addresses.map((address) => ({
			address,
			abi: [
				{
					name: "totalSupply",
					type: "function",
					stateMutability: "view",
					inputs: [],
					outputs: [{ name: "", type: "uint256" }],
				},
			],
			functionName: "totalSupply",
		})),
	});
	const { userCrowd: sumBtcDao } = useUserCrowd(DAOs.axBTC)
	const { userCrowd: sumUltraDao } = useUserCrowd(DAOs.axUltra)
	const { userCrowd: sumAltportfolioDao } = useUserCrowd(DAOs.axAltPortfolio)
	const { userCrowd: sumAirDropDao } = useUserCrowd(DAOs.axAirdrop)
	const { userCrowd: sumSafeDao } = useUserCrowd(DAOs.axSafe)
	const { userLpBalances: complexLPDataUser } = useComplexLPData(address)
	const { userLpBalances: complexCrowdData } = useComplexLPData("0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7")

	useEffect(() => {
		// console.debug(sumAirDropDao, sumAltportfolioDao, sumBtcDao, sumSafeDao, sumUltraDao, complexLPDataUser, complexCrowdData)
		// console.log('asdasd')

		// if (!isPending && data) {
		// 	const updatedTotalSupplyLps = {};
		// 	data.forEach((item, index) => {
		// 	  updatedTotalSupplyLps[addresses[index]] = item.result / 10n**18n;
		// 	  console.log( item)
		// 	  console.log("REGISTED ITEM")
		// 	});
		// 	setTotalSupplyLps(updatedTotalSupplyLps);
		// 	setTotalSupplyLps(updatedTotalSupplyLps);
		// 	setTotalSupplyLps(updatedTotalSupplyLps);

		//   }

		//   console.log('111111111')
		//   console.log(totalSupplyLps)

		// 	if (!isPending) {
		// 		console.log("get in data")
		// 		const updatedTotalSupplyLps = {};

		// 		data.forEach((item, index) => {
		// 		  console.log(item.result + " item");
		// 		  updatedTotalSupplyLps[addresses[index]] = item.result; // Преобразуем BigInt в строку
		// 		});

		// 		setTotalSupplyLps(updatedTotalSupplyLps);
		// 	  } else {
		// 		console.log("no data");
		// 		console.log("is pending?" + isPending)
		// 	  }

		//   console.log("totalSupply data1")
		//   console.log(totalSupplyLps)

		//   if (Object.keys(totalSupplyLps).length > 0) {
		// 	console.log('Total Supply LPs:', totalSupplyLps);
		//   }

		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	DAOs.axBTC
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
		// 	setSumBtcDao(sum.toFixed(2));
		// });

		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"eth-mainnet",
		// 	DAOs.axAltPortfolio
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
		// 	setSumAltportfolioDao(sum.toFixed(2));
		// });

		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	DAOs.axUltra
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
		// 	setSumUltraDao(sum.toFixed(2));
		// });
		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	DAOs.axAirdrop
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
		// 	setSumAirDropDao(sum.toFixed(2));
		// });
		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	DAOs.axSafe
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
		// 	setSumSafeDao(sum.toFixed(2));
		// });

		// lp tokens
		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	address
		// ).then((resp) => {
		// 	const items = resp?.data?.items;

		// 	const jsonString = JSON.stringify(items, (key, value) => {
		// 		if (typeof value === 'bigint') {
		// 		  return value.toString();
		// 		}
		// 		return value;
		// 	  });

		// 	  console.log(jsonString);
		// 	  console.log("address" + address)

		// 	const sum = items.map((i) => i.quote).reduce((x, y) => x + y, 0);
		// 	setBTCDAOLPUser(sum.toFixed(2));
		// 	console.log(BTCDAOLPUser + " is btcdaolp user")
		// });

		// ПОЛУЧЕНИЕ ЛП ЮЗЕРА
		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	address
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	// Создаем объект для хранения данных токенов
		// 	const tokenData = {};

		// 	items.forEach((item) => {
		// 		// console.log(item.contract_name)
		// 		// console.log(typeof(item.balance) + " item balance")

		// 		// console.log(typeof(item.contract_decimals) + " item decimals")
		// 		const balance = Number(item.balance); // BigInt
		// 		const decimals = item.contract_decimals; // Преобразуем в BigInt

		// 		let formattedBalance = Number(balance / 10 ** decimals);
		// 		tokenData[item.contract_ticker_symbol] = formattedBalance;
		// 	});

		// 	// Обновляем состояние complexLPData
		// 	setComplexLPDataUser(tokenData);
		// });
		// console.log("Complex LP Data:");
		// console.log(complexLPDataUser);

		//////////

		// ПОЛУЧЕНИЕ ЛП CROWDMODULE
		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	"0x0cf784bba0FFA0a7006f3Ee7e4357E643a07F6e7"
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	// Создаем объект для хранения данных токенов
		// 	const crowdData = {};

		// 	items.forEach((item) => {
		// 		// console.log(item.contract_name)
		// 		// console.log(typeof(item.balance) + " item balance")

		// 		// console.log(typeof(item.contract_decimals) + " item decimals")
		// 		const balance = Number(item.balance); // BigInt
		// 		const decimals = item.contract_decimals; // Преобразуем в BigInt

		// 		// let formattedBalance = Number(balance / 10**decimals);
		// 		let formattedBalance = Number(balance / 10 ** decimals);
		// 		crowdData[item.contract_ticker_symbol] = formattedBalance;
		// 	});

		// 	// Обновляем состояние complexCrowdData
		// 	setComplexCrowdData(crowdData);

		// 	console.log("crowd data:", crowdData);
		// });

		// client.BalanceService.getTokenBalancesForWalletAddress(
		// 	"arbitrum-mainnet",
		// 	address
		// ).then((resp) => {
		// 	const items = resp?.data?.items;
		// 	if (!items) return;
		// 	// Создаем объект для хранения данных токенов
		// 	const dataUser = {};

		// 	items.forEach((item) => {
		// 		// console.log(item.contract_name)
		// 		// console.log(typeof(item.balance) + " item balance")

		// 		// console.log(typeof(item.contract_decimals) + " item decimals")
		// 		const balance = Number(item.balance); // BigInt
		// 		const decimals = item.contract_decimals; // Преобразуем в BigInt

		// 		// let formattedBalance = Number(balance / 10**decimals);
		// 		let formattedBalance = Number(balance / 10 ** decimals);
		// 		dataUser[item.contract_ticker_symbol] = formattedBalance;
		// 	});

		// 	// Обновляем состояние complexCrowdData
		// 	setComplexCrowdData(dataUser);
		// });

		///////

		function getLPBalanceUserByName(tokenName) {
			if (complexLPDataUser?.hasOwnProperty(tokenName)) {
				return complexLPDataUser[tokenName];
			} else {
				return null;
			}
		}

		function getCrowdLPBalanceByName(tokenName) {
			if (complexCrowdData?.hasOwnProperty(tokenName)) {
				return complexCrowdData[tokenName];
			} else {
				return null;
			}
		}

		function getLPTotalSupplyFixByName(tokenName) {
			if (LPTotalSupplyFix?.hasOwnProperty(tokenName)) {
				return LPTotalSupplyFix[tokenName];
			} else {
				return null;
			}
		}

		function getSumDaoByName(tokenName) {
			if (tokenName == "axBTC") {
				return sumBtcDao;
			}
			if (tokenName == "AXALT") {
				return sumAltportfolioDao;
			}
			if (tokenName == "axULT") {
				return sumUltraDao;
			}
			if (tokenName == "axAD") {
				return sumAirDropDao;
			}
			if (tokenName == "axSAFE") {
				return sumSafeDao;
			}
			return null;
		}
		////

		//   complexCrowdData && complexLPDataUser && sumBtcDao &&   sumAltportfolioDao && sumUltraDao && sumAirDropDao && sumSafeDao
		if (complexCrowdData) {
			// const LPNames = [
			// 	"axBTC",
			// 	"AXALT",
			// 	"axULT",
			// 	"axAD",
			// 	"axSAFE",

			//   ]
			const displayShareData = {};

			LPNames.forEach((item, index) => {
				// получаем имя item на входе
				let currentValue;

				let cleanSupply =
					getLPTotalSupplyFixByName(item) - getCrowdLPBalanceByName(item);

				let userShare = getLPBalanceUserByName(item) / cleanSupply;

				let userValue = userShare * getSumDaoByName(item);

				displayShareData[item] = userValue.toFixed(3);
			});

			// / Обновляем состояние complexCrowdData
			setDisplayUserShare(displayShareData);

			////

			// 1. получить чистый оборот лп токенов (вычесть из totalSupply баланс crowdModule этого токена)
			// 2. получить долю юзера
			// 3. умножить долю юзера на sumDao
			//
			//
			//
			//
		} else {
		}
	}, [complexCrowdData, complexLPDataUser, sumAirDropDao, sumAltportfolioDao, sumBtcDao, sumSafeDao, sumUltraDao]);

	return (
		<>
			<section id="dashboard" className="dashboard">
				<div className="wrapper">
					<img className="up" src={up} alt="" />
					<div className="dashboard-conteiner">
						<div className="dashboard-conteiner-title">
							<h1 style={{ fontWeight: "800" }}>Мой дашборд</h1>
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
										<div className="deal-input">
											<div className="deal-input-content">
												<input
													value={selectedStrategy}
													type="text"
													readOnly={isTxLoading}
												/>
												{/* <p>7 533,10 USD</p> */}
											</div>
											<div className="deal-select" onClick={toggleDropdown}>
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
												{isDropdownOpen && (
													<div className="dropdown">
														{strategies.map((strategy, index) => (
															<div
																key={index}
																className="strategy"
																onClick={() =>
																	handleStrategySelect(strategy.name)
																}
															>
																<img
																	src={strategy.logo}
																	alt={strategy.name}
																	height={40}
																	width={40}
																/>
																<p>{strategy.name}</p>
															</div>
														))}
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="conteiner-content-button">
										<button className="content-button button_swap">
											TOTAL PROFIT: {selectedStrategy}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="parameters-conteiner">
						<div className="parameters-conteiner-content">
							<div className="content_item">
								<img src={btcImg} alt="" />
								<h3>BTC DAO: {displayUserShare["axBTC"]}$</h3>
							</div>
							<div className="content_item">
								<img src={altImg} alt="" />
								<h3>ALTPORTFOLIO DAO: {displayUserShare["AXALT"]}$</h3>
							</div>
							<div className="content_item">
								<img src={ultraImg} alt="" />
								<h3>ULTRA DAO: {displayUserShare["axULT"]}$</h3>
							</div>
							<div className="content_item">
								<img src={airImg} alt="" />
								<h3>AIR DROP DAO: {displayUserShare["axAD"]}$</h3>
							</div>
							<div className="content_item">
								<img src={safeImg} alt="" />
								<h3>SAFE DAO: {displayUserShare["axSAFE"]}$</h3>
							</div>
							<a href="">
								<img className="upward_shift" src={upward_shift} alt="" />
							</a>
						</div>
						<div className="parameters-conteiner-content-mobie">
							<div className="content_item">
								<img src={btcImg} alt="" />
								<h3>BTC DAO: {displayUserShare["axBTC"] ?? "-"}$</h3>
							</div>
							<div className="content_item">
								<img src={""} alt="" />
								<h3>ALTPORTFOLIO DAO: {displayUserShare["AXALT"] ?? "-"}$</h3>
							</div>
						</div>
						<div className="parameters-conteiner-content-mobie">
							<div className="content_item">
								<img src={ultraImg} alt="" />
								<h3>ULTRA DAO: {displayUserShare["axULT"] ?? "-"}$</h3>
							</div>
							<div className="content_item">
								<img src={airImg} alt="" />
								<h3>AIR DROP DAO: {displayUserShare["axAD"] ?? "-"}$</h3>
							</div>
							<div className="content_item">
								<img src={safeImg} alt="" />
								<h3>SAFE DAO: {displayUserShare["axSAFE"] ?? "-"}$</h3>
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
