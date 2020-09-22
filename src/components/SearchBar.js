import React, {useState, useCallback} from 'react';
import _ from "lodash";



export default function SearchBar({handleSearch}) {
	const delayedQuery = useCallback(_.debounce(q => sendQuery(q), 1000), []);
	const placesURL = 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key={API_Key}&input={input}';
	const [searchKey, setSearchKey] = useState('');

	function sendQuery(query){
		console.log(`Querying for ${query}`);
		
	}

	function onChange(e){
		delayedQuery(e.target.value);
		setSearchKey(e.target.value);
	}

	function handleOnClick(){
		handleSearch(searchKey);
	}


	return (
		<nav>
			<div className='nav-content'>
				<h1 id='title'>Weather App</h1>
			</div>
			<div className='nav-content search-bar'>
				<input type='text' size='30' onKeyPress={e=>{if(e.key=='Enter')handleOnClick();}} onChange={e => onChange(e)}/>
				<button type="button" onClick={handleOnClick}>Search</button>
			</div>
			<div className='nav-content nav-placeholder'>

			</div>
			
		</nav>
	)
}
