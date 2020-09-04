import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedasUserAddComponent } from './vedas-user-add.component';

describe('VedasUserAddComponent', () => {
  let component: VedasUserAddComponent;
  let fixture: ComponentFixture<VedasUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedasUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedasUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
