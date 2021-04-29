/* Global Variables */
const generate = document.querySelector('.generate');
const zipcode = document.querySelector('input');
const description = document.querySelector('textarea');
//const kelvin = 273;

const city = document.getElementById('location');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const icon = document.getElementById('icon');
const date = document.getElementById('date');

// Personal API Key for OpenWeatherMap API
const key = '0197f69a4ac4fce6f6969700d1425e6c&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +1 +'.'+ d.getDate()+'.'+ d.getFullYear();


//-----------------------------------------------------------------//
//check the server for latest values of the page
getServerData();

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', press);
//function called when generate pressed
function press() {
    let descValue = description.value;
    let zipValue = zipcode.value;
    getWeather(zipValue, descValue).then(() =>{
        //check for latest data
        getServerData();
    });
}


/* get weather api data function*/
function getWeather(zip, des) {
    let api = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`;
    
    //fetch the api
    return fetch(api)
        .then((response) => {
            let data = response.json();
            return data;
        })
        .then((data) => {
            //set city
            const city = data.name;
            //set temp and convert to celsius
            //const temperature = Math.floor(data.main.temp - kelvin);
            const temperature = Math.floor(data.main.temp);
            //set user description
            const userDesc = des;
            //set icon
            const icon = data.weather[0].icon;         

            postData('/add', {city, temperature, userDesc, icon, newDate});
        });
}

/* asynchronous function that posts data */
async function postData(url, data) {
    await fetch(url, {
        method: 'POST', credentials: 'same-origin', 
        headers: {'Content-Type' : 'application/json'},
        //convert to json
        body: JSON.stringify(data),
    });
}

// get server data
async function getServerData() {
    const response = await fetch('/return');
    const mostRecent = await response.json();

    // checking for an attribute
    if (mostRecent && mostRecent.city) {
        //call to update UI as there is
        updateUI(mostRecent);}
}


function updateUI(weather) {
    console.log(weather);
    city.innerHTML = weather.city ? weather.city : '';
    temp.innerHTML = `${weather.temperature} °C `;  
    date.innerHTML = weather.newDate ? weather.newDate : '';
    content.innerHTML = weather.userDesc ? weather.userDesc : '';
    icon.innerHTML = `<img src = "svg/${weather.icon}.svg" alt = "unknown weather" />`;

}
