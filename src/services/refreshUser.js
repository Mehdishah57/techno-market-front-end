import axios from "axios";

const refreshUser = async (token) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/`,{headers: {"auth-token": token}})
        return [data, null]
    } catch (error) {
        return [error, null]
    }
}

export default refreshUser;