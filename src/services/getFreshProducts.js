import axios from "axios";

const getFreshProducts = async(pageNumber, pageSize) => {
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND}/api/product/freshProducts`
        ,{pageSize, pageNumber});
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getFreshProducts;