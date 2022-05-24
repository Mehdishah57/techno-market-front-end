import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import MessageSkeleton from "./MessageSkeleton";

const MessageSkeletonList = ({number}) => {
    const [times, setTimes] = useState([]);

    const getTimes = useRef(null);
    getTimes.current = () => {
      let temp = [];
      for (let i = 0; i < number; i++) temp.push(i);
      setTimes(temp);
    };
  
    useEffect(() => {
      getTimes.current();
    }, []);
  
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="20px"
        width="100%"
      >
        {times.map(() => (
          <MessageSkeleton />
        ))}
      </Box>
    );
}

export default MessageSkeletonList