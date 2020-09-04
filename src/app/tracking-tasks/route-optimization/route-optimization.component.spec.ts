import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteOptimizationComponent } from './route-optimization.component';

describe('RouteOptimizationComponent', () => {
  let component: RouteOptimizationComponent;
  let fixture: ComponentFixture<RouteOptimizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteOptimizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
