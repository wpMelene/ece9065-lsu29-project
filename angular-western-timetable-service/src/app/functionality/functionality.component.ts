import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../app/message.service';
import { Schedule } from '../../schedule';
import { AccountService } from '../../app/account.service';
import { InitialLoginComponent } from '../initial-login/initial-login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.css']
})

export class FunctionalityComponent implements OnInit{
  front_end_schedule!: Schedule[];
  saveres: any;
  messages_functionality: any[] = [];
  public_course_lst: any;

  constructor(private heroService: AccountService,
              public logged_in_users_component: InitialLoginComponent,
              public signUpVerification: SignupComponent,
              public onlineTrackingService: MessageService) { }

  public currently_login_as:any;

  ngOnInit() { this.get_online();
               this.onlineTrackingService.get_public_course_list().subscribe(res => this.public_course_lst = res);
  }

  get_online(){
    this.onlineTrackingService.get_online_user_array().subscribe(res => {
                                                                          this.currently_login_as = res[res.length - 1];
                                                                          console.log("get online initial", this.currently_login_as);                                                                          })
  }

  get_Course(subject_code: String, course_code: String): void {
    subject_code = subject_code.replace(/<[^>]+>/g, '');
    course_code = course_code.replace(/<[^>]+>/g, '');
    this.heroService.getCourse(subject_code, course_code).subscribe(res => {  var x = res.split(",");
                                                                              var i;
                                                                              for(i=0;i<x.length;i++){
                                                                                this.messages_functionality.push(x[i]);}
                                                                              });
  }

  

  add(schedule_name_attribute: string, schedule_access:string): void {
    schedule_name_attribute = schedule_name_attribute.trim();
    schedule_name_attribute = schedule_name_attribute.replace(/<[^>]+>/g, '');
    var created_by = this.currently_login_as.username_attribute;
    var schedule_temp = {
      schedule_name_attribute: schedule_name_attribute,
      course_list_attribute: [],
      access_for: schedule_access,
      created_by: created_by
    }

    if (!schedule_name_attribute) { return; }
    this.heroService.addSchedule(schedule_temp)
      .subscribe(hero=> {if(typeof hero != "string"){
        this.messages_functionality.push(hero.schedule_name_attribute + " is created, with " + hero.access_for + " accesibility. It was created by " + hero.created_by);}else{
          this.messages_functionality.push(hero);
        }
      });
  }

  save(schedule_name_attribute: String, course_list_attribute:String): void {
    console.log(schedule_name_attribute, course_list_attribute);
    schedule_name_attribute = schedule_name_attribute.trim();
    schedule_name_attribute = schedule_name_attribute.replace(/<[^>]+>/g, '');
    course_list_attribute = course_list_attribute.trim();
    course_list_attribute = course_list_attribute.replace(/<[^>]+>/g, '');
    var list_pairs = course_list_attribute.split(",");
    this.heroService.updateSchedule(schedule_name_attribute, list_pairs).subscribe(res => { this.messages_functionality.push("Course list with name " +
                                                                                            res.schedule_name_attribute +
                                                                                            " is updated with course list of: " + res.course_list_attribute + ". It has accessibility of "
                                                                                            + res.access_for)
                                                                                          });;
  }


  get_Schedule(schedule_name_attribute: String): void {
    schedule_name_attribute = schedule_name_attribute.replace(/<[^>]+>/g, '');
    this.heroService.getSchedule(schedule_name_attribute).subscribe(res => this.messages_functionality.push(res));
  }

  auth_write_review(subject_code:string, course_code: string, user_input_review: string): void {
    this.heroService.addReview(subject_code, course_code, user_input_review).subscribe(res => {
      this.messages_functionality.push(res);
    })
  }

  //auth_edit_course_list()

  auth_delete_course_list(schedule_name: string): void {

  }

} 