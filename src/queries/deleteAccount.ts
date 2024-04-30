import axios from "axios";
import { apiRoutes } from "./apiRoutes";
import { Account } from "@bank/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteAccount = (id: number) => {
	return axios.delete(`${apiRoutes.addAccount}/${id}`);
};

export const useDeleteAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAccount,
		mutationKey: ["deleteAccount"],
		onSuccess: () => {
			queryClient.fetchQuery({
				queryKey: ["listAccount"],
			});
		},
	});
};
