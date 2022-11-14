import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListficheComponent } from './listfiche.component';

describe('ListficheComponent', () => {
  let component: ListficheComponent;
  let fixture: ComponentFixture<ListficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListficheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
