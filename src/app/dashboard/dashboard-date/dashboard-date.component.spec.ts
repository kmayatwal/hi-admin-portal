import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDateComponent } from './dashboard-date.component';

describe('DashboardDateComponent', () => {
  let component: DashboardDateComponent;
  let fixture: ComponentFixture<DashboardDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
