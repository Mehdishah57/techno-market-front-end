import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../global/UserContext";

import "../styles/nav.scss";

const Navbar = () => {
    const [user] = useContext(UserContext);
    const navigate = useNavigate();

  return (
    <Box display="flex" m={2} justifyContent="space-between">
        <Box>
            <Fab className="fab" size="medium"onClick={() => navigate("/home")}>
                <HomeRoundedIcon />
            </Fab>
        </Box>
        {!user?._id && <Box display="flex" width="110px" justifyContent="space-between">
            <Fab className="fab" size="medium" onClick={() => navigate("/login")}>
                <LoginRoundedIcon />
            </Fab>
            <Fab className="fab" size="medium" onClick={() => navigate("/signup")}>
                <PersonAddAltRoundedIcon />
            </Fab>
        </Box>}
        {user?._id && <Box display="flex" width="200px" justifyContent="space-between">
            {/* <Fab className="fab" size="medium" onClick={() => navigate("/sell")}>
                <AddIcon />
            </Fab>
            <Fab className="fab" size="medium" onClick={() => navigate("/messages")}>
                <MessageRoundedIcon />
            </Fab>
            <Fab className="fab" size="medium" onClick={() => navigate("/profile/favourites")}>
                <FavoriteBorderRoundedIcon />
            </Fab> */}
            <Fab className="fab" size="medium" onClick={() => navigate("/logout")}>
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