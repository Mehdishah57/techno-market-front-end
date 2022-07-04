import axios from "axios";

const changePhone = async({countryCode, phoneNumber}) => {
    try {
        const token = localStorage.getItem("fyptoken")
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/updatePhone`,
        {countryCode, phoneNumber},
        {headers: {"auth-token": token}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default changePhone;