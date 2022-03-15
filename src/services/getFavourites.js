import axios from "axios";

const getFavourites = async(favourites) => {
    const { REACT_APP_BACKEND } = process.env;
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/product/getFavourites`,
        {favourites},
        {headers: {"auth-token": localStorage.getItem("fyptoken")}})
        return [data, null];
    } catch (error) {
        return [null, error]
    }
}

export default getFavourites;