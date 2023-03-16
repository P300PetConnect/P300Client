
//javascript.js
//set map options
function initMap() {

}
var myLatLng;
var mapOptions;

//create map
var map;

// alert("Index js");
//create a DirectionsService object to use the route method and get a result for our request
var directionsService;

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay;

function SettingMap() {
  myLatLng = { lat: 54.2789982, lng: -8.4606109 };
  mapOptions = {
    center: myLatLng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP

  
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  directionsService = new google.maps.DirectionsService();

  directionsDisplay = new google.maps.DirectionsRenderer();


  directionsDisplay.setMap(map);

  //bind the DirectionsRenderer to the map



  //#region Autofill user location helper
  var options = {
    types: ['address']
    //   componentRestrictions: {country: "ir"}
  }

  var input1 = document.getElementById("from");
  var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

  var input2 = document.getElementById("to");
  var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
  //#endregion

  console.log("setting up map done");
}
SettingMap();

console.log("Before onCalc");
//#region Here when we call this function it will draw the line
function calcRoute() {

  // directionsDisplay.setMap(map);

  var startPoint = document.getElementById("from").value;
  var endPoint = document.getElementById("to").value;

  console.log("start Point : " + startPoint);
  //This function will draw the line
  drawRoute(startPoint, endPoint, "WALKING", animate = true, color = '#e53935');
  drawRoute2(endPoint, startPoint, "DRIVING", animate = true, color = '#07e672');

}
//#endregion

//#region  Map Drawing

// Trying here
function zoomToObject(obj){
  var bounds = new google.maps.LatLngBounds();
  var points = obj.getPath().getArray();
  for (var n = 0; n < points.length ; n++){
      bounds.extend(points[n]);
  }
  map.fitBounds(bounds);
}
// 

var allRoutePaths = []; //Save all route paths for later to clear
var allRouteMarkers = [];//Save all route markers for later to clear



function drawRoute(start, end, method, animate = true, color = '#e53935') {
  var directionsService1 = new google.maps.DirectionsService();
  var waypoints = [
    {location: start},
    {location: end}
   
  ];
  var request = {
    origin: start,
    destination: end,
    waypoints: waypoints,
    travelMode: google.maps.DirectionsTravelMode[method],
    unitSystem: google.maps.UnitSystem.METRIC //KM and Meters

  };

  for (i = 0; i < allRoutePaths.length; i++) {
    allRoutePaths[i].setMap(null); //This will remove the previous polylines
  }

  for (i = 0; i < allRouteMarkers.length; i++) {
    allRouteMarkers[i].setMap(null); //This will remove the previous markers
  }

  directionsService1.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      document.getElementById("from").value = start;
      document.getElementById("to").value = end;
      // Here we get the info for the distance and duration
      const output = document.querySelector('#output');
      output.style.display = "block";

      output.innerHTML = `<div style="background-color: azure;" class="card " >
<div class="card-body">
  <h5 class="card-title"> ${document.getElementById("from").value} </h5>
  <h6 class="card-subtitle mb-2 text-muted">${document.getElementById("to").value}</h6> <span>via Google maps</span>
  <p style="font-size:18px ;text-align: left;color: black;margin-bottom: 0%;background-color: aliceblue;" class="list-group-item">Distance: <span style="text-align:right;"> ${response.routes[0].legs[0].distance.text}</span></p>
  <p style="font-size:18px ;text-align: left;color: black;margin-bottom: 0%;background-color: aliceblue;" class="list-group-item">Duration: <span style="text-align:right;"> ${response.routes[0].legs[0].duration.text}</span></p>
  <p style="font-size:18px ;text-align: left;color: black;margin-bottom: 0%;background-color: aliceblue;" class="list-group-item">Calories: <span style="text-align:right;"> 119kcal</span></p>

  <a href="#" class="card-link">save route</a>

</div>
</div>`;

    directionsDisplay.setMap(map);



      var lineSymbol = {
        // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 3
      };

      var routePath = new google.maps.Polyline({
        path: response.routes[0].overview_path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0,
        fillOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '10px'
        }],
      });

      allRoutePaths.push(routePath);
      zoomToObject(routePath);
      if (animate) {
        animateLine(routePath);
      }

      //#region  Markers

      const image = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
      };

      const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
      };

      routePath.setMap(map);

      //This gets marker 1
      var marker = new google.maps.Marker({
        position: response.routes[0].overview_path[0],
        map: map,
        icon: image,
        shape: shape,
        title: 'Starting Point'


      });

      allRouteMarkers.push(marker);

      //#endregion


      //Direct user to googlr maps api when clcik on route 
      //https://www.google.com/maps/dir/?api=1&origin=Space+Needle+Seattle+WA&destination=Pike+Place+Market+Seattle+WA&travelmode=bicycling
      google.maps.event.addListener(routePath, 'click', function (e) {
        Swal.fire({
          title: 'Would you like to see map navigations?',
          text: "This will direct you to goole map",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#00ff73',
          cancelButtonColor: '#ff0800',
          confirmButtonText: 'Yes, direct me!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Directed',
              'Your have been directed to google maps.',
              'success'
            )
            alert("Clicking route Works! Route showing");
          }
        })

      });
    }
  });
}
function drawRoute2(start, end, method, animate = true, color = '#e53935') {
  var directionsService = new google.maps.DirectionsService();
  var waypoints = [
    {location: end}

  ];
  var request = {
    origin: start,
    destination: end,
    waypoints: waypoints,
    travelMode: google.maps.DirectionsTravelMode[method],
    unitSystem: google.maps.UnitSystem.METRIC //KM and Meters

  };

  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {

  

      var lineSymbol = {
        // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 3
      };

      console.log(response.routes);
console.log("Route length is : "+response.routes.length );
      var path = response.routes[0].overview_path;
      if (response.routes.length >= 2) {
        path = response.routes[1].overview_path;
      }

      var routePath = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0,
        fillOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '10px'
        }],
      });

      allRoutePaths.push(routePath);

      // directionsDisplay.setDirections(response);
      if (animate) {
        animateLine(routePath);
      }
      routePath.setMap(map);
      var marker = new google.maps.Marker({
        position: response.routes[0].overview_path[0],
        map: map,
        title: 'Hello World!'


      });

      allRouteMarkers.push(marker);

    }
  });
}

function animateLine(line) {

  var count = 0;
  var zoomLevel;
  var markSpeed;
  var multiPointer = 10;

  window.setInterval(function () {


    count = (count + 1) % 200;
    var icons = line.get('icons');
    icons[0].offset = (count / markSpeed) + '%';
    line.set('icons', icons);


    var getZoom0 = line.get('map');
    var getZoom1 = getZoom0.getZoom();

    zoomLevel = getZoom1;

    if (zoomLevel >= 21) {
      // markSpeed = 120;
      markSpeed = multiPointer * zoomLevel / 0.6;
    }
    else if (zoomLevel >= 19) {
      // markSpeed = 120;
      markSpeed = multiPointer * zoomLevel / 1;
    }
    else if (zoomLevel >= 16) {
      // markSpeed = 60;
      markSpeed = multiPointer * zoomLevel / 4;

    }
    else {
      // markSpeed = 10;
      markSpeed = multiPointer * zoomLevel / 40;

    }

    //console.log("Zoom Level :" + zoomLevel);
    //console.log("Mark Speed :" + markSpeed);


  }, 100);

}
//#endregion





//#region List of Routes
//#region array of lat lang 
var latLong = [];
var latLong2 = [];

var startPointsList = ["31 yeats heights", "31 Yeats Villege", "ATU Sligo"];
var endtPointsList = ["ATU Sligo", "Tesco Sligo", "Sligo Garda Station"];


// //Route 1
// latLong[0]['Slat'] = 54.282080;//31 yeats heights
// latLong[0]['Slng'] = -8.449770;
// latLong[0]['Elat'] = 54.270600;//ATU Sligo
// latLong[0]['Elng'] = -8.471640;

// //Route 2
// latLong[1]['Slat'] = 54.282080;//31 yeats heights
// latLong[1]['Slng'] = -8.449770;
// latLong[1]['Elat'] = 54.275195;//ATU Sligo
// latLong[1]['Elng'] = -8.4644972;


//latLong2[0]=(start:54.282080,-8.449770);

//#endregion
const numbers = [1, 2, 3, 4, 5];
for (i = 0; i < startPointsList.length; i++) {
  // var listStartPoint=new google.maps.LatLng(latLong[i]['Slat'], latLong[i]['Slng']);
  // var listEndPoint=new google.maps.LatLng(latLong[i]['Elat'], latLong[i]['Elng']);
  console.log("in list loop");
  console.log(i);
  var s = startPointsList[i];
  var e = endtPointsList[i];
  GetRoutInfo(s, e, i)

}
//#endregion


//#region Draw route info of list item
function GetRoutInfo(start, end, i) {

  console.log("Start from grt info: " + start);
  var directionsService = new google.maps.DirectionsService();
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode["WALKING"],
    unitSystem: google.maps.UnitSystem.METRIC //KM and Meters

  };


  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {


      var numOFSteps = 0;
      var ExpectedCalories = 0;
      numOFSteps = (1000 * parseInt(response.routes[0].legs[0].distance.text)) / 0.7; //This gets expected steps
      ExpectedCalories = (numOFSteps * 0.04) //This will get the number of expected calories burned
      //#region  HTML Cards
    //   document.getElementById("accordionExample").innerHTML += `  <div class="card">
    //   <div class="card-header" id="heading${i}">
    //     <h2 class="mb-0">
    //       <button style="color:#07b1e0;font-family: "Poppins", sans-serif;text-decoration: none;" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
    //         Route ${i + 1} - ${start} -> ${end}
    //       </button>
    //     </h2>
    //   </div>
    
    //   <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}"  data-parent="#accordionExample">
    //     <div onclick="ShowRoute('${start}', '${end}')" class="card-body">
    //       <div class="container">
    //         <div class="row align-items-start">
    //             <div class="col">
    //                 <div class="card-body">
    //                     <h5 class="card-title">${response.routes[0].legs[0].distance.text}</h5>
    //                     <h6 class="card-subtitle mb-2 text-muted">Distance</h6>
    
    //                 </div>
    //             </div>
    //             <div class="col">
    //               <div class="card-body">
    //                 <h5 class="card-title">${response.routes[0].legs[0].duration.text}</h5>
    //                 <h6 class="card-subtitle mb-2 text-muted">Duration</h6>
    
    //             </div>
    //             </div>
    //             <div class="col">
    //               <div class="card-body">
    //                 <h5 class="card-title">${ExpectedCalories.toFixed(2)}</h5>
    //                 <h6 class="card-subtitle mb-2 text-muted">Expected Calories Burned</h6>
    
    //             </div>
    //             </div>
    //             <div class="col">
    //               <div class="card-body">
    //                 <h5 class="card-title">${numOFSteps.toFixed(2)}</h5>
    //                 <h6 class="card-subtitle mb-2 text-muted">Steps</h6>
    
    //             </div>
    //             </div>
    //         </div>
    //     </div>
    //             </div>
    //   </div>
      
    // </div>`;
      //#endregion
      // document.getElementById(`collapse${i}`).addEventListener("click", ShowRoute(start,end));

    }


  })

}

//#endregion

function DisAlert() {
  alert("Clciked");
}
//#region  Show listItem on map
function ShowRoute(start, end) {
  console.log("show route 0-0");

  //This function will draw the line
  drawRoute(start, end, "WALKING", animate = true, color = '#e53935');
  drawRoute2(end, start, "WALKING", animate = true, color = '#07e672');

}


//getting the address name from lan lat and doing some checking on them 
function getReverseGeocodingData(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      var address = (results[0].formatted_address);
      console.log(address);
      //making the value of the starting point as the current location 
      var StartPointValue = document.getElementById("from").value = address;

      // codeAddress()

    }
  });

}

//getting the address name from lan lat and doing some checking on them 
function getReverseGeocodingData2(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      var address = (results[0].formatted_address);
      console.log(address);
      //making the value of the starting point as the current location 
      var EndPointValue = document.getElementById("to").value = address;

      // codeAddress()

    }
  });

}
//#endregion





document.getElementById("mkRoute").addEventListener("click", showMakeRoute);

function showMakeRoute() {

  document.getElementById("GenRoute").getElementsByTagName("a")[0].style.backgroundColor="whitesmoke";
  document.getElementById("GenRoute").getElementsByTagName("a")[0].style.color="black";

  document.getElementById("FavRoute").getElementsByTagName("a")[0].style.backgroundColor="whitesmoke";
  document.getElementById("FavRoute").getElementsByTagName("a")[0].style.color="black";

  document.getElementById("mkRoute").getElementsByTagName("a")[0].className = "nav-link active";
  document.getElementById("GenRoute").getElementsByTagName("a")[0].className = "nav-link";
  document.getElementById("FavRoute").getElementsByTagName("a")[0].className = "nav-link";
  document.getElementById("mkRoute").getElementsByTagName("a")[0].style.backgroundColor="#17a2b8";
  document.getElementById("mkRoute").getElementsByTagName("a")[0].style.color="white";

  document.getElementById("formm").style.display = "block";
  document.getElementById("formmG").style.display = "none";
  document.getElementById("routesBoxes").style.display = "none"
  document.getElementById("output").style.display = "none";

 

}

document.getElementById("GenRoute").addEventListener("click", showGenRoute);

function showGenRoute() {

  document.getElementById("FavRoute").getElementsByTagName("a")[0].style.backgroundColor="whitesmoke";
  document.getElementById("FavRoute").getElementsByTagName("a")[0].style.color="black";

  document.getElementById("mkRoute").getElementsByTagName("a")[0].style.backgroundColor="whitesmoke";
  document.getElementById("mkRoute").getElementsByTagName("a")[0].style.color="black";

  document.getElementById("mkRoute").getElementsByTagName("a")[0].className = "nav-link";
  document.getElementById("GenRoute").getElementsByTagName("a")[0].className = "nav-link active";
  document.getElementById("FavRoute").getElementsByTagName("a")[0].className = "nav-link";
  document.getElementById("GenRoute").getElementsByTagName("a")[0].style.backgroundColor="#17a2b8";
  document.getElementById("GenRoute").getElementsByTagName("a")[0].style.color="white";

  document.getElementById("formmG").style.display = "block";
  document.getElementById("formm").style.display = "none";
  document.getElementById("output").style.display = "none";
  document.getElementById("routesBoxes").style.display = "none";

 


}


document.getElementById("FavRoute").addEventListener("click", showFavRoute);

function showFavRoute() {
  document.getElementById("GenRoute").getElementsByTagName("a")[0].style.backgroundColor="whitesmoke";
  document.getElementById("GenRoute").getElementsByTagName("a")[0].style.color="black";

  document.getElementById("mkRoute").getElementsByTagName("a")[0].style.backgroundColor="whitesmoke";
  document.getElementById("mkRoute").getElementsByTagName("a")[0].style.color="black";

  document.getElementById("mkRoute").getElementsByTagName("a")[0].className = "nav-link";
  document.getElementById("GenRoute").getElementsByTagName("a")[0].className = "nav-link";
  document.getElementById("FavRoute").getElementsByTagName("a")[0].className = "nav-link  active";
  document.getElementById("FavRoute").getElementsByTagName("a")[0].style.backgroundColor="#17a2b8";
  document.getElementById("FavRoute").getElementsByTagName("a")[0].style.color="white";
  // 17a2b8
  document.getElementById("output").style.display = "none";
  document.getElementById("formmG").style.display = "none";
  document.getElementById("formm").style.display = "none";
  document.getElementById("routesBoxes").style.display = "block"

 


}






// Attempting the generate route





function GetCurrentLocationForInputG() {
  navigator.geolocation.getCurrentPosition(function (position) {
    startPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    getReverseGeocodingDataG(position.coords.latitude, position.coords.longitude);
  },
    function (error) {
      console.log("The Locator was denied. :(");
    })
}


function getReverseGeocodingDataG(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      var address = (results[0].formatted_address);
      console.log("From G address :" + address);
      //making the value of the starting point as the current location 
      var StartPointValue = document.getElementById("from").value = address;

      // codeAddress()

    }
  });

}



