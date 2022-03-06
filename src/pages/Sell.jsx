import React, { useContext } from 'react';
import { UserContext } from './../global/UserContext';


const Sell = () => {
	const [user] = useContext(UserContext);
	return (
		<div>Sell</div>
	)
}

export default Sell