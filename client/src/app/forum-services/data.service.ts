import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,tap,map } from 'rxjs/operators';
import { PostItem, PostInterface } from '../forum-interfaces/post-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

//  <app-post [post]="d"></app-post>
  constructor(private http: HttpClient) { }

  getForumData() : Observable<PostInterface> {
    return this.http.get<PostInterface>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/Test')
    .pipe(
      tap(data => console.log('Forum/error' + JSON.stringify(data))
    ),
    // catchError(this.handleError)
  
    );
}
}
