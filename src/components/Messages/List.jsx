import React from 'react'
import ListItem from './ListItem';
import useMessageList from '../../hooks/useMessageList';
import MessageSkeletonList from "./MessageSkeletonList";

import "../../styles/Messages/list.scss";

const List = () => {
  const [list, error, loading] = useMessageList();

  return (
    <div className='list-wrapper'>
      {error && <>{error}</>}
      {loading && <MessageSkeletonList number={3} />}
      {!loading && list.map( item => <ListItem key={item._id} item={item} />)}    
    </div>
  )
}

export default List