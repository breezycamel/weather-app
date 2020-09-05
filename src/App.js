import React, {useState, useEffect} from 'react';
import CurrentPanel from './components/CurrentPanel.js';
import DailyPanel from './components/DailyPanel.js';
import HourlyPanel from './components/HourlyPanel.js';

function App() {
	const weatherAPI_url_current = "http://api.openweathermap.org/data/2.5/weather?q="
	const oneCallAPI_url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely&appid={API_KEY}"
	const [current, setCurrent] = useState();
	const [gotCurrent, setGotCurrent] = useState(false)
	const [daily, setDaily] = useState();
	const [gotDaily, setGotDaily] = useState(false);
	const [hourly, setHourly] = useState();
	const [gotHourly, setGotHourly] = useState();
	const [position, setPosition] = useState();
	const openWeatherAPIKey = process.env.REACT_APP_OPENWEATHERAPIKEY;
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleSucess,handleFailure);
	}, [])
	const handleSucess = res =>{
		const { latitude, longitude } = res.coords;
		setPosition({longitude,latitude});
	}

	const handleFailure = res =>{
		console.log('Failed');
	}

	useEffect(() => {
		fetch("http://api.openweathermap.org/data/2.5/weather?zip=08002,us&appid="+openWeatherAPIKey)
			.then(res=> res.json())
			.then(data => {
				setCurrent(data);
				console.log(data);
				const lat = data.coord.lat;
				const lon = data.coord.lon;
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
			})
			.then(()=>setGotCurrent(true));
	}, []);

	return (
    	<div className="App">
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
  	);
}

export default App;
