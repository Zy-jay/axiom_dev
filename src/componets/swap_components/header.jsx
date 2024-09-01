import axiomlogo from "../../assets/images/images_swap/axiom_logo.svg";
import orange_circle from "../../assets/images/images_swap/orange_circle.png";
import left_orange_circle from "../../assets/images/images_swap/left_orange_circle.png";
import React, { useState } from "react";
import burger from "../../assets/images/images_swap/burger.svg";
import button_trade from "../../assets/images/images_swap/button_trade.svg";
import board from "../../assets/images/images_swap/board.png";
import drop_down from "../../assets/images/images_safe/drop-down.svg";
import { Link } from "react-router-dom";
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
			<header id="header" className="header_swa">
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
								<a href="/" style={{ cursor: "pointer" }}>
									<img src={axiomlogo} alt="Главная страница" />
								</a>{" "}
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
													href="https://crypto.axiom-wm.com/"
													target="_blank"
													rel="noopener"
												>
													Crypto
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
													href="https://crypto.axiom-wm.com/"
													target="_blank"
													rel="noopener"
												>
													Crypto
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
				<img className="orange-circle" src={orange_circle} alt="" />
				<img className="left_orange_circle" src={left_orange_circle} alt="" />
			</header>
		</>
	);
};

export default Header;
