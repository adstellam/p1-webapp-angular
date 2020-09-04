import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedasUserDeleteComponent } from './vedas-user-delete.component';

describe('VedasUserDeleteComponent', () => {
  let component: VedasUserDeleteComponent;
  let fixture: ComponentFixture<VedasUserDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedasUserDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedasUserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
