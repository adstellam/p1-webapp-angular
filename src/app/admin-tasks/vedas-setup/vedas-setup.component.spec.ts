import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedasSetupComponent } from './vedas-setup.component';

describe('VedasSetupComponent', () => {
  let component: VedasSetupComponent;
  let fixture: ComponentFixture<VedasSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedasSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedasSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
