import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPointComponent } from './detail-point.component';

describe('DetailPointComponent', () => {
  let component: DetailPointComponent;
  let fixture: ComponentFixture<DetailPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
