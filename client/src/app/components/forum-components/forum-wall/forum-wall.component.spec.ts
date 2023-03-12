import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumWallComponent } from './forum-wall.component';

describe('ForumWallComponent', () => {
  let component: ForumWallComponent;
  let fixture: ComponentFixture<ForumWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
