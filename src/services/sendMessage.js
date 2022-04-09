import axios from "axios";

const sendMessage = async(id, message) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/message/add`
        ,{message, to:id},{headers: {"auth-token":localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default sendMessage;