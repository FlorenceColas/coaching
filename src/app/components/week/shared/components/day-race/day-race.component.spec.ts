import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayRaceComponent } from './day-race.component';

describe('DayRaceComponent', () => {
  let component: DayRaceComponent;
  let fixture: ComponentFixture<DayRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
