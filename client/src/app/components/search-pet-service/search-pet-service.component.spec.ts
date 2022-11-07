import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPetServiceComponent } from './search-pet-service.component';

describe('SearchPetServiceComponent', () => {
  let component: SearchPetServiceComponent;
  let fixture: ComponentFixture<SearchPetServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPetServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPetServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
