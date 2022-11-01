import { Component, Input, OnInit } from '@angular/core';
import { PostItem } from 'src/app/forum-interfaces/post-interface';
import { DataService } from 'src/app/forum-services/data.service';
//   <button class="btn btn-secondary" *ngIf="selectedFiles"  (click)="AddPostWithImage(title.value, content.value, video.value, form, image)">Upload</button>
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private _forumPosts : DataService) { }

  @Input() parent: any;
  selectedFiles!: any;
  tempPostItem!: PostItem;
  addMedia = false;
  
  ngOnInit(): void {
  }

  public AddPostNoImage(title: string, content: string,  form: HTMLFormElement)
  {
   
    const now = new Date().toDateString();
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";

     this.tempPostItem = new PostItem(this.makeRandom(10,possible),title, content, now ,true ,0 );
     this._forumPosts.PushPost(this.tempPostItem);
    
    // this.ngOnInit();
 
     return false;
     
  }

  public makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  ToggleAddMedia(){
    this.addMedia = ! this.addMedia;
  }

}
