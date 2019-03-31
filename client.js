const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    './echo.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
const echoProto = grpc.loadPackageDefinition(packageDefinition).echo;

function main() {
    const credentials = grpc.credentials.createInsecure();
    const client = new echoProto.Echo('localhost:50052', credentials);

    console.log('Started');
    const call = client.echo({});
    call.on('data', function (node) {
        console.log(new Date(), 'From proxy', node);
    });
    call.on('end', function () {
        // The server has finished sending
    });
    call.on('error', function (e) {
        // An error has occurred and the stream has been closed.
    });
    call.on('status', function (status) {
        // process status
    });

    rl.on("line", function (text) {
        call.write({value: text}, res => {
        });
    });
}

main();
