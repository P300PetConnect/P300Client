import { Component, OnInit, Input } from '@angular/core';
import { PostItem } from 'src/app/forum-interfaces/post-interface';
import { DataService } from 'src/app/forum-services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: any;
  newVoteCount?: number;
  constructor(private _forumPosts : DataService) { }

  ngOnInit(): void {
  }

  public AddVote(item: PostItem, com:boolean)
  {
    let value = 1;
    this._forumPosts.ChangeValue(item, value, com);
  

  }
  public RemoveVote(item: PostItem, com:boolean)
  {
    let value = -1;
    this._forumPosts.ChangeValue(item, value, com);
  }
  DisplayComments( item: PostItem, com:boolean)
  {
    let value = 0;
    var placeHolder = false;
    if(com == true)
    {
      placeHolder= false

    }
    else
    {
      placeHolder= true

    }

    this._forumPosts.ChangeValue(item, value, placeHolder);
    
  }



}
