import "react-toastify/dist/ReactToastify.css";

import "../../css/swap.css";
import Header from "../../componets/UI/header";
import Swap from "./Swap";
import Footer from "../../componets/UI/footer";

function SwapPage({ dao, daoKey }) {
	return (
		<>
			<div className="main_swap">
				<Header />
				<Swap dao={dao} daoKey={daoKey} />
				{/* <TransactionHistory /> */}
				<Footer />
			</div>
		</>
	);
}

export default SwapPage;