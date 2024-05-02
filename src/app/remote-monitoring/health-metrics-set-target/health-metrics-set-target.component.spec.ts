import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthMetricsSetTargetComponent } from './health-metrics-set-target.component';

describe('HealthMetricsSetTargetComponent', () => {
  let component: HealthMetricsSetTargetComponent;
  let fixture: ComponentFixture<HealthMetricsSetTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthMetricsSetTargetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthMetricsSetTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
