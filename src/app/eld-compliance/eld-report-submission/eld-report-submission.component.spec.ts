import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldReportSubmissionComponent } from './eld-report-submission.component';

describe('EldReportSubmissionComponent', () => {
  let component: EldReportSubmissionComponent;
  let fixture: ComponentFixture<EldReportSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldReportSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldReportSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
