import "../css/safe.css";
import Header from "../componets/safe_components/header.jsx";
import HowWeWork from "../componets/safe_components/howWeWork.jsx";
import Strategies from "../componets/safe_components/strategies.jsx";
import Feedback from "../componets/safe_components/feedback.jsx";
import Footer from "../componets/safe_components/footer.jsx";
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
