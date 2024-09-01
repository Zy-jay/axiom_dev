import ellipse_howWeWork from "../../assets/images/images_safe/ellipse_howWeWork.svg";
import ellipse_howWeWorkTwo from "../../assets/images/images_safe/ellipse_howWeWorkTwo.svg";
import youtube from "../../assets/images/images_safe/youtube.svg";
import x from "../../assets/images/images_safe/x.svg";
import telegram from "../../assets/images/images_safe/telegram.svg";
import instagram from "../../assets/images/images_safe/instagram.svg";
import facebook from "../../assets/images/images_safe/facebook.svg";
import up from "../../assets/images/images_safe/up.svg";
import safe_dao from "../../assets/images/images_safe/safe_dao.webp";
import air from "../../assets/images/images_home/air.png";
import alt from "../../assets/images/images_home/alt.png";
import btc from "../../assets/images/images_home/btc.png";
import safe_mobil from "../../assets/images/images_safe/safe_mobil.png";
import air_mobil from "../../assets/images/images_safe/air_mobil.png";
import alt_mobil from "../../assets/images/images_safe/alt_mobil.png";
import btc_mobil from "../../assets/images/images_safe/btc_mobil.png";
import ultra_mobil from "../../assets/images/images_safe/ultra_mobil.png";
import ultra from "../../assets/images/images_home/ultra.png";
import safe_dao_mobile from "../../assets/images/images_safe/safe_dao_mobile.webp";
import drop_down from "../../assets/images/images_safe/drop-down.svg";
import wallet from "../../assets/images/images_safe/wallet.svg";
import wallet_icon from "../../assets/images/images_safe/wallet_icon.svg";
import close from "../../assets/images/images_safe/close.svg";
import React from "react";
import { Link } from "react-router-dom";


function MyComponentBtc({ btcdaotext }) {
	return <div dangerouslySetInnerHTML={{ __html: btcdaotext }} />;
}

function MyComponentSafe({ safedaotext }) {
	return <div dangerouslySetInnerHTML={{ __html: safedaotext }} />;
}

function MyComponentAir({ airdropdaotext }) {
	return <div dangerouslySetInnerHTML={{ __html: airdropdaotext }} />;
}

function MyComponentUltra({ ultrdaotext }) {
	return <div dangerouslySetInnerHTML={{ __html: ultrdaotext }} />;
}

function MyComponentaltporfolio({ altporfoliodaotext }) {
	return <div dangerouslySetInnerHTML={{ __html: altporfoliodaotext }} />;
}
const safedaotext = `
    <p>
      	Подходит для консервативных инвесторов,<br />
		которые стремятся сохранить и постепенно приумножить <br />
		свой капитал с минимальным риском.<br />
		<br />
		Стратегия распределяет средства между надежными криптовалютами <br /> 
		для обеспечения стабильного роста и минимизации рисков.
    </p>
  `;

const airdropdaotext = `
		<p>
			Подходит для инвесторов с высоким уровнем риска,<br />
			готовых к длительному ожиданию ради потенциально крупных доходов.<br />
			<br />
			Стратегия основывается на активном участии в блокчейн-проектах <br /> 
			для получения токенов, которые могут принести значительную прибыль в будущем.
		</p>
	`;

const ultrdaotext = `
		<p>
			Подходит для инвесторов с высоким уровнем риска,<br />  
			стремящихся к максимальной прибыли в краткосрочной перспективе.<br /> 
			<br /> 
			Стратегия заключается в покупке токенов,<br /> 
			способных принести сверхрезультаты за короткий срок,<br /> 
			включая мемкоины и малоизвестные проекты на ранней стадии развития.
		</p>
	`;

const btcdaotext = `
		<p>
			Подходит для инвесторов с низким уровнем риска,<br /> 
			которые стремятся приумножить свои накопленные Bitcoin <br />
			в этом же активе без рисков его потери.<br /><br />

			Стратегия основана на предоставлении пары ликвидности BTC/USDT <br /> 
			на децентрализованных биржах, 
			что исключает риски потери базового актива — Bitcoin.
		</p>
	`;

const altporfoliodaotext = `
		<p>
			Подходит для инвесторов с умеренным уровнем риска,<br />
			готовых к возможным колебаниям ради значительного роста капитала.<br />
			<br />
			Стратегия предполагает покупку перспективных <br />
			альткоинов на низких точках и их продажу на высоких <br />
			для получения прибыли. 
		</p>
	`;


const WalletCopyButton = (address) => {

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(address)
			.then(() => {
				alert("Адрес скопирован в буфер обмена!"); // Уведомление для пользователя
			})
			.catch((err) => {
				alert("Не удалось скопировать адрес: " + err); // Уведомление об ошибке
			});
	};

	return (
		<button className="safe-conteiner-wallet-copy_safe">
			<img
				src={wallet_icon}
				alt="Копировать адрес"
				onClick={copyToClipboard}
				style={{ cursor: "pointer" }} // Указатель курсора для кликабельного изображения
			/>
			<p>{address}</p>
		</button>
	);
};

const DAO_PAGE_DATA = {
	"SAFE DAO": {
		link: "/strategies/safedao/swap",
		text: <MyComponentSafe safedaotext={safedaotext} />,
		img: <img src={safe_dao} alt="" />,
		img_mobil: <img src={safe_mobil} alt="" />,
		title: <h2> Консервативная стратегия</h2>,
		currentDaoAddress: "0xdb95465de86c947f7de927eb604bad526696881b",
	},
	"AIR DROP DAO": {
		link: "/strategies/airdropdao/swap",
		text: <MyComponentAir airdropdaotext={airdropdaotext} />,
		img: <img src={air} alt="" />,
		img_mobil: <img src={air_mobil} alt="" />,
		title: <h2>Агрессивная стратегия</h2>,
		currentDaoAddress: "0xf958e82b5a8e615cb3476b59f9589c45df67acca",
	},
	"ULTRA DAO": {
		link: "/strategies/ultrdao/swap",
		text: <MyComponentUltra ultrdaotext={ultrdaotext} />,
		img: <img src={ultra} alt="" />,
		img_mobil: <img src={ultra_mobil} alt="" />,
		title: <h2>Агрессивная стратегия</h2>,
		currentDaoAddress: "0x92cb7baef8eddb1d6a02fa236b356124ad0530a5", // 0xe8740f7786ae2c674e484a71741247ee22fb125a
	},
	"BTC DAO": {
		link: "/strategies/btcdao/swap",
		text: <MyComponentBtc btcdaotext={btcdaotext} />,
		img: <img src={btc} alt="" />,
		img_mobil: <img src={btc_mobil} alt="" />,
		title: <h2>Консервативная стратегия</h2>,
		currentDaoAddress: "0xf878d10a8b95bdee2747bd1faf7a3f3e2b7f19be",
	},
	"ALTPORFOLIO DAO": {
		link: "/strategies/altporfoliodao/swap",
		text: <MyComponentaltporfolio altporfoliodaotext={altporfoliodaotext} />,
		img: <img src={alt} alt="" />,
		img_mobil: <img src={alt_mobil} alt="" />,
		title: <h2>Умеренная стратегия</h2>,
		currentDaoAddress: "0xeebe6f7fd87ed28748f5e4d3e339ba0f28e90782", // 0xbf60a62a31f72df0806eaaf73d698a3862c8aa44
	},

}


const HowWeWork = ({ price, isBtc, dao }) => {
	console.log(price);


	const pageData = DAO_PAGE_DATA[dao];

	const { link, text, img, img_mobil, title, currentDaoAddress } = pageData;



	let finPrice;

	if (dao == "ALTPORFOLIO DAO") {
		finPrice = price;
	} else {
		if (typeof price === "number" && price !== 0) {
			finPrice = price.toFixed(3);
		} else {
			finPrice = "0.000"; // Или любое другое значение по умолчанию
		}
	}

	return (
		<>
			<section className="howWeWorksafe">
				<img
					className="ellipse_howWeWork_safe"
					src={ellipse_howWeWork}
					alt=""
				/>
				<img
					className="ellipse_howWeWorkTwo_safe"
					src={ellipse_howWeWorkTwo}
					alt=""
				/>
				<img className="up_safe" src={up} alt="" />
				{/* <div className="social-conteiner">
					<div className="social">
						<img className="facebook" src={facebook} alt="" />
						<img className="youtube" src={youtube} alt="" />
						<img className="instagram" src={instagram} alt="" />
						<img className="x" src={x} alt="" />
						<img className="telegram" src={telegram} alt="" />
					</div>
				</div> */}
				<div className="wrapper">
					<div className="howWeWork-conteiner_safe">
						<Link to="/">
							<img className="close" src={close} alt="" />
						</Link>
						{title}
						<div className="howWeWork-conteiner-line_safe"></div>
					</div>
					<div className="safeDao-conteiner_safe desktop">
						{img}
						<div className="howWeWorkRectangle-conteiner_safe">
							<div className="howWeWorkRectangle-conteiner-content_safe">
								<div className="safe-conteiner-content_safe">
									<h2>{dao}</h2>
									{/*<p>
										Консервативная стратегия: основным принципом <br />
										консервативной стратегии является распределение инвестиций{" "}
										<br />
										между различными криптовалютами в зависимости от их <br />
										потенциала и рисков. На 50% от данного портфеля приходится{" "}
										<br />
										два криптоактива входящие в ТОП-2 по своей капитализации{" "}
										<br />
										(BTC и ETH)...
									</p>*/}
									{text}
									<div className="safe-conteiner-drop-down_safe">
										{/* <img src={drop_down} alt="" />
										<p>Ещё</p> */}
									</div>
									<div className="safe-conteiner-wallet_safe">
										{WalletCopyButton(currentDaoAddress)}
										<button className="safe-conteiner-wallet-img_safe">
											{/* <img src={wallet} alt="" /> */}
										</button>
									</div>
								</div>
								<div className="safe-conteiner-line_safe"></div>
								<div className="safe-conteiner-button_safe">
									<h3>ТЕКУЩАЯ ЦЕНА</h3>
									<div className="safe-conteiner-button-many_safe">
										<div className="safe-conteiner-button-many_saf_center">
											{isBtc ? <h4>BTC&nbsp;</h4> : <h4>$</h4>}
											<h2>{price}</h2>
										</div>
									</div>
									<form action={link}>
										<button className="invest-button">
											<Link to={link}>Инвестировать</Link>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="safeDao-conteiner_safe mobile">
						{img_mobil}
						<div className="howWeWorkRectangle-conteiner_safe">
							<div className="howWeWorkRectangle-conteiner-content_safe">
								<div className="safe-conteiner-content_safe">
									<h2>{dao}</h2>
									<p>
										{/*	Консервативная стратегия: основным принципом <br />
										консервативной стратегии является распределение инвестиций{" "}
										<br />
										между различными криптовалютами в зависимости от их <br />
										потенциала и рисков. На 50% от данного портфеля приходится{" "}
										<br />
										два криптоактива входящие в ТОП-2 по своей капитализации{" "}
										<br />
										(BTC и ETH)...*/}
										{text}
									</p>
									<div className="safe-conteiner-drop-down_safe">
										{/* <img src={drop_down} alt="" />
										<p>Ещё</p> */}
									</div>
									<div className="safe-conteiner-wallet_safe">
										<button className="safe-conteiner-wallet-copy_safe">
											<img src={wallet_icon} alt="" />
											<p>0xfcA0d2D426...</p>
										</button>
										<button className="safe-conteiner-wallet-img_safe">
											<img src={wallet} alt="" />
										</button>
									</div>
								</div>
								<div className="safe-conteiner-line_safe "></div>
								<div className="safe-conteiner-button_safe">
									<h3>ТЕКУЩАЯ ЦЕНА</h3>
									<div className="safe-conteiner-button-many_safe">
										<div className="safe-conteiner-button-many_saf_center">
											{isBtc ? <h4>BTC</h4> : <h4>$</h4>}
											<h2>{finPrice}</h2>
										</div>
									</div>
									<button className="invest-button">
										<Link to={link}>Инвестировать</Link>
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

export default HowWeWork;
