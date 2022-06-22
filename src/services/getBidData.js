import axios from "axios";

const getBidData = async() => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND}/api/bid/userBids`,{headers: {"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export default getBidData;