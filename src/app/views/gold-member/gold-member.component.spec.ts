import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldMemberComponent } from './gold-member.component';

describe('GoldMemberComponent', () => {
  let component: GoldMemberComponent;
  let fixture: ComponentFixture<GoldMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
