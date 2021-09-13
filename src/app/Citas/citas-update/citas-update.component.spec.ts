import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasUpdateComponent } from './citas-update.component';

describe('CitasUpdateComponent', () => {
  let component: CitasUpdateComponent;
  let fixture: ComponentFixture<CitasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
