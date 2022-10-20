import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-wall',
  templateUrl: './forum-wall.component.html',
  styleUrls: ['./forum-wall.component.scss']
})
export class ForumWallComponent implements OnInit {

  showAddPost = false;
  postData = [] as any;
  constructor() { }

  ngOnInit(): void {
  }
  toggleAddPost(){
    this.showAddPost = ! this.showAddPost;
  }

}
