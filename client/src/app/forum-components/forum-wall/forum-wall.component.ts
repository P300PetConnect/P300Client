import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/forum-services/data.service';
import { PostItem, PostInterface } from '../../forum-interfaces/post-interface';
import { BoardInterface } from 'src/app/forum-interfaces/board-interface';

@Component({
  selector: 'app-forum-wall',
  templateUrl: './forum-wall.component.html',
  styleUrls: ['./forum-wall.component.scss']
})
export class ForumWallComponent implements OnInit {

  // https://bobbyhadz.com/blog/aws-apigateway-pass-query-parameters-lambda maybe not query string
  showAddPost = false;
  postData = [] as any;
  posts?: any;
  boards?: any;
 
  errorMessage:any;

  constructor(private _forumPosts : DataService) { }

  
  ngOnInit(): void 
  {
    this.GetBoardDetails('1');
    
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

  }
  toggleAddPost(){
    this.showAddPost = ! this.showAddPost;
  }
  

  

 
}

