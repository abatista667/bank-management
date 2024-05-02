import axios from "axios";
import { apiRoutes } from "./apiRoutes";
import { useQuery } from "@tanstack/react-query";

const getChangeRate = (fromCurrency: string, toCurrency: string) => {
	return axios.get<number>(
		`${apiRoutes.getChangeRate}/${fromCurrency}/${toCurrency}`,
	);
};

export const useGetChangeRate = (fromCurrency: string, toCurrency: string) =>
	useQuery({
		queryFn: () => getChangeRate(fromCurrency, toCurrency),
		queryKey: ["getChangeRate", fromCurrency, toCurrency],
		enabled: !!fromCurrency && !!toCurrency,
	});
