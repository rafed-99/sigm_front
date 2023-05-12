import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseComponent } from './analyse.component';

describe('AnalyseComponent', () => {
  let component: AnalyseComponent;
  let fixture: ComponentFixture<AnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
