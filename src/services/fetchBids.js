import axios from "axios";

const fetchBids = async(pageNumber, pageSize, productId) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/bid`,{pageNumber, pageSize, productId},{headers:{"auth-token":localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default fetchBids;