const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const photoGrid = document.querySelector('.photo-grid');

const apiKey = '252347387fb62db366d3d941758130a0';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

const fetchWeatherData = (city) => {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => updateWeatherInfo(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert("City not found. Please try again.");
        });
};

const updateWeatherInfo = (data) => {
    if (data.cod === 200) {
        const { name, main, weather } = data;
        const weatherCondition = weather[0].main.toLowerCase();

        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Condition: ${weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon"></img>
        `;
        updateBackground(weatherCondition);
        updatePhotos(weatherCondition);
    } else {
        alert('City not found. Please try again.');
    }
};

const updateBackground = (weatherCondition) => {
    let backgroundImage;
    switch (weatherCondition) {
        case 'clear':
            backgroundImage = 'images/clear.jpg';
            break;
        case 'clouds':
            backgroundImage = 'images/clouds.jpg';
            break;
        case 'rain':
            backgroundImage = 'images/rain.jpg';
            break;
        case 'snow':
            backgroundImage = 'images/snow.jpg';
            break;
        case 'thunderstorm':  
            backgroundImage = 'images/thunderstorm.jpg';
            break;
        default:
            backgroundImage = 'images/background.jpg';
    }
    
};

const updatePhotos = (weatherCondition) => {
    const photos = {
        clear: ['images/clear1.jpg', 'images/clear2.jpg', 'images/clear3.jpg'],
        clouds: ['images/clouds.jpg', 'images/clouds.jpg', 'images/clouds.jpg'],
        rain: ['images/rain.jpg', 'images/rain.jpg', 'images/rain.jpg'],
        snow: ['images/snow1.jpg', 'images/snow2.jpg', 'images/snow3.jpg'],
        thunderstorm: ['images/thunderstorm1.jpg', 'images/thunderstorm2.jpg', 'images/thunderstorm3.jpg'], 
        default: ['images/1.jpg', 'images/2.jpg', 'images/3.jpg']
    };

    const selectedPhotos = photos[weatherCondition] || photos.default;

    photoGrid.innerHTML = '';
    selectedPhotos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo;
        imgElement.alt = 'Weather Photo';
        photoGrid.appendChild(imgElement);
    });
};
