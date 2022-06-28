import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlForgotPasswordComponent } from './mdl-forgot-password.component';

describe('MdlForgotPasswordComponent', () => {
  let component: MdlForgotPasswordComponent;
  let fixture: ComponentFixture<MdlForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
