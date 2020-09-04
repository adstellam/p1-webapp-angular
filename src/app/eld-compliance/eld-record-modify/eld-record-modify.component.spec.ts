import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldRecordModifyComponent } from './eld-record-modify.component';

describe('EldRecordModifyComponent', () => {
  let component: EldRecordModifyComponent;
  let fixture: ComponentFixture<EldRecordModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldRecordModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldRecordModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
