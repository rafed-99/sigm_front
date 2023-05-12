import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeologiesComponent } from './geologies.component';

describe('GeologieComponent', () => {
  let component: GeologiesComponent;
  let fixture: ComponentFixture<GeologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeologiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
