import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDocListComponent } from './shipping-doc-list.component';

describe('ShippingDocListComponent', () => {
  let component: ShippingDocListComponent;
  let fixture: ComponentFixture<ShippingDocListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingDocListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
