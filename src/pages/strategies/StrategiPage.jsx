import "../../css/safe.css";
import Header from "../../componets/safe_components/header";
import HowWeWork from "../../componets/safe_components/howWeWork";
import Strategies from "../../componets/safe_components/strategies";
import Feedback from "../../componets/safe_components/feedback";
import Footer from "../../componets/UI/footer";

export const StrategiPage = ({ dao, daoKey }) => {

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