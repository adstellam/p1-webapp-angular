import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysopHomeComponent } from './sysop-home.component';

describe('SysopHomeComponent', () => {
  let component: SysopHomeComponent;
  let fixture: ComponentFixture<SysopHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysopHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
