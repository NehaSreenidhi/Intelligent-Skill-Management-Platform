import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInternsComponent } from './search-interns.component';

describe('SearchInternsComponent', () => {
  let component: SearchInternsComponent;
  let fixture: ComponentFixture<SearchInternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInternsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
