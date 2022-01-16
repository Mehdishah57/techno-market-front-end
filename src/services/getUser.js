import axios from "axios";

const getUser = async (email) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/getByEmail`,{email});
        return { data, error:null }
    } catch (error) {
        return { data:null, error }        
    }
} 

export default getUser;