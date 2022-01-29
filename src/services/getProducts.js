import axios from "axios";

const getProducts = async({...rest}) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/product/`,{...rest})
        return { data, error:null }
    } catch (error) {
        return { error, data:null }
    }
}

export default getProducts;