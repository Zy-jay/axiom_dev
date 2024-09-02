import "react-toastify/dist/ReactToastify.css";

import "../css/swap.css";
import Header from "../componets/swap_components/header";
import Dashboard from "../componets/swap_components/dashboard";
import Footer from "../componets/UI/footer";

function SwapPage({ dao, daoKey }) {
	return (
		<>
			<div className="main_swap">
				<Header />
				<Dashboard dao={dao} daoKey={daoKey} />
				{/* <TransactionHistory /> */}
				<Footer />
			</div>
		</>
	);
}

export default SwapPage;