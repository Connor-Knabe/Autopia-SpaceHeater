var timeService = require("../app/cronTimeService");
var chai = require("chai");
var expect = require("chai").expect;
var assert = require("chai").assert;

var sinonChai = require("sinon-chai");
chai.use(sinonChai);
var sinon = require("sinon");
describe("Cron Time Service", function(){
    describe("addCal", function(){
        it("adds calendar appointments to model if they are new", function(){
            var fakeRawCalendarObj =  [{"kind":"calendar#event","etag":"\"2936994383668000\"","id":"testidtest","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=Xsdfasdf","created":"2016-07-14T11:53:11.000Z","updated":"2016-07-14T11:53:11.872Z","summary":"Test 60 min","creator":{"email":"testemail@gmaill.com","self":true},"organizer":{"email":"testemail@gmaill.com","self":true},"start":{"dateTime":"2016-07-14T06:00:00-05:00"},"end":{"dateTime":"2016-07-14T07:00:00-05:00"},"iCalUID":"22B88C61-EFDF-4206-B964-2502A2EEC1AE","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}},{"kind":"calendar#event","etag":"\"2937003048791000\"","id":"testidtest2","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=sdfsdf","created":"2016-07-14T13:05:24.000Z","updated":"2016-07-14T13:05:24.437Z","summary":"Testt 60 min","creator":{"email":"testt@gmail.com","self":true},"organizer":{"email":"testt@gmail.com","self":true},"start":{"dateTime":"2016-07-14T08:00:00-05:00"},"end":{"dateTime":"2016-07-14T09:00:00-05:00"},"iCalUID":"850A560E-EE3C-49FD-AD65-0329934F588A","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}}];

            timeService.addCal(fakeRawCalendarObj);
                var expected = [{
                        name:"Test",
                        duration:60,
                        startTime:new Date("2016-07-14T06:00:00-05:00"),
                        endTime:new Date("2016-07-14T07:00:00-05:00"),
                        id:"testidtest"
                    },
                    {
                        name:"Testt",
                        duration:60,
                        startTime:new Date("2016-07-14T08:00:00-05:00"),
                        endTime:new Date("2016-07-14T09:00:00-05:00"),
                        id:"testidtest2"
                    }];
            expect(timeService.appointmentsModel).to.deep.equal(expected);

        });
    });
    describe("turnOn", function(){
    
        it("turns on when given a calendar appointment within two hours", function(){
            // var fakeCalendarObj = {
            //
            // };
            // timeService.turnOn(fakeCalendarObj);

        });
        it("turns off heater after appointment time is over", function(){

        });
    });
    describe("turnOff",function(){
        it("turns on when given a calendar appointment within two hours", function(){

        });
        it("turns off heater after appointment time is over", function(){

        });
    });
});

function throttle(callback) {
    var timer;
    return function () {
        clearTimeout(timer);
        var args = [].slice.call(arguments);
        timer = setTimeout(function () {
            callback.apply(this, args);
        }, 100);
    };
}
