import React from 'react';

const Button = ({ buttonName, handleClick, className, buttonText, id }) => {
	return (
		<button type="button" id={id} className={className} name={buttonName} onClick={handleClick}>{buttonText}</button>
	);
}

export default Button;