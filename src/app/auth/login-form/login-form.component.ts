import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public loginForm:FormGroup;

  constructor(
    private authServie: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  public login() {
    this.authServie.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
    .subscribe(
      response => {
        // save token
        this.authServie.setToken(response.token);

        // redirect to main page
        this.router.navigate(['/']);
      },
      errorResp => {
        const error = errorResp.error.error || errorResp.error.errors;
        console.log(error);
      }
    )
  }

}
