## Weather App

Live version [here](https://phh18.github.io/weather-app/)

#### Inspiration

How many times have you wondered: What's the weather like today? tomorow? this week? For me it's a lot! Everytime I go outside, I check the weather. That's why for my first project I decided to build an app that displays the weather forecasts. I wanted to build something I can use and look at everyday. The app's features are inpsired by Google Weather and The Weather Channel.

#### What the app does

This app allows users to check weather forcasts by locations. Users can search for a location by city name or zipcode. The app stores 6 most recently searched locations for easy access. The app also uses geolocation to show the weather in a user's current location.

There are 3 main panels showing current, daily, and hourly forecast. The daily and hourly panel contains daily and hourly weather "cards", each displaying temperature and a weather icons. Selecting a card will show more information about the weather on that day or hour in the panel.

#### How I Build It

This app was build with React with functional components and React Hooks. I used OpenWeather API for data and weather icons.

I divided the each panel into unique components. I believed this is right choice because the data for each type of forecast is quite different so a generic panel component might not work well. 

I also tried my best to make the app responsive by resizing certain components for different screen sizes and using rem to size everything.

#### Limitations

OpenWeather API's data does not specify the state that a city belongs to. For example, query for "columbus, oh, us" and "columbus, ga, us" will give correct weather data for each city but the city name returned is just "Columbus, US". This gets confusing when the locations is stored in recently seached locations bar as both location are now indistinguishable from one another.

There are not autocomplete for location searches. User might forget how to spell the name of a city or enter incorrect search format.

#### What's Next

Google's Places API can be used for both autocomplete and storing location name. Seaches can be validated with Places API and the coordinates can be obtained. The app can then interact with OpenWeather API using only coordinates for better results. 


