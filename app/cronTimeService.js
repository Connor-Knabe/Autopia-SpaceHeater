
var schedule = require('node-schedule');


var timeHelper = require('./timeHelper');
var _ = require('lodash');
var minsBeforeFloat = 0;
var cronJobs = [];
exports.appointmentsModel = [];

exports.addCal = function(appointmentsRaw){
    var appointments = timeHelper.grabAppointments(appointmentsRaw);
    if(!_.isEqual(this.appointmentsModel, appointments)){
        console.log('Change to the calendar');
        clearOldJobs();
        this.appointmentsModel = appointments;
        console.log('appointments', this.appointmentsModel);
        if(this.appointmentsModel){
            console.log('job length ',this.appointmentsModel.length);
            for(var i =0;i<this.appointmentsModel.length;i++){
                console.log(i);
                cronJobs.push({
                    jobName:'job'+i,
                    jobId: this.appointmentsModel[i].id,
                    jobRun: jobStartTime(this.appointmentsModel[i].startTime),
                    jobEnd: jobEndTime(this.appointmentsModel[i].endTime)
                });
            }
        }
    }
};

function clearOldJobs(){
    cronJobs.forEach(function(job){
        if(job.jobRun){
            job.jobRun.cancel();
        }
        if(job.jobEnd){
            job.jobEnd.cancel();
        }
    });

    cronJobs = [];
}

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
    return schedule.scheduleJob(cronEndTime, function(){
        turnOff();
    });
};

turnOff = function(calendarObj){
    console.log(new Date()+' Turning off');
};

turnOn = function(calendarObj){
    console.log(new Date()+' Turning on ');
};