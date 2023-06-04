import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAppComponent } from './grid-app.component';

describe('GridAppComponent', () => {
  let component: GridAppComponent;
  let fixture: ComponentFixture<GridAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridAppComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GridAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
