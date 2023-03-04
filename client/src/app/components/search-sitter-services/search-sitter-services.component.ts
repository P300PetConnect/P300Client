import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RdsUserServices } from 'src/app/search_service_interfaces/rds-user-services';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-search-sitter-services',
  templateUrl: './search-sitter-services.component.html',
  styleUrls: ['./search-sitter-services.component.scss']
})
export class SearchSitterServicesComponent implements OnInit {

  
  @Input()service?: any;
 
  showOther = false;
  otherServices?: any;
  errorMessage : any;
  averageRoundStars: number;
  remainder: number;

  loyalCus = 0;

 
 latlong1 = '';
 latlong2 = '';
 distance = 0;
 logged
 

  constructor(private search: SearchServiceService, private _router: Router, private http: HttpClient, private user: UserService) { }

  async ngOnInit() {
    
    this.service.ShowOther = false;
    this.averageRoundStars = Math.floor(this.service.ReviewsTotal / this.service.NumReviews);
    this.remainder = (this.service.ReviewsTotal / this.service.NumReviews) - this.averageRoundStars;

     this.loyalCus = this.service.NumReviews + 5
 
   //gets logged in zipcode
    const zip1 = localStorage.getItem('zip')
    //gets pet sitter zip
    const zip2 = this.service.ZipCode; 

    this.latlong1 = await this.user.getLatLng(zip1);
    this.latlong2 = await this.user.getLatLng(zip2);

    console.log(this.latlong1);

       
        this.distance = this.distanceInKm()
      

       //promise await 

  }
 distanceInKm(): number {
  console.log(this.latlong2);
  var l1 = this.latlong1.split(',').map(Number);
  var l2 = this.latlong2.split(',').map(Number);
  let lat1 = l1[0]; 
  let lon1 = l1[1];
  let lat2 = l2[0];
  let lon2 = l2[1];
    const earthRadiusKm = 6371; // radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
  
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = earthRadiusKm * c;
  
    return distance;
  }
  
   deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

 

  num(n: number): Array<number> {
   alert(n);
    return Array(4);
  }
  SearchSitter(id: number){
    console.log('find')
    this._router.navigate(['/petsitterdetails', {'id': `${id}`}])
   //[routerLink]="['/petsitterdetails']"
  }


 
}


