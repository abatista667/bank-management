import { largeScreen, mediumScreen } from "@bank/constants/mediaQueries";
import { theme } from "@bank/theme";
import { tss } from "tss-react";

const borderColor = theme.palette.grey[300];

export const useClasses = tss.create({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		[largeScreen]: {
			alignItems: "start",
			maxWidth: 1000,
		},
	},
	tableWrapper: {
		marginTop: 20,
		width: "100%",
	},
	grid: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		minHeight: 400
	},
	gridRow: {
		width: "100%",
		borderTop: `1px solid ` + borderColor,
		borderInline: `1px solid ` + borderColor,
		display: "flex",
		paddingBlock: 8,
		paddingInline: 5,
	},
	cell: {
		...theme.typography.body1 as any,
		flex: 1
	},
	headingCell: {
		...theme.typography.body1 as any,
		fontWeight: theme.typography.fontWeightBold,
		flex: 1
	},
	gridHeadingRow: {
		width: "100%",
		borderTop: `1px solid ` + borderColor,
		borderInline: `1px solid ` + borderColor,
		display: "flex",
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
		paddingBlock: 8,
		paddingInline: 5,
	},
});

export const useFormClasses = tss.create({
	fields: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: 8,
		[mediumScreen]: {
			flexDirection: "row",
		},
	},
	actions: {
		display: "flex",
		width: "100%",
		justifyContent: "end",
		gap: 8,
	},
	fieldGroup: {
		display: "flex",
		flexDirection: "column",
		gap: 4,
	},
	alias: {
		[mediumScreen]: {
			width: "50%",
		},
	},
});
