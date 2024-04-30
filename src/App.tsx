import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { routes } from "./constants/routes";
import AccountList from "./pages/AccountList";
import "./App.css";
import { ConfirmDialogProvider } from "./components/ConfirmDialg/ConfirmDilogContext";

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
				<ConfirmDialogProvider>
					<RouterProvider router={router} />
				</ConfirmDialogProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
