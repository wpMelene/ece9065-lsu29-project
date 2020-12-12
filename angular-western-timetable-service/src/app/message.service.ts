import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Scheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
  @Injectable()
  export class MessageService {

   private onlineUsersUrl = 'http://localhost:3000/api/online';
   private public_coursr_url = 'http://localhost:3000/api/public';
   
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
   constructor(private http: HttpClient) {
  }
   
  append_online_user_array(user: any){
    return this.http.post<any>(this.onlineUsersUrl, user, this.httpOptions)
  }

  delete_online_user_array(username: string): Observable<any>{
    const url = `${this.onlineUsersUrl}/${username}`;
    return this.http.delete<any>(url, this.httpOptions)
  }

  get_online_user_array(): Observable<any>{
    return this.http.get<any>(this.onlineUsersUrl);
  }

  get_public_course_list(){
    return this.http.get<any>(this.public_coursr_url)
  }

  }