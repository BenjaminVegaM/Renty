import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletaDetailsPagePage } from './boleta-details-page.page';

describe('BoletaDetailsPagePage', () => {
  let component: BoletaDetailsPagePage;
  let fixture: ComponentFixture<BoletaDetailsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaDetailsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
