import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCargaComponent } from './frm-carga.component';

describe('FrmCargaComponent', () => {
  let component: FrmCargaComponent;
  let fixture: ComponentFixture<FrmCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
