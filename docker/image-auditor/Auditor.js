var dgram = require('dgram');

var PROTOCOL_PORT = 9907;
var PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";

var instruments = new Map();
instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");

var s = dgram.createSocket('udp4');

s.bind(PROTOCOL_PORT, function() {
    console.log("Joining multicast gorup");
    s.addMembership(PROTOCOL_MULTICAST_ADDRESS);

});

var MusicienInstrument = new Map();
var MusicienActiveSince = new Map();
var MusicienActive = new Map();

s.on('message', function(msg, source) {
    console.log("Data has arrived: " + msg);

    var musician = JSON.parse(msg);
    var uuid = musician.uuid;

    if(MusicienInstrument.has(musician.uuid))
        MusicienActive.set()



    console.log("Son: " + message.uuid);

});

