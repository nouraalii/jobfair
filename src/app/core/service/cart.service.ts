import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)
  createCart(products: { productId: number; quantity: number }[]): Observable<any> {
    const userId = Number(localStorage.getItem('userId'));

    const cartData = {
      id: Date.now(), 
      userId: userId,
      products: products
    };

    return this._HttpClient.post(`https://fakestoreapi.com/carts`, cartData);
  }

getCart(): Observable<any> {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return new Observable(observer => observer.error('No user found'));

  const user = JSON.parse(storedUser);
  return this._HttpClient.get(`https://fakestoreapi.com/carts/user/${user.id}`);
}


}
