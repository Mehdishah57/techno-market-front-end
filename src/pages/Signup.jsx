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
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [, setUser] = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(()=>{
		if(!error) return;
		const id = setTimeout(()=>setError(""),4000);

		return () => clearTimeout(id)
	},[error])

	const handleSubmit = async values => {
		setLoading(true);
		const {data, error} = await signup(values);
		if(error) {
			setError(error.response?.data);
			setLoading(false);
			return;
		}
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
							disabled={loading}
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
							disabled={loading}
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
							disabled={loading}
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
								disabled={loading}
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
								disabled={loading}
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
							disabled={loading}
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

export default Signup;
