import axios from "axios";

const getProducts = async(pageNumber) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/api/product/?pageNumber=${pageNumber}`)
        return { data, error:null }
    } catch (error) {
        return { error, data:null }
    }
}

export default getProducts;