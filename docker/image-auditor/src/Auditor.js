var dgram = require('dgram');

const moment = require('moment');
moment().format();

var PROTOCOL_PORT = 9907;
var PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";


var instruments = new Map();
instruments.set("ti-ta-ti", "piano");
instruments.set("pouet", "trumpet");
instruments.set("trulu", "flute");
instruments.set("gzi-gzi", "violin");
instruments.set("boum-boum", "drum");

var s = dgram.createSocket('udp4');

var actives = new Array();

s.bind(PROTOCOL_PORT, function () {
    console.log("Joining multicast group");
    s.addMembership(PROTOCOL_MULTICAST_ADDRESS);

});

var musiciens = new Map();


s.on('message', function (msg, source) {

    var musicianTMP = JSON.parse(msg);

    if (!musiciens.has(musicianTMP.uuid)) {

        var musician = new Object();

        musician.uuid = musicianTMP.uuid;
        musician.instrument = instruments.get(musicianTMP.sound);
        musician.activeSince = moment();
        musician.active = true;

        musiciens.set(musician.uuid, musician);
    } else {
        musiciens.get(musicianTMP.uuid).active = true;
    }
});



setInterval(function () {

    actives = new Array();

    musiciens.forEach(function forAll(value,key, map){
        if(musiciens.get(key).active){

            var musicianTMP = new Object();
            musicianTMP.uuid = musiciens.get(key).uuid;
            musicianTMP.instrument = musiciens.get(key).instrument;
            musicianTMP.activeSince = musiciens.get(key).activeSince;

            actives.push(musicianTMP);
            musiciens.get(key).active = false;
        }
    });

    console.log( JSON.stringify(actives));



}, 5000);

var server = net.createServer(function (socket) {
        var payload = JSON.stringify(actives);
        socket.write(payload + '\r\n');
        socket.pipe(socket);
        socket.end();
    });

    server.listen(2205, '0.0.0.0');

