import axios from "axios";

const signup = async(payload) => {
    try {
        console.log(payload)
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/signup`,{...payload});
        return {data, error:null}
    } catch (error) {
        return {data: null, error}
    }
}

export default signup;