import React, { useState } from 'react';

const TextArea = ({ state, setState, placeholder, value }) => {
	const [description, setDescription] = useState("");
	return (
		<div className='text-wrapper'>
			<textarea 
				placeholder={placeholder} 
				value={description}
				onBlur={() => setState({ ...state, description: description })}
				onChange={e => setDescription(e.currentTarget.value)}>
			</textarea>
		</div>
	)
}

export default TextArea