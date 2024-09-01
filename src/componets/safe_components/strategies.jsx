import usdt from "../../assets/images/images_safe/usdt.svg";
import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";
import xdao from "../../assets/images/tokenLogos/xdao.png";
import wbtc from "../../assets/images/tokenLogos/wbtc.png";
import dai from "../../assets/images/tokenLogos/dai.png";

// import aarbwbtc from "../../assets/images/tokenLogos/aarbwbtc.png";

import circle from "../../assets/images/images_safe/circle.webp";
import React, { useEffect } from "react";

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

const Strategies = ({ tokens }) => {
	return (
		<>
			<section className="strategies_safe">
				<div className="wrapper">
					<div className="strategies-section_safe">
						<div className="strategies-conteiner_safe">
							<div className="strategies-title_safe">
								<h2>Состав портфеля</h2>
								<div className="howWeWork-conteiner-line_safe"></div>
							</div>
							<div
								className="strategies-conteiner-items_safe"
								style={{ display: "flex", flexWrap: "wrap" }}
							>
								{tokens ? (
									<>
										{tokens.map((t, index) => (
											<div className="strategies-conteiner-item_safe">
												<img src={getLogo(t.token)} alt="" />
												<h2>
													{t.token}

													{t.amount && (
														<>
															-{" "}
															<span style={{ fontWeight: "bold" }}>
																{t.amount === "0.00" ? "<0.01" : t.amount}
															</span>
														</>
													)}
												</h2>
												{/* <div style={{ color: "white", fontWeight: "bold" }}>
													10
												</div> */}
											</div>
										))}
									</>
								) : (
									<div></div>
								)}
							</div>
						</div>
						<img className="circle_safe" src={circle} alt="" />
					</div>
				</div>
			</section>
		</>
	);
};

export default Strategies;
