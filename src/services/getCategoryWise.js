import axios from "axios";

const getCategoryWise = async(category) => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND}/api/product/categoryWise/${category}`);
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getCategoryWise;