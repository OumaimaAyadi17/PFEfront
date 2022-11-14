import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheInterventionIngComponent } from './fiche-intervention-ing.component';

describe('FicheInterventionIngComponent', () => {
  let component: FicheInterventionIngComponent;
  let fixture: ComponentFixture<FicheInterventionIngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheInterventionIngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheInterventionIngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
