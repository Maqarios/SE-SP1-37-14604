import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Product } from './dashboard/items/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/product/getProducts')
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.patch('/product/updateProduct/' + product.id, product, httpOptions).pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/product/createProduct', product, httpOptions).pipe(
      catchError(this.handleError<Product>('createProduct'))
    );
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>('/product/deleteProduct/' + product.id, httpOptions).pipe(
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}