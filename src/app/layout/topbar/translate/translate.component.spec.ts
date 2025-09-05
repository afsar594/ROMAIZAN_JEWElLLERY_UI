import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslaterComponent } from './translate.component';

describe('TranslaterComponent', () => {
  let component: TranslaterComponent;
  let fixture: ComponentFixture<TranslaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslaterComponent ]
    })
    .compileComponents( );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
