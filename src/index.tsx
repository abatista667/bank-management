import ReactDOM from "react-dom/client";
import App from "./App";

declare const ENV;

async function enableMocking() {
	if (ENV !== "development") {
		return Promise.reject();
	}

	const { worker } = await import("./mocks/browser");

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return worker.start();
}
enableMocking().then(() => {
	const root = ReactDOM.createRoot(
		document.getElementById("root") as HTMLElement,
	);

	root.render(<App />);
});
