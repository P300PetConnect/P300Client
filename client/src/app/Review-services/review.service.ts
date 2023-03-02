import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { Review } from '../ReviewInterfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  handleError: any;
  addReview(review : FormGroup)
  {
    console.log(review.value);
    return this.http.post<any>(' https://icua47lrek.execute-api.eu-west-1.amazonaws.com/prod/', review.value)
    .pipe(
      catchError(this.handleError)
    )

  }

  updateReview(subID: number,reviewAmount: number)
  {
    //https://icua47lrek.execute-api.eu-west-1.amazonaws.com/prod/?id=43&reviewAmount=3
    console.log(reviewAmount + '   ' +  subID);
    return this.http.get<any>(`https://856hqzp4v5.execute-api.eu-west-1.amazonaws.com/update?id=${subID}&reviewAmount=${reviewAmount}`)
    .pipe(
      catchError(this.handleError)
    )

  }

  getReviews(id)
  {
    return this.http.get<Review>('https://856hqzp4v5.execute-api.eu-west-1.amazonaws.com/review?id='+ id)
    .pipe(
      tap(data => console.log('list/error', data)
      
    ),
     catchError(this.handleError)
    );
  }
}
