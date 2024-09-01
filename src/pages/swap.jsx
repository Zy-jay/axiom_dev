import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../css/swap.css";
import Header from "../componets/swap_components/header";
import Dashboard from "../componets/swap_components/dashboard";
import TransactionHistory from "../componets/swap_components/transactionHistory";
import Footer from "../componets/swap_components/footer";
import { Providers } from "../Providers";

function App() {
	return (
		<>
			<div className="main_swap">
				<Header />
				<Dashboard />
				{/* <TransactionHistory /> */}
				<Footer />
			</div>
		</>
	);
}

export default App;
