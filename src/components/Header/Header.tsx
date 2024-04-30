import {
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Menu from "../Menu/Menu";

const Header = () => {
	const theme = useTheme();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					background: theme.palette.primary.dark,
					zIndex: {
						lg: theme.zIndex.drawer + 1,
					},
				}}
			>
				<Toolbar>
					<IconButton onClick={() => setIsMenuOpen(true)}>
						<MenuIcon sx={{ color: "white" }} />
					</IconButton>
					<Typography
						variant="body1"
						noWrap
						component="div"
						sx={{
							margin: 0,
						}}
					>
						Bank Management
					</Typography>
				</Toolbar>
			</AppBar>
			<Menu isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	);
};

export default Header;
