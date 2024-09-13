import howWeWorkRectangle from "../../assets/images/images_home/howWeWorkRectangle.png";
import howWeWorkRectanglemobile from "../../assets/images/images_home/howWeWorkRectanglemobile.webp";
import howWeWorkRectangle_itemOne from "../../assets/images/images_home/howWeWorkRectangle_itemOne.svg";
import howWeWorkRectangle_itemTwo from "../../assets/images/images_home/howWeWorkRectangle_itemTwo.svg";
import ellipse_howWeWork from "../../assets/images/images_home/ellipse_howWeWork.svg";
import ellipse_howWeWorkTwo from "../../assets/images/images_home/ellipse_howWeWorkTwo.svg";
import youtube from "../../assets/images/images_home/youtube.svg";
import x from "../../assets/images/images_home/x.svg";
import telegram from "../../assets/images/images_home/telegram.svg";
import instagram from "../../assets/images/images_home/instagram.svg";
import facebook from "../../assets/images/images_home/facebook.svg";
import axiom_animate from "../../assets/images/images_home/axiom_animate.gif";
import up from "../../assets/images/images_home/up.svg";
import React from "react";

const Baner = () => {
	return (
		<>
			<section className="howWeWork">
				<img className="ellipse_howWeWork" src={ellipse_howWeWork} alt="" />
				<img
					className="ellipse_howWeWorkTwo"
					src={ellipse_howWeWorkTwo}
					alt=""
				/>
				<img onClick={() => window.scrollTo({
					top: 0,
					behavior: 'smooth' // Плавная прокрутка
				})} style={{ cursor: "pointer" }} className="up" src={up} alt="" />
				{/* <div className="social-conteiner">
                    <div className="social">
                        <img className="facebook" src={facebook} alt="" />
                        <img className="youtube" src={youtube} alt="" />
                        <img className="instagram" src={instagram} alt="" />
                        <img className="x" src={x} alt="" />
                        <img className="telegram" src={telegram} alt="" />
                    </div>
                </div>
                */}
				<div className="wrapper">
					<div className="howWeWork-conteiner">
						<img className="axiom_animate" src={axiom_animate} alt="" />

						<h2>
							Приумножай свои активы <br /> на рынке криптовалют
						</h2>
						<div className="howWeWork-conteiner-tiltle-mobile">
							<h3>
								Приумножай свои <br /> активы на рынке <br /> криптовалют
							</h3>
						</div>
						<p>вместе с AXIOM</p>
						<a href="#products">
							<button className="button">Продукты</button>
						</a>
					</div>
					<div className="howWeWorkRectangle-conteiner desktop">
						<img
							className="howWeWorkRectangle"
							src={howWeWorkRectangle}
							alt=""
						/>
						<div className="howWeWorkRectangle-conteiner-title">
							<div className="howWeWorkRectangle-conteiner-title-content">
								<h2>
									Как мы <br /> работаем
								</h2>
								<div className="line"></div>
								<p>
									Вся работа выстроена <br /> через отдельно созданные <br />{" "}
									ДАО фонды
								</p>
							</div>
						</div>

						<div className="howWeWorkRectangle-conteiner-content">
							<div className="howWeWorkRectangle-conteiner-content-items">
								<div className="howWeWorkRectangle-item">
									<img src={howWeWorkRectangle_itemOne} alt="" />
									<h2>DAO</h2>
									<p>
										DAO — Decentralized Autonomous Organization, что <br />
										переводится как Децентрализованная Автономная <br />
										Организация. <br />
										<br />
										DAO представляет собой форму организации, в которой <br />
										координация деятельности между участниками <br />
										осуществляется без централизованного управления, но с <br />
										использованием автоматических алгоритмов.
									</p>
								</div>
								<div className="howWeWorkRectangle-item">
									<img
										className="howWeWorkRectangle_itemTwo"
										src={howWeWorkRectangle_itemTwo}
										alt=""
									/>
									<h2>Безопасность</h2>
									<p>
										Фонды AXIOM Crypto Platform созданы и работают на смарт- <br />
										контрактах, что является гарантией безопасного хранения{" "}
										<br />
										средств инвесторов, а так же обеспечивает полную <br />
										прозрачность и безопасность средств. <br />
										<br />
										Инвестор владеет активами на своем кошельке, третьи лица{" "}
										<br />
										не могу получить к ним доступ, а значит средствам ничего{" "}
										<br />
										не угрожает.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="howWeWorkRectangle-conteiner mobile">
					<img
						className="howWeWorkRectangle"
						src={howWeWorkRectanglemobile}
						alt=""
					/>
					<div className="howWeWorkRectangle-conteiner-title">
						<div className="howWeWorkRectangle-conteiner-title-content">
							<h2>Как мы работаем</h2>
							<p>
								Вся работа выстроена <br /> через отдельно созданные <br /> ДАО
								фонды
							</p>
						</div>
					</div>

					<div className="howWeWorkRectangle-conteiner-content">
						<div className="howWeWorkRectangle-conteiner-content-items">
							<div className="howWeWorkRectangle-item">
								<img src={howWeWorkRectangle_itemOne} alt="" />
								<h2>DAO</h2>
								<p>
									DAO — Decentralized Autonomous Organization, что <br />
									переводится как Децентрализованная Автономная <br />
									Организация. <br />
									<br />
									DAO представляет собой форму организации, в которой <br />
									координация деятельности между участниками <br />
									осуществляется без централизованного управления, но с <br />
									использованием автоматических алгоритмов.
								</p>
							</div>
							<div className="howWeWorkRectangle-item">
								<img
									className="howWeWorkRectangle_itemTwo"
									src={howWeWorkRectangle_itemTwo}
									alt=""
								/>
								<h2>Безопасность</h2>
								<p>
									Фонды AXIOM Crypto Platform созданы и работают на
									<br /> смарт- контрактах, что является гарантией <br />{" "}
									безопасного хранения средств инвесторов, а так <br /> же
									обеспечивает полную прозрачность и <br /> безопасность
									средств.
									<br />
									<br />
									Инвестор владеет активами на своем кошельке,
									<br /> третьи лица не могу получить к ним доступ, а <br />{" "}
									значит средствам ничего не угрожает.
									<br />
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Baner;
