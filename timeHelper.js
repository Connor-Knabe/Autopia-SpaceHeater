exports.grabAppointments = function(dateObj){
    var parsedName, parsedDuration, parsedStartTime, parsedEndTime, parsedId;
    var newObj = [{
        name:'',
        duration:null,
        startTime:null,
        endTime:'',
        id:''
    }];

    if(dateObj && dateObj[0]){
        for(var i=0;i<dateObj.length;i++){
            var eventSummary = dateObj[i].summary || null;
            if(eventSummary){
                parsedName = eventSummary.split(' ')[0] || null;
                parsedDuration = eventSummary.split(' ')[1] || null;
            }
            if(dateObj[i].id){
                parsedId = dateObj[i].id;
            }
            if(dateObj[i].start){
                parsedStartTime = new Date(dateObj[i].start.dateTime);
                if(isNumeric(parsedDuration)){
                    parsedDuration = parseInt(parsedDuration);
                    parsedEndTime = new Date(parsedStartTime.getTime() + parsedDuration*60*1000);
                } else {
                    parsedDuration = 60;
                    parsedEndTime = new Date(parsedStartTime.getTime() + parsedDuration*60*1000);
                }
                parsedStartTime = new Date(parsedStartTime.getTime() -30*60*1000);
            }
            newObj[i] = {
                name:parsedName,
                duration:parsedDuration,
                startTime:parsedStartTime,
                endTime:parsedEndTime,
                id:parsedId
            };
        }
    } else {
        newObj = null;
    }
    return newObj;
};

function isNumeric(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}
