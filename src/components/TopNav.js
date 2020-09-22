import React, {useState, useCallback} from 'react';

export default function TopNav({handleSearch, isCelsius, setIsCelsius}) {
	const [searchKey, setSearchKey] = useState('');

	function onChange(e){
		setSearchKey(e.target.value);
	}

	function handleOnSwitch(toggle){
		console.log(toggle);
		setIsCelsius(toggle);
	}

	function handleOnClick(){
		handleSearch(searchKey);
	}

	return (
		<div id='nav'>
			<div className='nav-content'>
				<p id='title'>Weather App</p>
			</div>
			<div className='nav-content search-bar'>
				<input type='text' onKeyPress={e=>{if(e.key=='Enter')handleOnClick();}} onChange={e => onChange(e)}/>
				<button type="button" onClick={handleOnClick}>Search</button>
			</div>
			<div className='nav-content right'>
				<div id='conversion-switch'>
					<div id='celsius' className={`conversion-option ${(isCelsius)? 'selected':''}`} onClick={()=>handleOnSwitch(true)}>
						{'\u00B0C'}
					</div>
					<div id='fahrenheit' className={`conversion-option ${(isCelsius)? '':'selected'}`} onClick={()=>handleOnSwitch(false)}>
						{'\u00B0F'}
					</div>
			</div>
			</div>	
		</div>
	)
}
