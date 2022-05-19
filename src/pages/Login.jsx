import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";
import login from '../services/login';
import { UserContext } from './../global/UserContext';
import { loginSchema } from '../schemas/login';
import { Toaster, toast } from "react-hot-toast";
import logo from "../assets/logo.png";
import "../styles/login.scss";


const Login = () => {
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [, setUser] = useContext(UserContext);

	const navigate = useNavigate();

	const showError = error => {
		toast.error(error.response?.data || error.message);
		setError(error?.response?.data || error?.message);
		setLoading(false);
	}

	const handleLogin = async e => {
		e.preventDefault();
		if (error) return toast.error(error)
		try {
			setLoading(true);
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
			<Toaster />
			<div className="sub-wrapper">
				<div className="form">
					<form onSubmit={handleLogin}>
						<div className="heading">
							<h1>Sign In</h1>
						</div>
						<div className='field-wrapper'>
							<TextField
								size="medium"
								className="f0011"
								id="outlined-basic"
								margin="dense"
								label="Email"
								disabled={loading}
								variant="outlined"
								fullWidth
								onChange={e => { setEmail(e.currentTarget.value); setError("") }}
							/>
						</div>
						<div className='field-wrapper'>
							<TextField
								size="medium"
								className="f0011"
								id="outlined-basic"
								label="Password"
								disabled={loading}
								variant="outlined"
								type="password"
								fullWidth
								onChange={e => { setPassword(e.currentTarget.value); setError("") }}
							/>
						</div>
						<div className="button-wrapper">
							<Button
								className="b0011"
								variant="contained"
								type="submit"
								disabled={loading}
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
