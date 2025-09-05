import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisacompanymasterComponent } from './visacompanymaster.component';

describe('VisacompanymasterComponent', () => {
  let component: VisacompanymasterComponent;
  let fixture: ComponentFixture<VisacompanymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisacompanymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisacompanymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
