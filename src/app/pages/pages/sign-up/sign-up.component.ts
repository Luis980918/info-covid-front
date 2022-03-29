import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@services/*';

import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import {Usuario} from '../../../core/usuario';
import {UserRestService} from '../../../services/rest-services/user-rest.service';

@Component({
  selector: 'app-sign-up',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent extends BlankLayoutCardComponent implements OnInit {

  public signupForm: FormGroup;
  public email;
  public password;
  public username;
  public nombres;
  public emailPattern = '\\S+@\\S+\\.\\S+';
  public error: string;

  constructor(public authService: AuthService,
              public fb: FormBuilder,
              public router: Router,
              private userService: UserRestService) {
    super();

    this.signupForm = this.fb.group({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        Validators.maxLength(100),
      ]),
      username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      nombres: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
    this.email = this.signupForm.get('email');
    this.password = this.signupForm.get('password');
    this.username = this.signupForm.get('username');
    this.nombres = this.signupForm.get('nombres');
  }

  public ngOnInit() {
    this.authService.logout();
    this.signupForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }

  public login() {
    this.error = null;
    if (this.signupForm.valid) {
      let usuario = new Usuario();
      usuario.userName = this.username.value;
      usuario.nombreCompleto = this.nombres.value;
      usuario.correo = this.email.value;
      usuario.contrasena = this.password.value;
      this.userService.crearUsuario(usuario).subscribe(data => {
        this.router.navigate(['/pages/login']);
      });
    }
  }

  public onInputChange(event) {
    event.target.required = true;
  }
}
