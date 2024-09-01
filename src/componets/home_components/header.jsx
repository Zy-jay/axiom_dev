import axiomlogo from "../../assets/images/images_home/axiom_logo.png";
import React, { useState } from "react";
import drop_down from "../../assets/images/images_home/drop-down.svg";
import vector from "../../assets/images/images_home/vector.svg";
import ellipse_header from "../../assets/images/images_home/ellipse_header.svg";
import burger from "../../assets/images/images_home/burger.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";

const Header = () => {
	const { address } = useAccount();

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

	return (
		<>
			<header id="header" className="header">
				<motion.div
					animate={{ y: [0, 0, 0] }}
					transition={{ repeat: Infinity, duration: 2 }}
				>
					<img className="vector" src={vector} alt="" />
				</motion.div>
				<img className="ellipse_header" src={ellipse_header} alt="" />
				<div className="wrapper_">
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
									<Link to="/strategies/btcdao">BTC DAO</Link>
									<Link to="/strategies/altporfoliodao">Altporfolio DAO</Link>
									<Link to="/strategies/ultrdao">Ultra DAO</Link>
									<Link to="/strategies/airdropdao">AirDrop DAO</Link>
									<Link to="/strategies/safedao">Safe DAO</Link>
									<div className="drop-down ">
										<a href="#" onClick={() => setIsOpen(!isOpen)}>
											Наши проекты
										</a>
										<img src={drop_down} alt="" />
										{isOpen && (
											<div className="drop-down-conteiner-content">
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
											</div>
										)}
									</div>
									{address ? (
										<button className="button">
											<Link to="/dashboard">{address}</Link>
										</button>
									) : (
										<button className="button">
											<Link to="/dashboard">Кошелек</Link>
										</button>
									)}
								</nav>
							</div>
							<div className={isMenuOpen ? "active" : "hidden"}>
								<nav>
									<Link to="/">Главная</Link>
									<Link to="/strategies/btcdao">BTC DAO</Link>
									<Link to="/strategies/altporfoliodao">Altporfolio DAO</Link>
									<Link to="/strategies/ultrdao">Ultra DAO</Link>
									<Link to="/strategies/airdropdao">AirDrop DAO</Link>
									<Link to="/strategies/safedao">Safe DAO</Link>
									<div className="drop-down ">
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
									{address ? (
										<button className="button">
											<Link to="/dashboard">{address}</Link>
										</button>
									) : (
										<button className="button">
											<Link to="/dashboard">Кошелек</Link>
										</button>
									)}
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
