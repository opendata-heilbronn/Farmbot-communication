const SerialPort = require('serialport');
const testcode = require('./testcode');
const readline = require('readline');

const port = new SerialPort('/dev/ttyACM0', {
    baudRate: 115200
});


function sendCommand(command) {
    port.write(command, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        else console.log('message written');
    });
};

port.on('error', function (err) {
    console.log('Error: ', err.message);
});
port.on("data", (data) => {
    console.log(data.toString());
});
setInterval(() => {
    sendCommand(testcode.movex);
}, 10000);