import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldRecordHeaderComponent } from './eld-record-header.component';

describe('EldRecordHeaderComponent', () => {
  let component: EldRecordHeaderComponent;
  let fixture: ComponentFixture<EldRecordHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldRecordHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldRecordHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
