import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/forum-services/data.service';
import { PostItem, PostInterface } from '../../forum-interfaces/post-interface';

@Component({
  selector: 'app-forum-wall',
  templateUrl: './forum-wall.component.html',
  styleUrls: ['./forum-wall.component.scss']
})
export class ForumWallComponent implements OnInit {

  showAddPost = false;
  postData = [] as any;
  test?: any;
  errorMessage:any;
  constructor(private _forumPosts : DataService) { }

  ngOnInit(): void 
  {
    this.GetForumPosts();
    
  }
  GetForumPosts(): boolean{
    
    this._forumPosts.getForumData().subscribe(
      (      results: PostInterface) => {
        this.test= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
        // console.log(this.test);
        // console.log(this.test[0] + "here")
        // console.log(this.test[0].length)
        console.log(this.test)
        
      },
      (      error: any) => this.errorMessage = <any>error
    );
    
    return false;
  }
  toggleAddPost(){
    this.showAddPost = ! this.showAddPost;
  }

}
