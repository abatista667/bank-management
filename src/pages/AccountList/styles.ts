import { largeScreen, mediumScreen } from "@bank/constants/mediaQueries";
import { tss } from "tss-react";

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
	actions: {
		marginTop: 16,
		display: "flex",
		width: "100%",
		justifyContent: "center",
	},
});
