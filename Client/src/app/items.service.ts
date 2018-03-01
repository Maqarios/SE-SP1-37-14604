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

  getProductsUrl = 'http://localhost:3000/api/product/getProducts';
  updateProductUrl = 'http://localhost:3000/api/product/updateProduct';
  createProductUrl = 'http://localhost:3000/api/product/createProduct';
  deleteProductUrl = 'http://localhost:3000/api/product/deleteProduct';

  constructor(private http: HttpClient) { }

  getProducts(): any {
    return this.http.get<Product[]>(this.getProductsUrl)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.createProductUrl, product, httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.patch(this.updateProductUrl + '/' +product._id, product, httpOptions).pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete<Product>(this.deleteProductUrl + '/' + product._id, httpOptions).pipe(
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