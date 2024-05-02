import { TextField, FormLabel, Button } from "@mui/material";
import { useFormClasses } from "./styles";
import { Account, Transaction } from "@bank/types";
import React, { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import FormCard from "@bank/components/FormCard";
import { useListAccount } from "@bank/queries/listAccounts";
import { formatMoney } from "@bank/utils/formatMoney";
import Autocomplete, {
	AutocompleteItem,
} from "@bank/components/Autocomplete/Autocomplete";
import { errorMessage } from "@bank/constants/errorMessage";
import { useGetChangeRate } from "@bank/queries/getChangeRate";

interface TransactionFormProps {
	onSave: () => void;
	onCancel: () => void;
	transaction: Partial<Transaction>;
	setTransaction: (Transaction: Transaction) => void;
	accountMap: Map<number, Account>;
	accounts: Account[];
}

const TransactionForm = ({
	onSave,
	onCancel,
	transaction,
	setTransaction,
	accountMap,
	accounts,
}: TransactionFormProps) => {
	const { classes } = useFormClasses();

	const [validationError, setValidationError] = useState<
		Record<string, string>
	>({});

	const currencyFrom = accountMap.get(transaction?.fromOwnerId)?.currency;
	const currencyTo = accountMap.get(transaction?.toOwnerId)?.currency;

	const { data: rateData } = useGetChangeRate(currencyFrom, currencyTo);

	useEffect(() => {
		const newVersion = {
			...transaction,
			changeRate: rateData?.data,
		} as Transaction;
		setTransaction(newVersion);
	}, [rateData]);

	useEffect(() => {
		if (!transaction.changeRate || !transaction.transferAmount) return;

		const newVersion = {
			...transaction,
			amount: transaction.transferAmount * transaction.changeRate,
		} as Transaction;
		setTransaction(newVersion);
	}, [transaction.transferAmount, transaction.changeRate]);

	const transactionValidationSchema = yup.object({
		fromOwnerId: yup
			.number()
			.required(errorMessage.required)
			.typeError(errorMessage.numeric),
		toOwnerId: yup
			.number()
			.required(errorMessage.required)
			.typeError(errorMessage.numeric),
		transferAmount: yup
			.number()
			.required(errorMessage.required)
			.typeError(errorMessage.numeric)
			.test("balance", "Account has not enought balance", (value) => {
				const account = accountMap.get(transaction.fromOwnerId);
				return value < (account?.balance ?? 0);
			}),
	});

	const accountsFrom: AutocompleteItem[] = useMemo(
		() =>
			accounts.map((item) => ({
				label: `${item.alias} - ${formatMoney(item.balance, item.currency)}`,
				value: item.ownerId,
			})) ?? [],
		[accounts],
	);

	const accountsTo = useMemo(
		() =>
			accountsFrom.filter((item) => item.value !== transaction.fromOwnerId) ??
			[],
		[accountsFrom, transaction.fromOwnerId],
	);

	const validateField = (fieldName: string, newVersion: Transaction) => {
		transactionValidationSchema
			.validateAt(fieldName, newVersion)
			.then(() => {
				setValidationError((state) => ({ ...state, [fieldName]: "" }));
			})
			.catch((e: yup.ValidationError) => {
				setValidationError((state) => ({
					...state,
					[fieldName]: e.errors.at(0),
				}));
			});
	};

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = ev.currentTarget.name;
		const newVersion = {
			...transaction,
			[fieldName]: ev.currentTarget.value,
		} as Transaction;
		setTransaction(newVersion);
		validateField(fieldName, newVersion);
	};
	const onChangeAutocomplete = (fieldName: string, item: AutocompleteItem) => {
		const newVersion = {
			...transaction,
			[fieldName]: item?.value,
		} as Transaction;
		setTransaction(newVersion);

		validateField(fieldName, newVersion);
	};

	const onFromOwnerChange = (fieldName: string, item: AutocompleteItem) => {
		onChangeAutocomplete(fieldName, item);

		if (!item) onChangeAutocomplete("toOwnerId", item);
	};

	const isValid = transactionValidationSchema.isValidSync(transaction);

	return (
		<FormCard>
			<div className={classes.fields}>
				<div className={classes.row}>
					<div className={classes.fieldGroup}>
						<FormLabel>From Account</FormLabel>
						<Autocomplete
							size="small"
							name="fromOwnerId"
							disablePortal
							options={accountsFrom}
							renderInput={(params) => (
								<TextField
									{...params}
									helperText={validationError["fromOwnerId"]}
									error={!!validationError["fromOwnerId"]}
								/>
							)}
							onChange={onFromOwnerChange}
							value={transaction.fromOwnerId}
						/>
					</div>
					<div className={classes.fieldGroup}>
						<FormLabel>To Account</FormLabel>
						<Autocomplete
							disabled={!transaction.fromOwnerId}
							name="toOwnerId"
							size="small"
							disablePortal
							options={accountsTo}
							renderInput={(params) => (
								<TextField
									{...params}
									helperText={validationError["toOwnerId"]}
									error={!!validationError["toOwnerId"]}
								/>
							)}
							onChange={onChangeAutocomplete}
							value={transaction.toOwnerId}
						/>
					</div>
				</div>
				<div className={classes.row}>
					<div className={classes.fieldGroup}>
						<FormLabel>Amount to transfer</FormLabel>
						<TextField
							disabled={!transaction.fromOwnerId}
							name="transferAmount"
							size="small"
							fullWidth
							value={transaction.transferAmount ?? ""}
							helperText={validationError["transferAmount"]}
							error={!!validationError["transferAmount"]}
							onChange={onChange}
						/>
					</div>
					<div className={classes.fieldGroup}>
						<FormLabel>Change rate</FormLabel>
						<TextField
							name="changeRate"
							size="small"
							fullWidth
							value={transaction.changeRate ?? ""}
							disabled
							placeholder="Calculated field"
						/>
					</div>
					<div className={classes.fieldGroup}>
						<FormLabel>Final Amount</FormLabel>
						<TextField
							name="amount"
							size="small"
							fullWidth
							value={
								transaction.amount
									? formatMoney(transaction.amount, currencyTo)
									: ""
							}
							disabled
							placeholder="Calculated field"
						/>
					</div>
				</div>
			</div>
			<div className={classes.actions}>
				<Button variant="outlined" disabled={!isValid} onClick={onSave}>
					Send Transaaction
				</Button>
				<Button variant="outlined" color="warning" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</FormCard>
	);
};

export default TransactionForm;
