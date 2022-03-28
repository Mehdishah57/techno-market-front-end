import axios from "axios";

const activation = async(id) => {
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND}/api/product/status`
            ,{id},{headers:{"auth-token":localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default activation;