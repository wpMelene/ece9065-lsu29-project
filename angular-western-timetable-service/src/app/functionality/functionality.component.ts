import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Schedule } from '../../schedule';
import { AccountService } from '../../app/account.service';


@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.css']
})

export class FunctionalityComponent implements OnInit{
  front_end_schedule!: Schedule[];
  saveres!: any;
  
  constructor(private heroService: AccountService) { }

  ngOnInit() {
  }

  get_Course(subject_code: String, course_code: String): void {
    subject_code = subject_code.replace(/<[^>]+>/g, '');
    course_code = course_code.replace(/<[^>]+>/g, '');
    this.heroService.getCourse(subject_code, course_code).subscribe(res => {this.saveres = res, console.log(res)
      });
  }

  add(schedule_name_attribute: string): void {
    schedule_name_attribute = schedule_name_attribute.trim();
    schedule_name_attribute = schedule_name_attribute.replace(/<[^>]+>/g, '');
    if (!schedule_name_attribute) { return; }
    this.heroService.addSchedule({ schedule_name_attribute } as Schedule)
      .subscribe(hero=> {
        console.log(hero);
      });
  }

  save(schedule_name_attribute: String, course_list_attribute:String): void {
    console.log(schedule_name_attribute, course_list_attribute);
    schedule_name_attribute = schedule_name_attribute.trim();
    schedule_name_attribute = schedule_name_attribute.replace(/<[^>]+>/g, '');
    course_list_attribute = course_list_attribute.trim();
    course_list_attribute = course_list_attribute.replace(/<[^>]+>/g, '');
    var list_pairs = course_list_attribute.split(",");
    this.heroService.updateSchedule(schedule_name_attribute, list_pairs).subscribe(res => console.log(res));;
  }


  get_Schedule(schedule_name_attribute: String): void {
    schedule_name_attribute = schedule_name_attribute.replace(/<[^>]+>/g, '');
    this.heroService.getSchedule(schedule_name_attribute).subscribe(res => console.log(res));
  }
} 