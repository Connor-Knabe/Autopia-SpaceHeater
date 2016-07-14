var timeHelper = require("../app/timeHelper");
var expect    = require("chai").expect;
describe("Time Helper", function(){
    describe("grabAppointments",function(){
        it("returns cleaned object given a google calendar object", function(){
            var fakeRawCalendarObj = [{"kind":"calendar#event","etag":"\"234234234\"","id":"laksjdflkajsdlkfjasdf","status":"confirmed","htmlLink":"","created":"2016-07-07T12:17:29.000Z","updated":"2016-07-07T12:17:29.879Z","summary":"Connor 60 min","creator":{"email":"fakeemail@emaill.com","self":true},"organizer":{"email":"fakeemail@emaill.com","self":true},"start":{"dateTime":"2016-07-07T17:00:00-05:00"},"end":{"dateTime":"2016-07-07T18:00:00-05:00"},"iCalUID":"56476E12-291B-4AA8-A3E7-462DF1217DA0","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}}];

            var expected = [{
                name:"Connor",
                duration:60,
                startTime:new Date("2016-07-07T17:00:00-05:00"),
                endTime:new Date("2016-07-07T18:00:00-05:00"),
                id:"laksjdflkajsdlkfjasdf"
            }];
            var actual = timeHelper.grabAppointments(fakeRawCalendarObj);
            expect(actual).to.deep.equal(expected);
        });
        it("returns null object given a null google calendar object", function(){
            var fakeRawCalendarObj = null;
            var expected = null;
            var actual = timeHelper.grabAppointments(fakeRawCalendarObj);
            expect(actual).to.equal(expected);
        });
        it("returns default 60 min duration given a no duration in google calendar object", function(){
            var fakeRawCalendarObj = [{"kind":"calendar#event","etag":"\"234234234\"","id":"laksjdflkajsdlkfjasdf","status":"confirmed","htmlLink":"","created":"2016-07-07T12:17:29.000Z","updated":"2016-07-07T12:17:29.879Z","summary":"Connor min","creator":{"email":"fakeemail@emaill.com","self":true},"organizer":{"email":"fakeemail@emaill.com","self":true},"start":{"dateTime":"2016-07-07T17:00:00-05:00"},"end":{"dateTime":"2016-07-07T18:00:00-05:00"},"iCalUID":"56476E12-291B-4AA8-A3E7-462DF1217DA0","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}}];

            var expected = [{
                name:"Connor",
                duration:60,
                startTime:new Date("2016-07-07T17:00:00-05:00"),
                endTime:new Date("2016-07-07T18:00:00-05:00"),
                id:"laksjdflkajsdlkfjasdf"
            }];
            actual = timeHelper.grabAppointments(fakeRawCalendarObj);
            expect(actual).to.deep.equal(expected);
        });

        it("returns two cleaned objects given a google calendar objecdt", function(){
            var fakeRawCalendarObj =  [{"kind":"calendar#event","etag":"\"2936994383668000\"","id":"testidtest","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=Xsdfasdf","created":"2016-07-14T11:53:11.000Z","updated":"2016-07-14T11:53:11.872Z","summary":"Test 60 min","creator":{"email":"testemail@gmaill.com","self":true},"organizer":{"email":"testemail@gmaill.com","self":true},"start":{"dateTime":"2016-07-14T06:00:00-05:00"},"end":{"dateTime":"2016-07-14T07:00:00-05:00"},"iCalUID":"22B88C61-EFDF-4206-B964-2502A2EEC1AE","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}},{"kind":"calendar#event","etag":"\"2937003048791000\"","id":"testidtest2","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=sdfsdf","created":"2016-07-14T13:05:24.000Z","updated":"2016-07-14T13:05:24.437Z","summary":"Testt 60 min","creator":{"email":"testt@gmail.com","self":true},"organizer":{"email":"testt@gmail.com","self":true},"start":{"dateTime":"2016-07-14T08:00:00-05:00"},"end":{"dateTime":"2016-07-14T09:00:00-05:00"},"iCalUID":"850A560E-EE3C-49FD-AD65-0329934F588A","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}}];

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
            actual = timeHelper.grabAppointments(fakeRawCalendarObj);
            expect(actual).to.deep.equal(expected);
        });
    });
});
