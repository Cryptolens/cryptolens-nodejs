const request = require('request');

module.exports = class Key {
    static Activate(token, ProductId, Key, MachineCode = "", FieldsToReturn = 0, Metadata=false, FloatingTimeInterval = 0, MaxOverdraft = 0) {

        return new Promise((resolve, reject) => {
            request(`https://app.cryptolens.io/api/key/Activate?token=${token}&productId=${ProductId}&Key=${Key}&machineCode=${MachineCode}&fieldsToReturn=${FieldsToReturn}&Metadata=${Metadata}&FloatingTimeInterval=${FloatingTimeInterval}&MaxOverdraft=${MaxOverdraft}&Sign=true&SignMethod=1`, { json: true }, (err, res, body) => {
                if (err || body.result == "1") {
                    console.warn(err);
                    if(!err) {
                        console.warn(body.message);
                    }
                    resolve(null);
                }
                resolve(body);
            });
        });
      
    }
}
