import { tss } from "tss-react";

export const useClasses = tss.create({
	card: {
		paddingInline: 40,
		paddingBlock: 20,
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: 12,
	},
});
