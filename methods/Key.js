const got = require('got');
const helpers = require('../internal/HelperMethods.js');

module.exports = class Key {

    static Activate(token, rsaPubKey, ProductId, Key, MachineCode = "", FieldsToReturn = 0, Metadata = false, FloatingTimeInterval = 0, MaxOverdraft = 0, LicenseServerUrl = "https://api.cryptolens.io") {

        console.log(LicenseServerUrl);
        return new Promise((resolve, reject) => {
            (async () => {
                try{
                    const body = await got.post(`${LicenseServerUrl}/api/key/Activate`, {
                        body: `token=${encodeURIComponent(token)}&ProductId=${encodeURIComponent(ProductId)}&Key=${encodeURIComponent(Key)}&MachineCode=${encodeURIComponent(MachineCode)}&FieldsToReturn=${FieldsToReturn}&Metadata=${encodeURIComponent(Metadata)}&FloatingTimeInterval=${encodeURIComponent(FloatingTimeInterval)}&MaxOverdraft=${encodeURIComponent(MaxOverdraft)}&Sign=true&SignMethod=1`
                    }).json();

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

    static Deactivate(token, ProductId, Key, MachineCode = "", Floating = false, OSInfo = null, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise((resolve, reject) => {
            (async () => {
                try{

                    const body = await got.post(`${LicenseServerUrl}/api/key/Deactivate`, {
                        body: `token=${encodeURIComponent(token)}&ProductId=${encodeURIComponent(ProductId)}&Key=${encodeURIComponent(Key)}&MachineCode=${encodeURIComponent(MachineCode)}&Floating=${encodeURIComponent(Floating)}&OSInfo=${encodeURIComponent(OSInfo)}`
                    }).json();

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

    static GetKey(token, rsaPubKey, ProductId, Key, FieldsToReturn = 0, Metadata = false, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise((resolve, reject) => {
            (async () => {
                try{
                    const body = got(`${LicenseServerUrl}/api/key/GetKey?token=${token}&productId=${ProductId}&Key=${Key}&fieldsToReturn=${FieldsToReturn}&Metadata=${Metadata}&Sign=true&SignMethod=1`);
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