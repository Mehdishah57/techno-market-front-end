import React, { useState, useRef, useLayoutEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import getUser from './../services/getUser';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Loader from './../components/Loader';
import sendCodeToEmail from './../services/sendCodeToEmail';
import checkPhone from './../services/checkPhone';
import sendCodeToPhone from './../services/sendCodeToPhone';
import changePassword from './../services/changePassword';

import "../styles/forgotpassword.scss";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [code, setCode] = useState("");
	// const [user, setUser] = useState({});
	const [method, setMethod] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const formOne = useRef();
	const formTwo = useRef();
	const formThree = useRef();
	const formFour = useRef();

	useLayoutEffect(() => {
		formOne.current.style.transform = "translate(0%)"
		formTwo.current.style.transform = "translate(200%)"
		formThree.current.style.transform = "translate(200%)"
		formFour.current.style.transform = "translate(200%)"
	}, [])

	const handleFormOne = async (e) => {
		e.preventDefault();
		setLoading(true)
		if (!email) {
			setError("Please provide a valid email")
			return setLoading(false);
		}
		const { error } = await getUser(email);
		if (error) {
			setError(error.response.data)
			return setLoading(false);
		}
		// setUser(data)
		setLoading(false);
		formOne.current.style.transform = "translate(-200%)"
		formTwo.current.style.transform = "translate(0%)"
	}

	const handleFormTwo = async (e) => {
		e.preventDefault();
		if (!method) return;
		formTwo.current.style.transform = "translate(-200%)"
		if (method !== "email") return formFour.current.style.transform = "translate(0%)"
		await sendCodeToEmail(method, email);
		formThree.current.style.transform = "translate(0%)"
	}

	const handleFormThree = async (e) => {
		e.preventDefault();
		if(!verificationCode || !password || !confirmPassword)
			return setError("Please enter necessary information");
		if(password !== confirmPassword)
			return setError("Passwords do not match")
		const { error } = await changePassword(verificationCode,password,email);
		if(error && error.response?.data?.length < 50) return setError(error.response.data)
		else if(error) return setError("There was an error changing your password")
		setSuccess("Password successfully changed!")
	}

	const handleFormFour = async (e) => {
		e.preventDefault();
		if(!phone || !code) return setError("Please fill valid information!")
		else if(code && code[0]==="+") return setError("Country Code must not have \"+\" symbol!")
		const { error: phoneMisMatch } = await checkPhone(phone);
		if(phoneMisMatch) return setError(phoneMisMatch.response.data);
		const { error } = await sendCodeToPhone(method, phone, code, email);
		if(error) return setError(error.response.data);
		formThree.current.style.transform = "translate(0%)"
		formFour.current.style.transform = "translate(-200%)"
	}

	return (
		<div className="forgot-password-wrapper">
			<div className="form-wrapper">
				<form ref={formOne} onSubmit={handleFormOne}>
					<h1>No Worries, we've got you covered!</h1>
					<div className="field-wrapper">
						<TextField
							size="medium"
							id="outlined-basic"
							label="Email"
							variant="outlined"
							type="email"
							fullWidth={true}
							onChange={e => { setEmail(e.currentTarget.value); setError("") }}
						/>
					</div>
					{error && <div className="error">{error}</div>}
					<div className="button-wrapper">
						<Button
							className="b0011"
							variant="outlined"
							type="submit"
							disabled={loading}
						>
							Search {loading && <Loader height={28} width={28} />}
						</Button>
					</div>
				</form>
				<form ref={formTwo} onSubmit={handleFormTwo}>
					<h1>No Worries, we've got you covered!</h1>
					<FormControl component="fieldset">
						<RadioGroup
							aria-label="gender"
							value={method}
							onChange={(e) => setMethod(e.currentTarget.value)}
							name="radio-buttons-group"
						>
							<FormControlLabel value="email" control={<Radio />} label="Send Code to Email" />
							<FormControlLabel value="phoneNumber" control={<Radio />} label="Send Code to Phone Number" />
						</RadioGroup>
					</FormControl>
					{error && <div className="error">{error}</div>}
					<div className="button-wrapper">
						<Button
							className="b0011"
							variant="text"
							onClick={() => {
								formTwo.current.style.transform = "translate(200%)"
								formOne.current.style.transform = "translate(0%)"
							}}
						>
							Back
						</Button>
						<Button
							className="b0011"
							variant="outlined"
							type="submit"
							disabled={loading}
						>
							Next
						</Button>
					</div>
				</form>
				<form ref={formThree} onSubmit={handleFormThree}>
					<h1>No Worries, we've got you covered!</h1>
					<div className="field-wrapper">
						<TextField
							size="medium"
							id="outlined-basic"
							label="Verification Code"
							variant="outlined"
							autoComplete='off'
							type="text"
							fullWidth={true}
							onChange={e => { setVerificationCode(e.currentTarget.value); setError("") }}
						/>
					</div>
					<div className="field-wrapper">
						<TextField
							size="medium"
							id="outlined-basic"
							label="New Password"
							variant="outlined"
							type="password"
							fullWidth={true}
							onChange={e => { setPassword(e.currentTarget.value); setError("") }}
						/>
					</div>
					<div className="field-wrapper">
						<TextField
							size="medium"
							id="outlined-basic"
							label="Confirm New Password"
							variant="outlined"
							type="password"
							fullWidth={true}
							onChange={e => { setConfirmPassword(e.currentTarget.value); setError("") }}
						/>
					</div>
					{error && <div className="error">{error}</div>}
					{success && <div className="success">{success}</div>}
					<div className="button-wrapper">
						<Button
							className="b0011"
							variant="text"
							onClick={() => {
								formThree.current.style.transform = "translate(200%)"
								formTwo.current.style.transform = "translate(0%)"
							}}
						>
							Back
						</Button>
						<Button
							className="b0011"
							variant="outlined"
							type="submit"
							disabled={loading}
						>
							Submit
						</Button>
					</div>
				</form>
				<form ref={formFour} onSubmit={handleFormFour}>
					<h1>No Worries, we've got you covered!</h1>
					<div style={{ display: 'flex', gap: 10, flexDirection: 'row', width: "100%" }} className="field-wrapper">
						<div style={{ width: "20%" }}>
							<TextField
								size="medium"
								id="outlined-basic"
								label="+44"
								variant="outlined"
								type="text"
								autoComplete='off'
								fullWidth={true}
								onChange={e => { setCode(e.currentTarget.value); setError("") }}
							/>
						</div>
						<div style={{ width: "80%" }}>
							<TextField
								size="medium"
								id="outlined-basic"
								label="(123)-(456)-(789)"
								variant="outlined"
								type="text"
								autoComplete='off'
								fullWidth={true}
								onChange={e => { setPhone(e.currentTarget.value); setError("") }}
							/>
						</div>
					</div>
					<h5>Enter your Country Code (without '+') & Phone Number</h5>
					{error && <div className="error">{error}</div>}
					<div className="button-wrapper">
						<Button
							className="b0011"
							variant="text"
							onClick={() => {
								formFour.current.style.transform = "translate(200%)"
								formTwo.current.style.transform = "translate(0%)"
							}}
						>
							Back
						</Button>
						<Button
							className="b0011"
							variant="outlined"
							type="submit"
							disabled={loading}
						>
							Send
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword;
