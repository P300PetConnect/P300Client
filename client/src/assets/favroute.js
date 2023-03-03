// alert("favourt js");

function getArray(arr1, arr2, IdArray) {
    console.log(arr1);
    console.log(arr2);
    console.log(IdArray);

    //Two arrays 1- fromPoints 2-ToPoints
    var startPointsList = arr1;
    var endtPointsList = arr2;


    //Looping through the lists
    //#endregion
    const numbers = [1, 2, 3, 4, 5];
    for (i = 0; i < startPointsList.length; i++) {
  
      console.log("in list loop");
      console.log(i);
      var startP = startPointsList[i];
      var endP = endtPointsList[i];
      var post = IdArray[i];

      GetRoutInfo(startP, endP, i, post);

    }
    //#endregion


    //#region Draw route info of list item
    function GetRoutInfo(start, end, i, post) {


      console.log("Post selected: ");
      console.log(post);

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
          console.log("Card no. :" + i + " is printed");

          setTimeout(null, 1000);
          var numOFSteps = 0;
          var ExpectedCalories = 0;
          numOFSteps = (1000 * parseInt(response.routes[0].legs[0].distance.text)) / 0.7; //This gets expected steps
          ExpectedCalories = (numOFSteps * 0.04) //This will get the number of expected calories burned
          //#region  HTML Cards

          document.getElementById("accordionExampleFav").innerHTML += `<div class="card">
<div class="card-header" id="heading${i}">
  <h2 class="mb-0">
    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true"
      aria-controls="collapse${i}">
      Route ${i + 1} - ${start} -> ${end}
    </button>
  </h2>
</div>

<div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionExample">
  <div onclick="ShowRoute('${start}', '${end}')" class="card-body">
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
        <div  id="FavRoutesList">
          <div class="card-footer row align-items-start">
            <div class="btn btn-outline-primary ms-2 col" id="${post._id + 'e'}"  data-bs-toggle="modal" data-bs-target="#editPostModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
            </div>
            
            <div class="btn btn-outline-danger ms-2 col" id="${post._id + 'd'}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></div>

            <div  class="btn btn-outline-info ms-2 col" id="${post._id + 's'}" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
            <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
              </div>


          </div>

        </div>
      </div>
    </div>
  </div>
</div>

</div>
`;

          console.log("Id Entered to button: " + post._id);
          //#endregion
        }
      })

    }

    //#endregion


    function ShowRoute(start, end) {
      console.log("show route 0-0");

      //This function will draw the line
      drawRoute(start, end, "WALKING", animate = true, color = '#e53935');
      drawRoute2(end, start, "DRIVING", animate = true, color = '#07e672');
    }


    function drawRoute(start, end, method, animate = true, color = '#e53935') {
      var directionsService = new google.maps.DirectionsService();
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

      directionsService.route(request, function (response, status) {
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

          // directionsDisplay.setDirections(response);
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

        }
      });
    }

    // variables reset
    var startPointsList = [];
    var endtPointsList = [];
  }


  // here the weather working 
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');

  // End of weather
  function passDataToAngular() {

  }


  // Share a route
  function shareRoute(from,to,routeName,email){
    console.log("Share route clicked >>>>");
    if ('share' in navigator) {
          navigator.share({
              title: 'Shared route: '+`${routeName}`,
      text: `${email}`+" shared with you a favourite route " +'from '+`${from}`+" to "+`${to}`+ "\n link to get directions "+ 'https://www.google.com/maps/dir/'+`${from}`+'/'+`${to}`
          })
          .then(() => {
              console.log('Callback after sharing');
          })
          .catch(console.error);
      } else {
          // Implement fallback sharing option
    alert('The Web Share API is not supported in this browser.');
      }
  }
  // End of share a route


  // Copy route id
  function copyRouteID(routeID) {
    // Get the text field

    // Copy the text inside the text field
    navigator.clipboard.writeText(routeID);
    
    // Alert the copied text
    // alert("Copied the text: " + copyText.value);
  }