import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDeleteComponent } from './asset-delete.component';

describe('AssetDeleteComponent', () => {
  let component: AssetDeleteComponent;
  let fixture: ComponentFixture<AssetDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
