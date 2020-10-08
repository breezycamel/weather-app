import React from 'react'
import moment from 'moment'

export default function DailyCard({data, isSelected, onClick, convert}) {
	const weatherImageURL = 'https://openweathermap.org/img/wn/';
	const imageSize = '@2x.png';
	const day = moment.parseZone(data.dt*1000);
	const minTemp = convert(data.temp.min);
	const maxTemp = convert(data.temp.max);
	return (
		<div className={`card ${(isSelected)? 'selected':''}`} onClick={onClick}>
			<p className='daily-card-day'>{day.format('ddd')}</p>
			<img className='card-image' src={weatherImageURL+data.weather[0].icon+imageSize} alt={data.weather[0].main}/>
			<p className='daily-card-temperature'>{maxTemp.toFixed(0)+'\u00B0'+' '+minTemp.toFixed(0)+'\u00B0'}</p>
		</div>
	);
}