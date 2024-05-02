import { useClasses } from "./styles";

const Grid = ({ children }) => {
	const { classes } = useClasses();
	return (
		<div className={classes.root}>
			{children}
			<div className={classes.footer}></div>
		</div>
	);
};
const Cell = ({ children }) => {
	const { classes } = useClasses();
	return <div className={classes.cell}>{children}</div>;
};
const ActionCell = ({ children }) => {
	const { classes } = useClasses();
	return <div className={classes.action}>{children}</div>;
};
const Heading = ({ children }) => {
	const { classes } = useClasses();
	return <div className={classes.gridHeadingRow}>{children}</div>;
};
const Row = ({ children }) => {
	const { classes } = useClasses();
	return <div className={classes.gridRow}>{children}</div>;
};
const HeadingCell = ({ children }) => {
	const { classes } = useClasses();
	return <div className={classes.headingCell}>{children}</div>;
};

Grid.Heading = Heading;
Grid.Cell = Cell;
Grid.Row = Row;
Grid.HeadingCell = HeadingCell;
Grid.ActionCell = ActionCell;

export default Grid;
