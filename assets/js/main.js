$(document).ready(function() {
  $(".search").val("");
  $(".search").focus();
  $(".is-custom-color-icon-check").css('display', 'none');
  $(".is-custom-color-icon-ban").css('display', 'none');
  $(".is-custom-notification").css('display', 'none');
});

$(".search").on("change keyup paste", function() {
  $(".is-custom-color-icon-check").css('display', 'none');
  let = SEARCH_TERM = $(".search").val();
  let UNITS = "metric" // TODO: Check what the user selected and pass it to the url
  const API_KEY = '' // Open Weather Map API KEY
  const SEARCH_URL = `https://api.openweathermap.org/data/2.5/weather?q=${SEARCH_TERM}&units=${UNITS}&appid=${API_KEY}`

  if (!SEARCH_TERM) {
    $(".is-custom-hero-content p").removeClass("is-loading");
  }

  $(".is-custom-hero-content p").removeClass("is-loading");
  $(".is-custom-color-icon-ban").css('display', 'flex');
  $.get(SEARCH_URL, function(res) {
    if (res) {
      $(".is-custom-color-icon-ban").css('display', 'none');
      $(".is-custom-hero-content p").addClass("is-loading");
      document.getElementById("location_name").innerHTML = res['name'] + ", " + res['sys']['country'];
      document.getElementById("location_temp").innerHTML = res['main']['temp'];
      document.getElementById("location_temp_max").innerHTML = res['main']['temp_max'];
      document.getElementById("location_temp_min").innerHTML = res['main']['temp_min'];
      $(".is-custom-hero-content p").removeClass("is-loading");
      $(".is-custom-color-icon-check").css('display', 'flex');
    } else {
      $(".is-custom-hero-content p").addClass("is-loading");
      $(".is-custom-color-icon-ban").css('display', 'flex');
    }
  });
});


// Bulma Menu Toggler
document.addEventListener('DOMContentLoaded', function() {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener('click', function() {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});