import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartClientComponent } from './chart-client.component';

describe('ChartClientComponent', () => {
  let component: ChartClientComponent;
  let fixture: ComponentFixture<ChartClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
