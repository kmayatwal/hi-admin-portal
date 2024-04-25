import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthHubComponent } from './health-hub.component';

describe('HealthHubComponent', () => {
  let component: HealthHubComponent;
  let fixture: ComponentFixture<HealthHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
