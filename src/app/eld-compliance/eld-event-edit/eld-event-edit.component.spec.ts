import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldEventEditComponent } from './eld-event-edit.component';

describe('EldEventEditComponent', () => {
  let component: EldEventEditComponent;
  let fixture: ComponentFixture<EldEventEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldEventEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
