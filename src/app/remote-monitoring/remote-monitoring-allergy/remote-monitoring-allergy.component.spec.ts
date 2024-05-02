import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteMonitoringAllergyComponent } from './remote-monitoring-allergy.component';

describe('RemoteMonitoringAllergyComponent', () => {
  let component: RemoteMonitoringAllergyComponent;
  let fixture: ComponentFixture<RemoteMonitoringAllergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteMonitoringAllergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteMonitoringAllergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
