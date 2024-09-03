import "react-toastify/dist/ReactToastify.css";
import "../../css/swap.css";
import Header from "../../componets/UI/header.jsx";
import Dashboard from "./UserDashboarg.jsx";
import Footer from "../../componets/UI/footer.jsx";

function DashboardPage() {
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

export default DashboardPage;
