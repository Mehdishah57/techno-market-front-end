import axios from "axios";

const getChat = async(id) => {
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND}/api/message/get`
        ,{id},{headers:{"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getChat;