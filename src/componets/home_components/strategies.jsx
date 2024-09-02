// import strategies_item_one from "../../assets/images/images_home/strategies_item_one.png";
import strategies_item_one_mobile from "../../assets/images/images_home/strategies_item_one_mobile.webp";
import strategies_item_two_mobile from "../../assets/images/images_home/strategies_item_two_mobile.webp";
import strategies_item_three_mobile from "../../assets/images/images_home/strategies_item_three_mobile.webp";
import strategies_item_fore_mobile from "../../assets/images/images_home/strategies_item_fore_mobile.webp";
import strategies_item_five_mobile from "../../assets/images/images_home/strategies_item_five_mobile.webp";
import btcLogo from "../../assets/tokenLogos/BTC.png";
import altLogo from "../../assets/tokenLogos/ALT.png";
import ultraLogo from "../../assets/tokenLogos/ULTRA.png";
import airLogo from "../../assets/tokenLogos/AIRDROP.png";
import safeLogo from "../../assets/tokenLogos/SAFE.png";
import React from "react";
import { Link } from "react-router-dom";


const daoStrategis = [
	{
		logo: btcLogo,
		title: "BTC DAO",
		description:
			"Подходит для инвесторов с низким уровнем риска, которые стремятся приумножить свои накопленные Bitcoin в этом же активе без рисков его потери.",
		link: "/strategies/btcdao",

	},
	{
		logo: altLogo,
		title: "ALTPORTFOLIO DAO",
		description:
			"Подходит для инвесторов с умеренным уровнем риска, готовых к возможным колебаниям ради значительного роста капитала.",
		link: "/strategies/altporfoliodao",
	},
	{
		logo: ultraLogo,
		title: "ULTRA DAO",
		description:
			"Подходит для инвесторов с высоким уровнем риска, стремящихся к максимальной прибыли в краткосрочной перспективе.",
		link: "/strategies/ultrdao",
	},
	{
		logo: airLogo,
		title: "AIR DROP DAO",
		description:
			"Подходит для инвесторов с высоким уровнем риска, готовых к длительному ожиданию ради потенциально крупных доходов.",
		link: "/strategies/airdropdao",
		width: 633,

	},
	{
		logo: safeLogo,
		title: "SAFE DAO",
		description:
			"Подходит для консервативных инвесторов, которые стремятся сохранить и постепенно приумножить свой капитал с минимальным риском.",
		link: "/strategies/safedao",
		width: 633,

	},
];

const StrategiesItem = ({ logo, title, description, link, index }) => {
	return (
		<div className={"strategies-conteiner-item" + (index > 2 ? " full-width" : "")}>
			<img src={logo} alt="" />
			<div className="strategies-conteiner-item-position">
				<div className="strategies-conteiner-item-content">
					<h2>{title}</h2>
					<p>{description}</p>
					<button className="strategies-button button">
						<Link to={link}>Подробнее</Link>
					</button>
				</div>
			</div>
		</div>
	);
};




const Strategies = () => {
	return (
		<>
			<section className="strategies">
				<div className="wpper-strategis">
					<div id="products" className="strategies-title desktop center">
						<h2>
							Какие стратегии <br /> мы используем
						</h2>
					</div>
					<div className="strategies-conteiner">
						{daoStrategis.map((item, index) => (
							<StrategiesItem
								key={index}
								logo={item.logo}
								title={item.title}
								description={item.description}
								link={item.link}
							/>
						))}
						{/* <div className="strategies-conteiner-item">
							<img width={170} src={strategies_item_one} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>BTC DAO</h2>
									<p>
										Подходит для инвесторов с низким уровнем риска, которые
										стремятся приумножить свои накопленные Bitcoin в этом же
										активе без рисков его потери.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/btcdao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="strategies-conteiner-item">
							<img src={strategies_item_two} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>ALTPORTFOLIO DAO</h2>
									<p>
										Подходит для инвесторов с умеренным уровнем риска, готовых к
										возможным колебаниям ради значительного роста капитала.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/altporfoliodao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="strategies-conteiner-item">
							<img src={strategies_item_three} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>ULTRA DAO</h2>
									<p>
										Подходит для инвесторов с высоким уровнем риска, стремящихся
										к максимальной прибыли в краткосрочной перспективе.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/ultrdao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div
							className="strategies-conteiner-item"
						// style={{ width: "250px", overflow: "hidden" }}
						>
							<img src={strategies_item_fore} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content padding-top">
									<h2>AIR DROP DAO</h2>
									<p>
										Подходит для инвесторов с высоким уровнем риска, <br />
										готовых к длительному ожиданию <br />
										ради потенциально крупных доходов.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/airdropdao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div
							className="strategies-conteiner-item"
						// style={{ width: "250px", overflow: "hidden" }}
						>
							<img src={strategies_item_five} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content padding-top">
									<h2>SAFE DAO</h2>
									<p>
										Подходит для консервативных инвесторов, <br />
										которые стремятся сохранить и постепенноb <br />
										приумножить свой капитал с минимальным риском.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/safedao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div> */}
					</div>
					{/* <div className="mobile strategies-conteiner">
						<div className="strategies-conteiner-item">
							<img src={strategies_item_five_mobile} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>BTC DAO</h2>
									<p>
										Подходит для инвесторов с низким уровнем риска, <br />
										которые стремятся приумножить свои накопленные Bitcoin{" "}
										<br />в этом же активе без рисков его потери.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/btcdao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="strategies-conteiner-item">
							<img src={strategies_item_two_mobile} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>ALTPORTFOLIO DAO</h2>
									<p>
										Подходит для инвесторов с умеренным уровнем риска, <br />
										готовых к возможным колебаниям ради <br />
										значительного роста капитала
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/altporfoliodao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="strategies-conteiner-item">
							<img src={strategies_item_three_mobile} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>ULTRA DAO</h2>
									<p>
										Подходит для инвесторов с высоким уровнем риска, <br />
										готовых к длительному ожиданию <br />
										ради потенциально крупных доходов.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/ultrdao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="strategies-conteiner-item">
							<img src={strategies_item_fore_mobile} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>AIR DROP DAO</h2>
									<p>
										Подходит для инвесторов с высоким уровнем риска, <br />
										готовых к длительному ожиданию <br />
										ради потенциально крупных доходов.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/airdropdao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="strategies-conteiner-item">
							<img src={strategies_item_one_mobile} alt="" />
							<div className="strategies-conteiner-item-position">
								<div className="strategies-conteiner-item-content">
									<h2>SAFE DAO</h2>
									<p>
										Подходит для консервативных инвесторов, <br />
										которые стремятся сохранить и постепенноb <br />
										приумножить свой капитал с минимальным риском.
									</p>
									<button className="strategies-button button">
										<Link to="/strategies/safedao">Подробнее</Link>
									</button>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</section>
		</>
	);
};

export default Strategies;
