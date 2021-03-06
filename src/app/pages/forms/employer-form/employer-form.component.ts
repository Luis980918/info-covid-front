import { Component, HostBinding, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '@services/*';
import { CompleteUser } from '../../../services/auth/complete-user';
import { UserRestService } from '../../../services/rest-services/user-rest.service';

@Component({
  selector: 'app-employer-form',
  styleUrls: ['./employer-form.component.scss'],
  templateUrl: 'employer-form.component.html',
})
export class EmployerFormComponent implements  OnInit {
  @HostBinding('class.employer-form') public readonly employerForm = true;

  user: CompleteUser;
  cambiarClaveUsuario = false;
  correo: string;
  claveActual: string;
  nuevaClave: string;
  confirmarClave: string;
  nombres: string;
  apellidos: string;
  username: string;
  celular: string;
  deshabilitarActualizar = false;

  constructor(private authService: AuthService,
              private userService: UserRestService,
              public router: Router) {}

  ngOnInit(): void {
    this.authService.userData.subscribe(user => this.user = user ? user : {
      userName: 'User',
      email: 'User@User.com',
    });

    this.authService.getUser().subscribe(data => {
      if (data) {
        this.user = data;
        this.asignarInformacionDeUsuario();
      }
    });
  }

  cambiarClave() {
    this.cambiarClaveUsuario = !this.cambiarClaveUsuario;
  }

  private asignarInformacionDeUsuario() {
    if (this.user) {
      this.correo = this.user.correo;
      this.nombres = this.user.nombreCompleto;
      this.username = this.user.userName;
      this.celular = this.user.celular ? this.user.celular : '';
    }
  }

  actualizar() {
    this.user.nombreCompleto = this.nombres;
    this.user.userName = this.username;
    this.user.celular = this.celular;
    this.user.ciudadCliente = null;
    if ((this.claveActual === this.user.contrasena) && (this.nuevaClave === this.confirmarClave)) {
      this.user.contrasena = this.nuevaClave;
    }
    this.userService.actualizarUsuario(this.user).subscribe(data => {
      if (data) {
        this.router.navigate(['/app/dashboard']);
      }
    });
  }

  verificarCampos() {
    this.deshabilitarActualizar = false;
    if (this.claveActual && this.nuevaClave && this.confirmarClave) {
      if (!((this.claveActual === this.user.contrasena) && (this.nuevaClave === this.confirmarClave))) {
        this.deshabilitarActualizar = true;
      }
    } else {
      this.deshabilitarActualizar = false;
    }
  }
}
