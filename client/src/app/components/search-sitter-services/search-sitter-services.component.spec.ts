import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSitterServicesComponent } from './search-sitter-services.component';

describe('SearchSitterServicesComponent', () => {
  let component: SearchSitterServicesComponent;
  let fixture: ComponentFixture<SearchSitterServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSitterServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSitterServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
