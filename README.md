# nodejs with protobuf demo

## introduction

    use node_module protobufjs to process protobuf protocol data

## protobuf format data

```protobuf==
package cover;

message helloworld {
    message helloCoverReq {
        required string name = 1;
    }

    message helloCoverRsp {
        required int32 retcode = 1;
        optional string reply = 2;
    }
}
```

## use protobufjs to load proto and decode, encode data

```javascript==
const protobuf = require('protobufjs');
const builder = protobuf.loadSync("./protos/cover.helloworld.proto");
const HelloCoverReq = builder.lookupType("cover.helloworld.helloCoverReq");
const HelloCoverRsp = builder.lookupType("cover.helloworld.helloCoverRsp");
// create object 
const hCRspObj = HelloCoverRsp.create({
    retcode: 0,
    reply: 'reply from udp server'
});
// encode to Buffer
const msg = HelloCoverRsp.encode(hCRspObj).finish();

// decode from buffer
HelloCoverReq.decode(message)
```