import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitiosComponent } from './sitios.component';

describe('SitiosComponent', () => {
  let component: SitiosComponent;
  let fixture: ComponentFixture<SitiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
