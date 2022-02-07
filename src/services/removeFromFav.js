import axios from "axios";

const removeFromFav = async(productId) => {
    try {
        const {data} = await axios.patch(
            `${process.env.REACT_APP_BACKEND}/api/product/removeFavourites`,{productId},{headers:{ "auth-token": localStorage.getItem("fyptoken") }})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default removeFromFav;