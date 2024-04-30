import { Paper, TextField, FormLabel, Button, IconButton } from "@mui/material";
import { useFormClasses } from "./styles";
import FormCard from "@bank/components/FormCard";
import { Account, EditMode } from "@bank/types";
import React from "react";

interface AccountFormProps {
	onSave: () => void;
	onCancel: () => void;
	selectedAccount: Partial<Account>;
	setSelectedAccount: (account: Account) => void;
	mode: EditMode;
}

const AccountForm = ({
	selectedAccount,
	setSelectedAccount,
	mode,
	...rest
}: AccountFormProps) => {
	const { classes, cx } = useFormClasses();
	const { ownerId, alias, currency, balance } = selectedAccount;

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedAccount({
			...selectedAccount,
			[ev.currentTarget.name]: ev.currentTarget.value,
		} as Account);
	};

	return (
		<FormCard {...rest}>
			<div className={classes.fields}>
				<div className={classes.fieldGroup}>
					<FormLabel>Owner ID</FormLabel>
					<TextField
						name="ownerId"
						size="small"
						fullWidth
						value={ownerId ?? ""}
						onChange={onChange}
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
					/>
				</div>
				<div className={classes.fieldGroup}>
					<FormLabel>Currency</FormLabel>
					<TextField
						name="currency"
						size="small"
						fullWidth
						value={currency ?? ""}
						disabled={mode === "edit"}
						onChange={onChange}
					/>
				</div>
				<div className={classes.fieldGroup}>
					<FormLabel>Balance</FormLabel>
					<TextField
						name="balance"
						size="small"
						fullWidth
						value={balance ?? ""}
						disabled={mode === "edit"}
						onChange={onChange}
					/>
				</div>
			</div>
		</FormCard>
	);
};

export default AccountForm;
