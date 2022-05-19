import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Collapse from '@mui/material/Collapse';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../global/UserContext";

import "../styles/nav.scss";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("fyptoken");
        setUser({});
    }

    return (
        <Box display="flex" m={2} justifyContent="space-between">
            <Box>
                {user?._id ? <><Fab className="fab" size="medium" onClick={() => setOpen(!open)}>
                    <MenuRoundedIcon />
                </Fab>
                    <Collapse in={open}>
                        <Box position="absolute" sx={{zIndex:99999}}>
                            <Fab className="fab" size="medium" onClick={() => navigate("/home")}>
                                <HomeRoundedIcon />
                            </Fab>
                            <Fab className="fab" size="medium" onClick={() => navigate("/sell")}>
                                <AddIcon />
                            </Fab>
                            <Fab className="fab" size="medium" onClick={() => navigate("/messages")}>
                                <MessageRoundedIcon />
                            </Fab>
                            <Fab className="fab" size="medium" onClick={() => navigate("/profile/favourites")}>
                                <FavoriteBorderRoundedIcon />
                            </Fab>
                        </Box>
                    </Collapse></> :
                    <Fab className="fab" size="medium" onClick={() => navigate("/home")}>
                        <HomeRoundedIcon />
                    </Fab>}
            </Box>
            {!user?._id && <Box display="flex" width="110px" justifyContent="space-between">
                <Fab className="fab" size="medium" onClick={() => navigate("/login")}>
                    <LoginRoundedIcon />
                </Fab>
                <Fab className="fab" size="medium" onClick={() => navigate("/signup")}>
                    <PersonAddAltRoundedIcon />
                </Fab>
            </Box>}
            {user?._id && <Box display="flex" width="100px" justifyContent="space-between">
                <Fab className="fab" size="medium" onClick={handleLogout}>
                    <LogoutRoundedIcon />
                </Fab>
                <Fab className="fab" size="medium" onClick={() => navigate("/profile/my-ads")}>
                    <Avatar alt="Remy Sharp" src={user.image.url} />
                </Fab>
            </Box>}
        </Box>
    )
}

export default Navbar;