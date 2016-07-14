var CronJob = require('cron').CronJob;
var timeHelper = require("./timeHelper");

var cronJobs = {
    jobName:"",
    jobRun:null,
    jobId:null
};

exports.appointmentsModel = [{
        name:"",
        duration:60,
        startTime:null,
        endTime:null,
        id:""
    }];
    
exports.addCal = function(appointmentsRaw){
    var appointments = timeHelper.grabAppointments(appointmentsRaw);

    if(this.appointmentsModel !== appointments){
        this.appointmentsModel = appointments;

        for(var i =0;i<this.appointmentsModel.length;i++){
            cronJobs.jobName = "job"+i;
            cronJobs.jobId = this.appointmentsModel[i].id;
            cronJobs.jobRun = jobStartTime(this.appointmentsModel[i].startTime);
        }
        console.log("appointmentsModel ",this.appointmentsModel);
    }
};

jobStartTime = function(startTime){
    if(startTime){
        var cronStartTime = new Date(startTime.getTime() - 30*60*1000);
        return new CronJob(cronStartTime, function() {
                turnOn();
            },
            null,
            true, /* Start the job right now */
            "America/Chicago" /* Time zone of this job. */
        );
    }
};

exports.helloWorld = function(){

};

turnOn = function(calendarObj){
    this.helloWorld();
};
