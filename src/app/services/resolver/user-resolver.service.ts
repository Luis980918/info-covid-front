import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/index';
import { Usuario } from '../../core/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<Usuario> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> | Promise<Usuario> | Usuario {
    return undefined;
  }
}
