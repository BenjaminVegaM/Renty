import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletaCreationPage } from './boleta-creation.page';

describe('BoletaCreationPage', () => {
  let component: BoletaCreationPage;
  let fixture: ComponentFixture<BoletaCreationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
