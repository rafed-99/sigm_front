import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauComponent } from './bordereau.component';

describe('BordereauComponent', () => {
  let component: BordereauComponent;
  let fixture: ComponentFixture<BordereauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BordereauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
