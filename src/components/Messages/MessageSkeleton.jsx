import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const MessageSkeleton = () => {
  return (
    <Box
    display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        maxWidth="500px"
        gap="10px"
        padding="10px"
        borderRadius="5px"
        className="message-skeleton"
    >
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton width={150} height={20} />
        <Skeleton width={70} height={20} />
    </Box>
  )
}

export default MessageSkeleton