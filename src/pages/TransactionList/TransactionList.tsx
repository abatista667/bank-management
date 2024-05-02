import Layout from "@bank/components/Layout/Layout";
import { useClasses } from "./styles";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@bank/components/Heading/Heading";
import { formatMoney } from "@bank/utils/formatMoney";
import TransactionForm from "./TransactionForm";
import { useMemo, useState } from "react";
import { Account, Transaction, TransactionResponse } from "@bank/types";
import { uselistTransaction } from "@bank/queries/listTransactions";
import { useAddTransaction } from "@bank/queries/addTransaction";
import { useListAccount } from "@bank/queries/listAccounts";

const columns: GridColDef[] = [
	{ field: "from", headerName: "From Account", flex: 1 },
	{ field: "to", headerName: "to Account", flex: 1 },
	{
		field: "amount",
		headerName: "Amount",
		flex: 1,
		valueFormatter: (value: number, row: any) =>
			formatMoney(value, row["toCurrency"]),
	},
];

const mapTransactionToTransactionTableRow = (
	transaction: TransactionResponse,
	accountMap: Map<number, Account>,
) => {
	const toAccount = accountMap.get(transaction.toOwnerId);
	return {
		id: transaction.id,
		amount: transaction.amount,
		from: accountMap.get(transaction.fromOwnerId)?.alias,
		to: toAccount?.alias,
		toCurrency: toAccount?.currency,
	};
};

const TransactionList = () => {
	const { classes } = useClasses();
	const [isNewTransactionOppened, setIsNewTransactionOppened] = useState(false);
	const [transaction, setTransaction] = useState<Partial<Transaction>>({});
	const { data: transactionsData } = uselistTransaction();
	const { mutate: addTransaction } = useAddTransaction();

	const { data: accountData } = useListAccount();

	const accountMap = useMemo(
		() =>
			new Map<number, Account>(
				accountData?.data.map((item) => [item.ownerId, item]),
			),
		[accountData],
	);

	const tableRow =
		transactionsData?.data.map((item) =>
			mapTransactionToTransactionTableRow(item, accountMap),
		) ?? [];

	const onSave = () => {
		addTransaction(transaction as Transaction);
		setTransaction({});
		setIsNewTransactionOppened(false);
	};
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
		accountMap,
		accounts: accountData?.data ?? [],
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
						rows={tableRow}
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
