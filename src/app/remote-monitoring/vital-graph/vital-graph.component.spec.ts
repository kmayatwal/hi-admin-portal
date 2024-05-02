import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalGraphComponent } from './vital-graph.component';

describe('VitalGraphComponent', () => {
  let component: VitalGraphComponent;
  let fixture: ComponentFixture<VitalGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
