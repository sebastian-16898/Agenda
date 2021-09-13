import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRepoComponent } from './generar-repo.component';

describe('GenerarRepoComponent', () => {
  let component: GenerarRepoComponent;
  let fixture: ComponentFixture<GenerarRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
