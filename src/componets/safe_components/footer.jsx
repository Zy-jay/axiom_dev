import axiomlogo from "../../assets/images/images_home/logo-footer.svg";
import React from "react";

const Footer = () => {
	return (
		<>
			<footer id="footer" className="footer">
				<div className="footer-container">
					<div className="footer-container-icon">
						<a href="/" style={{ cursor: "pointer" }}>
							<img src={axiomlogo} alt="Главная страница" />
						</a>{" "}
					</div>
					<div className="footer-container-contant">
						<h2>Copyright © 2024 AXIOM Crypto Platform</h2>
						<p>Все права защищены.</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
