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

    const serverStream = getStream();
    serverStream.on('readable', () => {
        console.log('Proxying, do your checks and so on... ');
        let chunk;
        while (null !== (chunk = serverStream.read())) {
            console.log(`Sending ${JSON.stringify(chunk)} from server stream to client.`);
            stream.write(chunk);
        }
    });
    stream.on('readable', () => {
        let chunk;
        while (null !== (chunk = stream.read())) {
            console.log(`Received ${JSON.stringify(chunk)} from client.`);
            serverStream.write(chunk);
        }
    });
}

function main() {
    const server = new grpc.Server();

    server.addService(echoProto.Echo.service, {echo});
    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
}

function getStream() {
    const credentials = grpc.credentials.createInsecure();
    const client = new echoProto.Echo('localhost:50051', credentials);

    console.log('connected to stream');
    return client.echo({});
}

main();
