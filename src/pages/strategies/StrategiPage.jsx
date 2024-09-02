import "../../css/safe.css";
import Header from "../../componets/safe_components/header";
import HowWeWork from "../../componets/safe_components/howWeWork";
import Strategies from "../../componets/safe_components/strategies";
import Feedback from "../../componets/safe_components/feedback";
import Footer from "../../componets/UI/footer";
import React, { useEffect } from 'react';


export const StrategiPage = ({ dao, daoKey }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    

    return (
        <div className="main" key={daoKey + "swap"}>
            <Header />
            <HowWeWork dao={dao} daoKey={daoKey} />
            <Strategies />
            <Feedback />
            <Footer />
        </div>
    );
};