import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interface/iproduct.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _HttpClient = inject(HttpClient)

  getAllProducts():Observable<IProduct[]>{
    return this._HttpClient.get<IProduct[]>("https://fakestoreapi.com/products");
  }

  getProductDetails(id:number):Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/${id}`)
  }
}
