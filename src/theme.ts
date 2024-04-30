import { createTheme } from "@mui/material";
import { purple, yellow } from "@mui/material/colors";

export const theme = createTheme({
	palette: {
		primary: {
			main: purple[500],
		},
		secondary: {
			main: yellow[500],
		},
	},
})
