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

  constructor(private _forumPosts : DataService) { }

  ngOnInit(): void {
   
  }

  public AddVote(item: PostItem)
  {
   
    item.VoteCount +=1;
    this._forumPosts.ChangeValue(item);
  

  }
  public RemoveVote(item: PostItem)
  {
    item.VoteCount -=1;
    this._forumPosts.ChangeValue(item);
  }
  DisplayComments( item: PostItem)
  {

    if(item.DisplayComments == true)
    {
      item.DisplayComments= false

    }
    else
    {
      item.DisplayComments= true

    }

    this._forumPosts.ChangeValue(item);
    
  }



}
