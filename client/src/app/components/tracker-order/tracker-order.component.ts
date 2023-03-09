

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MapsService } from "../../service/maps.service";
import { SocketService } from "../../service/socket.service";
import { MapsAPILoader } from '@agm/core';
// declare var google: any;
@Component({
  selector: 'app-tracker-order',
  templateUrl: './tracker-order.component.html',
  styleUrls: ['./tracker-order.component.scss']
})
export class TrackerOrderComponent implements OnInit, AfterViewInit  {


  start_end_mark = [];

  latlng = [
    
  ];

  // @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  // lat: number = 50.3562387;
  // lng: number = 7.594402000000001;
  // map: google.maps.Map;
  // coordinates = new google.maps.LatLng(this.lat, this.lng);
  // mapOptions: google.maps.MapOptions = {
  //   center: this.coordinates,
  //   zoom: 10,
  //   gestureHandling: 'cooperative',
  //   disableDefaultUI: true, // a way to quickly hide all controls
  //   scaleControl: true,
  //   zoomControl: true,
  //   scrollwheel: true,
  //   disableDoubleClickZoom: true,
  //   maxZoom: 17,
  //   // minZoom: 5,
  //   mapTypeControl: false,
  //   fullscreenControl: true,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP,
  //   fullscreenControlOptions: {
  //     position: google.maps.ControlPosition.RIGHT_BOTTOM,
  //   },
  // };

  // ngOnInit() {
    
  // }
ngAfterViewInit(): void {
  // this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

  
  // let map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: 37.7749, lng: -122.4194},
  //   zoom: 13
  // });
  // console.log('map', map);
  // let path = [
  //   {lat: 37.7749, lng: -122.4194},
  //   {lat: 37.7751, lng: -122.4196},
  //   {lat: 37.7753, lng: -122.4198},
  //   {lat: 37.7755, lng: -122.4200},
  //   {lat: 37.7757, lng: -122.4202},
  //   {lat: 37.7759, lng: -122.4204},
  // ];
  
  // // let polyline = new google.maps.Polyline({
  // //   path: path,
  // //   geodesic: true,
  // //   strokeColor: '#FF0000',
  // //   strokeOpacity: 1.0,
  // //   strokeWeight: 2
  // // });
  
  // // polyline.setMap(map); 
}



// }

  // lat: Number = 29.8174782
  // lng: Number = -95.6814757
  waypoints = [];
  origin = {};
  destination = {};

  // origin = { lat: 29.8174782, lng: -95.6814757 }
  // destination = { lat: 40.6976637, lng: -74.119764 }
  // waypoints = [
  //    {location: { lat: 39.0921167, lng: -94.8559005 }},
  //    {location: { lat: 41.8339037, lng: -87.8720468 }}
  // ]

  lat = 51.678418;
  lng = 7.809007;
  polylinePaths : any= [
    { lat: 51.678418, lng: 7.809007 },
    { lat: 51.678418, lng: 7.909007 },
    { lat: 51.778418, lng: 7.909007 },
    { lat: 51.778418, lng: 7.809007 },
    { lat: 51.678418, lng: 7.809007 }
  ];

  // lat: any = "";
  // lng: any = "";
  country = "";
  calling_code = "";
  city = "";
  ip = 0;
  location: Object;

  // public lat = 24.799448;
  // public lng = 120.979021;

  latitude: number | undefined;
  longitude: number | undefined;;
  zoom: number| undefined;;
  address: string| undefined;;
  private geoCoder: any;

  // public origin: any;
  // public destination: any;
  constructor(private map: MapsService, private mapsAPILoader: MapsAPILoader,private socketService: SocketService,) {
    // this.start_end_mark.push(this.latlng[0]);
    // this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    // this.origin = { lat: 33.60297801899009, lng: 71.25951402963865 };
    // this.destination = { lat: 33.59931642884097, lng: 71.35169618906248 };
    // this.map.getLocation().subscribe((data) => {
    //   console.log('data ===>', data);
    //   // this.lat = data.latitude;
    //   // this.lng = data.longitude;
    //   this.country = data.country_name;
    //   this.calling_code = data.country_calling_code;
    //   this.city = data.city;
    //   this.ip = data.ip;
    // });
    this.setCurrentLocation();
    this.getAll();
    // this.getUpdate();
  }

  getUpdate() {
  this.lat = 51.678418;
  this.lng = 7.809007;
  this.waypoints = [
    { lat: 51.678418, lng: 7.809007 },
    { lat: 51.678418, lng: 7.909007 },
    { lat: 51.778418, lng: 7.909007 },
    { lat: 51.778418, lng: 7.809007 },
    { lat: 51.678418, lng: 7.809007 }
  ];

  }
  getLocation() {
    this.mapsAPILoader.load().then(() => {
          this.setCurrentLocation();
          // this.geoCoder = new google.maps.Geocoder;
          console.log('this.geoCoder', this.geoCoder);
        });
    }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.lat = this.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 13;
      });
    }
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      console.log('results ===>', results);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log('this.address', this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    
    });
  }
  arr= [];
  mapClicked($event: any) {
    this.lat  = $event.coords.lat;
    this.lng  = $event.coords.lng;
    this.arr.push($event.coords);
    console.log('$event.coords ==>', $event.coords);
    console.log('this.arr ===>', this.arr);
    let obj = { "orderId" : "1", "userId" : "2", "coordinates": [$event.coords.lat,$event.coords.lng] };
    this.socketService.sendMessage(obj);
    this.pushRealTime(obj.coordinates);
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  pushRealTime(coordinates: any){
    this.latlng.push(coordinates);    
    this.polylinePaths.push(coordinates);
    this.start_end_mark.push(this.polylinePaths[0]);
    this.start_end_mark.push(this.polylinePaths[this.latlng.length - 1]);

  }

  getAll() {
    this.socketService.getAll().then((result:any)=>{
      console.log('result===>',result);
      let cod = [];
      result.data.forEach(obj => {
        // cod.push(obj.coordinates);
        cod.push({location: { lat: obj.coordinates[0], lng: obj.coordinates[1] }, stopover: true});
        this.latlng.push(obj.coordinates);
      });
      console.log('cod', cod);
      this.waypoints = cod;
      this.polylinePaths = cod;
      this.lat = result.data[1].coordinates[0];
      this.lng = result.data[1].coordinates[1];
      this.origin = result.data[1].coordinates;
      let lastIndex = result.data.length - 1;
      this.destination = result.data[lastIndex].coordinates;
      this.start_end_mark.push(this.latlng[0]);
    this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
      // console.log('waypoints', {lastIndex, origin: this.origin,destination:this.destination, waypoints:this.waypoints});
    });
  }

  onPolyPathChange(event: any) {
    console.log('Polyline path changed: ', event);
  }
}
