import axios from "axios";

const deleteAd = async(id) => {
    try {
        const { data } = await axios.delete(
            `${process.env.REACT_APP_BACKEND}/api/product/${id}`
            ,{headers: {"auth-token":localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error];
    }
}

export default deleteAd;