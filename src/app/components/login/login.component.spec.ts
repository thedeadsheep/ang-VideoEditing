import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement
  let el: HTMLElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.inside-wrap'))
    el = de.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call password', () => {
    fixture.detectChanges();
    spyOn(component, 'getPassword')
    el = fixture.debugElement.query(By.css('button.get-pass')).nativeElement;
    el.click()
    expect(component.getPassword).toHaveBeenCalledTimes(0);
  });
  it('should call login', () => {
    fixture.detectChanges();
    spyOn(component, 'login')
    el = fixture.debugElement.query(By.css('button.login')).nativeElement;
    el.click()
    expect(component.getPassword).toHaveBeenCalledTimes(0);
  });
});
