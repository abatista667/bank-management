import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { routes } from "./constants/routes";
import AccountList from "./pages/AccountList";
import "./App.css";

const router = createBrowserRouter([
	{
		path: routes.accountList,
		element: <AccountList />,
	},
]);

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
