import axios from "axios";
import { apiRoutes } from "./apiRoutes";
import { Account } from "@bank/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const addOrUpdateAccount = (account: Account) => {
	return axios.put(`${apiRoutes.addAccount}/${account.ownerId}`, account);
};

export const useAddOrUpdateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addOrUpdateAccount,
		mutationKey: ["addOrUpdateAccount"],
		onSuccess: () => {
			queryClient.fetchQuery({
				queryKey: ["listAccount"],
			});
		},
	});
};
