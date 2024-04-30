import { tss } from "tss-react";

export const useClasses = tss
    .create({
        root: {
            paddingBlock: 10,
            display: "flex",
            justifyContent: "space-between"
        },
        link:{
            textDecoration: "none"
        }
    });