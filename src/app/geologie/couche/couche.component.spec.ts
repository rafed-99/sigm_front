import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoucheComponent } from './couche.component';

describe('CoucheComponent', () => {
  let component: CoucheComponent;
  let fixture: ComponentFixture<CoucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoucheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
