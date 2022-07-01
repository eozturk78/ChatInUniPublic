import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlComplaintUserComponent } from './mdl-complaint-user.component';

describe('MdlComplaintUserComponent', () => {
  let component: MdlComplaintUserComponent;
  let fixture: ComponentFixture<MdlComplaintUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlComplaintUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdlComplaintUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
