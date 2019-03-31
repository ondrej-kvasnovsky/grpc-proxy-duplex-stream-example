# gRPC example - how to proxy duplex streaming

An example of how to proxy duplex stream using gRPC. 

```
npm install
node server.js
node proxy.js
node client.js
```

Then try to put some text into the console of `client.js`. The client is going to stream 
the text into the proxy. The proxy is going to stream data into server. The server is then 
streaming data back into ˚the proxy and proxy is streaming it back to client. 

It goes like this: 

```
client> hi
proxy>  Received {"value":"hi"} from client.
        Proxying, do your checks and so on... 
server> Received {"value":"hi"}.
proxy>  Sending {"value":"hi"} from server stream to client.
client> Echoing { value: 'hi' }
```

Here is output from all three consoles.

_client.js_
```$bash
hello guys
2019-03-31T16:35:04.736Z 'From proxy' { value: 'hello guys' }
```

_proxy.js_
```$bash
2019-03-31T16:35:04.731Z 'Received {"value":"hello guys"} from client.'
2019-03-31T16:35:04.734Z 'Proxying, do your checks and so on... '
2019-03-31T16:35:04.735Z 'Sending {"value":"hello guys"} from server stream to client.'
```

_server.js_
```$bash
2019-03-31T16:35:04.733Z 'Received {"value":"hello guys"}.'
```
