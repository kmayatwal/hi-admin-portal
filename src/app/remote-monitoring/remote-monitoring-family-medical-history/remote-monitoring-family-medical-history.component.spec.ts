import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteMonitoringFamilyMedicalHistoryComponent } from './remote-monitoring-family-medical-history.component';

describe('RemoteMonitoringFamilyMedicalHistoryComponent', () => {
  let component: RemoteMonitoringFamilyMedicalHistoryComponent;
  let fixture: ComponentFixture<RemoteMonitoringFamilyMedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteMonitoringFamilyMedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteMonitoringFamilyMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
