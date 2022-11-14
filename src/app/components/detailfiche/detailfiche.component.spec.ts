import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailficheComponent } from './detailfiche.component';

describe('DetailficheComponent', () => {
  let component: DetailficheComponent;
  let fixture: ComponentFixture<DetailficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailficheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
