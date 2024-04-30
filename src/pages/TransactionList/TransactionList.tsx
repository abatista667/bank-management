import Layout from "@bank/components/Layout/Layout";
import { useClasses } from "./styles";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@bank/components/Heading/Heading";
import { formatMoney } from "@bank/utils/formatMoney";
import TransactionForm from "./TransactionForm";
import { useState } from "react";

const columns: GridColDef[] = [
	{ field: "fromOwnerId", headerName: "From owner ID", width: 150 },
	{ field: "toOwnerId", headerName: "From owner ID", width: 150 },
	{ field: "toCurrency", headerName: "Currency" },
	{
		field: "amount",
		headerName: "Amount",
		width: 150,
		valueFormatter: (value: number, row: any) =>
			formatMoney(value, row["toCurrency"]),
	},
];

const TransactionList = () => {
	const { classes } = useClasses();
	const [isNewTransactionOppened, setisNewTransactionOppened] = useState(false);

	const addNewTransaction = () => {
		setisNewTransactionOppened(true);
	};

	return (
		<Layout>
			<div className={classes.root}>
				<Heading
					title="Transactions"
					action={
						<Button variant="outlined" onClick={addNewTransaction}>
							Create new
						</Button>
					}
				/>
				{isNewTransactionOppened ? <TransactionForm /> : null}
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
