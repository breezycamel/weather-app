import React, {useState}from 'react';
import DailyCard from './DailyCard.js';
import {meterPerSecToMPH} from '../util/util.js';
import moment from 'moment';

export default function DailyPanel({daily, gotDaily, convert}) {
	const [curIndex, setCurIndex] = useState(0);
	if(!gotDaily){
		return(
			<div className='daily-panel'>
			</div>
		)
	}

	const minTemp = convert(daily[curIndex].temp.min);
	const maxTemp = convert(daily[curIndex].temp.max);
	const weatherImageURL = 'http://openweathermap.org/img/wn/{iconid}@2x.png'; 
	const indexes = [0,1,2,3,4,5,6,7];
	const date =  moment.parseZone(daily[curIndex].dt*1000);   
	const windSpeed = meterPerSecToMPH(daily[curIndex].wind_speed);
	const precipitation = daily[curIndex].pop*100;
	const humidity = daily[curIndex].humidity;
	const dewPoint = convert(daily[curIndex].dew_point);

	//console.log(daily[curIndex]);

	return (
		<div className='panel'>
			<h1>Daily Forecast</h1>
			<p>{date.format('ll')}</p>
				
			<div className='panel-main'>
				<div className='panel-temperature-containter panel-content'>
					<p className='panel-temperature'>{maxTemp.toFixed(0)+'\u00B0'+'/'+minTemp.toFixed(0)+'\u00B0'}</p>
					<img src={weatherImageURL.replace('{iconid}', daily[curIndex].weather[0].icon)} alt={daily[curIndex].weather[0].main}/>
				</div>
				<div className='panel-content'>
					<p className='daily-precipitation'>Preciptiation: {precipitation.toFixed(0)}%</p>
					<p className='daily-wind-speed'>Wind Speed: {windSpeed.toFixed(0)}mph</p>
					<p className='daily-humidity'>Humidity: {humidity}%</p>
					<p className='daily-dew-point'>Dew Point: {dewPoint.toFixed(0)+'\u00B0'}</p>
					<p className='daily-uvi'>UV Index: {daily[curIndex].uvi}</p>
				</div>
			</div>

			<div className='daily-card-container'>
				{indexes.map(i=>(
					<DailyCard
						key = {i}
						data = {daily[i]}
						isSelected = {i===curIndex}
						onClick={() => setCurIndex(i)}
						convert={convert}
					/>
				))}
			</div>
		</div>

	)
}