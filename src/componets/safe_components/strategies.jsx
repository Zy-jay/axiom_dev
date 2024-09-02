import usdt from "../../assets/images/images_safe/usdt.svg";
import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";
import xdao from "../../assets/images/tokenLogos/xdao.png";
import wbtc from "../../assets/images/tokenLogos/wbtc.png";
import dai from "../../assets/images/tokenLogos/dai.png";

// import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";


import React from "react";

function getLogo(tokenName) {
	if (tokenName == "aArbWBTC") {
		return aarbwbtc;
	}

	if (tokenName == "XDAO") {
		return xdao;
	}

	if (tokenName == "WBTC") {
		return wbtc;
	}

	if (tokenName == "USDT") {
		return usdt;
	}
	if (tokenName == "DAI") {
		return dai;
	}
}



const PortfolioItem = ({ logo, title, text }) => {
	return (
		<div style={{
			background: "rgb(112 112 112 / 8%)",
			borderRadius: 26,
			border: "1px solid rgb(255 255 255 / 2%)",
			padding: "20px 20px 10px 20px",
			maxWidth: 410,
			maxHeight: 252, color: "white",
			boxSizing: "border-box",
			backdropFilter: "blur(10px)",

		}}>
			<span style={{
				color: "white", display: "flex", gap: 20,
				alignItems: "center", marginBottom: 20
			}}>
				<span style={{
					borderRadius: "26px",
					width: "54px",
					height: 54,
					background: "rgb(112 112 112 / 10%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}} >
					<img src={logo} alt={title} />
				</span>
				<h3 >{title}</h3>
			</span>
			<p>{text}</p>
		</div>
	);

}

const Strategies = ({ portfolio }) => {

	console.log("portfolio is ")
	console.log(portfolio)

	
	return (
		<>
			<section className="strategies_safe">
				<div className="wrapper-strategis">
					<div className="strategies-section_safe">
						<div className="strategies-conteiner_safe" >
							<div className="strategies-title_safe">
								<h2>Состав портфеля</h2>
								<div className="howWeWork-conteiner-line_safe"></div>
							</div>
							<div
								style={{
									display: "flex",
									gap: 10,
									flexWrap: "wrap",
									width: "100%",
									maxWidth: 1300,
									justifyContent: "space-evenly",
									// margin: "auto",
								}}
							>
								{portfolio ? (
									<>
										{portfolio.map((p, index) => (
											<PortfolioItem
												key={index}
												logo={p.logo}
												title={p.title}
												text={p.text}
											/>
										))}
									</>
								) : (
									<div></div>
								)}
							</div>
						</div>
						{/* <img className="circle_safe" src={circle} alt="" /> */}
					</div>
				</div>
			</section>
		</>
	);
};

export default Strategies;
