import { largeScreen, mediumScreen } from "@bank/constants/mediaQueries";
import { theme } from "@bank/theme";
import { tss } from "tss-react";

const borderColor = theme.palette.grey[300];

export const useClasses = tss.create({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		minHeight: 400,
		minWidth: 700
	},
	gridRow: {
		width: "100%",
		borderTop: `1px solid ` + borderColor,
		display: "flex",
		paddingInline: 8,
		borderInline: `1px solid ` + borderColor,
	},
	cell: {
		...(theme.typography.body1 as any),
		flex: 1,
		paddingBlock: 12,
	},
	action: {
		...(theme.typography.body1 as any),
	},
	headingCell: {
		...(theme.typography.body1 as any),
		fontWeight: theme.typography.fontWeightBold,
		flex: 1,
		paddingBlock: 14,
	},
	gridHeadingRow: {
		width: "100%",
		borderTop: `1px solid ` + borderColor,
		borderInline: `1px solid ` + borderColor,
		display: "flex",
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
		paddingInline: 8,
	},
	footer: {
		flex: "1",
		border: `1px solid ` + borderColor,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
});
