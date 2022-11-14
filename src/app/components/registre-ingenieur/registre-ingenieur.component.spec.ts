import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreIngenieurComponent } from './registre-ingenieur.component';

describe('RegistreIngenieurComponent', () => {
  let component: RegistreIngenieurComponent;
  let fixture: ComponentFixture<RegistreIngenieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreIngenieurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreIngenieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
