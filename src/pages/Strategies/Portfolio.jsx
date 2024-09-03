import usdt from "../../assets/images/images_safe/usdt.svg";
import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";
import xdao from "../../assets/images/tokenLogos/xdao.png";
import wbtc from "../../assets/images/tokenLogos/wbtc.png";
import dai from "../../assets/images/tokenLogos/dai.png";

// import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";


import React from "react";
import { toOptionalFixed } from "../../utils/converter";

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
	return undefined
}

// {
// 	img: i.logo_url,
// 	symbol: i.contract_ticker_symbol,
// 	usdValue: i.quote,
// 	address: i.contract_address,
// 	decimals: i.contract_decimals,
// 	balance: i.balance,
// 	name: i.contract_name,

// 	// amount: i.pretty_quote,
//   }

const PortfolioItem = ({ logo, title, text, token }) => {
	const isToken = token.symbol ? true : false;
	console.log(token);

	return (
		isToken ? <div style={{ display: "flex", alignItems: "center", gap: 10, color: "white", height: "fit-content" }}>
			<img width={69} src={getLogo(token?.symbol) ?? token?.img} alt="" />
			<span ><p>
				{token.symbol}
			</p>

				<p>{token.balance && token.decimals ? toOptionalFixed(Number(token.balance) / 10 ** token.decimals, +token.decimals < 8 ? 2 : 4) : ""}</p></span>
			{/* <div style={{ color: "white", fontWeight: "bold" }}>
			10
		</div> */}
		</div> : <div style={{
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
			<p style={{ marginTop: 20 }}>{text}</p>
		</div>
	);

}

const Portfolio = ({ portfolio }) => {
	const isTokens = portfolio?.[0]?.symbol ? true : false;

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
									justifyContent: isTokens ? "left" : "space-evenly",
									minHeight: 800,
									padding: isTokens ? 20 : "unset"
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
												token={p}
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

export default Portfolio;
