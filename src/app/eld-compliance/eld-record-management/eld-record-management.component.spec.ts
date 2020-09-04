import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldRecordManagementComponent } from './eld-record-management.component';

describe('EldRecordManagementComponent', () => {
  let component: EldRecordManagementComponent;
  let fixture: ComponentFixture<EldRecordManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldRecordManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldRecordManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
