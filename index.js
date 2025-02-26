async function requestWeather() {
    const location = document.getElementById('location').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const forecastContainer = document.getElementById('forecastInfo');
    weatherInfo.innerHTML = '';
    forecastContainer.innerHTML = '';
    if (location === '') {
        alert('Enter a city');
        return;
    }

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&language=en`);
        const data = await response.json();
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit`)
        const weatherData = await weatherResponse.json();
        weatherInfo.innerHTML = `<p id = "location">Location: ${location}</p>
            <p id = "weather">Weather Code: ${weatherData.current_weather.weathercode}</p>
            <p id = "temperature">Temperature: ${weatherData.current_weather.temperature}°F</p>
            <p id = "windSpeed">Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>`;
        weatherData.daily.time.forEach((date, index) => {
            forecastContainer.innerHTML += `<div id="forecastDay">
                    <p>Date: ${date}</p>
                    <p>Weather Code: ${weatherData.daily.weathercode[index]}</p>
                    <p>Min Temp: ${weatherData.daily.temperature_2m_min[index]}°F</p>
                    <p>Max Temp: ${weatherData.daily.temperature_2m_max[index]}°F</p>
                    <p>Precipitation: ${weatherData.daily.precipitation_sum[index]} mm</p>
                    </div>`;
        });

    } catch (error) {
        console.error(error);
        alert('City not found');
    }
}