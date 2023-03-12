import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  public getLatLng(address: string): Observable<any> {
    const url = `${this.GEOCODING_API_URL}?address=${encodeURIComponent(address)}&key=`+ environment.GOOGLE_MAPS_API_KEY;
 
    return this.http.get(url);
  }
}