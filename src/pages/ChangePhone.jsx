import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import Box from "@mui/material/Box";
import { phoneSchema } from '../schemas/phone';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import changePhone from '../services/changePhone';
import { UserContext } from '../global/UserContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChangePhone = () => {
    const [loading, setLoading] = useState(false)
    const [, setUser] = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async values => {
        setLoading(true);
        const [data, error] = await changePhone(values);
        if (error) return setLoading(false);
        const { token, user } = data;
        localStorage.setItem("fyptoken", token);
        setUser(user)
        setLoading(false);
    }

    if (loading) return <Box display='flex'
        justifyContent="center"
        alignItems="center"
        width="100%">
        <CircularProgress size={50} />
    </Box>
    return (
        <Box
            display='flex'
            justifyContent="center"
            alignItems="center"
            width="100%"
            flexDirection="column"
        >
            <Box display='flex' justifyContent='center' alignItems='center' fontSize="18px" width="100%" textAlign="center" margin="10px" fontWeight='bold'>
                <ArrowBackIcon onClick={() => navigate(-1)} style={{ marginRight: 5, cursor: 'pointer' }}></ArrowBackIcon> Change Phone Number
            </Box>
            <Formik
                initialValues={{ countryCode: '', phoneNumber: '' }}
                onSubmit={handleSubmit}
                validationSchema={phoneSchema}
            >
                {({ handleSubmit, handleChange, errors, touched, setFieldTouched }) => <Box>
                    <TextField
                        label="Country Code"
                        variant='outlined'
                        error={touched.countryCode && errors.countryCode}
                        helperText={touched.countryCode && errors.countryCode}
                        onBlur={() => setFieldTouched("countryCode")}
                        onChange={handleChange("countryCode")}
                        style={{ margin: 5 }}
                        fullWidth
                    />
                    <TextField
                        label="Phone Number"
                        variant='outlined'
                        error={touched.phoneNumber && errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        onBlur={() => setFieldTouched("phoneNumber")}
                        onChange={handleChange("phoneNumber")}
                        style={{ margin: 5 }}
                        fullWidth
                    />
                    <Box display='flex' justifyContent="center" alignItems='center' margin='10px'>
                        <Button
                            variant='contained'
                            onClick={handleSubmit}
                            style={{ backgroundColor: 'black' }}
                        >Change Phone</Button>
                    </Box>
                </Box>}
            </Formik>
        </Box>
    )
}

export default ChangePhone;