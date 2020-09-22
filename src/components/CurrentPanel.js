import React from 'react';
import {meterPerSecToMPH} from '../util/util.js';
import moment from 'moment';

export default function CurrentPanel({current, gotCurrent, convert}) {
	if(!gotCurrent){
		return(
			<div className='current-panel'>
		</div>
		)
	}

	const weatherImageURL = 'http://openweathermap.org/img/wn/';
	const imageSize = '@2x.png';
	const time = moment.parseZone(current.dt*1000);
	const temp = convert(current.main.temp);
	const wind = meterPerSecToMPH(current.wind.speed);
	const humidity = current.main.humidity;
	const feelsLike = convert(current.main.feels_like);
	console.log();

	return (
		<div className='panel'>
			<h1 className='location-text'>{current.name+', '+current.sys.country}</h1>
			<p className='current-date-time'>{time.format('LLLL')}</p>

			<div className='panel-main'>
				<div className='panel-temperature-containter panel-content'>
					<p className='panel-temperature'>{temp.toFixed(0)+'\u00B0'}</p>
					<img className='current-weather-icon' src={weatherImageURL+current.weather[0].icon+imageSize} alt={current.weather[0].main}/>
				</div>
				<div className='panel-weather-info panel-content'>
					<p>Feels Like: {feelsLike.toFixed(0)+'\u00B0'}</p>
					<p className='wind'>Wind: {wind.toFixed(0)} mph</p>
					<p className='humidity'>Humidity: {humidity}%</p>
				</div>
			</div>	

		</div>
	)
}
