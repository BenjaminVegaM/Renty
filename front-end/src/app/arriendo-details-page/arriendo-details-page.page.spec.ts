import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArriendoDetailsPagePage } from './arriendo-details-page.page';

describe('ArriendoDetailsPagePage', () => {
  let component: ArriendoDetailsPagePage;
  let fixture: ComponentFixture<ArriendoDetailsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoDetailsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
