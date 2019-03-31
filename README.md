# gRPC example - how to proxy duplex streaming

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

It goes like this: 

```
client> hi
proxy>  Received {"value":"hi"} from client.
        Proxying, do your checks and so on... 
server> Received {"value":"hi"}.
proxy>  Sending {"value":"hi"} from server stream to client.
client> Echoing { value: 'hi' }

```
