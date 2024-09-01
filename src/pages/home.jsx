import "../css/home.css";
import Header from "../componets/home_components/header.jsx";
import HowWeWork from "../componets/home_components/howWeWork.jsx";
import Strategies from "../componets/home_components/strategies.jsx";
import Feedback from "../componets/home_components/feedback.jsx";
import Footer from "../componets/home_components/footer.jsx";
import { Providers } from "../Providers.js";

function App() {
	return (
		<div className="main">
			<Providers>
				<Header />
				<HowWeWork />
				<Strategies />
				<Feedback />
				<Footer />
			</Providers>
		</div>
	);
}

export default App;
