import Layout from "@bank/components/Layout/Layout";
import { useClasses } from "./styles";
import { Button } from "@mui/material";
import Heading from "@bank/components/Heading/Heading";
import { formatMoney } from "@bank/utils/formatMoney";
import TransactionForm from "./TransactionForm";
import { useMemo, useState } from "react";
import { Account, Transaction, TransactionResponse } from "@bank/types";
import { uselistTransaction } from "@bank/queries/listTransactions";
import { useAddTransaction } from "@bank/queries/addTransaction";
import { useListAccount } from "@bank/queries/listAccounts";
import Grid from "@bank/components/Grid";

const columns: any[] = [
	{ field: "from", headerName: "From Account", flex: 1 },
	{ field: "to", headerName: "To Account", flex: 1 },
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
				<Grid>
						<Grid.Heading>
							<Grid.HeadingCell>
								From Account
							</Grid.HeadingCell>
							<Grid.HeadingCell >
								To Account
							</Grid.HeadingCell>
							<Grid.HeadingCell >
								Amount
							</Grid.HeadingCell>
						</Grid.Heading>
						{tableRow?.map((item) => (
							<Grid.Row>
								<Grid.Cell>{item.from}</Grid.Cell>
								<Grid.Cell>{item.to}</Grid.Cell>
								<Grid.Cell>{formatMoney(item.amount, item.toCurrency)}</Grid.Cell>
							</Grid.Row>
						))}
					</Grid>
				</div>
			</div>
		</Layout>
	);
};

export default TransactionList;
