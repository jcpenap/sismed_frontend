import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmReporteComponent } from './frm-reporte.component';

describe('FrmReporteComponent', () => {
  let component: FrmReporteComponent;
  let fixture: ComponentFixture<FrmReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
