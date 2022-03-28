import axios from "axios";

const getMyAd = async(id) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/api/product/${id}`,{headers:{"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getMyAd;