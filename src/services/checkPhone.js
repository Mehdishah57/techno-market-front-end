import axios from "axios";

const checkPhone = async(phoneNumber) => {
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/checkPhone`,{phoneNumber});
        return { error: null }
    } catch (error) {
        return { error }
    }
}

export default checkPhone;