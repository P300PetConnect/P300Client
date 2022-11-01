import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry,tap,map } from 'rxjs/operators';
import { CommentInterface, CommentItem } from '../forum-interfaces/comment-interface';
import { PostItem, PostInterface } from '../forum-interfaces/post-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  postId;

  
  constructor(private http: HttpClient){}


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
   
    PushPost(Item : PostItem)
    {
      const bodyj = (JSON.stringify(Item));
      this.http.post<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/post', bodyj).subscribe(data => {
      this.postId = data.id;
     })

    }
  
    
    
    //   getComments(postID: string) : Observable<CommentInterface> {
    //     return this.http.get<CommentInterface>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/comment'+"?postID=" + postID)
    //     .pipe(
    //       tap(data => console.log('Forum/error' + JSON.stringify(data))
    //     ),
    //     // catchError(this.handleError)
      
    //     );
    // }

    
    PushCommentsToDB(commentItem : CommentItem)
    {
     
      const bodyj = (JSON.stringify(commentItem));
      alert(JSON.stringify(bodyj));
      this.http.post<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/comment', bodyj).subscribe(data => {
      this.postId = data.id;
     })

    }

    getComments(postID: string) : Observable<CommentInterface> {
 
      return this.http.get<CommentInterface>('https://5nxguu0vhi.execute-api.eu-west-1.amazonaws.com/Forum-GetComments'+"?postID=" + postID)
      .pipe(
        tap(data => console.log('Forum/error' + JSON.stringify(data))
      ),
      // catchError(this.handleError)
    
      );
  }

    // temp workaround dynamo type issue // 
    ChangeValue(Item : PostItem, value: number, com:boolean)
    {
      let id = JSON.stringify(Item.PostID);
      id = id.slice(6, id.length-2);

      let title = JSON.stringify(Item.PostTitle);
      title = title.slice(6, title.length-2);

      let content = JSON.stringify(Item.Content);
      content = content.slice(6, content.length-2);

      let date = JSON.stringify(Item.Date);
      date = date.slice(6, date.length-2);

      let vote = JSON.stringify(Item.VoteCount);
      vote = vote.slice(6, vote.length-2);

      

      let num = parseInt(vote) + value; 
      var params = {
        
            "PostID": id,
            "PostTitle": title,
            "Content": content,
            "Date": date,
            "DisplayComments": com,
            "VoteCount": num
  //
        }
        
      const bodyj = (JSON.stringify(Item));
      this.http.put<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/update', params).subscribe(data => {
      this.postId = data.id;
     })
    }

    public ChangeComValue(item: CommentItem)
    {
      var params = {
        
        "postID": item.postID,
        "commentID": item.commentID,
        "user": item.user,
        "comment": item.comment,
       // "DisplayComments": com,
        "voteCount": item.voteCount
//
    }
    
      const bodyj = (JSON.stringify(item));
      this.http.put<any>(' https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/com/comment', params).subscribe(data => {
      this.postId = data.id;
     })
      

    }
    
   
}


  //working
    //   this.http.post<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/post', { PostID: '23123123', PostTitle : 'Testing', Content: 'Is this working', Date: "25/10/22", DisplayComments: false, VoteCount: 0}).subscribe(data => {
    //     this.postId = data.id;
    // })

    /*
     DisplayCommentsSection(Item : PostItem)
    {      alert(JSON.stringify(Item));
      const bodyj = (JSON.stringify(Item));
      this.http.put<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/update', bodyj).subscribe(data => {
      this.postId = data.id;
     })
    }
     */
