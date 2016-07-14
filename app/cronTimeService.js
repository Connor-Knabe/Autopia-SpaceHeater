var CronJob = require('cron').CronJob;
var timeHelper = require("./timeHelper");

var cronJobs = [{
    jobName:"",
    jobRun:null,
    jobId:null
}];
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
        console.log("APPT",this.appointmentsModel);
        for(var i =0;i<this.appointmentsModel.length;i++){
            cronJobs.push({
                jobName:"job"+i,
                jobId: this.appointmentsModel[i].id,
                jobRun: jobStartTime(this.appointmentsModel[i].startTime)
            });

        }
        console.log("appointmentsModel ",this.appointmentsModel);
        timeout(this.appointmentsModel);
    }
};
timeout = function(apts){
    setTimeout(function(){
        console.log("timeout", cronJobs);
        cronJobs.forEach(function(cronJob,index){
            console.log(cronJob.jobName);
            console.log(cronJob.jobId);
        });
    },5000);

};

jobStartTime = function(startTime){
    if(startTime){
        var cronStartTime = new Date(startTime.getTime() - 30*60*1000);
        var startNow = "5 * * * * *";
        return new CronJob(startNow, function() {
                turnOn();
            },
            null,
            true, /* Start the job right now */
            "America/Chicago" /* Time zone of this job. */
        );
    }
};

helloWorld = function(){
    console.log("Now");
};

turnOn = function(calendarObj){
    helloWorld();
};
