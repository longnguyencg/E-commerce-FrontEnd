import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUsers} from './interface/iusers';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {Idata} from '../home/item/idata';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://127.0.0.1:8000/api/';
  user;
  loggedIn: boolean;
  userData = new BehaviorSubject<object>(this.user);
  cast = this.userData.asObservable();
  loggedInData = new BehaviorSubject<boolean>(this.loggedIn);
  castLoggedIn = this.loggedInData.asObservable();

  constructor(protected http: HttpClient) {
  }

  // @ts-ignore
  updateUser(user) {
    this.userData.next(user);
  }

  updateLoggedIn(loggedIn: boolean) {
    this.loggedInData.next(loggedIn);
  }

  getAll(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.url + 'users');
  }

  getDetails(id): Observable<Idata> {
    return this.http.get<Idata>(this.url + 'users/detail/' + id);
  }

  login(data): Observable<IUsers> {
    return this.http.post<IUsers>(this.url + 'login', data);
  }

  register(data): Observable<IUsers> {
    return this.http.post<IUsers>(this.url + 'register', data);
  }

  logout() {
    return this.http.get(this.url + 'logout');
  }

  findById(id): Observable<IUsers> {
    return this.http.get<IUsers>(this.url + id);
  }

  updateDetails(user): Observable<any> {
    return this.http.put<any>(this.url + 'users/detail', user);
  }

  newDetails(user): Observable<any> {
    return this.http.post<any>(this.url + 'users/detail', user);
  }

  changePass(data): Observable<any> {
    return this.http.put<any>(this.url + 'user', data);
  }
}
