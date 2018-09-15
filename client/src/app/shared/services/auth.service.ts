import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = null;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post <{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token-key', token);
          this.setToken(token);
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  isAuthentificated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

  logout(): void {
    if (this.isAuthentificated()) {
      localStorage.clear();
      this.setToken(null);
    }
  }


}
