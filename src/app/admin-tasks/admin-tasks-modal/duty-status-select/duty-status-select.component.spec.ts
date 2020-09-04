import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyStatusSelectComponent } from './duty-status-select.component';

describe('DutyStatusSelectComponent', () => {
  let component: DutyStatusSelectComponent;
  let fixture: ComponentFixture<DutyStatusSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyStatusSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
