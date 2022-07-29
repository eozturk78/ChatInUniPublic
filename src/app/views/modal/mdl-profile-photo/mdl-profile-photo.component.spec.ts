import { MdlProfilePhotoComponent } from './mdl-profile-photo.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('MdlForgotPasswordComponent', () => {
  let component: MdlProfilePhotoComponent;
  let fixture: ComponentFixture<MdlProfilePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlProfilePhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlProfilePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
