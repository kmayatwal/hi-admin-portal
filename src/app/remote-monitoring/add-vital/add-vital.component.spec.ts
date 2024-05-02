import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVitalComponent } from './add-vital.component';

describe('AddVitalComponent', () => {
  let component: AddVitalComponent;
  let fixture: ComponentFixture<AddVitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
