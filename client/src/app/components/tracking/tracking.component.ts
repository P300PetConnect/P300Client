import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'], 
})
export class TrackingComponent implements OnInit {
  

  ngOnInit(): void {
console.log('test',   AWS); 

    const map = new maplibregl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [54.2781407,-8.446533],
      zoom: 12
    });

    this.main(); 

  }
}
// Initialize a map
// // Initialize a map
// async initializeMap(centerCoords) {
//   // Load credentials and set them up to refresh
//   await this.credentials.getPromise();
  
//   // Initialize the map
//   const mlglMap = new maplibregl.Map({
//     container: "map", // HTML element ID of map element
//     center: centerCoords, // Initial map centerpoint
//     zoom: 15, // Initial map zoom
//     style: this.mapName,
//     transformRequest: (url, resourceType) => this.transformRequest(url, resourceType),
//   });

//   // Add navigation control to the top left of the map
//   // mlglMap.addControl(new maplibregl.NavigationControl(), "top-left");
//   return mlglMap;
// }

// async  main() {
//   const posHis = await this.geoLocation?.getDevicePositionHistory({
// 	    DeviceId: "randomTrip-1",
// 	    TrackerName: "mobile-tracker"
// 	}).promise();
  
//   const coords = posHis.DevicePositions.map(loc => loc.Position);
//   console.log(`Historic positions ${coords}`);

//   const centerOfRoute = coords.reduce((acc, curr) => ([curr[0]+acc[0], curr[1]+acc[1]]), [0, 0]).map(c => c/coords.length);
//   console.log(`center of route is ${centerOfRoute}`);


//   if (coords.length > 1) {
//     // Initialize map and AWS SDK for Location Service:
//     const map = await this.initializeMap(centerOfRoute);
//     this.addRouteLine(map, coords);
//   }
// }
// // Addition functions
// addRouteLine(map, coords) {
//   map.on('load', function() {
// const sourrceMarker = new maplibregl.Marker()
//     .setLngLat(coords[0])
//     .addTo(map);
// const el = document.createElement('div');
// el.className='marker location-destination';

//      const destinationMarker = new maplibregl.Marker(el)
//     .setLngLat(coords[coords.length - 1])
//     .addTo(map);

//       map.addSource('route', {
//           'type': 'geojson',
//           'data': {
//               'type': 'Feature',
//               'properties': {},
//               'geometry': {
//                   'type': 'LineString',
//       'coordinates': coords
//   }
//           }
//       });
//       map.addLayer({
//           'id': 'route',
//           'type': 'line',
//           'source': 'route',
//           'layout': {
//               'line-join': 'round',
//               'line-cap': 'round'
//           },
//           'paint': {
//               'line-color': '#ed6498',
//               'line-width': 8
//           }
//       });
//   });
// }


// transformRequest(url, resourceType) {
//   console.log('url', url); 

//   if (resourceType === "Style" && !url.includes("://")) {
//     // Resolve to an AWS URL
//     url = `https://maps.geo.${AWS.config.region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
//   }

//   if (url.includes("amazonaws.com")) {
//     // Sign AWS requests (with the signature as part of the query string)
//     return {
//       url: Signer.signUrl(url, {
//         access_key: this.credentials.accessKeyId,
//         secret_key: this.credentials.secretAccessKey,
//         session_token: this.credentials.sessionToken,
//       }),
//     };
//   }

//   // If not amazonaws.com, falls to here without signing
//   return { url };
// }

//   //////////
//   async allowsharelocation() {
//     if (navigator.geolocation) {
//       // Call showPosition initially to get the current location
//       const initialCoords = await this.showPosition();
//       this.coords.push(initialCoords);

//       setInterval(async () => {
//         const newCoords = await this.showPosition();
//         this.coords.push(newCoords);
//         console.log(this.coords); 
//               // Call showPosition every 5 seconds to get the updated location
//       await this.geoLocation.batchUpdateDevicePosition({
//         TrackerName: "mobile-tracker",
//         Updates: this.coords.slice(0,1).map((coord, i) => ({
//             DeviceId: 'randomTrip-1',
//             Position: coord,
//             SampleTime: `2023-03-04T03:${String("0" + i).slice(-2)}:00Z`
//         }))
//     }).promise();

//       }, 3600);
//     } else {
//       this.message = 'Geolocation is not supported by this browser.';
//     }
//   }
  
  
//   async showPosition(): Promise<ICoords> {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
//           console.log(latitude, longitude);
   
//           if (latitude && longitude) {
//             const newCoords:any = [latitude, longitude, currentDateTime];
//             resolve(newCoords);
//           } else {
//             reject('Invalid position');
//           }
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
//   }
  
//   async  batchUpdateDevicePosition(params) {
//     try {
//         const result = await this.geoLocation.batchUpdateDevicePosition(params).promise();
//         console.log(result);
//         return result;
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }
  
// cleanupOldRouteLine(map) {
//   if (map.getLayer('route')) {
//       map.removeLayer('route');
//   }
//   try {
//       map.removeSource('route');
//   } catch (error) {
// console.error(error);
//   }
// }

// }





