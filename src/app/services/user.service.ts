import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {environment} from '../../environments/environment';

const urlBase = environment.apiBaseUrl + 'usuarios';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  crearUsuario(user: any): Observable<any> {
    return this.http.post(`${urlBase}/`, user);
  }

  actualizarUsuario(user: any): Observable<any> {
    return this.http.put(`${urlBase}/actualizar-usuario`, user);
  }

  recuperarClave(email: any): Observable<any> {
    return this.http.post(`${urlBase}/recuperar-clave/${email}`, httpOptions);
  }
}
