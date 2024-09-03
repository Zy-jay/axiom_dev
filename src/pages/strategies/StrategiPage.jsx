import "../../css/safe.css";
import Header from "../../componets/safe_components/header";
import HowWeWork from "../../componets/safe_components/howWeWork";
import Strategies from "../../componets/safe_components/strategies";
import Feedback from "../../componets/safe_components/feedback";
import Footer from "../../componets/UI/footer";
import React, { useEffect } from 'react';

import MintchainLogo from "../../assets/images/images_home/mintchain-logo.png";
import ScrollLogo from "../../assets/images/images_home/scroll_logo.png";
import WArpcastLogo from "../../assets/images/images_home/warpcast-logo.png";
import MMLogo from "../../assets/images/images_home/metamask-logo.png";
import GrassLogo from "../../assets/images/images_home/grass_logo_updated.png";
import PolygonLogo from "../../assets/images/images_home/polygon-zkevm-logo.png";
import BaseLogo from "../../assets/images/images_home/base_kinza_logo.png";
import ZoraLogo from "../../assets/images/images_home/zora-logo.png";
import ArbLogo from "../../assets/images/images_home/arbitrum-nova-logo.png";


const AIRDROP_DAO_PORTFOLIO_ITEMS = [
    {
        logo: MintchainLogo,
        title: "Mintchain",
        text: "An Ethereum Layer 2 specifically designed for NFTs. A young project with undisclosed investments, but already supported by Celestia and Optimism.",

    }, {
        logo: WArpcastLogo,
        title: "Warpcast",
        text: "A social app on the Farcaster protocol where users share short posts, interact with likes, reposts, and in-app currency. It features Frames for creating mini-apps within posts."
    },
    {
        text: "NFT marketplace that raised around $60M from Paradigm, Haun Ventures, and Coinbase Ventures. Zora may offer incentives like crypto asset airdrops to users, as stated on their website.",
        logo: ZoraLogo,
        title: "Zora",
    }, {
        logo: GrassLogo,
        title: "Grass",
        text: "An infrastructure that sells your unused internet to AI companies via a web extension, earning you tokens. Your data is securely encrypted and used for AI training without impacting your privacy or internet speed."
    }, {
        text: "Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.",
        title: "Base x Kinza",
        logo: BaseLogo,
    },
    {
        logo: ScrollLogo,
        title: "Scroll",
        text: "Ethereum's second-tier scaling solution reduces transaction costs and speeds up transfers, enhancing scalability and accessibility while maintaining security.",
    },

    {
        logo: MMLogo,
        title: "Metamask",
        text: "Is a non-custodial crypto wallet that allow you receive, store and send cryptocurrency asset."
    },

    {
        text: "Polygon zkEVM Beta is the leading ZK scaling solution that is equivalent to Ethereum Virtual",
        title: "Polygon zkEVM",
        logo: PolygonLogo,
    }, {
        text: "Nova powers dapps with high transaction volumes that seek to drive costs even lower, for Game Developers, Social",
        title: "Arbitrum Nova",
        logo: ArbLogo
    }
]


export const StrategiPage = ({ dao, daoKey }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="main" key={daoKey + "swap"}>
            <Header />
            <HowWeWork dao={dao} daoKey={daoKey} />
            <Strategies portfolio={AIRDROP_DAO_PORTFOLIO_ITEMS} />
            <Feedback />
            <Footer />
        </div>
    );
};