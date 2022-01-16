import React from 'react';
import loader from "../assets/loader.gif"

const Loader = ({ height, width }) => {
    return (
        <div style={{height, width}}>
            <img src={loader} width="100%" height="100%" alt="" />
        </div>
    )
}

export default Loader;