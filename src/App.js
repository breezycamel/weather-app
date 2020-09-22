import React, {useState, useEffect} from 'react';
import CurrentPanel from './components/CurrentPanel.js';
import DailyPanel from './components/DailyPanel.js';
import HourlyPanel from './components/HourlyPanel.js';
import SearchBar from './components/SearchBar.js';

function App() {
	const oneCallAPI_url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely&appid={API_KEY}"
	const [current, setCurrent] = useState();
	const [gotCurrent, setGotCurrent] = useState(false)
	const [daily, setDaily] = useState();
	const [gotDaily, setGotDaily] = useState(false);
	const [hourly, setHourly] = useState();
	const [gotHourly, setGotHourly] = useState();
	const [currentWeatherAPI, setCurrentWeatherAPI] = useState('');
	const [toggleSearch, setToggleSearch] = useState(false);
	const openWeatherAPIKey = process.env.REACT_APP_OPENWEATHERAPIKEY;


	async function handleSearch(searchKey){
		const searchTerms = searchKey.split(',');
		const isZip = Number.isInteger(Number.parseInt(searchTerms[0]));
		console.log(searchTerms);
		console.log(`Is Zipcode: ${isZip}`);
		if(isZip){
			setCurrentWeatherAPI(`http://api.openweathermap.org/data/2.5/weather?zip=${searchTerms[0]}&appid=${openWeatherAPIKey}`);
		}
		else{
			setCurrentWeatherAPI(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerms}&appid=${openWeatherAPIKey}`);
		}
	}

	async function fetchOneCallData(lat, lon){
		const url = oneCallAPI_url.replace('{lon}',lon).replace('{lat}',lat).replace('{API_KEY}',openWeatherAPIKey);
				fetch(url)
					.then(res=>res.json())
					.then(data1 => {
						console.log(data1);
						setDaily(data1.daily);
						setHourly(data1.hourly);
						setGotDaily(true)
						setGotHourly(true);
					});
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleSucess,handleFailure);
		setToggleSearch(true);
	}, [])

	const handleSucess = res =>{
		const { latitude, longitude } = res.coords;
		setCurrentWeatherAPI(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIKey}`);
		console.log(res.coords);
	}

	const handleFailure = res =>{
		console.log('Failed');
		setCurrentWeatherAPI(`http://api.openweathermap.org/data/2.5/weather?zip=08002,us&appid=${openWeatherAPIKey}`);
	}

	useEffect(() => {
		console.log(currentWeatherAPI);
		if(currentWeatherAPI != ''){
			fetch(currentWeatherAPI)
				.then(res=> res.json())
				.then(data => {
					if(data.cod>='400'){
						throw Error("Location not found\nSearch format:\nZipcode: #####, {country}\nCity Name: {city name}, {state}, {country}\nState and country field are optional but will give better result.");
					}
					setCurrent(data);
					console.log(data);
					const lat = data.coord.lat;
					const lon = data.coord.lon;
					fetchOneCallData(lat,lon);
				})
				.then(()=>setGotCurrent(true))
				.then(()=>setToggleSearch(false))
				.catch((error)=>window.alert(error.message));
		}	
	}, [currentWeatherAPI]);

	return (
    	<div className="App">
				<SearchBar
					handleSearch={handleSearch}
				/>
				<div className='main'>
					<CurrentPanel
						current={current}
						gotCurrent={gotCurrent}
					/>
					<DailyPanel
						daily={daily}
						gotDaily={gotDaily}
					/>
					<HourlyPanel
						hourly={hourly}
						gotHourly={gotHourly}
					/>
				</div>
    	</div>
  	);
}

export default App;
