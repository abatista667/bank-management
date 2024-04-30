import { Transaction } from "@bank/types";
import { formatMoney } from "@bank/utils/formatMoney";
import {
	GridActionsCellItem,
	GridColDef,
	GridRowParams,
} from "@mui/x-data-grid";
import { useMemo } from "react";

export const useTransacionListColumns = () => {
	return useMemo(() => {
		return columns;
	}, []);
};
