import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRepoExamenComponent } from './generar-repo-examen.component';

describe('GenerarRepoExamenComponent', () => {
  let component: GenerarRepoExamenComponent;
  let fixture: ComponentFixture<GenerarRepoExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRepoExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarRepoExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
