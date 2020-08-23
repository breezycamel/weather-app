export function meterPerSecToMPH(speed){
	return speed*3600/1609.34;
}

export function convertKelvinToF(kelvin){
	return (kelvin - 273.15) * 9/5 + 32;
}
