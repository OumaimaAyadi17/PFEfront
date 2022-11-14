import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeTaskClientComponent } from './demande-task-client.component';

describe('DemandeTaskClientComponent', () => {
  let component: DemandeTaskClientComponent;
  let fixture: ComponentFixture<DemandeTaskClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeTaskClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeTaskClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
