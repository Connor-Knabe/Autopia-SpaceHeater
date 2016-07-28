var CronJob = require('cron').CronJob;
var cron = require('node-cron');

var schedule = require('node-schedule');


var timeHelper = require('./timeHelper');
var _ = require('lodash');
var minsBeforeFloat = 0;
var cronJobs = [{
    jobName:'',
    jobRun:null,
    jobEnd:null,
    jobId:null
}];
exports.appointmentsModel = [{
        name:'',
        duration:60,
        startTime:null,
        endTime:null,
        id:''
    }];

exports.addCal = function(appointmentsRaw){
    var appointments = timeHelper.grabAppointments(appointmentsRaw);
    if(!_.isEqual(this.appointmentsModel, appointments)){
        console.log('Change to the calendar');
        this.appointmentsModel = appointments;
        // console.log('APPT',this.appointmentsModel);
        clearOldJobs();
        if(this.appointmentsModel){
            console.log('job length ',this.appointmentsModel.length);
            for(var i =0;i<this.appointmentsModel.length;i++){
                cronJobs.push({
                    jobName:'job'+i,
                    jobId: this.appointmentsModel[i].id,
                    jobRun: jobStartTime(this.appointmentsModel[i].startTime),
                    jobEnd: jobEndTime(this.appointmentsModel[i].endTime)
                });
            }
        }

        console.log(cronJobs);
        // console.log('appointmentsModel ',this.appointmentsModel);
        // timeout(this.appointmentsModel);
    }
};
// timeout = function(apts){
//     setTimeout(function(){
//         // console.log('timeout', cronJobs);
//         cronJobs.forEach(function(cronJob,index){
//             console.log(cronJob.jobName);
//             console.log(cronJob.jobId);
//         });
//     },5*1000);
// };


function clearOldJobs(){
    cronJobs.forEach(function(job){
        console.log('jobs loop',job);

        console.log('jobrun',job.jobRun);
        if(job.jobRun && job.jobRun.Job){
            console.log("FOUND");
        }
        if(job.jobRun && job.jobRun.Job){
            job.jobRun.Job.cancel();
            console.log("canceling job");
        }
        if(job.jobEnd && job.jobEnd.Job){
            job.jobEnd.Job.cancel();
        }
    });

    cronJobs = [{
        jobName:'',
        jobRun:null,
        jobEnd:null,
        jobId:null
    }];
}


// j.cancel();


setTimeout(function(){
    console.log('stop job');
    // task.destroy();
},5*1000);

jobStartTime = function(startTime){
    var job = null;
    console.log('job start time',startTime);
    var cronStartTime = new Date(startTime.getTime() - minsBeforeFloat*60*1000);
    return schedule.scheduleJob(cronStartTime, function(){
        turnOn();
    });
};

jobEndTime = function(endTime){
    console.log('job end time', endTime);
    var job = null;
    var cronEndTime = new Date(endTime.getTime() - minsBeforeFloat*60*1000);
    console.log('cronEndTime',cronEndTime);
    return schedule.scheduleJob(cronEndTime, function(){
        turnOn();
    });
};



var cronEndTimet = new Date();
var ja = jobStartTime(cronEndTimet);


test = function(){
    var job;
    job = schedule.scheduleJob(new Date(), function(){
        turnOn();
    });
    return job;
};
var cronJobsTwo = [{
    jobName:'sdf',
    jobRun:jobStartTime(new Date()),
    jobEnd:null,
    jobId:null
}];

for(var i=0;i<cronJobsTwo.length;i++){
    console.log('arr jobs',cronJobsTwo[i]);
}

cronJobsTwo.forEach(function(job){
    console.log('alksdjf',job);
    if(job.jobRun){
        job.jobRun.cancel();
        console.log('canceling');
    }
});

turnOff = function(calendarObj){
    console.log(new Date()+' Turning off');
};


turnOn = function(calendarObj){
    console.log(new Date()+' Turning on ');
};
