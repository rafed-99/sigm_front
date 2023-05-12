import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisementComponent } from './gisement.component';

describe('GisementComponent', () => {
  let component: GisementComponent;
  let fixture: ComponentFixture<GisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GisementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
