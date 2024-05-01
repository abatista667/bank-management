import { TextField, FormLabel, Paper, Button } from "@mui/material";
import { useFormClasses } from "./styles";
import { Account, EditMode } from "@bank/types";
import React, { useState } from "react";
import * as yup from "yup";
import { errorMessage } from "@bank/constants/errorMessage";
import FormCard from "@bank/components/FormCard";

interface AccountFormProps {
	onSave: () => void;
	onCancel: () => void;
	selectedAccount: Partial<Account>;
	setSelectedAccount: (account: Account) => void;
	mode: EditMode;
	existingAccounts?: Set<number>;
}

const AccountForm = ({
	selectedAccount,
	setSelectedAccount,
	mode,
	existingAccounts,
	onSave,
	onCancel,
}: AccountFormProps) => {
	const { classes, cx } = useFormClasses();
	const { ownerId, alias, currency, balance } = selectedAccount;
	const [validationError, setValidationError] = useState<
		Record<string, string>
	>({});

	const accountValidationSchema = yup.object({
		ownerId: yup
			.number()
			.test(
				"notRepeated",
				"Cannot create an account with the same existing ID",
				(value) => {
					return !(mode === "create" && existingAccounts?.has(value));
				},
			)
			.required(errorMessage.required)
			.typeError(errorMessage.numeric),
		alias: yup.string().required(errorMessage.required),
		currency: yup.string().required(errorMessage.required),
		balance: yup
			.number()
			.required(errorMessage.required)
			.typeError(errorMessage.numeric),
	});

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = ev.currentTarget.name;
		const newVersion = {
			...selectedAccount,
			[fieldName]: ev.currentTarget.value,
		} as Account;
		setSelectedAccount(newVersion);

		accountValidationSchema
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

	const isValid = accountValidationSchema.isValidSync(selectedAccount);

	return (
		<FormCard>
			<div className={classes.fields}>
				<div className={classes.fieldGroup}>
					<FormLabel>Owner ID</FormLabel>
					<TextField
						name="ownerId"
						size="small"
						fullWidth
						value={ownerId ?? ""}
						onChange={onChange}
						helperText={validationError["ownerId"]}
						error={!!validationError["ownerId"]}
						disabled={mode === "edit"}
					/>
				</div>
				<div className={cx(classes.fieldGroup, classes.alias)}>
					<FormLabel>Alias</FormLabel>
					<TextField
						name="alias"
						size="small"
						fullWidth
						value={alias ?? ""}
						onChange={onChange}
						helperText={validationError["alias"]}
						error={!!validationError["alias"]}
					/>
				</div>
				<div className={classes.fieldGroup}>
					<FormLabel>Currency</FormLabel>
					<TextField
						name="currency"
						size="small"
						fullWidth
						value={currency ?? ""}
						onChange={onChange}
						helperText={validationError["currency"]}
						error={!!validationError["currency"]}
					/>
				</div>
				<div className={classes.fieldGroup}>
					<FormLabel>Balance</FormLabel>
					<TextField
						name="balance"
						size="small"
						fullWidth
						value={balance ?? ""}
						onChange={onChange}
						helperText={validationError["balance"]}
						error={!!validationError["balance"]}
					/>
				</div>
			</div>
			<div className={classes.actions}>
				<Button variant="outlined" onClick={onSave} disabled={!isValid}>
					Save Account
				</Button>
				<Button variant="outlined" color="warning" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</FormCard>
	);
};

export default AccountForm;
