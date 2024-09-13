import React from "react";
import up from "../../assets/images/images_safe/up.svg";
import upward_shift from "../../assets/images/images_swap/upward_shift.svg";
import left_green_circle from "../../assets/images/images_swap/left_green_circle.png";
import right_oreng_circle from "../../assets/images/images_swap/right_oreng_circle.png";
import vector_smart_object from "../../assets/images/images_swap/vector_smart_object.svg";
import { DAOs_DATA, STRATEGI_KEYS } from "../../constants/strategis.js";
import { DaoBalanceItem } from "./DaoItem.jsx";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from "../../hooks/useStore.js";
import { observer } from 'mobx-react-lite';



const UserDashboard = observer(() => {

	const store = useStore()
	const [width, setWidth] = React.useState("unset")
	const ref = React.useRef(null)
	const daoItems = Object.values(STRATEGI_KEYS).map((kdao) => {
		return (
			<DaoBalanceItem daoKey={kdao} />
		)

	})

	const data = Object.values(STRATEGI_KEYS).map((kdao, i) => {
		return {
			key: Object.keys(STRATEGI_KEYS)[i],
			name: kdao,
			value: (Number(store.daoBalances[kdao] ?? 0) / 10 ** 18) * (store.daoPrices[kdao] ?? 0),
		}
	})




	// React.useEffect(() => {
	// 	console.debug("ref", ref, data)
	// 	if (!ref.current) {
	// 		setWidth(width === "unset" ? "90%" : "unset")
	// 	} else {
	// 		setTimeout(() => setWidth("90%"), 500)

	// 	}
	// }, [width, ref, data])

	const { hoveringKey } = store

	return (
		<>
			<section id="dashboard" className="dashboard">
				<div className="wrapper">
					<img onClick={() => window.scrollTo({
						top: 0,
						behavior: 'smooth' // Плавная прокрутка
					})} style={{ cursor: "pointer", zIndex: 2000 }}
						className="up" src={up} alt="" />
					<div className="dashboard-conteiner">
						<div className="dashboard-conteiner-title">
							<h1 style={{ fontWeight: "800" }}>Мой дашборд</h1>
							<div className="dashboard-conteiner-title-line"></div>
						</div>
						<div className="dashboard-conteiner-content">
							<div className="conteiner-content-briefcase">
								<h2 >Инвестиционный портфель</h2>
								{/* <img src={circle_swap} alt="" /> */}
								<ResponsiveContainer
									// style={{
									// 	backgroundImage: `url(${this.props.daoLogo})`,
									// 	backgroundRepeat: "no-repeat",
									// 	backgroundSize: "30%",
									// 	backgroundPosition: "center"
									// }} 
									width={"100%"}
									height={"90%"}>
									<PieChart

									// width={600} height={600} onMouseEnter={null}
									>
										<Pie
											ref={ref}
											data={data}
											// cx={120}
											// cy={230}
											innerRadius={"65%"}
											outerRadius={"75%"}
											fill="#8884d8"
											paddingAngle={5}
											dataKey="value"
											cursor={"pointer"}
										>

											{data.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={DAOs_DATA[entry.name]?.color}
													style={{
														transform: `scale(${hoveringKey === entry.name ? "1.05" : 1})`,
														transition: "transform 1s ease-in-out",
														transformOrigin: "center"

													}} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
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
});

export default UserDashboard;
