import "../css/home.css";
import Header from "../componets/UI/header.jsx";
import Baner from "../componets/UI/Baner.jsx";
import Strategies from "./Strategies/Strategies.jsx";
import Feedback from "../componets/UI/feedback.jsx";
import Footer from "../componets/UI/footer.jsx";

function Home() {
	return (
		<div className="main">
			<Header />
			<Baner />
			<Strategies />
			<Feedback />
			<Footer />
		</div>
	);
}

export default Home;
