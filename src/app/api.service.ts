import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
 
import { User } from "./user";
// import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER ="http://127.0.0.1:80";

  constructor(private httpClient: HttpClient) { }

  readUsers()
  {
    return this.httpClient.get(`${this.PHP_API_SERVER}/backend/api/read.php`);
  }

  createOrUpdateUsers(users)
  {
    return this.httpClient.post(`${this.PHP_API_SERVER}/backend/api/modif.php`, users);
  }
}
