import { TextField, FormLabel } from "@mui/material";
import { useFormClasses } from "./styles";
import FormCard from "@bank/components/FormCard";
import { Transaction } from "@bank/types";
import React, { useState } from "react";
import { transactionValidationSchema } from "@bank/constants/validationSchemas";
import * as yup from "yup";

const TransactionForm = () => {
	const { classes, cx } = useFormClasses();

	const [transaction, setTransaction] = useState<Partial<Transaction>>({});
	const [validationError, setValidationError] = useState<
		Record<string, string>
	>({});

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = ev.currentTarget.name;
		const newVersion = {
			...transaction,
			[fieldName]: ev.currentTarget.value,
		} as Transaction;
		setTransaction(newVersion);

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

	const validateTransaction = () =>
		transactionValidationSchema.isValidSync(transaction);

	return (
		<FormCard
			onValidate={validateTransaction}
			onSave={function (): void {
				throw new Error("Function not implemented.");
			}}
			onCancel={function (): void {
				throw new Error("Function not implemented.");
			}}
		>
			<div className={classes.fields}>
				<div className={classes.fieldGroup}>
					<FormLabel>Owner ID</FormLabel>
					<TextField
						name="fromOwnerId"
						size="small"
						fullWidth
						value={transaction.fromOwnerId ?? ""}
						onChange={onChange}
						helperText={validationError["fromOwnerId"]}
						error={!!validationError["fromOwnerId"]}
					/>
				</div>
				<div className={cx(classes.fieldGroup, classes.alias)}>
					<FormLabel>Alias</FormLabel>
					<TextField
						name="fromOwnerId"
						size="small"
						fullWidth
						value={transaction.fromOwnerId ?? ""}
						onChange={onChange}
						helperText={validationError["fromOwnerId"]}
						error={!!validationError["fromOwnerId"]}
					/>
				</div>
				<div className={classes.fieldGroup}>
					<FormLabel>Target Currency</FormLabel>
					<TextField
						name="toCurrency"
						size="small"
						fullWidth
						value={transaction.toCurrency ?? ""}
						onChange={onChange}
						helperText={validationError["toCurrency"]}
						error={!!validationError["toCurrency"]}
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
					/>
				</div>
				<div className={classes.fieldGroup}>
					<FormLabel>Amount</FormLabel>
					<TextField
						name="amount"
						size="small"
						fullWidth
						value={transaction.amount ?? ""}
						onChange={onChange}
						helperText={validationError["amount"]}
						error={!!validationError["amount"]}
					/>
				</div>
			</div>
		</FormCard>
	);
};

export default TransactionForm;
