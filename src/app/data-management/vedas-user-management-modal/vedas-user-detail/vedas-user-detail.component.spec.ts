import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedasUserDetailComponent } from './vedas-user-detail.component';

describe('VedasUserDetailComponent', () => {
  let component: VedasUserDetailComponent;
  let fixture: ComponentFixture<VedasUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedasUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedasUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
