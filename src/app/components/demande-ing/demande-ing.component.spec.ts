import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeIngComponent } from './demande-ing.component';

describe('DemandeIngComponent', () => {
  let component: DemandeIngComponent;
  let fixture: ComponentFixture<DemandeIngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeIngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeIngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
