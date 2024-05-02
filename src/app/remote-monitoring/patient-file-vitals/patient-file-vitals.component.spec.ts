import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFileVitalsComponent } from './patient-file-vitals.component';

describe('PatientFileVitalsComponent', () => {
  let component: PatientFileVitalsComponent;
  let fixture: ComponentFixture<PatientFileVitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFileVitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFileVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
