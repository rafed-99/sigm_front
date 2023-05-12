import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEchantillonComponent } from './detail-echantillon.component';

describe('DetailEchantillonComponent', () => {
  let component: DetailEchantillonComponent;
  let fixture: ComponentFixture<DetailEchantillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEchantillonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEchantillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
