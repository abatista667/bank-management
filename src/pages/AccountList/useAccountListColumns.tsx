import { Account } from "@bank/types";
import { formatMoney } from "@bank/utils/formatMoney";

import { useMemo } from "react";

interface UseAccountColumnsProps {
	onEditAccount: (value: Account) => void;
	onDeleteAccount: (id: number) => void;
}

export const useAccountListColumns = ({
	onEditAccount,
	onDeleteAccount,
}: UseAccountColumnsProps) => {
	return useMemo(() => {
		const columns: any[] = [
			{ field: "ownerId", headerName: "An owner ID", width: 150 },
			{ field: "alias", headerName: "Alias", flex: 1 },
			{ field: "currency", headerName: "Currency" },
			{
				field: "balance",
				headerName: "Balance",
				width: 150,
				valueFormatter: (value: number, row: any) =>
					formatMoney(value, row["currency"]),
			},
			{
				field: "actions",
				type: "actions",
				getActions: (params: any) => [
					// <GridActionsCellItem
					// 	label="Edit"
					// 	onClick={() => onEditAccount(params.row)}
					// 	showInMenu
					// />,
					// <GridActionsCellItem
					// 	onClick={() => onDeleteAccount(params.row["ownerId"])}
					// 	label="Delete"
					// 	showInMenu
					// />,
				],
			},
		];

		return columns;
	}, []);
};
