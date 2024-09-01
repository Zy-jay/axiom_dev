import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Buffer } from "buffer";
import { Providers } from "./Providers.js";
window.Buffer = Buffer; // Make it available globally if needed

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>
);
