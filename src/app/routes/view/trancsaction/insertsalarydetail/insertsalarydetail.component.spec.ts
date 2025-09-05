import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertsalarydetailComponent } from './insertsalarydetail.component';

describe('InsertsalarydetailComponent', () => {
  let component: InsertsalarydetailComponent;
  let fixture: ComponentFixture<InsertsalarydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertsalarydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertsalarydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
