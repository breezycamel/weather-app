import React from 'react';

export default function RecentLocationBar({recentLocations, deleteRecentLocation, selectRecentLocation}) {
	
	return (
		<div id='recent-location-container'>
		<div id='recent-location-nav'>
			{recentLocations.slice(0).reverse().map((location, i)=>(
				<Location
					key={i}
					location={location}
					index={i}
					deleteRecentLocation = {deleteRecentLocation} 
					selectRecentLocation = {selectRecentLocation}
				/>
			))}
			
		</div>
		</div>
	)
}

function Location({location, index, deleteRecentLocation, selectRecentLocation}){
	return(
		<div className='recent-location'>
			<div className='recent-location-name' onClick={() => selectRecentLocation(location.lat, location.lon)}>
				{location.name}
			</div>
			<button className="recent-location-delete" onClick={() => deleteRecentLocation(location)}>X</button>
		</div>
	)
}
