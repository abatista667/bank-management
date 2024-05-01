import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";
import { useClasses } from "./styles";

const FormCard = ({ children }: PropsWithChildren) => {
	const { classes } = useClasses();

	return <Paper className={classes.card}>{children}</Paper>;
};

export default FormCard;
