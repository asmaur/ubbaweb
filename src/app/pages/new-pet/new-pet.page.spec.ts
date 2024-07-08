import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPetPage } from './new-pet.page';

describe('NewPetPage', () => {
  let component: NewPetPage;
  let fixture: ComponentFixture<NewPetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
