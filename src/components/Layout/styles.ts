import { largeScreen } from "@bank/constants/mediaQueries";
import { tss } from "tss-react";

export const useClasses = tss
    .create({
        root:{
            paddingInline: 20,
            [largeScreen]: {
                paddingLeft: 28,
            } 
        },
        content:{
            boxSizing: "content-box",
            marginTop: "95px",
            [largeScreen]: {
                paddingLeft: 340,
                width: "calc(100% - 340px)"
            }
        }
    });