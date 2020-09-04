import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentIndicationSelectComponent } from './intent-indication-select.component';

describe('IntentIndicationSelectComponent', () => {
  let component: IntentIndicationSelectComponent;
  let fixture: ComponentFixture<IntentIndicationSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentIndicationSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentIndicationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
