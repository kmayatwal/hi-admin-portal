import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiSelectBoxComponent } from './hi-select-box.component';

describe('HiSelectBoxComponent', () => {
  let component: HiSelectBoxComponent;
  let fixture: ComponentFixture<HiSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
