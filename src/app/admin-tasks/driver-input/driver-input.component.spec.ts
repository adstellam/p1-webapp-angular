import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInputComponent } from './driver-input.component';

describe('DriverInputComponent', () => {
  let component: DriverInputComponent;
  let fixture: ComponentFixture<DriverInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
