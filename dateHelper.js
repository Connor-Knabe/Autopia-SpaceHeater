exports.dateOffsetFix = function(dateOffsetFiveHours){
    if(!dateOffsetFiveHours){
        dateOffsetFiveHours = new Date();
    }
    var d2 = new Date();
    d2.setHours(dateOffsetFiveHours.getHours() + 4);
    console.log("d2",d2);
    return d2;
};
