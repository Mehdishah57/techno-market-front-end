import React from 'react';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import { Toaster, toast } from "react-hot-toast";
import useNameUpdate from '../../hooks/useNameUpdate';

import "../../styles/Profile/namesection.scss";

const NameSection = () => {
	const [name, setName, changeName, loading, error, userName] = useNameUpdate(toast);

	return (
		<div className='user-name-input-wrapper'>
			<Toaster />
			<input type="text" value={name} onChange={e => setName(e.currentTarget.value)} />
			{name !== userName && <Button
				onClick={changeName}
				variant='contained'
				disabled={loading}
				color={error ? "error": "info"}>
				<DoneIcon />
			</Button>}
		</div>
	)
}

export default NameSection;