import axiomlogo from "../../assets/images/images_swap/axiom_logo.svg";
import React from 'react';
import { DOCS } from "../../constants/docs";
import ellipse_three_mobile from "../../assets/images/images_swap/ellipse_three_mobile.png";


const Footer = () => {
    const handleClick = (pdfUrl) => {
        // URL вашего PDF-файла
        window.open(pdfUrl, '_blank');
    };
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
                        <br />
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            flexDirection: "",
                            gap: 20, color: "rgba(255, 255, 255, 0.9)", fontSize: "0.833vw"
                        }} >
                            {DOCS?.map((doc, index) => (<>

                                <a onClick={() => handleClick(doc.path)} key={"doc-linck-" + index}
                                    href={doc.path}
                                    target="_blank"
                                    rel="noreferrer">
                                    {doc.title}
                                </a>
                                {index < DOCS.length - 1 && <span >|</span>}</>

                            ))} </div>
                    </div>
                    <img className="ellipse_three_mobile_swap" src={ellipse_three_mobile} alt="" />
                </div>
            </footer>
        </>
    );
}

export default Footer;