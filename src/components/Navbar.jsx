import React, { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from './../global/UserContext';

import "../styles/nav.scss";

const Navbar = () => {
	const { state, setState } = useContext(UserContext);
	const isActive = navProps => navProps.isActive ? "link-active" : "link-asleep";

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("fyptoken");
		setState({});
		navigate("/home", { replace: true })
	}

	return (
		<nav className="nav-wrapper">
			<ul>
				<li>
					<NavLink to="/home" className={isActive}>Home</NavLink>
				</li>
				{state && !state.user && <li><NavLink to="/login" className={isActive}>Sign In</NavLink></li>}
				{state && !state.user && <li><NavLink to="/signup" className={isActive}>Sign Up</NavLink></li>}
				{state && state.user && <li><NavLink to="/sell" className={isActive}>Sell</NavLink></li>}
				{state && state.user && <li><NavLink to="/messages" className={isActive}>Messages</NavLink></li>}
				{state && state.user && <li><NavLink to="/profile" className={isActive}>Profile</NavLink></li>}
				{state && state.user && <li onClick={handleLogout}><NavLink to="/logout" className={isActive}>Logout</NavLink></li>}
			</ul>
		</nav>
	)
}

export default Navbar
