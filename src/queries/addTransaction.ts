import axios from "axios";
import { apiRoutes } from "./apiRoutes";
import { Transaction } from "@bank/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const addTransaction = (transaction: Transaction) => {
	return axios.post(apiRoutes.addTransaction, transaction);
};

export const useAddTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addTransaction,
		mutationKey: ["addTransaction"],
		onSuccess: () => {
			queryClient.fetchQuery({
				queryKey: ["listTransaction"],
			});
		},
	});
};
