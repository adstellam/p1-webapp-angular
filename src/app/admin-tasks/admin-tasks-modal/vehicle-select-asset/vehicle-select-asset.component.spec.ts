import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSelectAssetComponent } from './vehicle-select-asset.component';

describe('VehicleSelectAssetComponent', () => {
  let component: VehicleSelectAssetComponent;
  let fixture: ComponentFixture<VehicleSelectAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSelectAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSelectAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
