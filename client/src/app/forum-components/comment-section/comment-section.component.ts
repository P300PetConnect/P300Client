import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/forum-services/data.service';
import { CommentItem, CommentInterface } from 'src/app/forum-interfaces/comment-interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input() docID!: string;
  @Input() postData = [] as any;

  commentData = [] as any;
  newVoteCount?: number;

  test?: any;
  comments?:any
  errorMessage: any;
  constructor(private _forumPosts : DataService) { }

  ngOnInit(): void {
    this.GetForumPosts();
  }

  GetForumPosts(): boolean{
    
    this._forumPosts.getComments(this.docID).subscribe(
      (      results: CommentInterface) => {
        this.comments= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
        //console.log(this.test)
        this.comments = JSON.parse(JSON.stringify(this.comments[0]));
        
      },
      (      error: any) => this.errorMessage = <any>error
    );
    console.log(this.comments);
    return false;
  }

  PushComment(comment:string, form: NgForm)
  {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const now = new Date().toDateString();
    //issue with the date string here, not showing in db
    const commentItem = new CommentItem(this.docID, this.makeRandom(12,possible), "N/A",comment,0,now)
    
    this._forumPosts.PushCommentsToDB(commentItem);

    // refreshing comments after 200 miliseconds 
    setTimeout(() => {
      this.GetForumPosts()
   }, 200);
    return false;

  }

  public makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  public AddVote(item: CommentItem)
  {
    item.voteCount+= 1;
    this._forumPosts.ChangeComValue(item);
    
  }

  public RemoveVote(item: CommentItem)
  {
    item.voteCount-= 1;
    this._forumPosts.ChangeComValue(item);
    
  }

  /* 
  public AddVote(id:string,voteCount:number)
  {
    this.newVoteCount = voteCount+1;
    this.dataService.ChangeVotes(id, this.newVoteCount);

  }
  public RemoveVote(id:string, voteCount:number)
  {
    this.newVoteCount = voteCount-1;
    this.dataService.ChangeVotes(id,this.newVoteCount);
  }
  */

}
