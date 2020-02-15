const dgram = require('dgram');
const protobuf = require('protobufjs');
const {PORT, HOST} = require('./config');

const builder = protobuf.loadSync("./protos/cover.helloworld.proto");
const HelloCoverReq = builder.lookupType("cover.helloworld.helloCoverReq");
const HelloCoverRsp = builder.lookupType("cover.helloworld.helloCoverRsp");

const hCReqObj = HelloCoverReq.create({
    name: 'test from client'
});
const message = HelloCoverReq.encode(hCReqObj).finish();

const socket = dgram.createSocket({
    type: 'udp4',
    fd: 8080
}, function(msg, rinfo) {
//    console.log(`message from socket`, new Buffer(message).toString())
   console.log(`socket create message:`, rinfo);
});

socket.send(message, 0, message.length, PORT, HOST, function(err, bytes){
    if (err) {
        console.log(`UDP send message error:`, err);
        throw err;
    }
    console.log(`UDP message sent to ${HOST}: ${PORT}`);
});

socket.on("message", function(msg, rinfo) {
    console.log("[UDP-CLIENT] Received message: " + HelloCoverRsp.decode(msg).reply + " from " + rinfo.address + ":" + rinfo.port);
    console.log(HelloCoverRsp.decode(msg));
 
    socket.close();
});

socket.on("close", ()=>{
    console.log("socket closed");
});

socket.on("error", function(err){
    socket.close();
    socket.log(`socket err`, err);
});