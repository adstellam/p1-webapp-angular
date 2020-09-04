import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedasUserEditComponent } from './vedas-user-edit.component';

describe('VedasUserEditComponent', () => {
  let component: VedasUserEditComponent;
  let fixture: ComponentFixture<VedasUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedasUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedasUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
