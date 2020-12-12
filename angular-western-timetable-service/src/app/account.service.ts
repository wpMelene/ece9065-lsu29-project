import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Scheduler } from 'rxjs';
import { Schedule } from '../schedule';


export interface Course {
  subject_code: String,
  course_code: String,
  time?: String[],
  days?: String[]
}

export interface Account {
  username_attribute: "",
  email_attribute:"",
  password_attribute:"",
  auth_attribute: false,              // is the email verified?
  activation_attribute: true,         // is the account deactivated by the admin?
  admin_attribute: false,              // is the account an admin or granted as an admin?
  course_created: 0
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private courseUrl = 'http://localhost:3000/api/allcourses';  // URL to web api
  private scheduleUrl = 'http://localhost:3000/api/schedules';  // URL to web api
  private accountUrl = 'http://localhost:3000/api/accounts'; // URL to web api
  private accountLoginUrl = 'http://localhost:3000/api/accountslogin'; // URL to web api
  private reviewUrl = 'http://localhost:3000/api/review'; // URL to web api
  private courseListUrl = 'http://localhost:3000/api/courseList'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

//---------------------------------------------------------------------------------Account services------------------------------------------------------------------------------//
createAcount(username_attribute: String, email_attribute: String, password_attribute: String):Observable<Account>{
  const new_added_account = {
                              "username_attribute": username_attribute,
                              "email_attribute":email_attribute,
                              "password_attribute":password_attribute,
                              "auth_attribute": false,              // is the email verified?
                              "activation_attribute": true,         // is the account deactivated by the admin?
                              "admin_attribute": false,              // is the account an admin or granted as an admin?
                              "course_created": 0
                            };
  return this.http.post<any>(this.accountUrl, new_added_account, this.httpOptions)
}

show_detail(course_list: string[]): Observable<any>{
  return this.http.post<any>(this.courseListUrl, course_list, this.httpOptions)
}


loginAcount(email_attribute: String, password_attribute: String):Observable<Account>{
  const login_account = {
                              "email_attribute":email_attribute,
                              "password_attribute":password_attribute,
                            };
  return this.http.post<any>(this.accountLoginUrl, login_account, this.httpOptions);
}

updateAccountAccess(email_attribute: string, auth_attribute: any, activation_attribute: any, admin_attribute: any): Observable<any>{
  const update_account = {
    "email_attribute":email_attribute,
    "auth_attribute": auth_attribute,              // is the email verified?
    "activation_attribute": activation_attribute,         // is the account deactivated by the admin?
    "admin_attribute": admin_attribute,              // is the account an admin or granted as an admin?
  }
  return this.http.put<any>(this.accountUrl, update_account, this.httpOptions);
}








//---------------------------------------------------------------------------------Schedule services------------------------------------------------------------------------------//
/** GET hero by id. Will 404 if id not found */
getCourse(subject_code: String, course_code: String): Observable<any> {
const url = `${this.courseUrl}/${subject_code}/${course_code}`;
const result_http =  this.http.get<any>(url);
return result_http
}

addReview(subject_code:string, course_code: string, user_input_review:string): Observable<any> {
  var temp_pack = {subject_code: subject_code,
                   course_code: course_code,
                   user_input_review: user_input_review}
  return this.http.post<any>(this.reviewUrl, temp_pack, this.httpOptions);
}

/** POST: add a new hero to the server */
addSchedule(hero: any): Observable<any> {
return this.http.post<any>(this.scheduleUrl, hero, this.httpOptions);
}


/** PUT: update the hero on the server */
updateSchedule(hero: String, course_list_attribute: String[]): Observable<any> {
const my_schedule = {"schedule_name_attribute": hero, 
                     "list_of_pairs": course_list_attribute};
return this.http.put(this.scheduleUrl, my_schedule, this.httpOptions)
}

getSchedule(schedule_name_attribute: String): Observable<Schedule> {
const url = `${this.scheduleUrl}/${schedule_name_attribute}`;
return this.http.get<any>(url);
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
