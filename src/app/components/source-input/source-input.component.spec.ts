import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceInputComponent } from './source-input.component';

describe('SourceInputComponent', () => {
  let component: SourceInputComponent;
  let fixture: ComponentFixture<SourceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SourceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
