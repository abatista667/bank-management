import { Paper, TextField, FormLabel, Button, IconButton } from "@mui/material"
import { useFormClasses } from "./styles"
import FormCard from "@bank/components/FormCard";

interface AccountFormProps{
    onSave: () => void,
    onCancel: () => void,
}

const AccountForm = (props: AccountFormProps) => {
    const { classes, cx } = useFormClasses();

    return <FormCard {... props}>
        <div className={classes.fields}>
            <div className={classes.fieldGroup}>
                <FormLabel>Owner ID</FormLabel>
                <TextField size="small" fullWidth />
            </div>
            <div className={cx(classes.fieldGroup, classes.alias)}>
                <FormLabel>Alias ID</FormLabel>
                <TextField size="small" fullWidth />
            </div>
            <div className={classes.fieldGroup}>
                <FormLabel>Currency</FormLabel>
                <TextField size="small" fullWidth />
            </div>
            <div className={classes.fieldGroup}>
                <FormLabel>Amount</FormLabel>
                <TextField size="small" fullWidth />
            </div>
        </div>
    </FormCard>
}

export default AccountForm