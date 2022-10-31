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
   
    //video:string,
    const now = new Date();
   // const link = this.FormatVideoLink(video);

     this.tempPostItem = new PostItem("12134324234234",title, content, now.toString(),true ,0 );
     this._forumPosts.PushPost(this.tempPostItem);
    
    // this.ngOnInit();
     //form.reset();
     return false;
     
  }

  ToggleAddMedia(){
    this.addMedia = ! this.addMedia;
  }

}
