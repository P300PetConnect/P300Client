import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor() { }

  addMedia = false;
  
  ngOnInit(): void {
  }

  ToggleAddMedia(){
    this.addMedia = ! this.addMedia;
  }

}
