const request = require('request');
const helpers = require('../internal/HelperMethods.js');
const pubHelpers = require('./Helpers.js');

module.exports = class Key {
    static Activate(token, rsaPubKey, ProductId, Key, MachineCode = "", FieldsToReturn = 0, Metadata=false, FloatingTimeInterval = 0, MaxOverdraft = 0) {

        return new Promise((resolve, reject) => {
            request(`https://app.cryptolens.io/api/key/Activate?token=${token}&productId=${ProductId}&Key=${Key}&machineCode=${MachineCode}&fieldsToReturn=${FieldsToReturn}&Metadata=${Metadata}&FloatingTimeInterval=${FloatingTimeInterval}&MaxOverdraft=${MaxOverdraft}&Sign=true&SignMethod=1`, { json: true }, (err, res, body) => {
                if (err || body.result == "1") {
                    console.warn(err);
                    if(!err) {
                        console.warn(body.message);
                    }
                    resolve(null);
                } else {
                    if(helpers.VerifySignature(body, rsaPubKey)) {
                        var license = JSON.parse(Buffer.from(body["licenseKey"], "base64").toString("utf-8"));
                        license.RawResponse = body;
                        resolve(license);
                    } else{
                        console.warn("Signature verification failed.");
                        resolve(null);
                    }
                }
            });
        });
      
    }
}
