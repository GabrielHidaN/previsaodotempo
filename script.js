const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const APIKey = '4d08d5ef75933a26d5e9993ef3fb2e43';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json =>  {

            if(json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperatura');
            const descricao = document.querySelector('.weather-box .descricao');
            const umidade = document.querySelector('.weather-details .umidade span');
            const vento = document.querySelector('.weather-details .vento span');

            switch (json.weather[0].main){
                    case 'Clear':
                    image.src = './img/clear.png';
                    break;

                    case 'Rain':
                    image.src = './img/rain.png';
                    break;

                    case 'Snow':
                    image.src = './img/snow.png';
                    break;

                    case 'Clouds':
                    image.src = './img/cloud.png';
                    break;

                    case 'Haze':
                    image.src = './img/mist.png';
                    break;

                    default :
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].descricao}`;
            umidade.innerHTML = `${json.main.umidade}%`;
            vento.innerHTML = `${parseInt(json.vento)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});