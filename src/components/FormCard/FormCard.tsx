import { IconButton, Paper } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { PropsWithChildren } from "react"
import { useClasses } from "./styles";

interface FormCardProps extends PropsWithChildren {
    onSave: () => void,
    onCancel: () => void,
}

const FormCard = ({ children }: FormCardProps) => {
    const { classes } = useClasses()

    return <Paper className={classes.card}>
        <IconButton className={classes.close}>
            <CloseIcon color="primary" />
        </IconButton>
        <IconButton className={classes.save}>
            <DoneIcon color="primary" />
        </IconButton>
        {children}
    </Paper>
}

export default FormCard