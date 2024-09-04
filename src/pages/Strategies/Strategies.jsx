// import strategies_item_one from "../../assets/images/images_home/strategies_item_one.png";
// import strategies_item_two from "../../assets/images/images_home/strategies_item_two.png";
// import strategies_item_three from "../../assets/images/images_home/strategies_item_three.png";
// import strategies_item_fore from "../../assets/images/images_home/strategies_item_fore.png";
// import strategies_item_five from "../../assets/images/images_home/strategies_item_five.png";
import "../../css/home.css"

// import strategies_item_one_mobile from "../../assets/images/images_home/strategies_item_one_mobile.webp";
// import strategies_item_two_mobile from "../../assets/images/images_home/strategies_item_two_mobile.webp";
// import strategies_item_three_mobile from "../../assets/images/images_home/strategies_item_three_mobile.webp";
// import strategies_item_fore_mobile from "../../assets/images/images_home/strategies_item_fore_mobile.webp";
// import strategies_item_five_mobile from "../../assets/images/images_home/strategies_item_five_mobile.webp";
import btcLogo from "../../assets/tokenLogos/BTC.png";
import altLogo from "../../assets/tokenLogos/ALT.png";
import ultraLogo from "../../assets/tokenLogos/ULTRA.png";
import airLogo from "../../assets/tokenLogos/AIRDROP.png";
import safeLogo from "../../assets/tokenLogos/SAFE.png";
import React from "react";
import { useNavigate } from "react-router-dom";


const daoStrategis = [
	{
		logo: btcLogo,
		title: "BTC DAO",
		description:
			"Подходит для инвесторов с низким уровнем риска, которые стремятся приумножить свои накопленные Bitcoin в этом же активе без рисков рыночных просадок.",
		link: "/strategies/btcdao",

	},
	{
		logo: altLogo,
		title: "ALTPORTFOLIO DAO",
		description:
			"Подходит для инвесторов с среднем уровнем риска, готовых к сбалансированному приросту капитала с возможностью получить значительную прибыль на рыночных циклах рынка криптовалют.",
		link: "/strategies/altporfoliodao",
	},
	{
		logo: ultraLogo,
		title: "ULTRA DAO",
		description:
			"Подходит для инвесторов с высоким уровнем риска, стремящихся к кратному приумножению капитала с учетом повышенных рисков.",
		link: "/strategies/ultrdao",
	},
	{
		logo: airLogo,
		title: "AIR DROP DAO",
		description:
			"Подходит для инвесторов с высоким уровнем риска, стремящихся к кратному приумножению капитала с учетом повышенных рисков.",
		link: "/strategies/airdropdao",
		width: 633,

	},
	{
		logo: safeLogo,
		title: "SAFE DAO",
		description:
			"Подходит для инвесторов с низким уровнем риска, которые стремятся сохранить капитал с минимальной волатильностью к рынку и высокой ликвидностью криптоактивов.",
		link: "/strategies/safedao",
		width: 633,

	},
];

const StrategiesItem = ({ logo, title, description, link, index }) => {
	const navigate = useNavigate()
	return (
		<div className={"strategies-conteiner-item" + (index > 2 ? " full-width" : "")}>
			<img src={logo} alt="" />
			<div className="strategies-conteiner-item-position">
				<div className="strategies-conteiner-item-content">
					<h2>{title}</h2>
					<p>{description}</p>
					<button onClick={() => navigate(link)} className="strategies-button button">
						Подробнее
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

					</div>
				</div>
			</section>
		</>
	);
};

export default Strategies;
