import axios from "axios";

const fetchProductyById = async(id) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/api/product/${id}`)
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default fetchProductyById;