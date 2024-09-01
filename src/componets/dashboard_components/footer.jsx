import axiomlogo from "../../assets/images/images_swap/axiom_logo.svg";
import React from 'react';
import ellipse_three_mobile from "../../assets/images/images_swap/ellipse_three_mobile.png";


const Footer = () => {

    return ( 
        <>
            <footer id="footer" className="footer_swap">
                    <div className="footer-container_dash">
                        <div className="footer-container-icon_swap">
                        <a href="/" style={{ cursor: 'pointer' }}>
        <img src={axiomlogo} alt="Главная страница" />
    </a>                        </div>
                        <div className="footer-container-contant_swap">
                            <h2>Copyright © 2023 AXIOM WM Family office</h2>
                            <p>Все права защищены.</p>
                        </div>
                        <img className="ellipse_three_mobile_swap" src={ellipse_three_mobile} alt="" />
                    </div>
            </footer>
        </>
    );
}

export default Footer;