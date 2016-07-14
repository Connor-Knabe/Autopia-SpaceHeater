var timeHelper = require("../app/timeHelper");
var expect    = require("chai").expect;
describe("Time Helper", function(){
    describe("grabAppointments",function(){
        it("returns cleaned object given a google calendar object", function(){
            var fakeRawCalendarObj = [{"kind":"calendar#event","etag":"\"234234234\"","id":"laksjdflkajsdlkfjasdf","status":"confirmed","htmlLink":"","created":"2016-07-07T12:17:29.000Z","updated":"2016-07-07T12:17:29.879Z","summary":"Connor 60 min","creator":{"email":"fakeemail@emaill.com","self":true},"organizer":{"email":"fakeemail@emaill.com","self":true},"start":{"dateTime":"2016-07-07T17:00:00-05:00"},"end":{"dateTime":"2016-07-07T18:00:00-05:00"},"iCalUID":"56476E12-291B-4AA8-A3E7-462DF1217DA0","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}}];

            var expected = {
                name:"Connor",
                duration:60,
                startTime:new Date("2016-07-07T17:00:00-05:00"),
                endTime:new Date("2016-07-07T18:00:00-05:00"),
                id:"laksjdflkajsdlkfjasdf"
            };
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

            var expected = {
                name:"Connor",
                duration:60,
                startTime:new Date("2016-07-07T17:00:00-05:00"),
                endTime:new Date("2016-07-07T18:00:00-05:00"),
                id:"laksjdflkajsdlkfjasdf"
            };
            actual = timeHelper.grabAppointments(fakeRawCalendarObj);
            expect(actual).to.deep.equal(expected);
        });
    });
});
