import axiomlogo from "../../assets/images/images_home/axiom_logo.png";
import React, { useMemo, useState } from "react";
import drop_down from "../../assets/images/images_home/drop-down.svg";
import vector from "../../assets/images/images_home/vector.svg";
import ellipse_header from "../../assets/images/images_home/ellipse_header.svg";
import burger from "../../assets/images/images_home/burger.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import WalletImg from "../../assets/images/images_home/wallet_icon.png";
import { DAOs_DATA, STRATEGI_KEYS } from "../../constants/strategis";
import { shortenAddress } from "../../utils/shortenAddress";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";

const Header = () => {

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const [isOpen, setIsOpen] = useState(false);

	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};
	const { address, isConnected, chain } = useAccount();

	const { openConnectModal, connectModalOpen } = useConnectModal()
	const { openAccountModal } = useAccountModal()

	const navigate = useNavigate()
	// const location = useLocation();

	const pathname = window.location.pathname
	const pageName = useMemo(() => {
		const pathSplit = pathname.split("/")
		return pathSplit[pathSplit.length - 1]
	}, [pathname])


	const isDashboard = pageName === "dashboard"
	const isSwap = pageName === "swap"

	console.debug("pageName", pageName, isDashboard)



	return (
		<>
			<header id="header" className="header">
				<motion.div
					animate={{ y: [0, 0, 0] }}
					transition={{ repeat: Infinity, duration: 2 }}
				>
					<img className="vector" src={vector} alt="" />
				</motion.div>
				<div style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					flexWrap: "wrap",
					margin: "auto",
					width: "100%",
					padding: "20px",
					zIndex: 100,
				}}>

					<div style={{
						display: "flex",
						justifyContent: "right",
						alignItems: "right",
						position: "fixed",
						margin: "auto",
						width: "70.42vw",
						zIndex: 100,

					}}>
						<div className="drop-down " style={{ zIndex: 100 }}>
							<div className="drop-down ">
								<a href="#" onClick={() => setIsOpen(!isOpen)}>
									Наши проекты
								</a>
								<img src={drop_down} alt="" />
								{isOpen && (
									<div
										className="drop-down-content"
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										<a
											href="https://axiom-wm.com/"
											target="_blank"
											rel="noopener"
										>
											Family Office
										</a>
										<a
											href="http://datacenter.axiom-wm.com/"
											target="_blank"
											rel="noopener"
										>
											Data Center
										</a>
										<a
											href="https://fund.axiom-wm.com/"
											target="_blank"
											rel="noopener"
										>
											Dividend’s Fund
										</a>
										<a
											href="https://axiom-wm.com/international-estate-asset-management"
											target="_blank"
											rel="noopener"
										>
											Real Estate
										</a>
									</div>
								)}
							</div>
						</div>
					</div>

					<img className="ellipse_header" src={ellipse_header} alt="" />
					<div className="wrapper_" style={{ zIndex: 10, width: "100%", margin: "auto" }}>
						<div
							className={
								isMenuOpen
									? " header-nav-bar header-nav-active"
									: "header-nav-bar"
							}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<div className="fixed">


								<div className="header-nav">
									<div style={{ display: "flex", alignContent: "center" }} className="image-container">
										<a href="/" style={{ cursor: "pointer" }}>
											<img width={231} src={axiomlogo} alt="Главная страница" />
										</a>
									</div>
									<img
										className="burger"
										src={burger}
										onClick={toggleMenu}
										alt=""
									/>
									<nav>



										<Link to="/">Главная</Link>
										{Object.values(STRATEGI_KEYS).map((key) => {
											return <Link to={DAOs_DATA[key].link?.replace("/swap", "")}>{DAOs_DATA[key].name}</Link>

										})}

										{address ?
											<span
												onClick={() => openAccountModal()}
												style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center", marginTop: "auto", marginBottom: "auto", width: "fit-content" }}>
												{shortenAddress(address)}
											</span> : <button style={{ background: "#B6B6B6", color: "#000000" }} onClick={() => address ? openAccountModal() : openConnectModal()} className="button">
												<span > <img src={WalletImg} alt="" /> Connect Wallet</span>
											</button>}
										<button onClick={() => {
											navigate("/dashboard")
											!address && openConnectModal()
										}} className="button">
											{"Dashboard"}
										</button>
										{/* {

										!address ? <button onClick={() => {
											openConnectModal();
											!isDashboard && navigate("/dashboard")
										}
										} className="button">
											{isDashboard ? "Connect" : "Dashboard"}
										</button> : isDashboard ? (
											<button onClick={() => openAccountModal()} className="button">
												{shortenAddress(address)}
											</button>

										) : (
											<div className="btns">
												<button onClick={() => {
													navigate("/dashboard")
													!address && openConnectModal()
												}} className="button">
													{"Dashboard"}
												</button>
												<span> <p style={{ cursor: "pointer" }} onClick={() => address ? openAccountModal() : openConnectModal()}>
													{address ? shortenAddress(address) : "Connect Wallet"}
												</p>
												</span>
											</div>
										)} */}
									</nav>
								</div>
								<div className={isMenuOpen ? "active" : "hidden"}>
									<nav>
										<Link to="/">Главная</Link>
										{Object.values(STRATEGI_KEYS).map((key) => {
											return <Link to={DAOs_DATA[key].link?.replace("/swap", "")}>{DAOs_DATA[key].name}</Link>

										})}

										{isDashboard || isSwap ? (
											<button onClick={() => address ? openAccountModal() : openConnectModal()} className="button">
												{address ? <span> <img src={WalletImg} alt="" /> {shortenAddress(address)}</span> : "Connect Wallet"}
											</button>
										) : (
											<button onClick={() => {
												navigate("/dashboard")
												!address && openConnectModal()
											}} className="button">
												{"Dashboard"}
											</button>
										)}
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header >
		</>
	);
};

export default Header;
