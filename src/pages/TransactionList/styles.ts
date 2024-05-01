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
	},
	fieldGroup: {
		display: "flex",
		flexDirection: "column",
		gap: 4,
		flex: 1,
	},
	row: {
		display: "flex",
		gap: 8,
		flexDirection: "column",
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
});
