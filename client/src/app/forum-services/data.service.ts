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


Notes for tomorrow
- the get all method has to be changed to return the same data structure as the other method
- update after post and comment
- add images to S3 

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
    let url= '';
    let urlAll = 'https://5nxguu0vhi.execute-api.eu-west-1.amazonaws.com/new/all'
    let urlBoard = 'https://5nxguu0vhi.execute-api.eu-west-1.amazonaws.com/new/boardposts' + '?BoardID='+ r;
    
          if(r == "0")
          {
          url = urlAll
          }
          else
          {
          url = urlBoard
          }

    return this.http.get<PostInterface>(url)
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

    public PushPostWithImage(item: PostItem, file: any)
    {

      
      
   
    }
    
    

  

      
     
      // this.http.post<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/new/post', bodyj).subscribe(data => {
      // this.postId = data.id;
   // })

    

    
    PushCommentsToDB(commentItem : CommentItem)
    {
     
      const bodyj = (JSON.stringify(commentItem));
    
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
    ChangeValue(Item : PostItem)
    {

      var params = {
        
            "PostID": Item.PostID,
            "PostTitle": Item.PostTitle,
            "BoardID": Item.BoardID,
            "User": Item.User,
            "Content": Item.Content,
            "Date": Item.Date,
            "DisplayComments": Item.DisplayComments,
            "VoteCount": Item.VoteCount,
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
    
      this.http.put<any>('https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/com/comment', params).subscribe(data => {
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
 /* 
    public PushPostWithImage(item: PostItem, file: any)
    {
     // let test = environment
      const contentType = file.type;

      const params = {
        Bucket: 'forum-images-petconnect',
        Key:  file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
    }
    console.log(params);

    this.http.post(`https://4pms4upawl.execute-api.eu-west-1.amazonaws.com/com/image`, params)
     .subscribe(   
    res => {
        // handle success            
        //reset file input
        console.log(res);
    
     },
     err => {
       console.log(err);
     }        
    );
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
