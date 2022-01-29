import React, { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from './../global/UserContext';

import "../styles/nav.scss";

const Navbar = () => {
	const { user, setUser } = useContext(UserContext);
	const isActive = navProps => navProps.isActive ? "link-active" : "link-asleep";

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("fyptoken");
		setUser({});
		navigate("/home", { replace: true })
	}

	return (
		<nav className="nav-wrapper">
			<ul>
				<li>
					<NavLink to="/home" className={isActive}>Home</NavLink>
				</li>
				{user && !user._id && <li><NavLink to="/login" className={isActive}>Sign In</NavLink></li>}
				{user && !user._id && <li><NavLink to="/signup" className={isActive}>Sign Up</NavLink></li>}
				{user && user._id && <li><NavLink to="/sell" className={isActive}>Sell</NavLink></li>}
				{user && user._id && <li><NavLink to="/messages" className={isActive}>Messages</NavLink></li>}
				{user && user._id && <li><NavLink to="/profile" className={isActive}>Profile</NavLink></li>}
				{user && user._id && <li onClick={handleLogout}><NavLink to="/logout" className={isActive}>Logout</NavLink></li>}
			</ul>
		</nav>
	)
}

export default Navbar
