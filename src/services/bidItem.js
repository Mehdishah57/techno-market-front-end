import axios from "axios";

const bidItem = async(price,productId) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/bid`,
            {price,productId},
            {headers:{"auth-token": localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error];
    }
}

export default bidItem;