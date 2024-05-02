import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewFileSideMenuComponent } from './patient-view-file-side-menu.component';

describe('PatientViewFileSideMenuComponent', () => {
  let component: PatientViewFileSideMenuComponent;
  let fixture: ComponentFixture<PatientViewFileSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientViewFileSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientViewFileSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
