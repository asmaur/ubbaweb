import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorVetPage } from './tutor-vet.page';

describe('TutorVetPage', () => {
  let component: TutorVetPage;
  let fixture: ComponentFixture<TutorVetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorVetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
