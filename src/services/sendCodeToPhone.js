import axios from "axios";

const sendCodeToPhone = async(method,phoneNumber,countryCode, email) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/forgotPassword`,{method,phoneNumber,countryCode,email})
        return { data, error:null}
    } catch (error) {
        return { data:null, error }
    }
}

export default sendCodeToPhone;