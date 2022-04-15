const got = require('got');
const helpers = require('../internal/HelperMethods.js');

module.exports = class Key {

    static Activate(token, rsaPubKey, ProductId, Key, MachineCode = "", FieldsToReturn = 0, Metadata = false, FloatingTimeInterval = 0, MaxOverdraft = 0) {

        return new Promise((resolve, reject) => {
            (async () => {
                try{
                    const body = await got.post(`https://api.cryptolens.io/api/key/Activate?token=${token}&productId=${ProductId}&Key=${Key}&machineCode=${MachineCode}&fieldsToReturn=${FieldsToReturn}&Metadata=${Metadata}&FloatingTimeInterval=${FloatingTimeInterval}&MaxOverdraft=${MaxOverdraft}&Sign=true&SignMethod=1`).json();
                    if (body.result == "1") {
                        console.warn(body.message);
                        resolve(null);
                    } else {
                        if (helpers.VerifySignature(body, rsaPubKey)) {
                            var license = JSON.parse(Buffer.from(body["licenseKey"], "base64").toString("utf-8"));
                            license.RawResponse = body;
                            resolve(license);
                        } else {
                            console.warn("Signature verification failed.");
                            resolve(null);
                        }
                    }
                } catch(error) {
                    reject(error);
                };
            })();
        });

    }

    static Deactivate(token, ProductId, Key, MachineCode = "", Floating = false, OSInfo = null) {

        return new Promise((resolve, reject) => {
            (async () => {
                try{
                    const body = got(`https://api.cryptolens.io/api/key/Deactivate?token=${token}&productId=${ProductId}&Key=${Key}&machineCode=${MachineCode}&floating=${Floating}&OSInfo=${OSInfo}`);
                    if (body.result == "1") {
                        console.warn(body.message);
                        resolve(null);
                    } else {
                        console.warn(body.message);
                        resolve(null);
                    }
                }catch(error){
                    reject(error)
                }
            })();
        });

    }

    static GetKey(token, rsaPubKey, ProductId, Key, FieldsToReturn = 0, Metadata = false) {

        return new Promise((resolve, reject) => {
            (async () => {
                try{
                    const body = got(`https://api.cryptolens.io/api/key/GetKey?token=${token}&productId=${ProductId}&Key=${Key}&fieldsToReturn=${FieldsToReturn}&Metadata=${Metadata}&Sign=true&SignMethod=1`);
                    if (body.result == "1") {
                        console.warn(body.message);
                        resolve(null);
                    } else {
                        if (helpers.VerifySignature(body, rsaPubKey)) {
                            var license = JSON.parse(Buffer.from(body["licenseKey"], "base64").toString("utf-8"));
                            license.RawResponse = body;
                            resolve(license);
                        } else {
                            console.warn("Signature verification failed.");
                            resolve(null);
                        }
                    }
                }catch(error){
                    reject(error)
                }
            })();
        });

    }
}