import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIngenieursComponent } from './list-ingenieurs.component';

describe('ListIngenieursComponent', () => {
  let component: ListIngenieursComponent;
  let fixture: ComponentFixture<ListIngenieursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIngenieursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIngenieursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
