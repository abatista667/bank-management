import Layout from "@bank/components/Layout/Layout";
import { useClasses } from "./styles";
import { Button } from "@mui/material";
import Heading from "@bank/components/Heading/Heading";
import AccountForm from "./AccountForm";
import { useListAccount } from "@bank/queries/listAccounts";
import { useMemo, useState } from "react";
import { Account, EditMode } from "@bank/types";
import { useAccountListColumns } from "./useAccountListColumns";
import { useAddOrUpdateAccount } from "@bank/queries/addOrUpdateAccount";
import { useDeleteAccount } from "@bank/queries/deleteAccount";
import { useConfirmDialog } from "@bank/components/ConfirmDialg/ConfirmDilogContext";
import { formatMoney } from "@bank/utils/formatMoney";
import Grid from "@bank/components/Grid";

const AccountList = () => {
	const { classes } = useClasses();
	const { data } = useListAccount();
	const [isEditFormOpenned, setIsEditFormOpenned] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState<Partial<Account>>({});
	const [editMode, setEditMode] = useState<EditMode>("create");
	const accountSet = useMemo(
		() => new Set(data?.data.map((item) => item.ownerId)),
		[data],
	);

	const { mutate: addOrUpdateAccount } = useAddOrUpdateAccount();
	const { mutate: deleteAccount } = useDeleteAccount();
	const { showMessage } = useConfirmDialog();

	const addNewAccount = () => {
		setIsEditFormOpenned(true);
		setSelectedAccount({});
		setEditMode("create");
	};
	const onDeleteAccount = (id: number) => {
		showMessage("", "Are you sure to delete divis account?", () =>
			deleteAccount(id),
		);
	};
	const onEditAccount = (account: Account) => {
		setIsEditFormOpenned(true);
		setSelectedAccount(account);
		setEditMode("edit");
	};

	const columns = useAccountListColumns({ onEditAccount, onDeleteAccount });

	return (
		<Layout>
			<div className={classes.root}>
				<Heading
					title="Accounts"
					action={
						!isEditFormOpenned ? (
							<Button variant="outlined" onClick={addNewAccount}>
								Create new
							</Button>
						) : null
					}
				/>
				{isEditFormOpenned ? (
					<AccountForm
						selectedAccount={selectedAccount}
						setSelectedAccount={setSelectedAccount}
						mode={editMode}
						onSave={() => {
							addOrUpdateAccount(selectedAccount as Account);
							setIsEditFormOpenned(false);
						}}
						onCancel={() => {
							setIsEditFormOpenned(false);
						}}
						existingAccounts={accountSet}
					/>
				) : null}
				<div className={classes.tableWrapper}>
					<Grid>
						<Grid.Heading>
							<Grid.HeadingCell>
								An owner ID
							</Grid.HeadingCell>
							<Grid.HeadingCell >
								Alias
							</Grid.HeadingCell>
							<Grid.HeadingCell >
								Currency
							</Grid.HeadingCell>
							<Grid.HeadingCell >
								Balance
							</Grid.HeadingCell>
						</Grid.Heading>
						{data?.data.map((item) => (
							<Grid.Row>
								<Grid.Cell>{item.ownerId}</Grid.Cell>
								<Grid.Cell>{item.alias}</Grid.Cell>
								<Grid.Cell>{item.currency}</Grid.Cell>
								<Grid.Cell>{formatMoney(item.balance, item.currency)}</Grid.Cell>
								<Grid.ActionCell><></></Grid.ActionCell>
							</Grid.Row>
						))}
					</Grid>
				</div>
			</div>
		</Layout>
	);
};

export default AccountList;
