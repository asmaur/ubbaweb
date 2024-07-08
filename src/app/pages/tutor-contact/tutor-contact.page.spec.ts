import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorContactPage } from './tutor-contact.page';

describe('TutorContactPage', () => {
  let component: TutorContactPage;
  let fixture: ComponentFixture<TutorContactPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
