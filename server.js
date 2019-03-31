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
    });

const echoProto = grpc.loadPackageDefinition(packageDefinition).echo;

function echo(stream) {
    console.log(stream.getPeer());
    stream.on('readable', () => {
        let chunk;
        while (null !== (chunk = stream.read())) {
            console.log(new Date(), `Received ${JSON.stringify(chunk)}.`);
            stream.write(chunk);
        }
    });
    stream.write({value: 'server is ready... what do you want?'});
}

function main() {
    const server = new grpc.Server();

    server.addService(echoProto.Echo.service, {echo});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
