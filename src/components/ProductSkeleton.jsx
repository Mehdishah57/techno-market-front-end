import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ProductSkeleton = () => {
  return (
    <Box>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton width={210} height={20} />
        <Skeleton width={70} height={20} />
    </Box>
  )
}

export default ProductSkeleton