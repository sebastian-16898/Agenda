import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenCreateComponent } from './examen-create.component';

describe('ExamenCreateComponent', () => {
  let component: ExamenCreateComponent;
  let fixture: ComponentFixture<ExamenCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
