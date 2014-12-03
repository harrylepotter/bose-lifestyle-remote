var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbserial", {
    baudrate: 1200,
    stopbits: 1,
    databits: 8,
    //rtscts: true,
}, false);

var INIT = 'TAP\r';
var REMOTE = 'aE';
var codes = {
    'on': '@@',
    'off': '@@',
    'volup': 'A@',
    'rev': 'BA',
    'play': 'CC',
    'fwd': 'DD',
    'voldown': 'EE',
    'nextdisc': 'FF',
    'video1': 'GG',
    'video2': 'HH',
    'aux': 'II',
    'cd': 'JJ',
    'fm': 'KK',
    'tape': 'LL',
    'stop': 'MM',
    'mute': 'NN',
    'muteall': 'OO',
    'random': 'PP',
    'survolup': 'QQ',
    'survoldown': 'RR',
    'surround': 'SS',
    'stereo_center': 'TT',
    'stereo': 'UU',
    'preset_0': 'VV',
    'preset_1': 'WW',
    'preset_2': 'XX',
    'preset_3': 'YY',
    'preset_4': 'ZZ',
    'preset_5': '[[',
    'preset_6': '\@'
}



var writeData = function(str, callback) {
    var count = 0;
    var write = function(data, fn) {
        console.log('write:', data);
        serialPort.write(data, function(err, results) {
            count++;
            if (count < str.length) {
                setTimeout(function() {
                    write(str.charAt(count), fn);
                }, 50);
            } else {
                fn()
            }
        });
    };
    write(str.charAt(count), callback);
}



    console.log(process.argv[2]);
serialPort.open(function() {




    var code = codes[process.argv[2]];
    serialPort.on('data', function(data) {
        console.log('data received: ' + data);
    });

     writeData(INIT, function() {
        writeData(REMOTE + code + 'axxx', function() {
            console.log("AND DONE");
            process.exit(0);
            serialPort.close(function() {});
        });
     });
});