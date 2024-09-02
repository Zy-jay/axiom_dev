import "react-toastify/dist/ReactToastify.css";
import "../css/swap.css";
import Header from "../componets/swap_components/header.jsx";
import Dashboard from "../componets/dashboard_components/dashboard_.jsx";
import TransactionHistory from "../componets/swap_components/transactionHistory.jsx";
import Footer from "../componets/dashboard_components/footer.jsx";

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
