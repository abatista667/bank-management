import { Paper } from "@mui/material";
import { AriaAttributes, PropsWithChildren } from "react";
import { useClasses } from "./styles";

type FormCardProps = AriaAttributes & PropsWithChildren;

const FormCard = ({ children, ...rest }: FormCardProps) => {
	const { classes } = useClasses();

	return (
		<Paper {...rest} className={classes.card}>
			{children}
		</Paper>
	);
};

export default FormCard;
