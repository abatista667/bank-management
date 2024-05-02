import Layout from "@bank/components/Layout/Layout";
import { useClasses } from "./styles";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Heading from "@bank/components/Heading/Heading";
import AccountForm from "./AccountForm";
import { useListAccount } from "@bank/queries/listAccounts";
import { useMemo, useState } from "react";
import { Account, EditMode } from "@bank/types";
import { useAddOrUpdateAccount } from "@bank/queries/addOrUpdateAccount";
import { useDeleteAccount } from "@bank/queries/deleteAccount";
import { useConfirmDialog } from "@bank/components/ConfirmDialg/ConfirmDilogContext";
import { formatMoney } from "@bank/utils/formatMoney";
import Grid from "@bank/components/Grid";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AccountList = () => {
	const { classes } = useClasses();
	const { data } = useListAccount();
	const [isEditFormOpenned, setIsEditFormOpenned] = useState(false);
	const [filterBy, setFilterBy] = useState("");
	const [selectedAccount, setSelectedAccount] = useState<Partial<Account>>({});
	const [editMode, setEditMode] = useState<EditMode>("create");
	const accountSet = useMemo(
		() => new Set(data?.data.map((item) => item.ownerId)),
		[data],
	);

	const allAccounts = data?.data ?? [];
	const accountsToDisplay = filterBy
		? allAccounts.filter((item) =>
				item.alias.toLowerCase().includes(filterBy.toLowerCase()),
			)
		: allAccounts;

	const { mutate: addOrUpdateAccount } = useAddOrUpdateAccount();
	const { mutate: deleteAccount } = useDeleteAccount();
	const { showMessage } = useConfirmDialog();

	const addNewAccount = () => {
		setIsEditFormOpenned(true);
		setSelectedAccount({});
		setEditMode("create");
	};
	const onDeleteAccount = (id: number) => {
		showMessage("", "Are you sure to delete this account?", () =>
			deleteAccount(id),
		);
	};
	const onEditAccount = (account: Account) => {
		setIsEditFormOpenned(true);
		setSelectedAccount(account);
		setEditMode("edit");
	};

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
				<div className={classes.filterWrapper}>
					<TextField
						value={filterBy}
						size="small"
						placeholder="Filter by Alias"
						aria-label="Filter by Alias"
						onChange={(ev) => setFilterBy(ev.currentTarget.value)}
						InputProps={{
							endAdornment: filterBy ? (
								<InputAdornment position="end">
									<IconButton onClick={(ev) => setFilterBy("")}>
										<CloseIcon />
									</IconButton>
								</InputAdornment>
							) : null,
						}}
						sx={{
							width: 300,
						}}
					/>
				</div>
				<div className={classes.tableWrapper}>
					<Grid>
						<Grid.Heading>
							<Grid.HeadingCell>An owner ID</Grid.HeadingCell>
							<Grid.HeadingCell>Alias</Grid.HeadingCell>
							<Grid.HeadingCell>Currency</Grid.HeadingCell>
							<Grid.HeadingCell>Balance</Grid.HeadingCell>
							<div className={classes.cellMargin}></div>
						</Grid.Heading>
						{accountsToDisplay.map((item) => (
							<Grid.Row>
								<Grid.Cell>{item.ownerId}</Grid.Cell>
								<Grid.Cell>{item.alias}</Grid.Cell>
								<Grid.Cell>{item.currency}</Grid.Cell>
								<Grid.Cell>
									{formatMoney(item.balance, item.currency)}
								</Grid.Cell>
								<Grid.ActionCell>
								<IconButton color="primary" onClick={() => onEditAccount(item)}>
										<EditIcon sx={{ width: 20 }}  />
									</IconButton>
									<IconButton color="warning" onClick={() => onDeleteAccount(item.ownerId)}>
										<DeleteIcon sx={{ width: 20 }} />
									</IconButton>
								</Grid.ActionCell>
							</Grid.Row>
						))}
					</Grid>
				</div>
			</div>
		</Layout>
	);
};

export default AccountList;
