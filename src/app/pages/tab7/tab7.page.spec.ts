import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab7Page } from './tab7.page';

describe('Tab7Page', () => {
  let component: Tab7Page;
  let fixture: ComponentFixture<Tab7Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
