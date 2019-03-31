# gRPC - how to proxy duplex streaming

Simplified example of how to proxy duplex stream using gRPC. 

```
npm install
node server.js
node proxy.js
node client.js
```

Then try to put some text into the console of `client.js`. The client is going to stream 
the text into the proxy. The proxy is going to stream data into server. The server is then 
streaming data into the proxy and proxy is streaming it back to client. 
