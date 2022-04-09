import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import verify from "../services/verify";
import sendCode from "../services/sendCode";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "../styles/verify.scss";

const Verify = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const [data, error] = await verify(code);
    if (!data) {
      setError(error.response?.data)
      toast.error(error.response?.data);
      setLoading(false);
      return
    }
    localStorage.setItem("fyptoken", data);
    navigate("/profile", { replace: true });
  };

  const handleResend = async () => {
    setLoading(true);
    const [data, error] = await sendCode();
    if (!error) toast.success(`${data}`);
    if (!data) {
      setError(error);
      toast.error(error)
    }
    setLoading(false);
  };

  return (
    <div className="verify-wrapper">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="text-field-wrapper">
          <TextField
            size="medium"
            className="f0011"
            id="outlined-basic"
            margin="dense"
            label="Code"
            disabled={loading}
            autoComplete="off"
            variant="outlined"
            onChange={(e) => {
              setCode(e.currentTarget.value);
              setError("");
            }}
          />
        </div>
        <div className="notice">Note: Your account will be deleted after 10 wrong attempts!</div>
        <div className="button-wrapper">
          <Button
            className="b0011"
            variant="contained"
            color={error ? "error" : "info"}
            type="submit"
            disabled={loading}
          >
            Verify
          </Button>
          <Button
            className="b0011"
            variant="contained"
            color={error ? "error" : "warning"}
            disabled={loading}
            onClick={handleResend}
          >
            Resend Code
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
