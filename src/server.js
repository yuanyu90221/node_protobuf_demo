const protobuf = require('protobufjs');
const dgram = require('dgram');
const {PORT, HOST} = require('./config');
const server = dgram.createSocket('udp4');

const builder = protobuf.loadSync("./protos/cover.helloworld.proto");
const HelloCoverReq = builder.lookupType("cover.helloworld.helloCoverReq");
const HelloCoverRsp = builder.lookupType("cover.helloworld.helloCoverRsp"); 

server.on('listening', function(){
    const address = server.address();
    console.log(`UDP Server listening on + ${address.address}: ${address.port}`);
});

server.on('message', function(message, remote){
    console.log(`${remote.address}: ${remote.port} - `, message);
    console.log(HelloCoverReq.decode(message) , 'from client!');
    const hCRspObj = HelloCoverRsp.create({
        retcode: 0,
        reply: 'reply from udp server'
    });
    
    const msg = HelloCoverRsp.encode(hCRspObj).finish();
    server.send(msg, 0, msg.length, remote.port, remote.address, function(err, bytes){
        if (err) {
            console.log(`err for reply send:`, err);
            throw err;
        }
        console.log(`UDP message reply to ${remote.address}: ${remote.port}`);
    });
});

server.bind(PORT, HOST);