import { IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { PropsWithChildren } from "react";
import { useClasses } from "./styles";

interface FormCardProps extends PropsWithChildren {
	onSave: () => void;
	onCancel: () => void;
	onValidate: () => boolean;
}

const FormCard = ({
	children,
	onCancel,
	onSave,
	onValidate,
}: FormCardProps) => {
	const { classes } = useClasses();
	const isValid = onValidate();

	return (
		<Paper component={"form"} className={classes.card}>
			<IconButton className={classes.close} onClick={onCancel}>
				<CloseIcon color="primary" />
			</IconButton>
			<IconButton disabled={!isValid} className={classes.save} onClick={onSave}>
				<DoneIcon color={isValid ? "primary" : "disabled"} />
			</IconButton>
			{children}
		</Paper>
	);
};

export default FormCard;
