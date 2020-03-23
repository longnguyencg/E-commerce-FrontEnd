import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from './icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://127.0.0.1:8000/api/categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }

  add(cate): Observable<ICategory> {
    return this.http.post<ICategory>(this.url, cate);
  }

  update(cate): Observable<ICategory> {
    return this.http.patch<ICategory>(this.url, cate);
  }
}
