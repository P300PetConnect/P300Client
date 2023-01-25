import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  handleError: any;
  addReview(review : FormGroup)
  {
    console.log(review.value);
    return this.http.post<any>(this.dataUriLists, review.value)
    .pipe(
      catchError(this.handleError)
    )

  

  }

  updateReview(reviewAmount: Number)
  {

  }
}
