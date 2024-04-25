import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiInternetOfflineComponent } from './hi-internet-offline.component';

describe('HiInternetOfflineComponent', () => {
  let component: HiInternetOfflineComponent;
  let fixture: ComponentFixture<HiInternetOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiInternetOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiInternetOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
