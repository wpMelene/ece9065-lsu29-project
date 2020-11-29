import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Scheduler } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Schedule } from '../schedule';


export interface Course {
  subject_code: String,
  course_code: String,
  time?: String[],
  days?: String[]
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private courseUrl = 'http://localhost:3000/api/allcourses';  // URL to web api
  private scheduleUrl = 'http://localhost:3000/api/schedules';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

/** GET hero by id. Will 404 if id not found */
getCourse(subject_code: String, course_code: String): Observable<Course> {
const url = `${this.courseUrl}/${subject_code}/${course_code}`;
const result_http =  this.http.get<any>(url);
return result_http
}

/** POST: add a new hero to the server */
addSchedule(hero: Schedule): Observable<Schedule> {
return this.http.post<any>(this.scheduleUrl, hero, this.httpOptions)
}


/** PUT: update the hero on the server */
updateSchedule(hero: String, course_list_attribute: String[]): Observable<Schedule> {
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
