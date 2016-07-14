exports.grabAppointments = function(dateObj){
    var parsedName, parsedDuration, parsedStartTime, parsedEndTime, parsedId;

    var newObj = {
        name:"",
        duration:null,
        startTime:null,
        endTime:"",
        id:""
    };
    for(var i=0;i<dateObj.length;i++){
        console.log(i);
    }

    if(dateObj && dateObj[0]){
        var eventSummary = dateObj[0].summary || null;
        if(eventSummary){
            parsedName = eventSummary.split(' ')[0] || null;
            parsedDuration = eventSummary.split(' ')[1] || null;
        }
        if(dateObj[0].id){
            parsedId = dateObj[0].id;
        }
        if(dateObj[0].start){
            parsedStartTime = new Date(dateObj[0].start.dateTime);
            if(isNumeric(parsedDuration)){
                parsedDuration = parseInt(parsedDuration);
                parsedEndTime = new Date(parsedStartTime.getTime() + parsedDuration*60*1000);
            } else {
                parsedDuration = 60;
                parsedEndTime = new Date(parsedStartTime.getTime() + parsedDuration*60*1000);
            }
        }
        newObj = {
            name:parsedName,
            duration:parsedDuration,
            startTime:parsedStartTime,
            endTime:parsedEndTime,
            id:parsedId
        };
    } else {
        newObj = null;
    }
    return newObj;
};

function isNumeric(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}
