import axiomlogo from "../../assets/images/images_home/logo-footer.svg";
import React from "react";
import ellipse_three_mobile from "../../assets/images/images_swap/ellipse_three_mobile.png";

const Footer = () => {
	return (
		<>
			<footer id="footer" className="footer_swap">
				<div className="footer-container_swap">
					<div className="footer-container-icon_swap">
						<a href="/" style={{ cursor: "pointer" }}>
							<img src={axiomlogo} alt="Главная страница" />
						</a>{" "}
					</div>
					<div className="footer-container-contant_swap">
						<h2>Copyright © 2024 AXIOM Crypto Platform</h2>
						<p>Все права защищены.</p>
					</div>
					<img
						className="ellipse_three_mobile_swap"
						src={ellipse_three_mobile}
						alt=""
					/>
				</div>
			</footer>
		</>
	);
};

export default Footer;
