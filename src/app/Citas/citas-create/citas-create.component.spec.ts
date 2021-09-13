import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCreateComponent } from './citas-create.component';

describe('CitasCreateComponent', () => {
  let component: CitasCreateComponent;
  let fixture: ComponentFixture<CitasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
