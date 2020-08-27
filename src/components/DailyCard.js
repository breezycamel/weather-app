import React from 'react'
import {convertKelvinToF} from '../util/util.js';
import moment from 'moment'

export default function DailyCard({data, isSelected, onClick}) {
	const weatherImageURL = 'http://openweathermap.org/img/wn/';
	const imageSize = '@2x.png';
	const day = moment.parseZone(data.dt*1000);
	const minTemp = convertKelvinToF(data.temp.min);
	const maxTemp = convertKelvinToF(data.temp.max);
	return (
		<div className={(isSelected)? 'selected-daily-card':'daily-card'} onClick={onClick}>
			<p className='daily-card-day'>{day.format('ddd')}</p>
			<img className='daily-card-image' src={weatherImageURL+data.weather[0].icon+imageSize}/>
			<p className='daily-card-temperature'>{maxTemp.toFixed(0)+'\u00B0'+' '+minTemp.toFixed(0)+'\u00B0'}</p>
		</div>
	);
}