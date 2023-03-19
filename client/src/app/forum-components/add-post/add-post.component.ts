import { Component, Input, OnInit, Output } from '@angular/core';
import { PostItem } from 'src/app/forum-interfaces/post-interface';
import { DataService } from 'src/app/forum-services/data.service';

import { EventEmitter } from '@angular/core';
import { NavigationService } from 'src/app/components/nav/NavigationService';
import { MatDialogRef } from '@angular/material/dialog';
//   <button class="btn btn-secondary" *ngIf="selectedFiles"  (click)="AddPostWithImage(title.value, content.value, video.value, form, image)">Upload</button>
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private _forumPosts : DataService,private navigationService: NavigationService,public dialogRef: MatDialogRef<AddPostComponent>) { }

  @Input() parent: any;
  @Input()  boards?: any;
  userData: any;
  // tried to call get post method from child after new post created, did not work
  @Output() GetForumPosts = new EventEmitter<string>();

  selectedFiles!: any;
  tempPostItem!: PostItem;
  addMedia = false;
message: any
  createdLocalPost: any;

  firstName: string;
  surName: string;
  profileImage: string;

  //localPost?: PostItem;
  imageSrc: string = '';
  
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
        this.closeDialog();   
         },
      error: (err) => this.message = err
    });;
    
 
     
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // AddPostWithImage(title: string, content: string, video:string, form: HTMLFormElement, image:HTMLImageElement, imageUserProfile:string) {
    

  //   // need codition here for video link length
  //   let id = this.boards[0][0].boardID;

  //   const now = new Date().toDateString();
  //   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  //    this.tempPostItem = new PostItem(this.makeRandom(12,possible), title, id, "N/A", content, now ,true ,0 , imageUserProfile);

  //    const file = this.selectedFiles;

  //    this._forumPosts.PushPostWithImage(this.tempPostItem, file);
     
  //   // Buy image is not resetting after upload!!
  //   //image.src = "";
  //   return false;
  // }

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
