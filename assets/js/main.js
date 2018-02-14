function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherForUserLocation, showErrorAfterLocationRequest);
    showMsg('circle-notch fa-spin', 'Waiting for location access.' , 20000);
  } else {
    showMsg('ban', 'Geolocation is not supported by this browser.' , 6000);
  }
}


function showErrorAfterLocationRequest(err) {
  switch(err.code) {
    case err.PERMISSION_DENIED:
      showMsg('ban', 'Access to location denied.' , 6000);
      break;
    case err.POSITION_UNAVAILABLE:
      showMsg('ban', 'Location information is unavailable.' , 6000);
      break;
    case err.TIMEOUT:
      showMsg('ban', 'Request for geolocation timed out.' , 6000);
      break;
    case err.UNKNOWN_ERROR:
      showMsg('ban', 'An unknown error occurred.' , 6000);
      break;
  }
}

// DEBUG: Run the function here for now untill the UI is ready
getLocation()

//
//  Help Functions of the App includes:
//  removeToastAfterAction(), showMsg(), getWeatherForUserLocation(),
//
//


// Remove previous Toast so another toast can be shown or remove it completely
function removeToastAfterAction() {
  if ($('.toast').length > 0) {
    const toastElement = $('.toast').first()[0];
    const toastInstance = toastElement.M_Toast;
    toastInstance.remove()
  }
}

// Modular Toast Function that takes and icon if any, a message, and a timeout number in ms
// Show a Toast after and action is taken to inform user of the result
function showMsg(icon, message, time) {
  if (icon !== null) {
    removeToastAfterAction();
    Materialize.toast(`<i class="fas fa-${icon}"></i> &nbsp; - &nbsp; ${message}`, time);
  } else {
    removeToastAfterAction();
    Materialize.toast(`${message}`, time);
  }
}

// Get Weather for users Location
function getWeatherForUserLocation(position) {
  showMsg('check', 'Established approximate location.' , 6000);

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let UNITS = "metric" // TODO: Check what the user selected and pass it to the url
  const API_KEY = ''
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}`

  // DEBUG: Log Lat & Lot GPS Coords
  console.log(lat, lon)


  $.get(URL, function(res) {
    console.log(res)
    $('.weather span.temp').html(res['main']['temp'],"C")
    $('.weather span.city').html(res['name'] +", "+ res['sys']['country'])
  });

}
