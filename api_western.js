const express = require('express');
const app = express();
app.use(express.json());
//var json_file = require('./Lab3-timetable-data.json');
const fs = require('fs');
var cors=require('cors');
const { json } = require('body-parser');

app.use(cors({origin:true,credentials: true}));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // Origin, Content-Type, X-Auth-Token
    next();
});

function fsReadFileSynchToArray (filePath) {
    // Reading Json file as an array
    var data = JSON.parse(fs.readFileSync(filePath));
    return data;
}

var json_stat  = fsReadFileSynchToArray ('./Lab3-timetable-data.json');
var saved_schedule = [];

function extract_subject_description(json_data){
    // extract the subject code and description for all courses
    var res_list = [];
    for(i = 0; i < json_data.length; i++){
        res_list.push([json_data[i].subject, json_data[i].className]);
    }
    return res_list;
}

function get_course_codes(json_data, subject_code){
    // Get all course codes (property name: catalog_nbr) for a given subject code. Return an error if the subject code doesn’t exist.
    var res_list = [];
    for(i = 0; i < json_data.length; i++){
        if(json_data[i].subject == subject_code){
            res_list.push(json_data[i].catalog_nbr);
        }
    }
    if (res_list.length == 0){
        return "Error, Nothing found";
    }
    else{
        return res_list;
    }
}

function retrive_time_entry(subject_code, course_code){
    // Get the timetable entry for a given subject code (property name: subject), a course code(property name: catalog_nbr) and an optional course component. 
    // Return an error if the subject code or course code doesn’t exist. 
    // If the course component is not specified, return time table entries for all components. 
    var res_list = [];
    if(course_code == "null"){
        for(i = 0; i < json_stat.length; i++){
            if(json_stat[i].subject == subject_code){
                res_list.push([json_stat[i].subject + json_stat[i].catalog_nbr, json_stat[i].course_info[0].start_time, json_stat[i].course_info[0].end_time, json_stat[i].course_info[0].days]);
            }
        }
        return res_list;
    }
    for(i = 0; i < json_stat.length; i++){
        if(json_stat[i].subject == subject_code && json_stat[i].catalog_nbr == course_code){
            res_list.push(json_stat[i].subject + json_stat[i].catalog_nbr, json_stat[i].course_info);
        }
    }
    if(res_list.length == 0){
        return "No such course found";
    }else{
        //since the result is unique, extract all time information for the search result
        var days_info = res_list[1][0].days;
        var time_entry_start = res_list[1][0].start_time;
        var time_entry_end = res_list[1][0].end_time;
        var classinfo = res_list[0];
        res_list = [];
        res_list.push(classinfo, days_info, time_entry_start, time_entry_end);
    return res_list;
}
}

function get_full_course_info(subject_code, course_code){
    var res_list = [];
    if(course_code == "null"){
        for(i = 0; i < json_stat.length; i++){
            if(json_stat[i].subject == subject_code){
                res_list.push(json_stat[i].subject + json_stat[i].catalog_nbr);
            }
        }
        return "class found: " + res_list;
    }
    for(i = 0; i < json_stat.length; i++){
        if(json_stat[i].subject == subject_code && json_stat[i].catalog_nbr == course_code){
            var res = json_stat[i];
            var temp = res.course_info;
            
            var a = "catalog_nbr:" + res.catalog_nbr;
            var b = "subject:" + res.subject;
            var c = "className:" + res.className;
            var d = "course_info: This course has class no. of " + temp[0].class_nbr.toString() + "and starts at " + temp[0].start_time;
            " ends at " + temp[0].end_time + ". The class is held in " + temp[0].campus + " campus with facility ID of  ";
            temp[0].facility_ID + ". The class will be held in " + temp[0].days.toString();
            var e = "The class_section is " + temp[0].class_section;
            var f = "ssr_component: " + temp[0].ssr_component;
            var g = "enrl_stat: " + temp[0].enrl_stat;
            var h = "descr: " + temp[0].descr;
            var l = res.catalog_description;
            var des = res.instructors;

            var message = [a,b,c,d,e,f,g,h,l,des];

            return message;
        }
    }
}

function update_course_review(subject_code, course_code, user_input_review){
    for(i = 0; i < json_stat.length; i++){
        if(json_stat[i].subject == subject_code && json_stat[i].catalog_nbr == course_code){
            json_stat[i].instructors = user_input_review;
            return "update successfully.";
        }
    }return "No such course found."
}

function search_schedule(schedule_name){
    // search for a schedule name to check whether it already exists
    for(i = 0; i < saved_schedule.length; i++){
        if(schedule_name == saved_schedule[i].schedule_name_attribute){
            return true;
        }
    }
    return false;
}

var public_list = [];
function prepend(arr, item) {
    return [item].concat(arr);
}

function create_schedule(schedule_name, access_for, created_by, schedule_description){
    // Create a new schedule (to save a list of courses) with a given schedule name.
    // Return an error if name exists.
    const schedule_temp = {
        course_list_attribute: [],
        schedule_name_attribute: schedule_name,
        access_for: access_for,
        created_by: created_by,
        schedule_description: schedule_description
    }
    
    if(search_schedule(schedule_name)){
        return "This schedule already exists.";
    }

    for(i=0;i<saved_account.length;i++){
        if(saved_account[i].username_attribute == created_by){
            saved_account[i].course_created += 1;
        }
    }

    if(access_for == "public"){
        public_list = prepend(public_list, schedule_temp);
    }
    
    saved_schedule.push(schedule_temp);
    return schedule_temp;
    
}

function delete_schedule(schedule_name){
    // Delete a schedule with a given name. Return an error if the given schedule doesn’t exist.
    for(i = 0; i < saved_schedule.length; i++){
        if(schedule_name == saved_schedule[i].schedule_name_attribute){
            saved_schedule.remove(i);
            return "The given schedule has been successfully deleted.";
    }
    return "There is no such schedule to be deleted.";
}
}

function temp(combination){
    var sub = "";
    var cor = "";
    if(/^[a-zA-Z]+$/.test(combination[combination.length-1])){
        var is_tail = true;
        var tail = combination[combination.length-1];
        combination=combination.slice(0,combination.length-1)
    }
    for(i = 0; i < combination.length; i++){
        if(/^[a-zA-Z]+$/.test(combination[i])){
            sub = sub+combination[i];
        }else{
            cor = cor+combination[i];
        }
    }
    if(is_tail){
        cor = cor + tail;
    }
    return [sub,cor];
}

function schedules_info(){
    // Get a list of schedule names and the number of courses that are saved in each schedule.
    var info_list = [];
    var course_l = [];
    for(i = 0; i < saved_schedule.length; i++){
        info_list.push([saved_schedule[i].schedule_name_attribute, saved_schedule[i].course_list_attribute.length, saved_schedule[i].course_list_attribute]);
        }
    return info_list;
}

function delete_all_schedules(){
    saved_schedule = [];
    return;
}

// -------------USER ACCOUNT OPERATION ------------------------------//
var saved_account = [{
    username_attribute: "administrator",
    email_attribute: "admin@admin.com",
    password_attribute:"admin1",
    auth_attribute: true,              // is the email verified?
    activation_attribute: true,         // is the account deactivated by the admin?
    admin_attribute: true,             // is the account an admin or granted as an admin?
    course_created: 0
                    }];
var username_list = [];
var email_list = [];

function search_account(username, emailname){
    // search for a schedule name to check whether it already exists
    var x = true;
    var y = true;

    for(i = 0; i < username_list.length; i++){
        if(username == username_list[i]){
            x = false;
        }
    }
    
    
    for(j = 0; j < email_list.length; j++){
        if(emailname == email_list[j]){
            y = false;
        }
    }

    
    if(x && y){
        return true;
    }else{
        return false;
    }
}

function create_account(username_attribute, email_attribute, password_attribute){
    // Create a new schedule (to save a list of courses) with a given schedule name.
    // Return an error if name exists.
    const account = {
        username_attribute: "",
        email_attribute:"",
        password_attribute:"",
        auth_attribute: false,              // is the email verified?
        activation_attribute: true,         // is the account deactivated by the admin?
        admin_attribute: false,             // is the account an admin or granted as an admin?
        course_created: 0
    }

    if(search_account(username_attribute, email_attribute)){
        const account_temp = {
            username_attribute: username_attribute,
            email_attribute: email_attribute,
            password_attribute:password_attribute,
            auth_attribute: false,              // is the email verified?
            activation_attribute: true,         // is the account deactivated by the admin?
            admin_attribute: false,             // is the account an admin or granted as an admin?
            course_created: 0
        }

        saved_account.push(account_temp);
        username_list.push(username_attribute);
        email_list.push(email_attribute);

        return account_temp;
    }else{
        return "Username or Email already exists.";
    }
}

function login_account(email_attribute_input, password_attribute_input){
    for(i=0;i<saved_account.length;i++){
        if(email_attribute_input ==saved_account[i].email_attribute){
            if(password_attribute_input == saved_account[i].password_attribute && saved_account[i].activation_attribute){
                return saved_account[i];
            }if(password_attribute_input == saved_account[i].password_attribute && !(saved_account[i].activation_attribute)){
                return "Account is deactivated, contact admin@admin.com for more info."
            }else{
                return "Username and password do not match."
            }
        }
    }
    return "No such account."
}


app.post('/api/accountslogin', (req, res) => {
    var email_attribute_input = req.body.email_attribute;
    var password_attribute_input = req.body.password_attribute;

    var login_result = login_account(email_attribute_input, password_attribute_input);

    res.send(JSON.stringify(login_result));
});

app.post('/api/accounts', (req, res) => {
    // search for course code(s)
    var username_attribute = req.body.username_attribute;
    var email_attribute = req.body.email_attribute;
    var password_attribute = req.body.password_attribute;
    
    var create_result = create_account(username_attribute, email_attribute, password_attribute);

    res.send(JSON.stringify(create_result));
});

function update_account(email_attribute, auth_attribute, activation_attribute, admin_attribute){
    console.log("EMAIL ATTRIBUTE IS: ", email_attribute);
    for(i = 0;i<saved_account.length;i++){
        if(saved_account[i].email_attribute == email_attribute){
            if(auth_attribute != "null"){
                console.log("1st if block", auth_attribute);
                saved_account[i].auth_attribute = auth_attribute;
                return "update account information successfully.";
            }
            if(activation_attribute != "null"){
                console.log("2nd if block", activation_attribute);
                saved_account[i].activation_attribute = activation_attribute;
                return "update account information successfully.";
            }
            if(admin_attribute != "null"){
                console.log("3rd if block", admin_attribute);
                saved_account[i].admin_attribute = admin_attribute;
                return "update account information successfully.";
            }
        }
    }
    return "Email not found.";
}

app.put('/api/accounts', (req, res) => {
    // search for course code(s)
    var email_attribute = req.body.email_attribute;
    var auth_attribute = req.body.auth_attribute
    var activation_attribute = req.body.activation_attribute
    var admin_attribute = req.body.admin_attribute

    var update_result = update_account(email_attribute, auth_attribute, activation_attribute, admin_attribute);

    res.send(JSON.stringify(update_result));
});

// online users data storation ............................//
online_list = [];

app.post('/api/online', (req, res) =>{
    var temp = req.body.username_attribute;
    online_list.push(temp);
    console.log("post online list: ", online_list);
    res.send(JSON.stringify(online_list));
});

app.get('/api/online', (req, res) => {
    var new_temp_list = [];
    for(j=0;j<online_list.length;j++){
        for(i=0;i<saved_account.length;i++){
            if(online_list[j] == saved_account[i].username_attribute){
                new_temp_list.push(saved_account[i])
            }
        }    
    }
    res.send(JSON.stringify(new_temp_list));
});

app.delete('/api/online/:username', (req, res) => {
    var temp = req.params.username;
    var delete_index = -2;
    for(i=0;i<online_list.length;i++){
      if(online_list[i].username_attribute == temp){
        delete_index = i;
      }
    }
    if(delete_index != 2){
        online_list.splice(delete_index, 1);
      res.send(JSON.stringify("Successfully logged out."))
    }else{
      res.send(JSON.stringify("Some error happened."))
    }
});


app.get('/api/public', (req, res) => {
    res.send(JSON.stringify(public_list));
})


app.post('/api/review', (req, res) => {
    var subject_code = req.body.subject_code;
    var course_code = req.body.course_code;
    var user_input_review = req.body.user_input_review;
    var warn_message = update_course_review(subject_code, course_code, user_input_review);
    res.send(JSON.stringify(warn_message));
})





app.post('/api/courseList', (req, res) => {
    var course_list = req.body;
    var res_list = []
    for(i=0;i<course_list.length;i++){
        [a,b] = temp(course_list[i])
        res_list.push(get_full_course_info(a,b));
    }
    res.send(JSON.stringify(res_list));
})

app.get('/api/privateCourse/:username', (req, res) => {
    var username_attribute = req.params.username;
    console.log("debugging...", username_attribute);
    var res_list = [];
    for(i=0;i<saved_schedule.length;i++){
        if(saved_schedule[i].created_by == username_attribute){
            res_list.push(saved_schedule[i])
        }
    }
    console.log(res_list);
    res.send(JSON.stringify(res_list));
});








// ---------------------------------------------------------------------------------//
app.get('/api/allcourses', (req, res) => {
    // extract all course code and descriptions
    var response = extract_subject_description(json_stat); // response is a list
    res.send(response);
    
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/allcourses', (req, res) => {
    // search for course code(s)
    var subject_code_user_input = req.body.subject;
    var search_result = get_course_codes(json_stat, subject_code_user_input);

    res.send(JSON.stringify(search_result));
});

app.get('/api/allcourses/:subjectcode/:coursecode', (req, res) => {
    // retrive time entry for a given subject code and a given course code
    const subject_code_user_input = req.params.subjectcode;
    const course_code_user_input = req.params.coursecode;
    var search_result = JSON.stringify(get_full_course_info(subject_code_user_input, course_code_user_input));
    res.send(JSON.stringify(search_result));

});

app.post('/api/schedules', (req, res) => {
    // create a schedule
    schedule_name_user_input = req.body.schedule_name_attribute;
    access_for = req.body.access_for;
    created_by = req.body.created_by;
    schedule_description = req.body.schedule_description;
    var result = create_schedule(schedule_name_user_input, access_for, created_by, schedule_description);
    result = JSON.stringify(result);
    res.send(result);
});

app.delete('/api/schedules', (req, res) => {
    // delete a schedule
    const schedule = saved_schedule.find(s => s.schedule_name_attribute == req.body.schedule_name_attribute);
    if(!schedule) res.send(JSON.stringify("No such schedule."));

    const index = saved_schedule.indexOf(schedule);
    saved_schedule.splice(index, 1);

    res.send(JSON.stringify(saved_schedule.length));
});

app.put('/api/schedules', (req, res) => {
    // data format:
    //{"schedule_name_attribute": "1",
    //"list_of_pairs":["ECE9065","ECE9065","ECE9063","ECE9062"]}
    // Save a list of subject code, course code pairs under a given schedule name
    
    const schedule = saved_schedule.find(s => s.schedule_name_attribute == req.body.schedule_name_attribute);
    if(!schedule) res.status(404).send(JSON.stringify("No such schedule."));

    
    for(i = 0; i < req.body.list_of_pairs.length; i++){
        var pairs = req.body.list_of_pairs[i];
        if(!schedule.course_list_attribute.includes(pairs)){
            schedule.course_list_attribute.push(pairs);
        }
    }
    
    res.send(schedule);
});

app.get('/api/schedules/:schedulename', (req, res) =>{
    // find a schedule based on name
    const schedule = saved_schedule.find(s => s.schedule_name_attribute == req.params.schedulename);
    var courselist = [];
    for(i = 0; i<schedule.course_list_attribute.length;i++){
        [a,b] = temp(schedule.course_list_attribute[i]);
        courselist.push(retrive_time_entry(a,b));
    }
    res.send(JSON.stringify([schedule, courselist]));
});

app.get('/api/schedulesinfo/', (req, res) => {
    var result = schedules_info();
    res.send(JSON.stringify(result));
})

app.delete('/api/schedulesinfo/', (req, res) => {
    delete_all_schedules();
    res.send(JSON.stringify("All saved schedules have been sucessfully deleted."));
})

const port = 3000 || process.env.port;
app.listen(port, () => console.log(`Listening on ${port}...`));