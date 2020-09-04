import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLoadingComponent } from './asset-loading.component';

describe('AssetLoadingComponent', () => {
  let component: AssetLoadingComponent;
  let fixture: ComponentFixture<AssetLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
