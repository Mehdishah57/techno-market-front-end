import axios from "axios";

const sendCodeToEmail = async(method, email) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/forgotPassword`,{method,email});
        return { data, error:null }
    } catch (error) {
        return {error, data:null}
    }
}

export default sendCodeToEmail;