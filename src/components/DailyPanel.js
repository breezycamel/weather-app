import React, {useState}from 'react';
import DailyCard from './DailyCard.js';
import {meterPerSecToMPH, convertKelvinToF} from '../util/util.js';
import moment from 'moment';

export default function CurrentPanel({daily, gotDaily}) {
	const [curIndex, setCurIndex] = useState(0);
	if(!gotDaily){
		return(
			<div className='daily-panel'>
			</div>
		)
	}

	const weatherImageURL = 'http://openweathermap.org/img/wn/{iconid}@2x.png'; 
	const indexes = [0,1,2,3,4,5,6,7];
	const date =  moment.parseZone(daily[curIndex].dt*1000);   
	const windSpeed = meterPerSecToMPH(daily[curIndex].wind_speed);
	const precipitation = daily[curIndex].pop*100;
	const humidity = daily[curIndex].humidity;
	const dewPoint = convertKelvinToF(daily[curIndex].dew_point);

	function handleSelection(index){
		setCurIndex(index);
	}



	console.log(daily[curIndex]);

	return (
		<div className='daily-panel'>
			<h1>Daily Forecast</h1>
			<div className='daily-panel-weather-info'>
				<p>{date.format('ll')}</p>
				<img src={weatherImageURL.replace('{iconid}', daily[curIndex].weather[0].icon)}/>
				<p className='daily-precipitation'>Preciptiation: {precipitation.toFixed(0)}%</p>
				<p className='daily-wind-speed'>Wind Speed: {windSpeed.toFixed(0)}mph</p>
				<p className='daily-humidity'>Humidity: {humidity}%</p>
				<p className='daily-dew-point'>Dew Point: {dewPoint.toFixed(0)}</p>
				<p className='daily-uvi'>UV Index: {daily[curIndex].uvi}</p>

			</div>

			<div className='daily-card-container'>
				{indexes.map(i=>(
					<DailyCard
						key = {i}
						data = {daily[i]}
						isSelected = {i===curIndex}
						onClick={() => setCurIndex(i)}
					/>
				))}
			</div>
		</div>

	)
}