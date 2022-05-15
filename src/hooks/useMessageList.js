import { useState, useEffect, useRef } from 'react';
import getLists from '../services/getLists';

const useMessageList = () => {
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const fetchLists = useRef(null);

    fetchLists.current = async () => {
        const [data, error] = await getLists();
        if (error) return setError(error.response?.data);
        setList(data);
    }

    useEffect(() => {
        fetchLists.current();
    }, [])

    return [list, error]
}

export default useMessageList;