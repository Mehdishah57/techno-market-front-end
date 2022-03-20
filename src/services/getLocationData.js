import axios from "axios";

const getLocationData = async() => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/api/location`);
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getLocationData;