// var bootleaf = {
//   "mapWkid": 4326,
//   "layerTOC": {},
//   "tocOptions": {
//     "exclusiveGroups": [],
//     "groupCheckboxes": true
//   },
//   "activeTool": null,
//   "identifyLayers": [],
//   "layers": [],
//   "wfsLayers": [],
//   "labelLayers": [],
//   "identifyLayerHeadings": [],
//   "clickTolerance": 5,
//   "currentTool": null,
//   "queryTasks": [],
//   "filterTasks": [],
//   "queryResults": {},
//   "visibleLayers": [],
//   "basemaps": [
//     {"id": "MapboxStreets", "type": "mapbox", "theme": "streets", "label": "Streets (MapBox)"},
//     {"id": "MapboxLight", "type": "mapbox", "theme": "light", "label": "Light (MapBox)"},
//     {"id": "MapboxDark", "type": "mapbox", "theme": "dark", "label": "Dark (MapBox)"},
//     {"id": "MapboxSatellite", "type": "mapbox", "theme": "satellite", "label": "Satellite (MapBox)"},
//     {"id": "MapboxSatelliteStreets", "type": "mapbox", "theme": "streets-satellite", "label": "Streets with Satellite (MapBox)"},
//     {"id": "MapboxHighContrast", "type": "mapbox", "theme": "high-contrast", "label": "High-contrast (MapBox)"},
//     {"id": "esriStreets", "type": "esri", "theme": "Streets", "label": "Streets (ArcGIS)"},
//     {"id": "esriGray", "type": "esri", "theme": "Gray", "label": "Light gray (ArcGIS)"},
//     {"id": "esriTopographic", "type": "esri", "theme": "Topograhic", "label": "Topographics (ArcGIS)"},
//     {"id": "esriImagery", "type": "esri", "theme": "Imagery", "label": "Satellite (ArcGIS)"},
//     {"id": "esriShadedRelief", "type": "esri", "theme": "ShadedRelief", "label": "Shaded relief (ArcGIS)"},
//     {"id": "esriTerrain", "type": "esri", "theme": "Terrain", "label": "Terrain (ArcGIS"},
//     {"id": "esriDarkGray", "type": "esri", "theme": "DarkGray", "label": "Dark gray (ArcGIS)"},
//     {"id": "esriNationalGeographic", "type": "esri", "theme": "NationalGeographic", "label": "National Geographic (ArcGIS)"},
//     {"id": "esriOceans", "type": "esri", "theme": "Oceans", "label": "Oceans (ArcGIS)"},
//     {"id": "OpenStreetMap", "type": "tiled", "label": "OpenStreetMap", "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"},
//     {"id": "Aerial", "type": "bing", "label": "Bing satellite"},
//     {"id": "AerialWithLabels", "type": "bing", "label": "Bing satellite labels"},
//     {"id": "Road", "type": "bing", "label": "Bing streets"}
//   ]
// };

// $(document).ready(function(){

//   try{

//     // The beforeMapLoads function allows for insertion of custom properties to manipulate the config file, or other operations
//     // which need to occur, without requiring any modification to the core Bootleaf codebase.

//     // If the config file specifies requireArcGISLogin: true, show the login modal. Once the user
//     // has successfully logged in, the beforeMapLoads function will be called.
//     if (config.requireArcGISLogin) {
//       $("#loading").hide();
//       $("#loginModal").modal({backdrop: 'static', keyboard: false});
//     } else {
//       // Otherwise just call the beforeMapLoads function now
//       beforeMapLoads();
//     }

//   } catch (error){
//     $.growl.error({message: "There was a problem running the BeforeMapLoads custom code: " + error.message, fixed: true});
//   }

// });

// function loadMap(){
//   console.log("Load map function");


//   // Initialise the map using the start parameters from the config file, and the visibleAtStart layers
//   if(config.start.maxZoom === undefined){config.start.maxZoom = 19;} // Required for the Marker Clusterer
//   bootleaf.map = L.map("map", config.start);

//   // Hide the loading indicator
//   // TODO - show the loading indicator when something happens
//   $("#loading").hide();

//   // Enable Identify if any identifiable layers are present
//   // updateIdentifyLayers();

//   // Set the active tool, if applicable and supported by the current layers
//   if (config.activeTool !== undefined){
//     $(".mapTools").removeClass("active");

//     if (config.activeTool === 'identify') {
//       if (bootleaf.identifyLayers && bootleaf.identifyLayers.length > 0){
//         configureIdentifyTool();
//         $('*[data-tool="' +  config.activeTool + '"]').addClass("active");
//       }

//     } else if (config.activeTool === 'coordinates') {
//       configureCoordinatesTool();
//       $('*[data-tool="' +  config.activeTool + '"]').addClass("active");
//     } else if (config.activeTool === 'queryWidget'){
//       if (bootleaf.queryTasks && bootleaf.queryTasks.length > 0){
//         configureQueryWidget();
//         $('*[data-tool="' +  config.activeTool + '"]').addClass("active");
//       }
//     } else if (config.activeTool === 'filterWidget'){
//       if (bootleaf.filterTasks && bootleaf.filterTasks.length > 0){
//         configureFilterWidget();
//         $('*[data-tool="' +  config.activeTool + '"]').addClass("active");
//       }
//     }
//     // TODO - add more tools here, with corresponding configureXXXtool functions

//   } else {
//     $("#sidebar").hide("slow");
//     $(".mapTools").removeClass("active");
//   }

//   // Run custom code after the map has loaded
//   // try{
//     SettingMap();
//     afterMapLoads();


// }


// //set map options
// function initMap() {

// }
// var myLatLng;
// var mapOptions;

// //create map
// var map;

// // alert("Index js");
// //create a DirectionsService object to use the route method and get a result for our request
// var directionsService;

// //create a DirectionsRenderer object which we will use to display the route
// var directionsDisplay;

// function SettingMap() {
//   myLatLng = { lat: 54.2789982, lng: -8.4606109 };
//   mapOptions = {
//     center: myLatLng,
//     zoom: 16,
//     mapTypeId: google.maps.MapTypeId.ROADMAP

  
//   };
//   map = new google.maps.Map(document.getElementById('map'), mapOptions);

//   directionsService = new google.maps.DirectionsService();

//   directionsDisplay = new google.maps.DirectionsRenderer();


//   directionsDisplay.setMap(map);

//   //bind the DirectionsRenderer to the map



//   //#region Autofill user location helper
//   var options = {
//     types: ['address']
//     //   componentRestrictions: {country: "ir"}
//   }

// }


// /**************************************************************************************************/
// // IDENTIFY TOOL START
// /**************************************************************************************************/

// function configureIdentifyTool(){

//   resetSidebar("Identify results");
//   $("#sidebar").show("slow");
//   switchOffTools();
//   bootleaf.activeTool = "identify";

//   if (bootleaf.identifyLayers.length === 0){
//     $("#sidebarContents").html("<p><span class='info'>There are no identifiable layers currently visible on the map</span></p>");
//     disableIdentify()
//   } else {
//     $("#sidebarContents").html("<p><span class='info'>Click on the map to identify visible layers</span></p>");
//     enableIdentify();
//   }
// }

// // function to run when form submitted
// function authoriseArcGIS (e) {
//   // prevent page from refreshing
//   e.preventDefault();
//   $("#btnArcGISOnline").prop("disabled", true);

//   // get values from form
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   // generate token from server and add service from callback function
//   serverAuth(config.tokenUrl, username, password, function (error, response) {
//     if (error) {
//       $("#btnArcGISOnline").prop("disabled", false);
//       $.growl.error({message: "There was a problem logging in to ArcGIS Online", fixed: true});
//       return;
//     }
//     config.token = response.token;
//     console.log("Your ArcGIS Online token is ", config.token);
//     $.growl.notice({message: "Successfully signed in to ArcGIS Online"});
//     beforeMapLoads();
//     $("#loginModal").modal("hide");
//   });
// }
