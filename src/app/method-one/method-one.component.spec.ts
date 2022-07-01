import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodOneComponent } from './method-one.component';

describe('MethodOneComponent', () => {
  let component: MethodOneComponent;
  let fixture: ComponentFixture<MethodOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
