import React, {useState, useEffect} from 'react';
import CurrentPanel from './components/CurrentPanel.js';
import DailyPanel from './components/DailyPanel.js';
import HourlyPanel from './components/HourlyPanel.js';
import TopNav from './components/TopNav.js';
import * as util from './util/util.js';
import Cookies from 'universal-cookie';
import RecentLocationBar from './components/RecentLocationBar.js';

function App() {
	const oneCallAPI_url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely&appid={API_KEY}"
	const [current, setCurrent] = useState();
	const [gotCurrent, setGotCurrent] = useState(false)
	const [daily, setDaily] = useState();
	const [gotDaily, setGotDaily] = useState(false);
	const [hourly, setHourly] = useState();
	const [gotHourly, setGotHourly] = useState();
	const [currentWeatherAPI, setCurrentWeatherAPI] = useState('');
	const [isCelsius, setIsCelsius] = useState(false);
	const openWeatherAPIKey = process.env.REACT_APP_OPENWEATHERAPIKEY;
	const convert = (isCelsius)? util.convertKelvinToC : util.convertKelvinToF;
	const cookie = new Cookies();
	const [recentLocations, setRecentLocations] = useState(cookie.get('recentLocations'));

	function handleSearch(searchKey){
		const searchTerms = searchKey.split(',').map(term => term.trim());
		const isZip = Number.isInteger(Number.parseInt(searchTerms[0]));
		console.log(searchTerms);
		console.log(`Is Zipcode: ${isZip}`);
		if(isZip){
			setCurrentWeatherAPI(`https://api.openweathermap.org/data/2.5/weather?zip=${searchTerms}&appid=${openWeatherAPIKey}`);
		}
		else{
			setCurrentWeatherAPI(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerms}&appid=${openWeatherAPIKey}`);
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

	//Ask user for current location
	useEffect(() => {
		navigator.geolocation.getCurrentPosition( res => {searchByCoordinate(res.coords.latitude, res.coords.longitude)}, handleFailure);
	}, [])

	//Search for a location using coordinates
	const searchByCoordinate = (latitude, longitude) =>{
		setCurrentWeatherAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIKey}`);
		console.log({latitude, longitude});
	}

	//Handle when geolocation fail
	const handleFailure = res =>{
		console.log('Failed');
		setCurrentWeatherAPI(`http://api.openweathermap.org/data/2.5/weather?zip=08002,us&appid=${openWeatherAPIKey}`);
	}

	//Store recently searched location using cookies
	const addRecentLocation = (location) => {
		var date = new Date();
		date.setFullYear(2030);
		console.log(cookie.get('recentLocations'));
		if(recentLocations == undefined){
			cookie.set('recentLocations', JSON.stringify([location]), {path: '/', expires: date});
			setRecentLocations([location]);
			console.log(recentLocations);
			return;
		}
		const filtered = recentLocations.filter((loc) => {
			return (location.name==loc.name && Math.abs(location.lon-loc.lon)<1 && Math.abs(location.lat-loc.lat)<1);
		});
		if(filtered.length != 0) return;

		var newLocations = recentLocations;
		newLocations.push(location);
		if(newLocations.length > 6){
			newLocations.splice(0,1);
			console.log("splice");
		}
		cookie.set('recentLocations', JSON.stringify(newLocations), {path: '/', expires: date});
		setRecentLocations(newLocations);
	}

	//Delete a recently searched location from app state and cookies
	const deleteRecentLocation = (location) => {
		var date = new Date();
		date.setFullYear(2030);
		var newLocations = recentLocations;
		newLocations = newLocations.filter((loc) => {
			return (location.name!=loc.name || location.lon!=loc.lon || location.lat!=loc.lat);
		});
		cookie.set('recentLocations', JSON.stringify(newLocations), {path: '/', expires: date});
		setRecentLocations(newLocations);
	}

	//This fetch current weather and then fetch daily and hourly weather
	useEffect(() => {
		console.log(currentWeatherAPI);
		if(currentWeatherAPI != ''){
			fetch(currentWeatherAPI)
				.then(res=> res.json())
				.then(data => {
					if(data.cod>='400'){
						throw Error("Location not found\nSearch format:\nZipcode: #####, {country code}\nCity Name: {city name}, {state}, {country}\nState and country field are optional but will give better result.");
					}
					setCurrent(data);
					console.log(data);
					const lat = data.coord.lat;
					const lon = data.coord.lon;
					addRecentLocation({name: `${data.name}, ${data.sys.country}`, lat: lat, lon: lon});
					fetchOneCallData(lat,lon);
				})
				.then(()=>setGotCurrent(true))
				.catch((error)=>window.alert(error.message));
		}	
	}, [currentWeatherAPI]);

	return (
    	<div className="App">
				<TopNav
					handleSearch={handleSearch}
					isCelsius={isCelsius}
					setIsCelsius={setIsCelsius}
				/>
				<RecentLocationBar
					recentLocations={(recentLocations == undefined)? [] : recentLocations}
					deleteRecentLocation={deleteRecentLocation}
					selectRecentLocation={searchByCoordinate}
				/>
				<div className='main'>
					<CurrentPanel
						current={current}
						gotCurrent={gotCurrent}
						convert={convert}
					/>
					<DailyPanel
						daily={daily}
						gotDaily={gotDaily}
						convert={convert}
					/>
					<HourlyPanel
						hourly={hourly}
						gotHourly={gotHourly}
						convert={convert}
					/>
				</div>
    	</div>
  	);
}

export default App;
