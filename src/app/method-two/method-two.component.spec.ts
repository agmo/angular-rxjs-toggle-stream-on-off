import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodTwoComponent } from './method-two.component';

describe('MethodTwoComponent', () => {
  let component: MethodTwoComponent;
  let fixture: ComponentFixture<MethodTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
