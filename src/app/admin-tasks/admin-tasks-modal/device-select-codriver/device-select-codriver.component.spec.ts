import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSelectCodriverComponent } from './device-select-codriver.component';

describe('DeviceSelectCodriverComponent', () => {
  let component: DeviceSelectCodriverComponent;
  let fixture: ComponentFixture<DeviceSelectCodriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSelectCodriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSelectCodriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
