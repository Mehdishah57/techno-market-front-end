import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "../styles/login.scss";

const Login = () => {
	return (
		<div className="login-wrapper">
			<div className="text">
				<div>
					<h1>Welcome to</h1>
					<h1>Techno Market Place</h1>
					<p>"Shop Well Save Well"</p>
				</div>
			</div>
			<div className="form">
				<form>
					<div>
						<TextField
							className="f0011"
							id="outlined-basic"
							label="Email"
							variant="outlined"
						/>
					</div>
					<div>
						<TextField 
							className="f0011" 
							id="outlined-basic" 
							label="Password" 
							variant="outlined" 
						/>
					</div>
					<div className="button-wrapper">
						<Button 
							className="b0011" 
							variant="outlined"
						>
							Sign In
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
