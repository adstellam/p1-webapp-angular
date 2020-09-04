import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldRecordRodsComponent } from './eld-record-rods.component';

describe('EldRecordRodsComponent', () => {
  let component: EldRecordRodsComponent;
  let fixture: ComponentFixture<EldRecordRodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldRecordRodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldRecordRodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
