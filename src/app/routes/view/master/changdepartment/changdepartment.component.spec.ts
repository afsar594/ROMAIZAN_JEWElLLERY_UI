import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangdepartmentComponent } from './changdepartment.component';

describe('ChangdepartmentComponent', () => {
  let component: ChangdepartmentComponent;
  let fixture: ComponentFixture<ChangdepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangdepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
