import { Component, Input, OnInit, Output } from '@angular/core';
import { PostItem } from 'src/app/components/forum-interfaces/post-interface';
import { DataService } from 'src/app/components/forum-services/data.service';
import { MatDialogRef } from '@angular/material/dialog';

import { EventEmitter } from '@angular/core';
//   <button class="btn btn-secondary" *ngIf="selectedFiles"  (click)="AddPostWithImage(title.value, content.value, video.value, form, image)">Upload</button>
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private _forumPosts : DataService, public dialogRef:MatDialogRef<AddPostComponent>) { }

  @Input() parent: any;
  @Input()  boards?: any;
  // tried to call get post method from child after new post created, did not work
  @Output() GetForumPosts = new EventEmitter<string>();
  commentText: string = '';
  isButtonDisabled: boolean = true;
  selectedFiles!: any;
  tempPostItem!: PostItem;
  addMedia = false;
message: any
  createdLocalPost: any;

  //localPost?: PostItem;
  imageSrc: string = '';
  userData: any;
  
  ngOnInit(): void {

    this.userData = JSON.parse(localStorage.getItem("PetConnectUser"));
    console.log(this.userData);
   
  }

 
  public AddPostNoImage(title: string, content: string)
  {

  
    // need board id here, passed back from wall as input
   // let id = this.boards[0][0].boardID;
    
    // <img src="{{ userData?.profilePicUrl}}">
    // {{userData?.name}}    {{userData?.surname}}
    const now = new Date().toDateString();
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  

     this.tempPostItem = new PostItem
     (this.makeRandom(12,possible), title,"0", this.userData.name + this.userData.surname, content, now ,false,
       this.userData.profilePicUrl, 0)
   
       
    
     this._forumPosts.PushPost(this.tempPostItem)
     .subscribe({
      next: post => {
        console.log(JSON.stringify(post) + 'post added');
        this.message = "post added";
        this.RefreshPosts("0");  
        this.onClose();   
         },
      error: (err) => this.message = err
    });;
    
 
     
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


  selectFile(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file.name);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
      this.selectedFiles = file;
    }
   
  }

  public RefreshPosts(n : string)
{
  this.GetForumPosts.emit(n);

}


onClose(){
  this.dialogRef.close(); 
}
updateButtonState() {
  this.isButtonDisabled = this.commentText.trim().length === 0;
  this.isButtonDisabled = !this.commentText;
  console.log(this.isButtonDisabled); 
  console.log(this.commentText); 

}



}




// public AddPostNoImage(title: string, content: string,  form: HTMLFormElement) : boolean
// {

//   // need board id here, passed back from wall as input
//   let id = this.boards[0][0].boardID;
  
 
//   const now = new Date().toDateString();
//   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
//    this.tempPostItem = new PostItem(this.makeRandom(12,possible), title, id, "N/A", content, now ,true ,0 );
   
  
//    this._forumPosts.PushPost(this.tempPostItem);
  
//    // refreshes post after post
//    setTimeout(() => {
//     this.RefreshPosts(id)
//  }, 200);
//   return false;
   
// }
