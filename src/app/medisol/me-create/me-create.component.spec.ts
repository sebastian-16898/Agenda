import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeCreateComponent } from './me-create.component';

describe('MeCreateComponent', () => {
  let component: MeCreateComponent;
  let fixture: ComponentFixture<MeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
