import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Scheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
  @Injectable()
  export class MessageService {

   private online_users:any[] = [];
   private onlineUsersUrl = 'http://localhost:3000/api/online';
   
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
   constructor(private http: HttpClient) {
  }
   
  append_online_user_array(user: any){
    return this.http.post<any>(this.onlineUsersUrl, user, this.httpOptions)
  }

  delete_online_user_array(username: string){
    var i;
    var delete_index = -2;
    for(i=0;i<this.online_users.length;i++){
      if(this.online_users[i].username_attribute == username){
        delete_index = i;
      }
    }
    if(delete_index != 2){
      this.online_users.splice(delete_index, 1);
      return true
    }else{
      return false
    }
  }

  get_online_user_array(): any{
    return this.http.get<any>(this.onlineUsersUrl);
  }

  }