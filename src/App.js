import React, { useState } from "react";
import "./App.css";
const api = {
	key: "658767b0ae936b022f59a69f44868419",
	base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});

	const search = (event) => {
		if (event.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery("");
					// console.log(result);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			"JANUARY",
			"FEBRUARY",
			"MARCH",
			"APRIL",
			"MAY",
			"JUNE",
			"JULY",
			"AUGUST",
			"SEPTEMBER",
			"OCTOBER",
			"NOVEMBER",
			"DECEMBER",
		];

		let days = [
			"SUNDAY",
			"MONDAY",
			"TUESDAY",
			"THURSDAY",
			"FRIDAY",
			"SATURDAY",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	return (
		<div className="app">
			<main>
				<div className="box">
				<h1>Weather App</h1>
				<div className="date">{dateBuilder(new Date())}</div>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					></input>
				</div>
				{typeof weather.main != "undefined" ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
						</div>
						<div className="weather-box">
							<div className="temp">{Math.round(weather.main.temp)}°c</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					""
				)}
				</div>
			</main>
		</div>
	);
}

export default App;
