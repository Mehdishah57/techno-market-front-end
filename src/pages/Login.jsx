import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";
import login from '../services/login';
import { UserContext } from './../global/UserContext';
import { loginSchema } from '../schemas/login';

import "../styles/login.scss";


const Login = () => {
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [user, setUser] = useContext(UserContext);

	const navigate = useNavigate();

	const showError = error => {
		if (error && error.response) return setError(error.response.data);
		else if (error && error.validationError) return setError(error.message)
	}

	const handleLogin = async e => {
		e.preventDefault();
		try {
			await loginSchema.validate({ email, password });
			const { data, error } = await login(email, password);
			if (error) return showError(error);
			localStorage.setItem("fyptoken", data.token);
			setUser(data.user);
			navigate("/home", { replace: true });
		} catch (error) {
			error.name === "ValidationError" && (error.validationError = true)
			showError(error)
		}
	}

	return (
		<div className="login-wrapper">
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
								size="medium"
								className="f0011"
								id="outlined-basic"
								margin="dense"
								label="Email"
								variant="outlined"
								onChange={e => { setEmail(e.currentTarget.value); setError("") }}
							/>
						</div>
						<div>
							<TextField
								size="medium"
								className="f0011"
								id="outlined-basic"
								label="Password"
								variant="outlined"
								type="password"
								onChange={e => { setPassword(e.currentTarget.value); setError("") }}
							/>
						</div>
						{error && <div className="login-error">{error}</div>}
						<div className="button-wrapper">
							<Button
								className="b0011"
								variant="outlined"
								type="submit"
								onClick={handleLogin}
							>
								Sign In
							</Button>
						</div>
						<div className="link-wrapper">
							<Link to="/signup">Don't have an account? Create one</Link>
							<Link to="/forgotpassword">Forgot your password? Click here</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
