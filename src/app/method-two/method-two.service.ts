import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MethodTwoService {
  joke$ = this.http.get<{value: string}>('https://api.chucknorris.io/jokes/random');

  constructor(private http: HttpClient) { }
}
