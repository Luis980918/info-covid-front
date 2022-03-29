import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private userService: UserService) { }

  crearUsuario(usuario: any): Observable<any> {
    return this.userService.crearUsuario(usuario).pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }

  actualizarUsuario(usuario: any): Observable<any> {
    return this.userService.actualizarUsuario(usuario).pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }

  recuperarClave(email: any): Observable<any> {
    return this.userService.recuperarClave(email).pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }
}
