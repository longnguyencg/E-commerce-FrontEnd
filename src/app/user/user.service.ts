import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUsers} from './interface/iusers';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://127.0.0.1:8000/api/';
  user;
  userData = new BehaviorSubject<object>(this.user);
  cast = this.userData.asObservable();

  constructor(protected http: HttpClient) {
  }

  // @ts-ignore
  updateUser(user) {
    this.userData.next(user);
  }

  getAll(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.url + 'users');
  }

  login(data): Observable<IUsers> {
    return this.http.post<IUsers>(this.url + 'login', data);
  }

  register(data): Observable<IUsers> {
    console.log(data);
    return this.http.post<IUsers>(this.url + 'register', data);
  }

  logout() {
    return this.http.get(this.url + 'logout');
  }

  findById(id): Observable<IUsers> {
    return this.http.get<IUsers>(this.url + id);
  }
}
