import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmResultadoComponent } from './frm-resultado.component';

describe('FrmResultadoComponent', () => {
  let component: FrmResultadoComponent;
  let fixture: ComponentFixture<FrmResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
