import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedasUserManagementComponent } from './vedas-user-management.component';

describe('VedasUserManagementComponent', () => {
  let component: VedasUserManagementComponent;
  let fixture: ComponentFixture<VedasUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedasUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedasUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
