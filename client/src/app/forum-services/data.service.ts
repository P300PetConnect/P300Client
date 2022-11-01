import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry,tap,map } from 'rxjs/operators';
import { CommentInterface, CommentItem } from '../forum-interfaces/comment-interface';
import { PostItem, PostInterface } from '../forum-interfaces/post-interface';
import { BoardInterface } from '../forum-interfaces/board-interface';
/*
Number passed back to get method to be used as query string to get board posts.
board numbers: 

0: All Posts 
1: General
2: Pet Help
3: Walking Routes,
4: Questions for Pet Connect
5: Customer Reviews 

*/


@Injectable({
  providedIn: 'root'
})
export class DataService {
  postId;

  constructor(private http: HttpClient){}

  getBoardDetails(r: string) : Observable<BoardInterface> {
    return this.http.get<BoardInterface>('https://5nxguu0vhi.execute-api.eu-west-1.amazonaws.com/new/board'+ "?boardID="+ r)
    .pipe(
      tap(data => console.log('Forum/error' + JSON.stringify(data))
    )
   
    );
}
  getForumData(r: string) : Observable<PostInterface> {
    return this.http.get<PostInterface>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/Test')
    .pipe(
      tap(data => console.log('Forum/error' + JSON.stringify(data))
    )
   
  
    );
}

   
    PushPost(Item : PostItem)
    {
      const bodyj = (JSON.stringify(Item));
      this.http.post<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/post', bodyj).subscribe(data => {
      this.postId = data.id;
     })

    }

    
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


    //works before adding boards 
    /*
    getForumData(r: number) : Observable<PostInterface> {
    return this.http.get<PostInterface>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/Test')
    .pipe(
      tap(data => console.log('Forum/error' + JSON.stringify(data))
    ),
    // catchError(this.handleError)
  
    );
}
    */
