import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSelectVedasComponent } from './vehicle-select-vedas.component';

describe('VehicleSelectVedasComponent', () => {
  let component: VehicleSelectVedasComponent;
  let fixture: ComponentFixture<VehicleSelectVedasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSelectVedasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSelectVedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
