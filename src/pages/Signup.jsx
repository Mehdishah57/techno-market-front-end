import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signup from './../services/signup';
import { signupSchema } from "../schemas/signup";
import { UserContext } from './../global/UserContext';
import { Formik } from 'formik';

import "../styles/signup.scss";

const Signup = () => {
	const [error, setError] = useState("");
	const [, setUser] = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(()=>{
		if(!error) return;
		const id = setTimeout(()=>setError(""),4000);

		return () => clearTimeout(id)
	},[error])

	const handleSubmit = async values => {
		const {data, error} = await signup(values);
		if(error) return setError(error.response?.data);
		localStorage.setItem("fyptoken", data.token);
		setUser(data.user)
		navigate("/verify");
	}

	return (
		<div className='signup-wrapper'>
			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "",
					countryCode: "",
					phoneNumber: ""
				}}
				onSubmit={handleSubmit}
				validationSchema={signupSchema}
			>
				{({ handleSubmit, handleChange, errors }) => <div className='form'>
					<div className="heading">
						<h1>Create an account</h1>
					</div>
					<div>
						<TextField
							size="medium"
							className="f0011"
							margin="dense"
							id="outlined-basic"
							label="Name"
							name="name"
							error={errors.name}
							helperText={errors.name}
							type="text"
							variant="outlined"
							onChange={handleChange("name")}
						/>
					</div>
					<div>
						<TextField
							size="medium"
							className="f0011"
							id="outlined-basic"
							label="Email"
							name="email"
							error={errors.email}
							helperText={errors.email}
							variant="outlined"
							onChange={handleChange("email")}
						/>
					</div>
					<div>
						<TextField
							size="medium"
							className="f0011"
							id="outlined-basic"
							label="Password"
							name="password"
							type="password"
							error={errors.password}
							helperText={errors.password}
							variant="outlined"
							onChange={handleChange("password")}
						/>
					</div>
					<div style={{ display: 'flex', gap: 10, flexDirection: 'row', width: "100%" }} className="field-wrapper">
						<div style={{ width: "20%" }}>
							<TextField
								size="medium"
								id="outlined-basic"
								label="+92"
								variant="outlined"
								type="text"
								error={errors.countryCode}
								autoComplete='off'
								fullWidth={true}
								onChange={handleChange("countryCode")}
							/>
						</div>
						<div style={{ width: "80%" }}>
							<TextField
								size="medium"
								id="outlined-basic"
								label="Phone Number"
								variant="outlined"
								type="text"
								error={errors.phoneNumber}
								helperText={errors.phoneNumber}
								autoComplete='off'
								fullWidth={true}
								onChange={handleChange("phoneNumber")}
							/>
						</div>
					</div>
					{error? <div className='signup-error'>{error}</div>: null}
					<div className="button-wrapper">
						<Button
							className="b0011"
							variant="contained"
							onClick={handleSubmit}
						>
							Sign Up
						</Button>
					</div>
					<div className="link-wrapper">
						<Link to="/login">Already have an account? Sign In</Link>
						<Link to="/forgotpassword">Forgot your password? Click here</Link>
					</div>
				</div>}
			</Formik>
		</div>
	)
}

// const Signup = () => {
// 	const [state, setState] = useState({
// 		name: "", email: "", password: "", confirmPassword: "", countryCode: "", phoneNumber: ""
// 	});
// 	const [displayError, setDisplayError] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const [, setUser] = useContext(UserContext);

// 	const navigate = useNavigate();

// 	const showError = (error, message) => {
// 		if (message) setDisplayError(message);
// 		if (error && error.response) setDisplayError(error.response.data);
// 	}

// 	const handleChange = (e) => {
// 		setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
// 		setDisplayError("");
// 		if (e.currentTarget.name === "countryCode" && e.currentTarget.value.indexOf("+") !== -1)
// 			setDisplayError("Country Code shouldn't have \"+\" symbol")
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		const { name, email, password, confirmPassword, countryCode, phoneNumber } = state;
// 		if (password !== confirmPassword) return showError(null, "Passwords do not match")
// 		try {
// 			await signupSchema.validate({ name, email, password, countryCode, phoneNumber });
// 			const { data, error } = await signup({ name, email, password, countryCode, phoneNumber });
// 			if (error) return showError(error);
// 			localStorage.setItem("fyptoken", data.token);
// 			setUser(data.user)
// 			navigate("/verify");
// 		} catch (error) {
// 			error && error.name === "ValidationError" && setDisplayError(error.message)
// 			setLoading(false);
// 		}
// 	}

// 	return (
// 		<div className="signup-wrapper">
// 			<div className="sub-wrapper">
// 				<div className="form">
// 					<div className="heading">
// 						<h1>Create an account</h1>
// 					</div>
// 					<form onSubmit={handleSubmit}>
// <div>
// 	<TextField
// 		size="medium"
// 		className="f0011"
// 		margin="dense"
// 		id="outlined-basic"
// 		label="Name"
// 		name="name"
// 		type="text"
// 		variant="outlined"
// 		onChange={handleChange}
// 	/>
// </div>
// <div>
// 	<TextField
// 		size="medium"
// 		className="f0011"
// 		id="outlined-basic"
// 		label="Email"
// 		name="email"
// 		variant="outlined"
// 		onChange={handleChange}
// 	/>
// </div>
// <div>
// 	<TextField
// 		size="medium"
// 		className="f0011"
// 		id="outlined-basic"
// 		label="Password"
// 		name="password"
// 		type="password"
// 		variant="outlined"
// 		onChange={handleChange}
// 	/>
// </div>
// <div>
// 	<TextField
// 		size="medium"
// 		className="f0011"
// 		id="outlined-basic"
// 		label="Confirm Password"
// 		name="confirmPassword"
// 		variant="outlined"
// 		type="password"
// 		onChange={handleChange}
// 	/>
// </div>
// 						<div style={{ flexDirection: "row" }}>
// 							<input
// 								className="country-code-input"
// 								type="text"
// 								placeholder="+44"
// 								name="countryCode"
// 								onChange={handleChange}
// 							/>
// 							<input
// 								className="phone-number-input"
// 								type="text"
// 								placeholder="Your Phone Number"
// 								name="phoneNumber"
// 								onChange={handleChange}
// 							/>
// 						</div>
// 						{displayError && <div className="signup-error">{displayError}</div>}
// <div className="button-wrapper">
// 	<Button
// 		className="b0011"
// 		variant="contained"
// 		color={displayError ? "error" : "inherit"}
// 		disabled={loading}
// 		type="submit"
// 	>
// 		Sign Up
// 	</Button>
// </div>
// <div className="link-wrapper">
// 	<Link to="/login">Already have an account? Sign In</Link>
// 	<Link to="/forgotpassword">Forgot your password? Click here</Link>
// </div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

export default Signup;
