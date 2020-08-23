import React from 'react'
import moment from 'moment'

export default function DailyCard({data, index}) {
	console.log(data);
	const weatherImageURL = 'http://openweathermap.org/img/wn/';
	const imageSize = '@2x.png';
	const day = moment.parseZone(data.dt);
	return (
		<div>
			<p>{day.format('ddd')}</p>
			<img src={weatherImageURL+data.weather[0].icon+imageSize}/>
		</div>
	);
}