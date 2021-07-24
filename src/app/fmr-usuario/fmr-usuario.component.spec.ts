import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmrUsuarioComponent } from './fmr-usuario.component';

describe('FmrUsuarioComponent', () => {
  let component: FmrUsuarioComponent;
  let fixture: ComponentFixture<FmrUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmrUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmrUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
