import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrCreateComponent } from './tr-create.component';

describe('TrCreateComponent', () => {
  let component: TrCreateComponent;
  let fixture: ComponentFixture<TrCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
