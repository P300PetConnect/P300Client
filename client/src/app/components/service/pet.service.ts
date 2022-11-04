import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPets(); 
  }
  getPets(){
    // API Call
		let headers = new HttpHeaders({
			'x-rapidapi-host': 'random-facts2.p.rapidapi.com',
			'x-rapidapi-key': '6db1e5b532msh22c091f888769c3p1a770fjsn227e72dfcab3'
		});
		this.http.get<any>('dog-breeds2.p.rapidapi.com/dog_breeds', {
				headers: headers
			})
			.subscribe(data => {
				console.log('pet data',data);
			});
  }
}
