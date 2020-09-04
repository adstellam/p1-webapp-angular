import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLineComponent } from './device-line.component';

describe('DeviceLineComponent', () => {
  let component: DeviceLineComponent;
  let fixture: ComponentFixture<DeviceLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
