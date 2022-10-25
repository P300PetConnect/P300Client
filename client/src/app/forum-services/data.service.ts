import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
/**
{
  "PostID": "345345555555",
  "PostTitle": "Please wordsdds",
  "Content": "asdasdasdasd",
  "Date": "213123123",
  "DisplayComments": false,
  "VoteCount": 0
}
 */
    postId;
    PushPost(Item : PostItem)
    {
      const headers_j = new HttpHeaders({ 'Content-Type': 'application/json' });
      const headers_H = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const bodyx = 'PostID=12334234&PostTitle=PleaseWork&Content=testing&Date=213121&DisplayComments=false&VoteCount=0'
      const bodyj = (JSON.stringify(Item));
      console.log(JSON.stringify(Item))

     const b: Array<any> = [
        { PostID: "book1", PostTitle: "book desc 1" }
        
      ];
      // this.http.post<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/post', b,{headers: headers_j})
      // .subscribe((res) =>{
      //   console.log(res);
      // });

      //working
      this.http.post<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/post', { PostID: '23123123', PostTitle : 'Testing', Content: 'Is this working', Date: "25/10/22", DisplayComments: false, VoteCount: 0}).subscribe(data => {
        this.postId = data.id;
    })

    }
}
