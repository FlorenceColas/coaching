import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayFitnessComponent } from './day-fitness.component';

describe('DayFitnessComponent', () => {
  let component: DayFitnessComponent;
  let fixture: ComponentFixture<DayFitnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayFitnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayFitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
