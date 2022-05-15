import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../global/UserContext";
import updateName from "../services/updateName";

const useNameUpdate = (toast) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const changeName = useRef(null);
    changeName.current = async () => {
        setLoading(true);
        const [data, error] = await updateName(name);
        if (error) {
            setError(error.response.data);
            setName(user.name);
            return setLoading(false);
        }
        toast.success(data);
        setUser({ ...user, name })
        setLoading(false);
    }

    useEffect(() => {
        if (user.name)
            setName(user.name)
    }, [user.name])

    return [name, setName, changeName.current, loading, error, user.name]
}

export default useNameUpdate;