import "../../css/safe.css";
import Header from "../../componets/UI/header";
import HowWeWork from "./howWeWork";
import Portfolio from "./Portfolio";
import Feedback from "../../componets/UI/feedback";
import Footer from "../../componets/UI/footer";
import React, { useEffect } from 'react';
import { DAOs_DATA, DAOs_PORTFOLIOS, STRATEGI_KEYS } from "../../constants/strategis";
import { useDaoPrice } from "../../hooks/useDaoPrice";
import { useStore } from "../../hooks/useStore";


export const StrategiPage = ({ dao, daoKey }) => {

    const store = useStore()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    }, [dao]);
    const daoData = DAOs_DATA[dao]
    const { daoPrice, tokens } = useDaoPrice(daoData.currentDaoAddress, daoData.lpAddress, daoData.chainId)

    const portfolio = DAOs_PORTFOLIOS[dao] ?? tokens ?? undefined

    useEffect(() => {
        if (portfolio !== undefined && portfolio[0]?.price !== undefined) {
            if (dao === STRATEGI_KEYS.btcdao && portfolio[0]?.price) {
                store.setBtcRate(portfolio[0].price)
            }
            store.setPortfolio(dao, tokens)
        }
    }, [tokens])

    useEffect(() => {
        if (daoPrice !== undefined) store.setDaoPrice(daoKey, daoPrice)

    }, [daoPrice])

    console.log(tokens)
    return (
        <div className="main" key={daoKey + "swap"}>
            <Header />
            <HowWeWork dao={dao} daoKey={daoKey} daoPrice={daoPrice ?? store.daoPrices[daoKey]} />
            <Portfolio portfolio={portfolio ?? store.daoPortfolios[daoKey]
            } dao={dao} />
            <Feedback />
            <Footer />
        </div>
    );
};