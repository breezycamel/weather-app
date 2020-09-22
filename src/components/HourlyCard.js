import React from 'react'
import {convertKelvinToF} from '../util/util.js';
import moment from 'moment'

export default function HourlyCard({data, isSelected, onClick}) {
	const weatherImageURL = 'http://openweathermap.org/img/wn/';
	const imageSize = '@2x.png';
	const day = moment.parseZone(data.dt*1000);
	const temp = convertKelvinToF(data.temp);
	return (
		<div className={`card ${(isSelected)? 'selected':''}`} onClick={onClick}>
			<p className='hourly-card-day'>{day.format('ddd')}</p>
			<p>{day.format('LT')}</p>
			<img className='card-image' src={weatherImageURL+data.weather[0].icon+imageSize}/>
			<p className='hourly-card-temperature'>{temp.toFixed(0)+'\u00B0'}</p>
		</div>
	);
}