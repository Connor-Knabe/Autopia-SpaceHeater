var rp = require('request-promise');
var i = 0;
var loggingInterval = null;
var sInfo = require('./sInfo.js');
var lInfo = require('./lInfo.js');
var heaterStartTime = null;
var heaterEndTime = null;
var warningTimeForHeater = 150;
var heaterWarningInterval = null;


turnOff = function(){
    var shouldSendToRommates = false;
    messageTwilio('Turning off heater', shouldSendToRommates);
    console.log(new Date()+' Turning off');
    heaterEndTime = new Date() - heaterStartTime;
    clearInterval(heaterWarningInterval);

};

turnOn = function(){
    var shouldSendToRommates = false;
    messageTwilio('Turning on heater', shouldSendToRommates);
    console.log(new Date()+' Turning on ');
    heaterStartTime = new Date();

    heaterWarningInterval = setInterval(function(){
        if(heaterEndTime>warningTimeForHeater){
            messageTwilio('Heater has been on for more than 2.5 hours!!', shouldSendToRommates);
        }
    },10*60*1000);

};


turnOnTimed = function(timeInMins){
    console.log(new Date()+' Turning on via holka ');
    turnOn();

    loggingInterval = setInterval(function(){
        i++;
    }, 300000);

    setTimeout(function(){
        turnOff();
        clearInterval(loggingInterval);
    },timeInMins*60*1000);
};

messageTwilio = function(msgContent,sendToRommates){
    var toPhoneNumber = sendToRommates ? lInfo.connorCell : lInfo.roomatesCellArr;
    var formDataCell = {
        toNumber: toPhoneNumber,
        fromNumber:lInfo.holkaAlertNumber,
        message: msgContent,
        twilioLocalKey: lInfo.twilioLocalKey
    };
    rp({
        uri: sInfo.twilioUrl,
        body: formData,
        json: true // Automatically parses the JSON string in the response
    }).then(function (data) {
        // console.log('data',data);
        cronTimeService.addCal(data);
    }).catch(function (err) {
        cronTimeService.addCal(null);
        if(err && (err.error !== 'Not Found !!!')){
            console.error('error checking for data', err.message);
        }
    });
};


module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;
module.exports.turnOnTimed = turnOnTimed;
