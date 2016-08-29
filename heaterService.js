var rp = require('request-promise');
var sInfo = require('./sInfo.js');
var lInfo = require('./lInfo.js');
var tessel = require('tessel'); // Import tessel
var pin = tessel.port.B.pin[7]; // select pin 2 on port A
pin.pull('pulldown');

var leds = tessel.led;
leds[0].low();
leds[1].low();
leds[2].low();
leds[3].low();

var i = 0;
var loggingInterval = null;
var warningTimeForHeater = 150;
var heaterWarningInterval = null;
var debug = false;
var hasSentEndMsg = false;

turnOff = function(){
    pin.output(0); // power off
    if(!hasSentEndMsg){
        messageTwilio('Turning off heater', shouldSendToRommates);
        var shouldSendToRommates = false;
        hasSentEndMsg = true;
    }
    clearInterval(heaterWarningInterval);
};

turnOn = function(endTime, fromCalendar){
    pin.read(function(error, value) {
        if(value===0){
            hasSentEndMsg = false;
            var curTime = new Date();
            var timeToEnd = endTime.getTime() - curTime.getTime();
            timeToEnd = timeToEnd / 60000;
            pin.output(1); // power on
            var shouldSendToRommates = false;
            if(fromCalendar){
                messageTwilio('Turning on heater via calendar should turn off in '+Math.round(timeToEnd)+' mins', shouldSendToRommates);
            } else {
                messageTwilio('Turning on heater via holka float should turn off in '+Math.round(timeToEnd)+' mins', shouldSendToRommates);
            }
            var heaterStartTime = new Date();
            clearInterval(heaterWarningInterval);
            startHeaterAlarmTimer(heaterStartTime);
        }
    });
};

startHeaterAlarmTimer = function(heaterStartTime){
    var heaterAlertTime = heaterStartTime.getTime() + warningTimeForHeater*60*1000;
    var curTime;
    var curTimestamp;
    clearInterval(heaterWarningInterval);
    heaterWarningInterval = setInterval(function(){
        curTime = new Date();
        curTime.getTime();
        curTimestamp = curTime.getTime();
        if(curTimestamp>heaterAlertTime){
            messageTwilio('Heater has been on for more than 2.5 hours!!', shouldSendToRommates);
            turnOff();
        }
    },10*60*1000);
};

turnOnTimed = function(timeInMins){
    var curTime = new Date();
    var endTime = new Date(curTime.getTime() + timeInMins*60*1000);
    var fromCalendar = false;
    pin.read(function(error, value) {
        if(value===0){
          turnOn(endTime,fromCalendar);
        }
    });

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
            method: 'POST',
            uri: sInfo.twilioUrl,
            body: formDataCell,
            json: true // Automatically parses the JSON string in the response
        }).then(function (data) {
            console.log('data',data);
        }).catch(function (err) {
            console.error('error sending twilio',err.message);
        });

    }
};

module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;
module.exports.turnOnTimed = turnOnTimed;
