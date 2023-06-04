import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let de: DebugElement
  let el: HTMLElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'))
    el = de.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call submit', () => {
    fixture.detectChanges();
    spyOn(component, 'signIn')
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click()
    expect(component.signIn).toHaveBeenCalledTimes(0);
  });
  it('should be Invaild', () => {
    component.signUpForm.controls['email'].setValue('');
    component.signUpForm.controls['nickname'].setValue('');
    expect(component.signUpForm.valid).toBeFalsy();

  });
  it('should be valid', () => {
    component.signUpForm.controls['email'].setValue('adsaasd@aksjdsa.com');
    component.signUpForm.controls['nickname'].setValue('desisda');
    expect(component.signUpForm.valid).toBeFalsy();

  });
});
