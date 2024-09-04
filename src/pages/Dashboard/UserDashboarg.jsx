import circle_swap from "../../assets/images/images_swap/circle_swap.webp";
import React from "react";
import up from "../../assets/images/images_safe/up.svg";
import upward_shift from "../../assets/images/images_swap/upward_shift.svg";
import left_green_circle from "../../assets/images/images_swap/left_green_circle.png";
import right_oreng_circle from "../../assets/images/images_swap/right_oreng_circle.png";
import vector_smart_object from "../../assets/images/images_swap/vector_smart_object.svg";
import { STRATEGI_KEYS } from "../../constants/strategis.js";
import { DaoBalanceItem } from "./DaoItem.jsx";





const UserDashboard = () => {

	const daoItems = Object.values(STRATEGI_KEYS).map((kdao) => {
		return (
			<DaoBalanceItem daoKey={kdao} />
		)

	})
	return (
		<>
			<section id="dashboard" className="dashboard">
				<div className="wrapper">
					<img className="up" src={up} alt="" />
					<div className="dashboard-conteiner">
						<div className="dashboard-conteiner-title">
							<h1 style={{ fontWeight: "800" }}>Мой дашборд</h1>
							<div className="dashboard-conteiner-title-line"></div>
						</div>
						<div className="dashboard-conteiner-content">
							<div className="conteiner-content-briefcase">
								<h2>Инвестиционный портфель</h2>
								<img src={circle_swap} alt="" />
							</div>

						</div>
					</div>
					<div className="parameters-conteiner">
						<div className="parameters-conteiner-content">


							{daoItems}
							<a href="">
								<img className="upward_shift" src={upward_shift} alt="" />
							</a>
						</div>
						<div className="parameters-conteiner-content-mobie">

							{daoItems}
						</div>
					</div>
					<img className="left_green_circle" src={left_green_circle} alt="" />
					<img className="right_oreng_circle" src={right_oreng_circle} alt="" />
					<img
						className="vector_smart_object"
						src={vector_smart_object}
						alt=""
					/>
				</div>
			</section>
		</>
	);
};

export default UserDashboard;
