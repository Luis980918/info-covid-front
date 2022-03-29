import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { UserRestService } from '../../../services/rest-services/user-rest.service';

@Component({ selector: 'app-forgot-password', styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'], templateUrl: './forgot-password.component.html' })
export class ForgotPasswordComponent extends BlankLayoutCardComponent {

  public email: string;
  public enviar = false;
  emailInvalido: any;
  error: any;

  constructor(public fb: FormBuilder,
              private usuarioService: UserRestService,
              public router: Router) {
    super();
  }

  recuperarClave() {
    this.usuarioService.recuperarClave(this.email).subscribe(data => {
    }, error => {
      this.error = error.error.message;
    }, () => {
      this.router.navigate(['/pages/login']);
    });
  }

  verificarEnviar(event) {
    this.enviar = false;
    this.emailInvalido = !this.esEmailValido(event);
    if ((event !== '') && !this.emailInvalido)  {
      this.enviar = true;
    }
  }

  esEmailValido(email: string): boolean {
    let mailValido = false;

    const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (email.match(EMAIL_REGEX)) {
      mailValido = true;
    }
    return mailValido;
  }
}
