import React, { useState, useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import login from '../services/login';
import { UserContext } from './../global/UserContext';
import { loginSchema } from '../schemas/login';
import { Formik } from 'formik';
import "../styles/login.scss";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [, setUser] = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (!error) return;
		const id = setTimeout(() => setError(""), 4000);

		return () => clearTimeout(id)
	}, [error])

	const handleSubmit = async values => {
		setLoading(true);
		const { data, error } = await login(values);
		if (error) {
			setError(error.response?.data);
			setLoading(false);
			return;
		}
		localStorage.setItem("fyptoken", data.token);
		setUser(data.user);
		// window.location = "/home";
		navigate("/home", { replace: true });
	}

	return (
		<div className='login-wrapper'>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={handleSubmit}
				validationSchema={loginSchema}
			>
				{({ handleChange, handleSubmit, errors }) => <div className='form'>
					<div className="heading">
						<h1>Sign In</h1>
					</div>
					<div className="field-wrapper">
						<TextField
							size="medium"
							className="f0011"
							id="outlined-basic"
							margin="dense"
							label="Email"
							disabled={loading}
							error={errors.email}
							helperText={errors.email}
							variant="outlined"
							fullWidth
							onChange={handleChange('email')}
						/>
					</div>
					<div className='field-wrapper'>
						<TextField
							size="medium"
							className="f0011"
							id="outlined-basic"
							label="Password"
							disabled={loading}
							error={errors.password}
							helperText={errors.password}
							variant="outlined"
							type="password"
							fullWidth
							onChange={handleChange("password")}
						/>
					</div>
					{error ? <div className='login-error'>{error}</div> : null}
					<div className="button-wrapper">
						<Button
							className="b0011"
							variant="contained"
							disabled={loading}
							onClick={handleSubmit}
						>
							Sign In
						</Button>
					</div>
					<div className="link-wrapper">
						<Link to="/signup">Don't have an account? Create one</Link>
						<Link to="/forgotpassword">Forgot your password? Click here</Link>
					</div>
				</div>}
			</Formik>
		</div>
	)
}

// const Login = () => {
// 	const [error, setError] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const [user, setUser] = useContext(UserContext);

// 	const navigate = useNavigate();

// 	const showError = error => {
// 		toast.error(error.response?.data || error.message);
// 		setError(error?.response?.data || error?.message);
// 		setLoading(false);
// 	}

// 	const handleLogin = async e => {
// 		e.preventDefault();
// 		if (error) return toast.error(error)
// 		try {
// 			setLoading(true);
// 			await loginSchema.validate({ email, password });
// 			const { data, error } = await login(email, password);
// 			if (error) return showError(error);
// localStorage.setItem("fyptoken", data.token);
// setUser(data.user);
// window.location = "/home";
// // navigate("/home", { replace: true });
// 		} catch (error) {
// 			error.name === "ValidationError" && (error.validationError = true)
// 			showError(error)
// 		}
// 	}

// 	return (
// 		<div className="login-wrapper">
// 			<Toaster />
// 			<div className="sub-wrapper">
// 				<div className="form">
// 					<form onSubmit={handleLogin}>
// 						<div className="heading">
// 							<h1>Sign In</h1>
// 						</div>
// 						<div className='field-wrapper'>
// 							<TextField
// 								size="medium"
// 								className="f0011"
// 								id="outlined-basic"
// 								margin="dense"
// 								label="Email"
// 								disabled={loading}
// 								variant="outlined"
// 								fullWidth
// 								onChange={e => { setEmail(e.currentTarget.value); setError("") }}
// 							/>
// 						</div>
// <div className='field-wrapper'>
// 	<TextField
// 		size="medium"
// 		className="f0011"
// 		id="outlined-basic"
// 		label="Password"
// 		disabled={loading}
// 		variant="outlined"
// 		type="password"
// 		fullWidth
// 		onChange={e => { setPassword(e.currentTarget.value); setError("") }}
// 	/>
// </div>
// <div className="button-wrapper">
// 	<Button
// 		className="b0011"
// 		variant="contained"
// 		type="submit"
// 		disabled={loading}
// 		onClick={handleLogin}
// 	>
// 		Sign In
// 	</Button>
// </div>
// <div className="link-wrapper">
// 	<Link to="/signup">Don't have an account? Create one</Link>
// 	<Link to="/forgotpassword">Forgot your password? Click here</Link>
// </div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

export default Login
