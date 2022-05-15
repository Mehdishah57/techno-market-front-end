import axios from "axios";

const updateName = async(name) => {
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/changeName`
        ,{name},{headers: {"auth-token":localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default updateName;