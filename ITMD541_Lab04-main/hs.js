
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');
let results={};
searchButton.addEventListener('click', () => {
    const location = locationInput.value ? locationInput.value : 'Chicago';
    if (location.trim() === '') {
        alert('Please enter a location.');
        return;
    }
    fetch(`https://geocode.maps.co/search?q=${location}`).then(res=> res.json()).then(data =>{
        console.log('Data from Gecode',data)
        updateDashboard(data[0].lat, data[0].lon);
    }).catch(error=>{
        console.log('Error', error)
    })

});

function updateDashboard(lat,long) {
    fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}&date=today`).then(res => res.json()).then(data => {
        // console.log('Data from Sunrise API:', data)
        // result.innerHTML = `<p>Sunrise: ${data.results.sunrise}<p><p>Sunset: ${data.results.sunset}<p>`
        results.today={...data}
    }).catch(error => {
        console.error('An error occurred:', error);
        result.innerHTML = '<p>Please try again later.</p>';
    });

    fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}&date=tomorrow`).then(res => res.json()).then(data1 => {

        results.tomorrow={...data1};
        console.log('Data from Sunrise API:', results)
        result.innerHTML = `<div class="weather-info">
        <div class="today_weather_data">
        <h2>Today's Weather</h2>
          <p>Sunrise: ${results.today.results.sunrise}</p>
          <p>Sunset: ${results.today.results.sunset}</p>
          <p>Dawn: ${results.today.results.dawn}</p>
          <p>Dusk: ${results.today.results.dusk}</p>
          <p>Day Length: ${results.today.results.day_length}</p>
          <p>Solar Noon: ${results.today.results.solar_noon}</p>
          <p>Timezone: ${results.today.results.timezone}</p>
        </div>
        <div class="tomorrow_weather_data">
        <h2>Tomorrow's Weather </h2>
          <p>Sunrise: ${results.tomorrow.results.sunrise}</p>
          <p>Sunset: ${results.tomorrow.results.sunset}</p>
          <p>Dawn: ${results.tomorrow.results.dawn}</p>
          <p>Dusk: ${results.tomorrow.results.dusk}</p>
          <p>Day Length: ${results.tomorrow.results.day_length}</p>
          <p>Solar Noon: ${results.tomorrow.results.solar_noon}</p>
          <p>Timezone: ${results.tomorrow.results.timezone}</p>
        </div>
      </div>`
    })
    .catch(error => {
            console.error('An error occurred:', error);
            result.innerHTML = '<p>Please try again later.</p>';
        });
}

function getLocation() {
    if (navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition(showPosition, showError));
    } else {
        alert("Geolocation is not supported by browser.");
    }

}


function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);
    updateDashboard(position.coords.latitude, position.coords.longitude)
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

