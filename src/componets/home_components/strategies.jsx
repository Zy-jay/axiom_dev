import strategies_item_one from "../../assets/images/images_home/strategies_item_one.webp";
import strategies_item_one_mobile from "../../assets/images/images_home/strategies_item_one_mobile.webp";
import strategies_item_two_mobile from "../../assets/images/images_home/strategies_item_two_mobile.webp";
import strategies_item_three_mobile from "../../assets/images/images_home/strategies_item_three_mobile.webp";
import strategies_item_fore_mobile from "../../assets/images/images_home/strategies_item_fore_mobile.webp";
import strategies_item_five_mobile from "../../assets/images/images_home/strategies_item_five_mobile.webp";
import strategies_item_two from "../../assets/images/images_home/strategies_item_two.webp";
import strategies_item_three from "../../assets/images/images_home/strategies_item_three.webp";
import strategies_item_fore from "../../assets/images/images_home/strategies_item_fore.webp";
import strategies_item_five from "../../assets/images/images_home/strategies_item_five.webp";
import React from "react";
import { Link } from "react-router-dom";

const Strategies = () => {
	return (
		<>
			<section className="strategies">
				<div className="wrapper">
					<div id="products" className="strategies-title desktop">
						<h2>
							Какие стратегии <br /> мы используем
						</h2>
					</div>
					<div className="strategies-conteiner desktop">
						<div className="strategies-conteiner-item">
							<img src={strategies_item_one} alt="" />
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
					</div>
					<div className="strategies-conteiner desktop">
						<div
							className="strategies-conteiner-item item-width"
							style={{ width: "250px", overflow: "hidden" }}
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
							className="strategies-conteiner-item item-width"
							style={{ width: "250px", overflow: "hidden" }}
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
						</div>
					</div>
					<div className="mobile strategies-conteiner">
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
					</div>
				</div>
			</section>
		</>
	);
};

export default Strategies;
