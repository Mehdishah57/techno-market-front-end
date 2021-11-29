import React from 'react';
import { NavLink } from "react-router-dom";

import "../styles/nav.scss";

const Navbar = () => {

	const isActive = navProps => navProps.isActive ? "link-active" : "link-asleep";

	return (
		<nav className="nav-wrapper">
			<ul>
				<li>
					<NavLink to="/home" className={isActive}>Home</NavLink>
				</li>
				<li>
					<NavLink to="/login" className={isActive}>Sign In</NavLink>
				</li>
				<li>
					<NavLink to="/signup" className={isActive}>Sign Up</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
