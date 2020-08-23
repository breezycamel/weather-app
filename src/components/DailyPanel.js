import React from 'react';
import DailyCard from './DailyCard.js';
import {meterPerSecToMPH, convertKelvinToF} from '../util/util.js';
import moment from 'moment';

export default function CurrentPanel({daily, gotDaily}) {
	if(!gotDaily){
		return(
			<div className='daily-panel'>
			</div>
		)
	}

	const weatherImageURL = 'http://openweathermap.org/img/wn/'
	const imageSize = '@2x.png'
	//const time = moment.parseZone(props.current.dt*1000);
	//const temp = convertKelvinToF(props.current.main.temp);
	//const wind = meterPerSecToMPH(props.current.wind.speed);
	//const humidity = props.current.main.humidity;
	console.log(daily);

	return (
		<div className='daily-panel'>
			<div className='daily-panel-weather-info'>

			</div>
			<div className='daily-card-container'>
				<DailyCard data={daily.daily[0]} index={0}/>
			</div>
		</div>

	)
}