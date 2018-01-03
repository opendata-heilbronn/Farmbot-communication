const SerialPort = require('serialport');
const testcode = require('./testcode');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const port = new SerialPort('/dev/ttyACM0', {
    baudRate: 115200
});

rl.on('line', (input) => {
    if (input === 'testcode') {
        sendCommand(testcode.movex);
    }
    else if (input[0] === 'F' || input[0] === 'G') {
        sendCommand('\n' + input);
    }
    else console.log('"' + input + '"' + 'is not a valid command!')
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
