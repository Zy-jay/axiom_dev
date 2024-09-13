import usdt from "../../assets/images/images_safe/usdt.svg";
import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";
import xdao from "../../assets/images/tokenLogos/xdao.png";
import wbtc from "../../assets/images/tokenLogos/wbtc.png";
import dai from "../../assets/images/tokenLogos/dai.png";
import circle_swap from "../../assets/images/images_swap/circle_swap.webp";
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { observer } from 'mobx-react-lite';



// import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";


import React, { useReducer, useLayoutEffect, useMemo, useEffect, useState, useRef } from "react";
import { toOptionalFixed } from "../../utils/converter";
import { DAOs_DATA } from "../../constants/strategis";
import { TOKENS_COLORS } from "../../constants/tokens";
import { useStore } from "../../hooks/useStore";
import { ethers } from "ethers";

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
	const store = useStore()

	const [isHovered, setIsHovered] = useState(false);
	const elementRef = useRef(null);

	useEffect(() => {
		const element = elementRef.current;

		// Обработчики событий
		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => setIsHovered(false);

		if (element) {
			element.addEventListener('mouseenter', handleMouseEnter);
			element.addEventListener('mouseleave', handleMouseLeave);
		}

		// Очистка обработчиков при размонтировании
		return () => {
			if (element) {
				element.removeEventListener('mouseenter', handleMouseEnter);
				element.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}, []);

	useEffect(() => {
		store.setHoveringKey(isHovered ? token.symbol : "")
	}, [isHovered])

	return (
		isToken ? <div ref={elementRef} style={{
			display: "flex",
			alignItems: "center",
			gap: 10,
			color: "white",
			height: "fit-content",
			cursor: "pointer"
		}}>
			<img width={69} src={getLogo(token?.symbol) ?? token.img ?? `https://tokens.pancakeswap.finance/images/${ethers.getAddress(token.address)}.png`}
				style={{ borderRadius: "50%" }}
				alt=""
				onError={(e) => {
					e.target.onError = null;
					e.target.src = `https://tokens.pancakeswap.finance/images/${ethers.getAddress(token.address)}.png`;
				}}
			/>
			<span ><p>
				{token.symbol}
			</p>

				<p>{token.balance && token.decimals ? toOptionalFixed(Number(token.balance) / 10 ** token.decimals, +token.decimals < 8 ? 2 : 4) : ""}</p></span>
			{/* <div style={{ color: "white", fontWeight: "bold" }}>
			10
		</div> */}
		</div>
			:
			<div style={{
				background: "rgb(112 112 112 / 8%)",
				borderRadius: 26,
				border: "1px solid rgb(255 255 255 / 2%)",
				padding: "20px 20px 10px 20px",
				maxWidth: 410,
				maxHeight: 252,
				height: 252,
				color: "white",
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

const Portfolio = observer(({ portfolio, dao }) => {

	const store = useStore()
	const isTokens = portfolio?.[0]?.symbol ? true : false;
	const [renderCount, forceUpdate] = useReducer(x => x + 1, 0);
	const [width, setWidth] = React.useState("unset");
	const ref = React.useRef(null);
	const data = useMemo(() => {
		return isTokens ? portfolio?.map((p) => {
			const isBtcDao = portfolio.length === 1 && p.symbol === "aArbWBTC";
			return {
				name: p.symbol,
				value: isBtcDao ? Number(p.balance) / 10 ** 8 : Number(p.usdValue ?? 0),
				fill: TOKENS_COLORS[p.symbol] ?? "#" + Math.floor(Math.random() * 16777215).toString(16)
			}
		}) : [];
	}, [isTokens, portfolio]);

	useLayoutEffect(() => {
		forceUpdate(); // Call forceUpdate when data changes
	}, [data, forceUpdate]);

	useEffect(() => {
		if (!ref.current) {
			setWidth(width === "unset" ? "100%" : "unset")
		} else {
			setTimeout(() => setWidth("100%"), 500)

		}
	}, [width, ref, data])


	const { hoveringKey } = store

	useEffect(() => {
		if (!ref.current) {
			setWidth("unset")
			setTimeout(() => setWidth("100%"), 500)
		}
	}, [hoveringKey])

	return (
		<>
			<section className="strategies_safe">
				<div className="wrapper-strategis"><div className="strategies-title_safe">
					<h2>Состав портфеля</h2>
					<div className="howWeWork-conteiner-line_safe"></div>
				</div>
					<div className="strategies-section_safe">
						<div style={{
							minHeight: "19vw",
							flexDirection: isTokens ? "row" : "column",
							justifyContent: "space-between",
							margin: "auto"
						}}
							className="strategies-conteiner_safe" >

							<div
								style={{
									display: "flex",
									gap: isTokens ? 20 : 10,
									flexWrap: "wrap",
									width: isTokens ? "50%" : "100%",
									maxWidth: 1300,
									alignItems: isTokens ? "unset" : "center",
									justifyContent: isTokens ? "flex-start" : "space-evenly",
									// minHeight: ,
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
							{isTokens && <ResponsiveContainer
								style={{
									backgroundImage: `url(${DAOs_DATA[dao]?.img})`,
									backgroundRepeat: "no-repeat",
									backgroundSize: "30%",
									backgroundPosition: "center",
									minHeight: "19.48vw"
								}}
								key={"chart-container-" + data[0]?.symbol + "-" + renderCount}
								width={"100%"} height={width}  >
								<PieChart
									key={"PieChart" + renderCount}
								// width={600} height={600}
								>
									<Pie ref={ref}
										data={data}
										// cx={120}
										// cy={230}

										innerRadius={"85%"}
										outerRadius={"95%"}
										fill="#8884d8"
										paddingAngle={5}
										dataKey="value"
										cursor={"pointer"}
										key={"portfolio-chart-pie" + renderCount}
									>

										{data.map((entry, index) => (
											<Cell
												className={`hovering ${hoveringKey === entry.name ? "active" : ""}`}
												key={`portfolio-${index}-${entry.name}`}
												fill={entry.fill}
											// style={{
											// 	transform: `scale(${hoveringKey === entry.name ? "1.1" : 1})`,
											// 	transition: "transform 2s ease",
											// 	transformOrigin: "center"
											// }}
											/>
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>}

						</div>
						{/* <img className="circle_safe" src={circle} alt="" /> */}
					</div>
				</div>
			</section>
		</>
	);
});

export default Portfolio;
