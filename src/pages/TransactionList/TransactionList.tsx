import Layout from "@bank/components/Layout/Layout";
import { useClasses } from "./styles";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@bank/components/Heading/Heading";
import { formatMoney } from "@bank/utils/formatMoney";
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import { Transaction } from "@bank/types";

const columns: GridColDef[] = [
	{ field: "fromOwnerId", headerName: "From owner ID", flex: 1 },
	{ field: "toOwnerId", headerName: "From owner ID", flex: 1 },
	{ field: "toCurrency", headerName: "Currency", flex: 1 },
	{
		field: "amount",
		headerName: "Amount",
		flex: 1,
		valueFormatter: (value: number, row: any) =>
			formatMoney(value, row["toCurrency"]),
	},
];

const TransactionList = () => {
	const { classes } = useClasses();
	const [isNewTransactionOppened, setIsNewTransactionOppened] = useState(false);
	const [transaction, setTransaction] = useState<Partial<Transaction>>({});

	const onSave = () => {};
	const onCancel = () => {
		setTransaction({});
		setIsNewTransactionOppened(false);
	};

	const addNewTransaction = () => {
		setIsNewTransactionOppened(true);
	};

	const transactionFormProps = {
		onSave,
		onCancel,
		transaction,
		setTransaction,
	};

	return (
		<Layout>
			<div className={classes.root}>
				<Heading
					title="Transactions"
					action={
						!isNewTransactionOppened ? (
							<Button variant="outlined" onClick={addNewTransaction}>
								Create new
							</Button>
						) : null
					}
				/>
				{isNewTransactionOppened ? (
					<TransactionForm {...transactionFormProps} />
				) : null}
				<div className={classes.tableWrapper}>
					<DataGrid
						rows={[]}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 10,
								},
							},
						}}
						pageSizeOptions={[5]}
						disableRowSelectionOnClick
						getRowId={(row) => row["ownerId"]}
						sx={{
							minHeight: "400px",
						}}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default TransactionList;
