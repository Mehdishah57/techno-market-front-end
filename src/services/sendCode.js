import axios from "axios";

const sendCode = async() => {
    try{
        const {data} = await axios.get(
            `${process.env.REACT_APP_BACKEND}/api/user/sendCode`,{headers: {"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null]
    }catch(error){
        return [null, error]
    }
}

export default sendCode;