import { useEffect, useState } from "react";
import { useAccount, useReadContracts, useConnect } from "wagmi";
import circle_swap from "../../assets/images/images_swap/circle_swap.webp";
// import btcLogo from "../../assets/tokenLogos/BTC.png";
// import altLogo from "../../assets/tokenLogos/ALT.png";
// import ultraLogo from "../../assets/tokenLogos/ULTRA.png";
// import airLogo from "../../assets/tokenLogos/AIRDROP.png";
// import safeLogo from "../../assets/tokenLogos/SAFE.png";
import React from "react";
import up from "../../assets/images/images_safe/up.svg";
import { useUserCrowd } from "../../hooks/useUserCrow.js";
import { useComplexLPData } from "../../hooks/useComplexLPData.js";
import {
	DAOs,
} from "../../utils/blockchain.js";
import btc from "../../assets/images/images_dashboard/btc.webp";
import altportfolio from "../../assets/images/images_dashboard/altportfolio.webp";
import air from "../../assets/images/images_dashboard/air.webp";
import safe from "../../assets/images/images_dashboard/safedaologo.png";
import ultra from "../../assets/images/images_dashboard/ultra.webp";




import { useConnectModal } from "@rainbow-me/rainbowkit";
import upward_shift from "../../assets/images/images_swap/upward_shift.svg";
import left_green_circle from "../../assets/images/images_swap/left_green_circle.png";
import right_oreng_circle from "../../assets/images/images_swap/right_oreng_circle.png";
import vector_smart_object from "../../assets/images/images_swap/vector_smart_object.svg";
import { DAOs_DATA, STRATEGI_KEYS } from "../../constants/strategis.js";

const UserDashboard = () => {

	const { address } = useAccount();
	const { openConnectModal, connectModalOpen } = useConnectModal()
	const { connect } = useConnect();




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

	// const toggleDropdown = () => {
	// 	setIsDropdownOpen(!isDropdownOpen);
	// };

	const handleStrategySelect = (strategyName) => {
		setSelectedStrategy(strategyName);
		setIsDropdownOpen(false);
		handleChangeReceive(strategyName);
	};

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

		if (complexCrowdData) {

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
			console.log("displayUserShare")
			console.log(displayUserShare)
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
	const daoItems = Object.values(STRATEGI_KEYS).map((kdao) => {
		return (
			<div className="content_item">
				<img src={DAOs_DATA[kdao].img} alt="" />
				<h3>{DAOs_DATA[kdao].symbol}: {displayUserShare[DAOs_DATA[kdao].lpName] ?? "-"}$</h3>
			</div>
		)

	})
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
							{/* <div className="conteiner-content-deal">
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
							</div> */}
						</div>
					</div>
					<div className="parameters-conteiner">
						<div className="parameters-conteiner-content">
							{/* <div className="content_item">
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
							</div> */}

							{daoItems}
							<a href="">
								<img className="upward_shift" src={upward_shift} alt="" />
							</a>
						</div>
						<div className="parameters-conteiner-content-mobie">
							{/* <div className="content_item">
								<img src={btcImg} alt="" />
								<h3>BTC DAO: {displayUserShare["axBTC"] ?? "-"}$</h3>
							</div>
							<div className="content_item">
								<img src={altImg} alt="" />
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
							</div> */}
							{daoItems}
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

export default UserDashboard;
