import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveVideoComponent } from './archive-video.component';

describe('ArchiveVideoComponent', () => {
  let component: ArchiveVideoComponent;
  let fixture: ComponentFixture<ArchiveVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
