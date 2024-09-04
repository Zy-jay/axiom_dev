import MintchainLogo from "../assets/images/images_home/mintchain-logo.png";
import ScrollLogo from "../assets/images/images_home/scroll_logo.png";
import WArpcastLogo from "../assets/images/images_home/warpcast-logo.png";
import MMLogo from "../assets/images/images_home/metamask-logo.png";
import GrassLogo from "../assets/images/images_home/grass_logo_updated.png";
import PolygonLogo from "../assets/images/images_home/polygon-zkevm-logo.png";
import BaseLogo from "../assets/images/images_home/base_kinza_logo.png";
import ZoraLogo from "../assets/images/images_home/zora-logo.png";

import safe_mobil from "../assets/images/images_safe/safe_mobil.png";
import air_mobil from "../assets/images/images_safe/air_mobil.png";
import alt_mobil from "../assets/images/images_safe/alt_mobil.png";
import btc_mobil from "../assets/images/images_safe/btc_mobil.png";
import ultra_mobil from "../assets/images/images_safe/ultra_mobil.png";
import ArbLogo from "../assets/images/images_home/arbitrum-nova-logo.png";

// import BtcDaoLogo from "../assets/images/images_home/strategies_item_one.png";
// import AltDaoLogo from "../assets/images/images_home/strategies_item_two.png";
// import UltraDaoLogo from "../assets/images/images_home/strategies_item_three.png";
// import AirDaoLogo from "../assets/images/images_home/strategies_item_fore.png";
// import SafeDaoLogo from "../assets/images/images_home/strategies_item_five.png";



import BtcDaoLogo from "../assets/tokenLogos/BTC.png";
import AltDaoLogo from "../assets/tokenLogos/ALT.png";
import UltraDaoLogo from "../assets/tokenLogos/ULTRA.png";
import AirDaoLogo from "../assets/tokenLogos/AIRDROP.png";
import SafeDaoLogo from "../assets/tokenLogos/SAFE.png";


import { DAOs } from "../utils/blockchain";
import { SupportedChainId } from "./chains";

export const STRATEGI_KEYS = {
  btcdao: "BTC DAO",
  altporfoliodao: "ALTPORFOLIO DAO",
  ultrdao: "ULTRA DAO",
  airdropdao: "AIR DROP DAO",
  safedao: "SAFE DAO",
};

export const AIRDROP_DAO_PORTFOLIO_ITEMS = [
  {
    logo: MintchainLogo,
    title: "Mintchain",
    text: "An Ethereum Layer 2 specifically designed for NFTs. A young project with undisclosed investments, but already supported by Celestia and Optimism.",
  },
  {
    logo: WArpcastLogo,
    title: "Warpcast",
    text: "A social app on the Farcaster protocol where users share short posts, interact with likes, reposts, and in-app currency. It features Frames for creating mini-apps within posts.",
  },
  {
    text: "NFT marketplace that raised around $60M from Paradigm, Haun Ventures, and Coinbase Ventures. Zora may offer incentives like crypto asset airdrops to users, as stated on their website.",
    logo: ZoraLogo,
    title: "Zora",
  },
  {
    logo: GrassLogo,
    title: "Grass",
    text: "An infrastructure that sells your unused internet to AI companies via a web extension, earning you tokens. Your data is securely encrypted and used for AI training without impacting your privacy or internet speed.",
  },
  {
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
    text: "Is a non-custodial crypto wallet that allow you receive, store and send cryptocurrency asset.",
  },

  {
    text: "Polygon zkEVM Beta is the leading ZK scaling solution that is equivalent to Ethereum Virtual",
    title: "Polygon zkEVM",
    logo: PolygonLogo,
  },
  {
    text: "Nova powers dapps with high transaction volumes that seek to drive costs even lower, for Game Developers, Social",
    title: "Arbitrum Nova",
    logo: ArbLogo,
  },
];
export const DAOs_DATA = {
  [STRATEGI_KEYS.safedao]: {
    link: "/strategies/safedao/swap",
    text: "",
    lpName: "axSAFE",
    img: SafeDaoLogo,
    img_mobil: safe_mobil,
    title: "Консервативная стратегия",
    currentDaoAddress: DAOs.axSafe,
    lpAddress: DAOs.axSafeLP,
    decimals: 18,
    symbol: "AXSAFE",
    portfolio: [],
    chainId: SupportedChainId.ARBITRUM_ONE,
  },
  [STRATEGI_KEYS.airdropdao]: {
    link: "/strategies/airdropdao/swap",
    text: "",
    img: AirDaoLogo,
    lpName: "axAD",
    img_mobil: air_mobil,
    title: "Агрессивная стратегия",
    currentDaoAddress: DAOs.axAirdrop,
    symbol: "AXAIRDROP",
    decimals: 18,
    lpAddress: DAOs.axAirdropLP,
    portfolio: [],
  },
  [STRATEGI_KEYS.ultrdao]: {
    link: "/strategies/ultrdao/swap",
    text: "",
    img: UltraDaoLogo,
    lpName: "axULT",
    img_mobil: ultra_mobil,
    title: "Агрессивная стратегия",
    currentDaoAddress: DAOs.axUltra, // 0xe8740f7786ae2c674e484a71741247ee22fb125a
    symbol: "axULT",
    lpAddress: DAOs.axUltraLP,
    decimals: 18,
    portfolio: [],
    chainId: SupportedChainId.MAINNET,
  },
  [STRATEGI_KEYS.btcdao]: {
    link: "/strategies/btcdao/swap",
    text: "",
    img: BtcDaoLogo,
    lpName: "axBTC",
    img_mobil: btc_mobil,
    title: "Консервативная стратегия",
    currentDaoAddress: DAOs.axBTC,
    decimals: 18,
    symbol: "axBTC",
    portfolio: [],
    lpAddress: DAOs.axBTCLP,
    chainId: SupportedChainId.ARBITRUM_ONE,
  },
  [STRATEGI_KEYS.altporfoliodao]: {
    link: "/strategies/altporfoliodao/swap",
    text: "",
    img: AltDaoLogo,
    img_mobil: alt_mobil,
    lpName: "axALT",
    title: "Умеренная стратегия",
    chainId: SupportedChainId.MAINNET,
    symbol: "axALT",
    decimals: 18,
    portfolio: [],
    lpAddress: DAOs.axAltPortfolioLP,
    currentDaoAddress: DAOs.axAltPortfolio, // 0xbf60a62a31f72df0806eaaf73d698a3862c8aa44
  },
};

export const DAOs_PORTFOLIOS = {
  [STRATEGI_KEYS.airdropdao]: AIRDROP_DAO_PORTFOLIO_ITEMS,
};
