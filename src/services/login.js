import axios from "axios";

const login = async (email, password) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/login`, { email, password })
        return { data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

export default login;