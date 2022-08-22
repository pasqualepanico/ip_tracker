//loading the initial page with the map that is centered to the location where the IP address is released.
//Displaying values of IP address, Location, Timezone and ISP

function setIPAddress(){
  const xhttp = new XMLHttpRequest();
  var api_key = "at_2RduBkgkHbTXRzv4ela87g6EaJIHb";

  xhttp.onload = function (){
    var answer = xhttp.responseText;
    console.log(xhttp.responseText);
    const geoLocationData = JSON.parse(answer);

    console.log(geoLocationData.ip);
    document.querySelector(".ip").innerHTML = geoLocationData.ip;

    console.log(geoLocationData.location.city);
    document.querySelector(".location").innerHTML = geoLocationData.location.city;

    var latitude = geoLocationData.location.lat;

    var longitude = geoLocationData.location.lng;


    console.log(geoLocationData.location.timezone);
    document.querySelector(".timezone").innerHTML = geoLocationData.location.timezone;

    console.log(geoLocationData.isp);
    document.querySelector(".isp").innerHTML = geoLocationData.isp;

    //Loading the map

    mapDisplay(latitude, longitude);

  }

  xhttp.open("GET", "https://geo.ipify.org/api/v2/country,city?apiKey="+ api_key);
  xhttp.send();

}

//Map displaying with leaflet

function mapDisplay(latitude, longitude){
  var map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  var blackIcon = L.icon({
    iconUrl : 'public/icon-location.svg',

    iconSize:     [40, 55] // size of the icon

  });

  L.marker([latitude, longitude], {icon: blackIcon}).addTo(map);

}


// Serach by IP or domain

$(".styling-arrow").click(setIpAddressBySearch);

function setIpAddressBySearch(){
  var inputValue = document.querySelector(".search-input");
  const xhttp = new XMLHttpRequest();
  var api_key = "at_2RduBkgkHbTXRzv4ela87g6EaJIHb";

    xhttp.onload = function() {
      var answer1 = xhttp.responseText;
      console.log(answer1);

      const data = JSON.parse(answer1);

      document.querySelector(".ip").innerHTML = data.ip;
      document.querySelector(".location").innerHTML = data.location.city;
      var lat = data.location.lat;
      //console.log(data.location.lat);

      var long = data.location.lng;
      //console.log(data.location.lng);
      document.querySelector(".timezone").innerHTML = data.location.timezone;
      document.querySelector(".isp").innerHTML = data.isp;

      }

      xhttp.open("GET", "https://geo.ipify.org/api/v2/country,city?apiKey="+ api_key + "&ipAddress=" + inputValue.value);
      xhttp.send();

        if (inputValue.value.includes("@")){
            var email = inputValue.value;
            xhttp.onload = function(){
                              var answer2 = xhttp.responseText;
                              console.log(answer2);

                              const data2 = JSON.parse(answer2);

                              document.querySelector(".ip").innerHTML = data2.ip;
                              document.querySelector(".location").innerHTML = data2.location.city;


                              document.querySelector(".timezone").innerHTML = data2.location.timezone;
                              document.querySelector(".isp").innerHTML = data2.isp;

                              }
            xhttp.open("GET", "https://geo.ipify.org/api/v2/country,city?apiKey="+ api_key + "&email=" + email);
            xhttp.send();
        }
        else if (inputValue.value.includes(".")){
            var domain = inputValue.value;
            xhttp.onload = function(){
                            var answer3 = xhttp.responseText;
                            console.log(answer3);

                            const data3 = JSON.parse(answer3);

                            document.querySelector(".ip").innerHTML = data3.ip;
                            document.querySelector(".location").innerHTML = data3.location.city;


                            document.querySelector(".timezone").innerHTML = data3.location.timezone;
                            document.querySelector(".isp").innerHTML = data3.isp;
                            
                            }
            xhttp.open("GET", "https://geo.ipify.org/api/v2/country,city?apiKey="+ api_key + "&domain=" + domain);
            xhttp.send();
            }

}
