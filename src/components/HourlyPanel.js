import React, {useState}from 'react';
import HourlyCard from './HourlyCard.js';
import {meterPerSecToMPH, convertKelvinToF} from '../util/util.js';
import moment from 'moment';

export default function HourlyPanel({hourly, gotHourly}) {
	const [curIndex, setCurIndex] = useState(0);
	if(!gotHourly){
		return(
			<div className='hourly-panel'>
			</div>
		)
	}

	const weatherImageURL = 'http://openweathermap.org/img/wn/{iconid}@2x.png'; 
	const date =  moment.parseZone(hourly[curIndex].dt*1000);   
	const windSpeed = meterPerSecToMPH(hourly[curIndex].wind_speed);
	const precipitation = hourly[curIndex].pop*100;
	const humidity = hourly[curIndex].humidity;
	const dewPoint = convertKelvinToF(hourly[curIndex].dew_point);
	const feelsLike = convertKelvinToF(hourly[curIndex].feels_like);
	function handleSelection(index){
		setCurIndex(index);
	}



	//console.log(hourly[curIndex]);

	return (
		<div className='hourly-panel'>
			<h1>Hourly Forecast</h1>
			<div className='hourly-panel-weather-info'>
				<p>{date.format('ll')}</p>
				<img src={weatherImageURL.replace('{iconid}', hourly[curIndex].weather[0].icon)}/>
				<p>Feels Like: {feelsLike.toFixed(0)+'\u00B0'}</p>
				<p className='hourly-wind-speed'>Wind Speed: {windSpeed.toFixed(0)}mph</p>
				<p className='hourly-humidity'>Humidity: {humidity}%</p>
				<p className='hourly-dew-point'>Dew Point: {dewPoint.toFixed(0)}</p>
				<p className='hourly-uvi'>UV Index: {hourly[curIndex].uvi}</p>

			</div>

			<div className='hourly-card-container'>
				{hourly.map((hour,i)=>(
					<HourlyCard
						key = {i}
						data = {hour}
						isSelected = {i===curIndex}
						onClick={() => setCurIndex(i)}
					/>
				))}
			</div>
		</div>

	)
}