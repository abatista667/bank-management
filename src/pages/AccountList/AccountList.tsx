import Layout from "@bank/components/Layout/Layout";
import { useClasses } from "./styles";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "@bank/components/Heading/Heading";
import AccountForm from "./AccountForm";
import { useListAccount } from "@bank/queries/listAccounts";
import { useMemo, useState } from "react";
import { Account, EditMode } from "@bank/types";
import { useAccountListColumns } from "./useAccountListColumns";
import { useAddOrUpdateAccount } from "@bank/queries/addOrUpdateAccount";
import { useDeleteAccount } from "@bank/queries/deleteAccount";
import { useConfirmDialog } from "@bank/components/ConfirmDialg/ConfirmDilogContext";

const AccountList = () => {
	const { classes } = useClasses();
	const { data } = useListAccount();
	const [isEditFormOpenned, setisEditFormOpenned] = useState(false);
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
		setisEditFormOpenned(true);
		setSelectedAccount({});
		setEditMode("create");
	};
	const onDeleteAccount = (id: number) => {
		showMessage("", "Are you sure to delete this account?", () =>
			deleteAccount(id),
		);
	};
	const onEditAccount = (account: Account) => {
		setisEditFormOpenned(true);
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
						<Button variant="outlined" onClick={addNewAccount}>
							Create new
						</Button>
					}
				/>
				{isEditFormOpenned ? (
					<AccountForm
						selectedAccount={selectedAccount}
						setSelectedAccount={setSelectedAccount}
						mode={editMode}
						onSave={() => {
							addOrUpdateAccount(selectedAccount as Account);
							setisEditFormOpenned(false);
						}}
						onCancel={() => {
							setisEditFormOpenned(false);
						}}
						existingAccounts={accountSet}
					/>
				) : null}
				<div className={classes.tableWrapper}>
					<DataGrid
						rows={data?.data ?? []}
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

export default AccountList;
