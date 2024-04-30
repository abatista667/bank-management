import { PropsWithChildren } from "react";
import { useClasses } from "./styles";
import Header from "../Header";

const Layout = ({ children }: PropsWithChildren) => {
	const { classes } = useClasses();

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.content}>{children}</div>
		</div>
	);
};

export default Layout;
