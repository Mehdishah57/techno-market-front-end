import axios from "axios";

const getLists = async() => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND}/api/message/getList`
        ,{headers:{"auth-token":localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getLists;