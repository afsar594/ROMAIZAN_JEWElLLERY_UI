import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPrintComponent } from './custom-print.component';

describe('CustomPrintComponent', () => {
  let component: CustomPrintComponent;
  let fixture: ComponentFixture<CustomPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
