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

  public AddVote(item: PostItem)
  {
  //let n = JSON.stringify(item.VoteCount);

  //  item.VoteCount = {"N":"5" };
  item.VoteCount +=1;
    this._forumPosts.ChangeVotes(item);

  }
  public RemoveVote(item: PostItem)
  {
    item.VoteCount -=1;
    this._forumPosts.ChangeVotes(item);
  }
  DisplayComments( item: PostItem)
  {
    var placeHolder = false;
    if(item.DisplayComments== true)
    {
      item.DisplayComments= false

    }
    else
    {
      item.DisplayComments= true

    }

    this._forumPosts.DisplayCommentsSection(item);
    
  }



}
