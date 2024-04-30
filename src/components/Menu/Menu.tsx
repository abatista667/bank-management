"use client";
import {
	Divider,
	Drawer,
	IconButton,
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

export const drawerWidth = "300px";

interface MenuItem {
	route: string;
	text: string;
	icon: React.ReactNode;
}

const MenuContent = () => {
	const menuItems: MenuItem[] = [
		{
			route: "/",
			text: "Account List",
			icon: <AccountBalanceIcon />,
		},
		{
			route: "/transfers",
			text: "Transfers",
			icon: <SyncAltIcon />,
		},
	];
	const navigate = useNavigate();
	return (
		<List>
			{menuItems.map((item) => (
				<ListItem key={item.text} disablePadding>
					<ListItemButton onClick={() => navigate(item.route)}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};

const Menu = ({ isMenuOpen, onClose }) => {
	return (
		<>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				anchor="left"
				open={isMenuOpen}
				onClose={onClose}
			>
				<Box>
					<IconButton onClick={onClose}>
						<ChevronLeftIcon />
					</IconButton>
				</Box>
				<Divider />
				<MenuContent />
			</Drawer>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
					display: {
						lg: "block",
						xs: "none",
					},
				}}
				variant="permanent"
				anchor="left"
				open
			>
				<Box
					sx={{
						paddingTop: 10,
					}}
				>
					<MenuContent />
				</Box>
			</Drawer>
		</>
	);
};

export default Menu;
