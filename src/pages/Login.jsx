import React, { useRef } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";

import "../styles/login.scss";

import login from '../services/login';

const Login = () => {
	let { current: email } = useRef("");
	let { current: password } = useRef("");

	const navigate = useNavigate();

	const handleLogin = async e => {
		e.preventDefault();
		const { data, error } = await login(email,password);
		if(error) return console.log(error);
		localStorage.setItem("fyptoken",data);
		navigate("/home", { replace: true });
	}

	return (
		<div className="login-wrapper">
			<Navbar />
			<div className="sub-wrapper">
			<div className="text">
				<div>
					<h1>Welcome to</h1>
					<h1>Techno Market Place</h1>
					<p>"Shop Well Save Well"</p>
				</div>
			</div>
			<div className="form">
				<form onSubmit={handleLogin}>
					<div>
						<TextField
							className="f0011"
							id="outlined-basic"
							label="Email"
							variant="outlined"
							onChange={ e => email = e.currentTarget.value }
						/>
					</div>
					<div>
						<TextField 
							className="f0011" 
							id="outlined-basic" 
							label="Password" 
							variant="outlined"
							type="password"
							onChange={ e => password = e.currentTarget.value } 
						/>
					</div>
					<div className="button-wrapper">
						<Button 
							className="b0011" 
							variant="outlined"
							type="submit"
						>
							Sign In
						</Button>
					</div>
					<div className="link-wrapper">
						<Link to="/signup">Don't have an account? Create one</Link>
						<Link to="#">Forgot your password? Click here</Link>
					</div>
				</form>
			</div>
			</div>
		</div>
	)
}

export default Login
