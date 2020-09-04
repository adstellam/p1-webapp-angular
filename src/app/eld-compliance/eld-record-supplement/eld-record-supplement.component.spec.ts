import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldRecordSupplementComponent } from './eld-record-supplement.component';

describe('EldRecordSupplementComponent', () => {
  let component: EldRecordSupplementComponent;
  let fixture: ComponentFixture<EldRecordSupplementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldRecordSupplementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldRecordSupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
