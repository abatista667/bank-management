import { tss } from "tss-react";

export const useClasses = tss
    .create({
        card: {
            paddingInline: 40,
            paddingBottom: 20,
            paddingTop: 60,
            width: "100%",
            position: "relative"
        },
        close: {
            position: "absolute",
            top: 5,
            right: 10,
        },
        save: {
            position: "absolute",
            top: 5,
            right: 65,
        },
    });