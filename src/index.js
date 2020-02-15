const protobuf = require('protobufjs');
const doProtoFunc = async () => {
    return new Promise((resolve, reject)=> {
        protobuf.load("./protos/awesome.proto", function(err, root){
            if (err)
                reject(err);
            // Obtain a message type 
            const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
            // Exemplary payload
            const payload = { awesomeField: "AwesomeString"};

            const errMsg = AwesomeMessage.verify(payload);
            //verify
            if (errMsg)
                reject(errMsg);
            // Create a new message
            const message = AwesomeMessage.create(payload);

            // Encode a message to an Uint8Array
            const buffer = AwesomeMessage.encode(message).finish();
            // Decode an Uint8Array to message
            const message1 = AwesomeMessage.decode(buffer);

            const object = AwesomeMessage.toObject(message1, {
                longs: String,
                enum: String,
                bytes: String
            });
            resolve(object);
        });
    })
};

(async()=>{
    const result = await doProtoFunc();
    console.log(result);
})();