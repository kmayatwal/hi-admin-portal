import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteMonitoringMedicalConditionComponent } from './remote-monitoring-medical-condition.component';

describe('RemoteMonitoringMedicalConditionComponent', () => {
  let component: RemoteMonitoringMedicalConditionComponent;
  let fixture: ComponentFixture<RemoteMonitoringMedicalConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteMonitoringMedicalConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteMonitoringMedicalConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
