import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

const ProductImage = ({handleClick, product}) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div onClick={handleClick} className="image">
            <img width="100%"
                src={product.picture?.image1?.url}
                alt={product.title}
                style={{ opacity: loaded ? 1 : 0 }}
                onLoad={() => setLoaded(true)}
            />
            {!loaded && <Skeleton sx={{ position: 'absolute' }} variant="rectangular" width={400} height={200} />}
        </div>
    )
}

export default ProductImage;