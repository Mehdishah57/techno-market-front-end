import React, {useState} from 'react';

const TextArea = ({ placeholder, onChange, error }) => {
	const [value, setValue] = useState("");
	return (
		<div className='text-wrapper'>
			<textarea 
				className={error?"textarea-error":""}
				placeholder={placeholder} 
				value={value}
				onChange={e => setValue(e.target.value)}
				onBlur={()=>onChange(value)}>
			</textarea>
		</div>
	)
}

export default TextArea