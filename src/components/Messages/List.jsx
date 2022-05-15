import React from 'react'
import ListItem from './ListItem';
import useMessageList from '../../hooks/useMessageList';

import "../../styles/Messages/list.scss";

const List = () => {
  const [list, error] = useMessageList();

  return (
    <div className='list-wrapper'>
      {error && <>{error}</>}
      {list.map( item => <ListItem key={item._id} item={item} />)}    
    </div>
  )
}

export default List