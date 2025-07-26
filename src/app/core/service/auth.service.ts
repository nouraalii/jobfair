import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interface/iuser.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient)

  register(user: any): Observable<any> {
    return this._HttpClient.post(`https://fakestoreapi.com/users`, user).pipe(
      tap((res: any) => {

        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    localStorage.removeItem('user');
  }
}
