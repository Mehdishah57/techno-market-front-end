import axios from "axios";

const addProduct = async(payload) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND}/api/product/add`
            ,payload,{headers: {"auth-token": localStorage.getItem("fyptoken")}});
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export default addProduct;