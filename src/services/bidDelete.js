import axios from "axios";

const bidDelete = async({userId, productId}) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/bid/delete`,
        {userId, productId},
        {headers: {"auth-token": localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default bidDelete;