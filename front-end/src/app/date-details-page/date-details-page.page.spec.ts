import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateDetailsPagePage } from './date-details-page.page';

describe('DateDetailsPagePage', () => {
  let component: DateDetailsPagePage;
  let fixture: ComponentFixture<DateDetailsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDetailsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
