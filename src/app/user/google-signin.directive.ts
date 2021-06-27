import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(private auth: AuthService) {}

  @HostListener('click')
  onclick() {
    this.auth.signInWithGoogle();
  }
}
