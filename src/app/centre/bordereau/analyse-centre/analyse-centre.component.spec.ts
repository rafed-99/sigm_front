import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseCentreComponent } from './analyse-centre.component';

describe('AnalyseCentreComponent', () => {
  let component: AnalyseCentreComponent;
  let fixture: ComponentFixture<AnalyseCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
