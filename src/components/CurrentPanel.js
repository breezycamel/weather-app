import React from 'react';
import {meterPerSecToMPH, convertKelvinToF} from '../util/util.js';
import moment from 'moment';

export default function CurrentPanel(props) {
	if(!props.gotCurrent){
		return(
			<div className='current-panel'>
		</div>
		)
	}

	const weatherImageURL = 'http://openweathermap.org/img/wn/'
	const imageSize = '@2x.png'
	const time = moment.parseZone(props.current.dt*1000);
	const temp = convertKelvinToF(props.current.main.temp);
	const wind = meterPerSecToMPH(props.current.wind.speed);
	const humidity = props.current.main.humidity;
	console.log();

	return (
		<div className='currentPanel'>
			<h1 className='location-text'>{props.current.name+', '+props.current.sys.country}</h1>
			<p className='current-date-time'>{time.format('llll')}</p>
			<p className='current-temperature'>{temp.toFixed(0)+'\u00B0'}</p>
			<img className='current-weather-icon' src={weatherImageURL+props.current.weather[0].icon+imageSize} alt={props.current.weather[0].main}/>
			<p className='wind'>Wind: {wind.toFixed(0)} mph</p>
			<p className='humidity'>Humidity: {humidity}%</p>
		</div>
	)
}
