import axios from "axios";
import { apiRoutes } from "./apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { TransactionResponse } from "@bank/types";

const listTransaction = () => {
	return axios.get<TransactionResponse[]>(apiRoutes.listTransaction);
};

export const uselistTransaction = () =>
	useQuery({
		queryFn: listTransaction,
		queryKey: ["listTransaction"],
	});
