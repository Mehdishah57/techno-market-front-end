import React, { createContext, useState, useEffect, useRef } from "react";
import getBidData from "../services/getBidData";

export const BidContext = createContext(null);

const BidProvider = ({children}) => {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchBids = useRef(null);

    fetchBids.current = async() => {
        setLoading(true)
        const [data] = await getBidData();
        setBids(data);
        setLoading(false)
    }

    useEffect(()=>{
        fetchBids.current();
    },[])

    return <BidContext.Provider value={[bids, setBids, loading]}>
        {children}
    </BidContext.Provider>
}

export default BidProvider;