import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/forum-services/data.service';
import { PostItem, PostInterface } from '../../forum-interfaces/post-interface';
import { BoardInterface } from 'src/app/forum-interfaces/board-interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-forum-wall',
  templateUrl: './forum-wall.component.html',
  styleUrls: ['./forum-wall.component.scss']
})
export class ForumWallComponent implements OnInit {
  showAddPost = false;
  postData = [] as any;
  posts?: any;
  boards?: any;
  post: any;
  userData: any;

  errorMessage:any;

  constructor(private _forumPosts : DataService, private dialog:MatDialog) { }

  
  ngOnInit(): void 
  {
    this.post = {
      "id":123,
      "postName":"I would like some help with my dog", 
      "url":"test.com",
      "description": "just the best for your pet",
      "voteCount": 43,
      "userName": "Jessica Henry",
      "subredditName": "help dogs", 
      "commentCount": 23,
      "duration": "duration",
      "upVote": true,
      "downVote": false

    };

    this.userData = JSON.parse(localStorage.getItem("PetConnectUser"));


    this.GetBoardDetails('0');
    
  }
  SetTabIndex(event)
  {
    //alert(typeof(event.index))
   this.GetBoardDetails(event.index);

  }


  GetBoardDetails(r: string)
  {
      this._forumPosts.getBoardDetails(r).subscribe(
      (      results: BoardInterface) => {
        this.boards= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
        console.log(this.boards)
        
      },
      (      error: any) => this.errorMessage = <any>error
    );

    this.GetForumPosts(r);
  }


  GetForumPosts(r: string): boolean{
    
    this._forumPosts.getForumData(r).subscribe(
      (      results: PostInterface) => {
        this.posts= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
       
        
      },
      (      error: any) => this.errorMessage = <any>error
    );

    return false;
  }

  RefreshPosts(board: string)
  {
    this.GetForumPosts(board);
    this.showAddPost = false;

  }
  toggleAddPost(){
    this.showAddPost = ! this.showAddPost;
  }
  

  onCreate(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";

    this.dialog.open(AddPostComponent, dialogConfig)
  }



 
}

