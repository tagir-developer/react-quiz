import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
	return !valid && touched && shouldValidate
}

const Input = props => {
	const inputType = props.type || "text"
	const cls = [classes.Input]
	const htmlFor = `${inputType}-${Math.random()}`

	if (isInvalid(props)) {
		cls.push(classes.invalid)
	}

	return (
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				type={inputType}	
				onChange={props.onChange}
				id={htmlFor}
				value={props.value}
			/>
			
			{ isInvalid(props) 
			? <span>{props.errorMessage || "Введите валидное значение"}</span> 
			: null }
		</div>
	)
}

export default Input