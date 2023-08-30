import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

function WeatherApp() {
	const [city, setCity] = useState('Lisbon');
	const apiKey = '5a09174979f701aecb6c103fd62018a8';
	const [weather, setWeather] = useState('');
	const ref = useRef();
	const handleSubmit = (e) => {
		e.preventDefault();
		setCity(ref.current.value);
	};

	const ApiCall = () => {
		const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
		console.log(city);
		axios
			.get(`${baseURL}`)
			.then((res) => {
				const realTemp = res.data.main.temp - 273.15;
				setWeather({
					descp: res.data.weather[0].description,
					temp: realTemp.toFixed(0),
					city: res.data.name,
					humidity: res.data.main.humidity,
					press: res.data.main.pressure,
				});
			})
			.catch((e) => console.log(e));
	};
	useEffect(() => {
		ApiCall();
	});
	return (
		<div className="container">
			<div className="top-bar">
				<form onSubmit={handleSubmit} action="" className="form">
					<input
						type="text"
						className="cityInput"
						placeholder="search"
						name="loc"
						ref={ref}
					/>
					<button className="search-icon" type="submit">
						<img src={search_icon} alt="" />
					</button>
				</form>
			</div>
			<div className="weather-image">
				<img src={cloud_icon} alt="" />
			</div>
			<div className="weather-temp">{weather.temp}ºC</div>
			<div className="weather-location">{weather.city}</div>
			<div className="data-container">
				<div className="element">
					<img src={humidity_icon} alt="" className="icon" />
					<div className="data">
						<div className="humidity-percent">{weather.humidity}</div>
						<div className="text">Humidity</div>
					</div>
				</div>
				<div className="element">
					<img src={wind_icon} alt="" className="icon" />
					<div className="data">
						<div className="humidity-percent">18 km/h</div>
						<div className="text">Wind Speed</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WeatherApp;
