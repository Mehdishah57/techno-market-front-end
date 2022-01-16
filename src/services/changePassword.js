import axios from "axios";

const changePassword = async(verificationCode, password,email) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/changePassword`,{verificationCode, password,email})
        return {data, error:null}
    } catch (error) {
        return { error, data:null }
    }
}

export default changePassword;