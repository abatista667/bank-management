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
	filterWrapper: {
		width: "100%",
		display: "flex",
	},
	cellMargin: {
		width: 75
	}
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
