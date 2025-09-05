import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetmasterComponent } from './assetmaster.component';

describe('AssetmasterComponent', () => {
  let component: AssetmasterComponent;
  let fixture: ComponentFixture<AssetmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
