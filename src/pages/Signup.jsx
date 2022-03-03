import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signup from './../services/signup';
import { signupSchema } from "../schemas/signup";

import "../styles/signup.scss";
import { UserContext } from './../global/UserContext';

const Signup = () => {
    const [state, setState] = useState({
        name:"",email:"",password:"",confirmPassword:"",countryCode:"",phoneNumber:""
    });
    const [displayError, setDisplayError] = useState("");
    const [loading, setLoading] = useState(false);

    const [setUser] = useContext(UserContext);

    const navigate = useNavigate();

    const showError = (error,message) => {
        if(message) setDisplayError(message);
        if(error && error.response) setDisplayError(error.response.data);
    }

    const handleChange = (e) => {
        setState({...state, [e.currentTarget.name]:e.currentTarget.value});
        setDisplayError("");
        if(e.currentTarget.name === "countryCode" && e.currentTarget.value.indexOf("+") !== -1)
            setDisplayError("Country Code shouldn't have \"+\" symbol")
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const {name,email,password,confirmPassword,countryCode,phoneNumber} = state;
        if(password !== confirmPassword) return showError(null,"Passwords do not match")
        try{
            await signupSchema.validate({name,email,password,countryCode,phoneNumber});
            const {data, error} = await signup({name,email,password,countryCode,phoneNumber});
            if(error) return showError(error);
            localStorage.setItem("fyptoken",data.token);
            setUser(data.user)
            navigate("/verify");
        }catch(error){
            error && error.name === "ValidationError" && setDisplayError(error.message)
            setLoading(false);
        }
    }

    return (
        <div className="signup-wrapper">
            
            <div className="sub-wrapper">
                <div className="text">
                    <div>
						<h1>Welcome to</h1>
						<h1>Techno Market Place</h1>
						<p>"Shop Well Save Well"</p>
					</div>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                size="medium"
								className="f0011"
                                margin="dense"
								id="outlined-basic"
								label="Name"
                                name="name"
                                type="text"
								variant="outlined"
								onChange={handleChange}
							/>
                        </div>
                        <div>
                            <TextField
                                size="medium"
								className="f0011"
								id="outlined-basic"
								label="Email"
                                name="email"
								variant="outlined"
								onChange={handleChange}
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
								variant="outlined"
								onChange={handleChange}
							/>
                        </div>
                        <div>
                            <TextField
                                size="medium"
								className="f0011"
								id="outlined-basic"
								label="Confirm Password"
                                name="confirmPassword"
								variant="outlined"
                                type="password"
								onChange={handleChange}
							/>
                        </div>
                        <div style={{flexDirection:"row"}}>
                            <input 
                                className="country-code-input"
                                type="text" 
                                placeholder="+44"
                                name="countryCode"
                                onChange={handleChange}
                            />
                            <input
                                className="phone-number-input" 
                                type="text"
                                placeholder="Your Phone Number" 
                                name="phoneNumber"
                                onChange={handleChange}
                            />
                        </div>
                        {displayError && <div className="signup-error">{displayError}</div>}
                        <div className="button-wrapper">
							<Button
								className="b0011"
								variant="contained"
                                color={displayError?"error":"inherit"}
                                disabled={loading}
								type="submit"
							>
								Sign Up
							</Button>
						</div>
						<div className="link-wrapper">
							<Link to="/login">Already have an account? Sign In</Link>
							<Link to="#">Forgot your password? Click here</Link>
						</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
