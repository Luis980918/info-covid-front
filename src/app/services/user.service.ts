import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {environment} from '../../environments/environment';

const urlBase = environment.apiBaseUrl + 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  crearUsuario(user: any): Observable<any> {
    return this.http.post(`${urlBase}/`, user);
  }
}
