
//javascript.js
//set map options
var myLatLng ;
var mapOptions ;

//create map
var map ;



//create a DirectionsService object to use the route method and get a result for our request
var directionsService;

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay ;



// alert("Gen2");
//#region Autofill user location helper
var options ;
var input1 ;
var autocomplete1 ;
//#endregion
function Gen2OnLoadDo(){
  myLatLng= { lat: 54.2789982, lng: -8.4606109 };

  mapOptions= {
    center: myLatLng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

map= new google.maps.Map(document.getElementById('map'), mapOptions);

directionsService = new google.maps.DirectionsService();

  directionsDisplay= new google.maps.DirectionsRenderer();

  //bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

  options= {
    types: ['address']
    //   componentRestrictions: {country: "ir"}
}

input1 = document.getElementById("fromG");
autocomplete1= new google.maps.places.Autocomplete(input1, options);
}



//#region Generate routes around Starting point 
var GeneratedPoints = [];
var GeneratedPointsAddresses = [];


// making the progress bar
// var ii = 0;
function updateProgBar() {
  document.getElementById("Progress_Status").style.display="block";
  var element = document.getElementById("myprogressBar");   
  var width = 1;
  var identity = setInterval(scene, 10);
  function scene() {
    if (width >= 100) {
      clearInterval(identity);
    } else {
      width++; 
      element.style.width = width + '%'; 
    }
  }
}
//End of making progress bar
//#region  Generate Routes


var positionGenAddress = "";
function GenerateRoutes() {
    console.log("Generate routes clicked00000");
    updateProgBar();
    GeneratedPoints = [];
    positionGenAddress = "";
    var DistanceEntered = parseInt(document.getElementById("DistanceG").value)/2;
    console.log("Entered Distance");
    console.log(DistanceEntered);

    if (document.getElementById("fromG").value != null && DistanceEntered != null) {
        console.log("Starting address: ");
        console.log(document.getElementById("fromG").value)
        // codeAddress(document.getElementById("fromG").value); //after this check if success
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': document.getElementById("fromG").value }, function (results, status) {
            console.log("Code address function is running : )");
            if (status == 'OK') {
                console.log("Testing long lat from the code address finder: ");
                console.log(String(results[0].geometry.location));
                //replace('characterToReplace', '');
                var locationLatLong0 = String(results[0].geometry.location).replace(')', '');
                var locationLatLong = locationLatLong0.replace('(', '');
                var latLongGen = locationLatLong.split(',');
                console.log("latLongGen:");
                console.log(latLongGen);
                console.log("locationLatLong:");
                console.log(locationLatLong);
                console.log("latLongGen[0]: ");
                console.log(latLongGen[0])
                var GenPosition = { lat: parseFloat(latLongGen[0]), lng: parseFloat(latLongGen[1]) };
                //alert(latLongGen[0])
                map.setCenter(results[0].geometry.location);
           


                //positionGenAddress = GenPosition;
                ToEastPosition(GenPosition, DistanceEntered)
                ToSouthPosition(GenPosition, DistanceEntered);
                ToNorthPosition(GenPosition, DistanceEntered);
                ToWestPosition(GenPosition, DistanceEntered);


                console.log("All generated addresses: ")

              


            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

        console.log("position lat lang of Gen address: ");
        console.log(positionGenAddress);
    
    } else {
        alert("Distance or start point should be not null");

    }


}




// codeAddress();
function codeAddress(address) {
    var geocoder = new google.maps.Geocoder();


    geocoder.geocode({ 'address': address }, function (results, status) {
        console.log("Code address function is running : )");
        if (status == 'OK') {
            console.log("Testing long lat from the code address finder: ");
            console.log(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });


            positionGenAddress = results[0].geometry.location;
            alert(results[0].geometry.location);
            alert(results[0].geometry.location);


        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}


//lat : 54.2824004
//long : -8.4524828
function ToNorthPosition(position, northDistance) {
    console.log("TO North Position Executed");
    console.log(position.lat + " lat from north");
    var r_earth = 6378;
    var pi = Math.PI;
    var new_latitude = parseFloat(position.lat) + (northDistance / r_earth) * (180 / pi);


    const latlng22 = new google.maps.LatLng(parseFloat(new_latitude.toFixed(7)), parseFloat(position.lng));
    console.log("new lat long from north: " + latlng22)
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng22 }, (results, status) => {
        // if (status !== google.maps.GeocoderStatus.OK) {
        //     alert(status);
        // }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log(results);
            var address2 = (results[0].formatted_address);
            console.log("new address north");
            console.log(address2);
            //making the value of the starting point as the current location 
            GeneratedPoints.push(address2);
            displayGeneratedPoints()
            //codeAddress()

        }
    });
}

//lat : 54.2824004
//long : -8.4524828
function ToEastPosition(position, eastDistance) {
    console.log("In to east");
    console.log(position)
    r_earth = 6378;
    var pi = Math.PI;
    var new_longitude = position.lng + (eastDistance / r_earth) * (180 / pi) / Math.cos(parseFloat(position.lat) * pi / 180);

    var myNewLatLngPoint = { lat: position.lat, lng: new_longitude };


    var latlng22 = new google.maps.LatLng(position.lat, new_longitude);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng22 }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var address2 = (results[0].formatted_address);
            console.log("new address east: ");
            console.log(address2);

            GeneratedPoints.push(address2);
            displayGeneratedPoints()
            //codeAddress()

        }
    });
}




//lat : 54.2824004
//long : -8.4524828
function ToSouthPosition(position, southDistance) {
    console.log("ToSouthPosition executed");
    r_earth = 6378;
    var pi = Math.PI;
    var new_latitude = parseFloat(position.lat) - (southDistance / r_earth) * (180 / pi);



    var latlng23 = new google.maps.LatLng(parseFloat(new_latitude).toFixed(7), parseFloat(position.lng));
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng23 }, (results, status) => {
     
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var address3 = (results[0].formatted_address);
            console.log("new address south: ");
            console.log(address3);
            //making the value of the starting point as the current location 
            //var StartPointValue = document.getElementById("to").value = address;
            GeneratedPoints.push(address3);
            displayGeneratedPoints()
        }
    });

}



function ToWestPosition(position, westDistance) {
    console.log("ToWestPosition executed");
    r_earth = 6378;
    var pi = Math.PI;
    var new_longitude = position.lng - (westDistance / r_earth) * (180 / pi) / Math.cos(parseFloat(position.lat) * pi / 180);
    //return new Position(position.lat, new_longitude);

    var latlng24 = new google.maps.LatLng(position.lat, new_longitude);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng24 }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var addressWest = (results[0].formatted_address);
            console.log("new address west: ");
            console.log(addressWest);

            GeneratedPoints.push(addressWest);
            displayGeneratedPoints()
            //codeAddress()

        }
    });


}



function displayGeneratedPoints(){
    if(GeneratedPoints.length>=4){
        for (i = 0; i < GeneratedPoints.length; i++) {
console.log(GeneratedPoints[i]);
    // var s = startPointsList[i];
    // var e = endtPointsList[i];
    if(document.getElementById("fromG").value!= null){
        GetRoutInfo2(document.getElementById("fromG").value, GeneratedPoints[i], i)
    }
    

  }
    }
}



//#region Draw route info of list item
function GetRoutInfo2(start, end, i) {
    
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



            var numOFSteps = (1000 * parseFloat(response.routes[0].legs[0].distance.text)) / 0.7; //This gets expected steps
            var ExpectedCalories = (numOFSteps * 0.04) //This will get the number of expected calories burned
            //#region  HTML Cards
            document.getElementById("accordionExample2").innerHTML += `  <div class="card">
        <div class="card-header" id="heading${i}">
          <h2 class="mb-0">
            <button style="color:#07b1e0;font-family: "Poppins", sans-serif;text-decoration: none;" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
           Route  ${i + 1} - ${start} -> ${GeneratedPoints[i]}
            </button>
          </h2>
        </div>
      
        <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}"  data-parent="#accordionExample">
          <div onclick="ShowRouteG('${start}', '${end}',${i})" class="card-body">
            <div class="container">
              <div class="row align-items-start">
                  <div class="col">
                      <div class="card-body">
                          <h5 class="card-title">${response.routes[0].legs[0].distance.text}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">Distance</h6>
      
                      </div>
                  </div>
                  <div class="col">
                    <div class="card-body">
                      <h5 class="card-title">${response.routes[0].legs[0].duration.text}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Duration</h6>
      
                  </div>
                  </div>
                  <div class="col">
                    <div class="card-body">
                      <h5 class="card-title">${ExpectedCalories.toFixed(2)}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Expected Calories Burned</h6>
      
                  </div>
                  </div>
                  <div class="col">
                    <div class="card-body">
                      <h5 class="card-title">${numOFSteps.toFixed(2)}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Steps</h6>
      
                  </div>
                  </div>
              </div>
          </div>
                  </div>
        </div>
        
      </div>`;
            //#endregion
         
        }


    })

}

//#endregion


function ShowRouteG(start, end,i) {
    console.log("show route 0-0");
  
    //This function will draw the line
    drawRouteG(start, end, "WALKING", animate = true, color = '#e53935',i);
    drawRouteG2(end, start, "WALKING", animate = true, color = '#07e672');
    // getReverseGeocodingData(startLatLong[0], startLatLong[1]);
    // getReverseGeocodingData2(endLatLong[0], endLatLong[1]);
  }
  function zoomToObject(obj){
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (var n = 0; n < points.length ; n++){
        bounds.extend(points[n]);
    }
    map.fitBounds(bounds);
  }



  var allRoutePaths = []; //Save all route paths for later to clear
  var allRouteMarkers = [];//Save all route markers for later to clear
  
  
//#region  Map Drawing 
function drawRouteG(start, end, method, animate = true, color = '#e53935',i) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.DirectionsTravelMode[method],
      unitSystem: google.maps.UnitSystem.METRIC //KM and Meters
  
    };


    for (i = 0; i < allRoutePaths.length; i++) {
      allRoutePaths[i].setMap(null); //This will remove the previous polylines
    }
  
    for (i = 0; i < allRouteMarkers.length; i++) {
      allRouteMarkers[i].setMap(null); //This will remove the previous markers
    }
  
    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
  document.getElementById("from").value=start;
  document.getElementById("to").value=end;
        // Here we get the info for the distance and duration
        const output = document.querySelector('#output');
        output.style.display="block";
  
        var numOFSteps = (1000 * parseFloat(response.routes[0].legs[0].distance.text)) / 0.7; //This gets expected steps
            var ExpectedCalories = (numOFSteps * 0.04) //This will get the number of expected calories burned
  output.innerHTML=`<div style="background-color: azure;" class="card " >
  <div class="card-body">
    <h5 class="card-title"> ${document.getElementById("fromG").value} </h5>
    <h6 class="card-subtitle mb-2 text-muted">${GeneratedPoints[i]}</h6> <span>via Google maps</span>
    <p style="font-size:18px ;text-align: left;color: black;margin-bottom: 0%;background-color: aliceblue;" class="list-group-item">Distance: <span style="text-align:right;"> ${response.routes[0].legs[0].distance.text}</span></p>
    <p style="font-size:18px ;text-align: left;color: black;margin-bottom: 0%;background-color: aliceblue;" class="list-group-item">Duration: <span style="text-align:right;"> ${response.routes[0].legs[0].duration.text}</span></p>
    <p style="font-size:18px ;text-align: left;color: black;margin-bottom: 0%;background-color: aliceblue;" class="list-group-item">Calories: <span style="text-align:right;"> ${ExpectedCalories.toFixed(2)} kcal</span></p>
  
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
  
        // directionsDisplay.setDirections(response);
        if (animate) {
          animateLineG(routePath);
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
  function drawRouteG2(start, end, method, animate = true, color = '#e53935') {
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.DirectionsTravelMode[method],
      unitSystem: google.maps.UnitSystem.METRIC //KM and Meters
  
    };

    var lineSymbol = {
        // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 3
      };


    var routePath = new google.maps.Polyline({
        path: null,
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


    
      
   
    directionsService.route(request, function (response, status) {
        
      if (status == google.maps.DirectionsStatus.OK) {

  
        var path = response.routes[0].overview_path;
        if (response.routes.length >= 2) {
          path = response.routes[1].overview_path;
        }
  

         routePath = new google.maps.Polyline({
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

        console.log("Route Path")
        console.log(routePath)
    
        if (animate) {
          animateLineG(routePath);
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

  function RemovePath(path){
     path[0].setMap(null);

  }

  function CenterToPath(start){
    geocoder.geocode({ 'address': start }, function (results, status) {
        console.log("Code address function is running : )");
        if (status == 'OK') {
            console.log("Testing long lat from the code address finder: ");
            console.log(String(results[0].geometry.location));
            //replace('characterToReplace', '');
            var locationLatLong0 = String(results[0].geometry.location).replace(')', '');
            var locationLatLong = locationLatLong0.replace('(', '');
            var latLongGen = locationLatLong.split(',');
          
            var GenPosition = { lat: parseFloat(latLongGen[0]), lng: parseFloat(latLongGen[1]) };
   
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
  }
  
  function animateLineG(line) {
  
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
  
     // console.log("Zoom Level :" + zoomLevel);
     // console.log("Mark Speed :" + markSpeed);
  
  
    }, 100);
  
  }
  //#endregion