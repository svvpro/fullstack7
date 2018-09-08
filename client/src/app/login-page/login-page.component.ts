import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MaterialService} from "../shared/classes/materialize.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
    this.ar.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Вы успешно зарегистрировались!');
      } else if (params['accessDenied']) {
        MaterialService.toast('Авторизируйтесь в системе');
      } else if (params['sessionFailed']) {
        MaterialService.toast('Время жизни сессии истекло. Авторизируйтесь заново');
      }
    });
  }

  submit(): void {
    this.form.disable();
    this.authService.login(this.form.value).subscribe(
      () => {
        console.log('Get data');
      },
      (error) => {
        console.log(error);
        this.form.enable();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
