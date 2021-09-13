import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrUpdateComponent } from './tr-update.component';

describe('TrUpdateComponent', () => {
  let component: TrUpdateComponent;
  let fixture: ComponentFixture<TrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
