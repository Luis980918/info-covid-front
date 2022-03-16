import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {User} from './user';

const tokenName = 'token';
const urlBase = environment.apiBaseUrl + 'usuarios';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
              providedIn: 'root',
            })
export class AuthService {

  private isLogged$ = new BehaviorSubject(false);
  private url = `${environment.apiBaseUrl}/api/auth`;
  private user = {username: 'Luke', email: 'Luke@skywalker.com'}; // some data about user

  constructor(private http: HttpClient) {

  }

  public get isLoggedIn(): boolean {
    return this.isLogged$.value;
  }

  public login(user, password): Observable<any> {
    return this.http.get(`${urlBase}/iniciar-sesion/${user}/${password}`, httpOptions)
      .pipe(
        map((res: any) => {
          if (res && res.body) {
            let usuarioConsultado = new User();
            usuarioConsultado.username = 'user.userName';
            usuarioConsultado.email = 'user.correo';
            this.user = usuarioConsultado;
            localStorage.setItem(tokenName, 'res.token');
            // only for example
            localStorage.setItem('username', res.body.userName);
            localStorage.setItem('email', res.body.correo);
            this.isLogged$.next(true);
            return this.user;
          }
        }));
  }

  public logout() {
    return this.http.get(`${this.url}/logout`)
      .pipe(map((data) => {
        localStorage.clear();
        this.user = null;
        this.isLogged$.next(false);
        return of(false);
      }));
  }

  public get authToken(): string {
    return localStorage.getItem(tokenName);
  }

  public get userData(): Observable<any> {
    // send current user or load data from backend using token
    return this.loadUser();
  }

  private loadUser(): Observable<any> {
    // use request to load user data with token
    // it's fake and useing only for example
    if (localStorage.getItem('username') && localStorage.getItem('email')) {
      this.user = {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
      };
    }
    return of(this.user);
  }
}
