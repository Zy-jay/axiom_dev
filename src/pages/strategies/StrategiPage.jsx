import "../../css/safe.css";
import Header from "../../componets/UI/header";
import HowWeWork from "./howWeWork";
import Portfolio from "./Portfolio";
import Feedback from "../../componets/UI/feedback";
import Footer from "../../componets/UI/footer";
import React, { useEffect } from 'react';
import { DAOs_DATA, DAOs_PORTFOLIOS } from "../../constants/strategis";
import { useDaoPrice } from "../../hooks/useDaoPrice";


export const StrategiPage = ({ dao, daoKey }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const daoData = DAOs_DATA[dao]
    const { daoPrice, tokens } = useDaoPrice(daoData.currentDaoAddress, daoData.lpAddress, daoData.chainId)

    const portfolio = DAOs_PORTFOLIOS[dao] ?? tokens ?? undefined
    console.log(tokens)
    return (
        <div className="main" key={daoKey + "swap"}>
            <Header />
            <HowWeWork dao={dao} daoKey={daoKey} daoPrice={daoPrice} />
            <Portfolio portfolio={portfolio} />
            <Feedback />
            <Footer />
        </div>
    );
};