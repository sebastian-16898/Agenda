import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeCreateComponent } from './se-create.component';

describe('SeCreateComponent', () => {
  let component: SeCreateComponent;
  let fixture: ComponentFixture<SeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
