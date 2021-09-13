import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeListComponent } from './se-list.component';

describe('SeListComponent', () => {
  let component: SeListComponent;
  let fixture: ComponentFixture<SeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
