import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";

import Home from "./pages/home.jsx";

import Dashboard from "./pages/Dashboard/DashboardPage.jsx";
import { Provider } from "ankr-react";
import { Providers } from "./Providers";
import { ToastContainer, Bounce } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction
import { useAccount, useConnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { STRATEGI_KEYS } from "./constants/strategis.js";
import SwapPage from "./pages/Swap/SwapPage.jsx";
import { StrategiPage } from "./pages/Strategies/StrategiPage.jsx";




function App() {

	const { address, isConnected, chain } = useAccount();
	const { openConnectModal, connectModalOpen } = useConnectModal()
	const { connect } = useConnect();
	// useEffect(() => {
	// 	if (!isConnected && !address && !connectModalOpen) {
	// 		connect()
	// 		openConnectModa
	// 	}
	// 	console.debug("App", { address, isConnected, chain });

	// }, [isConnected])


	return (
		<Providers>
			<Provider>
				<ToastContainer
					position="bottom-right"
					limit={3}
					autoClose={5000}
					progress={undefined}
					hideProgressBar={false}
					closeOnClick={true}
					pauseOnHover={true}
					draggable={true}
					theme="dark"
					transition={Bounce}

				// bodyStyle={{ background: "#0D001E" }}
				/>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						{Object.keys(STRATEGI_KEYS).map((key) => {
							return <Route path={`/strategies/${key}`} element={<StrategiPage daoKey={key} dao={STRATEGI_KEYS[key
							]} />} />
						})
						}
						{Object.keys(STRATEGI_KEYS).map((key) => {
							return <Route path={`/strategies/${key}/swap`} element={<SwapPage daoKey={key} dao={STRATEGI_KEYS[key
							]} />} />

						})
						}

						<Route path="/dashboard" element={<Dashboard />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</Providers>
	);
}

export default App;
