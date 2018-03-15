function loadHmsData(){
    var rawData = require('../data/dorm/hms-data.json');
    var list = [];
    var startip = "000.000.000.000";
    var lastip = "000.000.000.000";
    //console.log("for1");
    for(var i = 0; i < rawData.houses.length; i++){
        var house = rawData.houses[i];
        //console.log("for2");
        //console.log(house.rooms);
        for(var j = 0; j < house.rooms.length; j++){
            var room = house.rooms[j];
            //console.log(room);
            //console.log("for3");
            if(typeof room.ipStart === 'undefined'){
                var iparray = startip.split('.');
                iparray[3] = (parseInt(iparray[3]) + 8).toString();
                startip = iparray.join('.');

                iparray[3] = (parseInt(iparray[3]) + 7).toString();
                lastip = iparray.join('.');
            }else{
                startip = room.ipStart;

                var iparray = startip.split('.');
                iparray[3] = (parseInt(iparray[3]) + 7).toString();
                lastip = iparray.join('.');

            }

            list.push({
                house: house.house,
                room: room.room,
                ip: {
                    start: startip,
                    stop: lastip
                }
            })
        }
    }

    return list;
}

module.exports = loadHmsData();