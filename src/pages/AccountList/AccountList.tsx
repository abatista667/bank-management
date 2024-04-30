import Layout from "@bank/components/Layout/Layout"
import { useClasses } from "./styles"
import { Button, Paper } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import Heading from "@bank/components/Heading/Heading";
import AccountForm from "./AccountForm";
import { useListAccount } from "@bank/queries/listAccounts";

const columns: GridColDef[] = [
    { field: 'ownerId', headerName: 'An owner ID', width: 150 },
    { field: 'alias', headerName: 'Alias', flex: 1 },
    { field: 'currency', headerName: 'Currency' },
    { field: 'amount', headerName: 'Amount'},
    {
        field: 'actions',
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem  label="Delete" showInMenu />,
          <GridActionsCellItem label="Edit"  showInMenu />,
        ]
      }
];

const AccountList = () => {
    const { classes } = useClasses();
    const { data } = useListAccount();

    console.log(data?.data)

    return <Layout>
        <div className={classes.root}>
            <Heading title="Accounts" action={<Button variant="outlined">Create new</Button>} />
            <AccountForm onSave={function (): void {
                throw new Error("Function not implemented.");
            } } onCancel={function (): void {
                throw new Error("Function not implemented.");
            } } />
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
            />
            </div>

        </div>
    </Layout>
}

export default AccountList