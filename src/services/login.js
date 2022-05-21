import axios from "axios";

const login = async (values) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/login`, values)
        return { data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

export default login;