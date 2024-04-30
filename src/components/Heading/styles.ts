import { largeScreen } from "@bank/constants/mediaQueries";
import { tss } from "tss-react";

export const useClasses = tss
    .create({
        root:{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            boxSizing: "content-box",
            paddingBottom: 20
        },
    });