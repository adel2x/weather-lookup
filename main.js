const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dateNow = new Date();
let currDays = dateNow.getDay();
let currMonths = dateNow.getMonth();

let printDay = days[currDays];
let printMonth; printMonth = months[currMonths];
let d_Now = dateNow.getDate() + " " + printMonth;

// console.log(d_Now);
// console.log(printDay);
// console.log(printMonth);


let currentDay = document.querySelector('.currDay');
let currentDate = document.querySelector('.currDate');
let currentDegree = document.querySelector('.currDegree');
// let currentDesc = document.querySelector('.degreeDes');
let nameOfCity = document.querySelector('.cityName');
let currentIconCondition = document.querySelector('.todayCondition-icon');
let currentTextCondition = document.querySelector('.todayCondition-text');
let precipIN = document.querySelector('.precip_in');
let windKPH = document.querySelector('.wind_kph');
let windDirection = document.querySelector('.wind_dir');

let MainCards = document.querySelector('.main-weather-cards'); // for parent 
let firstColumn = document.querySelector('.firstOfAll'); // first column


let searchBar = document.querySelector('.search-bar');
let mainCards = document.querySelector('.main-weather-cards');
let mainApp = document.querySelector('.main-weather');
console.log(mainApp.style.backgroundImage);
let summerBgs = ["s1", "s2", "s3"];
let winterBgs = ["w1", "w2", "w3"];

let myAPI = "8413f8dcc7f648deb67134821240501"; // global API declaration

// geo lookup first

(
    function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        }
    }
)();

function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // console.log(lat + ',' + lon);
    getApi(lat + ',' + lon);
};

searchBar.addEventListener('change', function(eventInfo){
getApi(searchBar.value);
clearInput();
});



async function getApi(searchResult){

    let getAPI = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${myAPI}&q=${searchResult}&days=3`);
    const data = await getAPI.json();
    showToday(data);
    show2Days(data);

}
getApi("giza"); // default when opening


function showToday(result){
    if(result.current.temp_c>20){
        var randomIndex = Math.floor(Math.random() * summerBgs.length);
        var randomSummerBg = summerBgs[randomIndex];
        // var newBackgroundImage = `url(./Images/${randomSummerBg}.png)`;
        mainApp.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.250) 50%, rgba(0, 0, 0, 0.250) 50%), url(../Assignment5/Images/${randomSummerBg}.jpg)`;
    }
    else{
        var randomIndex = Math.floor(Math.random() * winterBgs.length);
        var randomWinterBg = winterBgs[randomIndex];
        // var newBackgroundImage = `url(./Images/${randomWinterBg}.png)`;
        mainApp.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.250) 50%, rgba(0, 0, 0, 0.250) 50%), url(../Assignment5/Images/${randomWinterBg}.jpg)`;
    }
    currentDay.innerHTML= printDay;
    currentDate.innerHTML = d_Now;
    currentDegree.innerHTML = result.current.temp_c + "&deg;C";
    nameOfCity.innerHTML = result.location.name;
    currentIconCondition.innerHTML = `http:${result.current.condition.icon}`;
    currentTextCondition.innerHTML =  result.current.condition.text;
    precipIN.innerHTML = result.current.humidity;
    windKPH.innerHTML = result.current.wind_kph;
    windDirection.innerHTML = result.current.wind_dir;

}

var columns = ["first-col","second-col", "third-col"];


function show2Days(result){
    let existingHtml = firstColumn.innerHTML;
    let cartonaa=``;
       for(let  i = 1 ; i < 3 ; i++){
        let afterDate = result.forecast.forecastday[i].date;
        let daySyntax = new Date(afterDate);
        let afterDayPrint = days[daySyntax.getDay()];
        cartonaa+=`

        <div class="weather-card col-lg-4 ${columns[i]} p-0">
        <div class="dayInfo p-4 py-3 d-flex w-100 justify-content-between">
            <p class="overmorrow m-0 m-auto">${afterDayPrint}</p>
        </div>
        <div class="degreeInfo p-4">
            <div
                class="degreeWithImg d-flex h-150px flex-column-reverse justify-content-center align-items-center">
                <p class="overmorrowMinDeg text-secondary fs-6 m-0">${result.forecast.forecastday[i].day.mintemp_c}&deg;C</p>
                <p class="overmorrowMaxDeg text-white fs-4 m-0">${result.forecast.forecastday[i].day.maxtemp_c}&deg;C</p>
                <img class="w-50px m-0 m-0 overmorrowCondition-icon" src="http:${result.forecast.forecastday[i].day.condition.icon}"
                    alt="cloud">
            </div>
            <p class="degreeDes text-center mt-4 overmorrowCondition-text">${result.forecast.forecastday[i].day.condition.text}</p>
        </div>
    </div>
        `;
    }

    let combinedHTML = existingHtml + cartonaa;
    MainCards.innerHTML = combinedHTML;
}






// Clear input of search bar

function clearInput(){
    searchBar.value="";
}