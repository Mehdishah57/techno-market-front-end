import axios from "axios";

const verify = async(code) => {
    try{
        const {data} = await axios.post(
            `${process.env.REACT_APP_BACKEND}/api/user/verify`,{code},{headers: {"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null]
    }catch(error){
        return [null, error];
    }
}

export default verify;