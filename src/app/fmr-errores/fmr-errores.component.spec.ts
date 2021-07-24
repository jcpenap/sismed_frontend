import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmrErroresComponent } from './fmr-errores.component';

describe('FmrErroresComponent', () => {
  let component: FmrErroresComponent;
  let fixture: ComponentFixture<FmrErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmrErroresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmrErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
