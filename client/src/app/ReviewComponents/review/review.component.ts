import { Component, Input, OnInit } from '@angular/core';

import { Review } from 'src/app/ReviewInterfaces/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor() { }

  @Input() review: Review;
  ngOnInit(): void {

    
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
