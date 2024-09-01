import "react-toastify/dist/ReactToastify.css";
import "../css/swap.css";
import Header from "../componets/swap_components/header";
import Dashboard from "../componets/swap_components/dashboard";
import Footer from "../componets/swap_components/footer";

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
