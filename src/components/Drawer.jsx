import React, { useState, useContext } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { UserContext } from '../global/UserContext';
import { useNavigate } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

const NavigationDrawer = () => {
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const [user, setUser] = useContext(UserContext)

	const navigate = useNavigate();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem("fyptoken");
		setUser({});
	}

	return (
		<Drawer
			sx={{
				width: 240,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 240,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate("/home")}>
						<ListItemIcon>
							<HomeRoundedIcon />
						</ListItemIcon>
						<ListItemText primary={"Home"} />
					</ListItemButton>
				</ListItem>
				{user?._id && <>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/sell")}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary={"Post"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/profile/favourites")}>
							<ListItemIcon>
								<FavoriteBorderRoundedIcon />
							</ListItemIcon>
							<ListItemText primary={"Favourites"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/messages")}>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary={"Messages"} />
						</ListItemButton>
					</ListItem>
				</>}
			</List>
			<Divider />
			<List>
				{user?._id && <ListItem disablePadding>
					<ListItemButton onClick={handleLogout}>
						<ListItemIcon>
							<LogoutRoundedIcon />
						</ListItemIcon>
						<ListItemText primary={"Logout"} />
					</ListItemButton>
				</ListItem>}
				{!user?._id && <>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/login")}>
							<ListItemIcon>
								<LoginRoundedIcon />
							</ListItemIcon>
							<ListItemText primary={"SignIn"} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/signup")}>
							<ListItemIcon>
								<PersonAddAltRoundedIcon />
							</ListItemIcon>
							<ListItemText primary={"Register"} />
						</ListItemButton>
					</ListItem>
				</>}
			</List>
		</Drawer>
	)
}

export default NavigationDrawer;