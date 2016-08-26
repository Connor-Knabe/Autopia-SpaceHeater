var rp = require('request-promise');
var sInfo = require('./sInfo.js');
var lInfo = require('./lInfo.js');
var tessel = require('tessel'); // Import tessel
var pin = tessel.port.B.pin[7]; // select pin 2 on port A
pin.pull('pulldown');

var i = 0;
var loggingInterval = null;
var heaterStartTime = null;
var heaterEndTime = null;
var warningTimeForHeater = 150;
var heaterWarningInterval = null;
var debug = true;

turnOff = function(){
    pin.output(0); // power off
    messageTwilio('Turning off heater', shouldSendToRommates);
    var shouldSendToRommates = false;
    clearInterval(heaterWarningInterval);
};

turnOn = function(){
    pin.output(1); // power on
    messageTwilio('Turning on heater', shouldSendToRommates);

    var shouldSendToRommates = false;
    heaterStartTime = new Date();
    clearInterval(heaterWarningInterval);
    startHeaterAlarmTimer();
};

startHeaterAlarmTimer = function(){
    heaterWarningInterval = setInterval(function(){
        heaterEndTime = new Date() - heaterStartTime;

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
    console.log(new Date()+" "+msgContent);
    if(!debug){
        rp({
            uri: sInfo.twilioUrl,
            body: formData,
            json: true // Automatically parses the JSON string in the response
        }).then(function (data) {
            // console.log('data',data);
        }).catch(function (err) {

        });

    }
};

module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;
module.exports.turnOnTimed = turnOnTimed;
