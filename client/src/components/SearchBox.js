import React from 'react';

const SearchBox = ({searchChange, searchfield, className}) => {
	return (
		<div className='search-container'>
			<input type='search' className={className} onChange={searchChange} value={searchfield} placeholder='Search...'/>
		</div>
	);
}

export default SearchBox;
