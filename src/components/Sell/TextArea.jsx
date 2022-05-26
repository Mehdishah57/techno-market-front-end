import React, {useState, useEffect} from 'react';

const TextArea = ({ placeholder, onChange, error, update, value }) => {
	const [text, setText] = useState("");

	useEffect(()=>{
		if(!update || !value) return;
		setText(value)
	},[update, value])

	return (
		<div className='text-wrapper'>
			<textarea 
				className={error?"textarea-error":""}
				placeholder={placeholder} 
				value={text}
				onChange={e => setText(e.target.value)}
				onBlur={()=>onChange(text)}>
			</textarea>
		</div>
	)
}

export default TextArea