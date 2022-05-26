import axios from "axios";

const updateProduct = async(body) => {
    try {
        const {data} = await axios.patch(`${process.env.REACT_APP_BACKEND}/api/product`,body,{headers:{"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default updateProduct;