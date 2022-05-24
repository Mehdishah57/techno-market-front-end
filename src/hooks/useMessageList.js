import { useState, useEffect, useRef } from 'react';
import getLists from '../services/getLists';

const useMessageList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchLists = useRef(null);

    fetchLists.current = async () => {
        setLoading(true);
        const [data, error] = await getLists();
        if (error) setError(error.response?.data);
        else setList(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchLists.current();
    }, [])

    return [list, error, loading]
}

export default useMessageList;