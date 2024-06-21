let currentDay=document.getElementById('currentDay');
let currentMonth=document.getElementById('currentMonth');
let cityName=document.getElementById('cityName');
let currentDegree=document.getElementById('currentDegree');
let currentIcon=document.getElementById('currentIcon');
let currentStatus=document.getElementById('currentStatus');
let humidty=document.getElementById('humidty');
let wind=document.getElementById('wind');
let compass=document.getElementById('compass');

let nextDay=document.getElementsByClassName('nextDay');
let nextIcon=document.getElementsByClassName('nextIcon');
let nextMax=document.getElementsByClassName('nextMax');
let nextMin=document.getElementsByClassName('nextMin');
let nextStatus=document.getElementsByClassName('nextStatus');

let homePage=document.getElementById('homePage');
let contact=document.getElementById('contact');
let homeBtn=document.getElementById('homeBtn');
let contactBtn=document.getElementById('contactBtn');

let search=document.getElementById('search');

let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let months=['January','February','March','April','May','June','July','August','Septemper','October','November','December'];

let finalResponse;

async function getData(cityName='cairo')
{
   let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${cityName}&days=3`);
   finalResponse=await response.json();
   displayCurrent();
   displayNext();
}
 getData();

function displayCurrent()
{
     currentDay.innerHTML=days[new Date().getDay()];
     currentMonth.innerHTML=`${new Date().getDate()} ${months[new Date().getMonth()]}`;
     cityName.innerHTML=finalResponse.location.name;
     currentDegree.innerHTML=finalResponse.current.temp_c;
     currentIcon.setAttribute('src',`https:${finalResponse.current.condition.icon}`);
     currentStatus.innerHTML=finalResponse.current.condition.text;
     humidty.innerHTML=finalResponse.current.humidity;
     wind.innerHTML=finalResponse.current.wind_kph;
     compass.innerHTML=finalResponse.current.wind_dir;
}

function displayNext()
{
 for(let i=0;i<nextDay.length;i++)
 {
    nextDay[i].innerHTML=days[new Date(finalResponse.forecast.forecastday[i+1].date).getDay()];
    nextIcon[i].setAttribute('src',`https:${finalResponse.forecast.forecastday[i+1].day.condition.icon}`);
    nextMax[i].innerHTML=finalResponse.forecast.forecastday[i+1].day.maxtemp_c;
    nextMin[i].innerHTML=finalResponse.forecast.forecastday[i+1].day.mintemp_c;
    nextStatus[i].innerHTML=finalResponse.forecast.forecastday[i+1].day.condition.text;
 }
}

search.addEventListener('keyup',function(){
    let cityName=search.value;
    getData(cityName);
});

homeBtn.addEventListener('click',function(){
    homePage.classList.remove('d-none');
    contact.classList.add('d-none');
});

contactBtn.addEventListener('click',function(){
    contact.classList.remove('d-none');
    homePage.classList.add('d-none');
});
