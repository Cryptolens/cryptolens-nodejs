const got = require('got');
const helpers = require('../internal/HelperMethods.js');

module.exports = class Key {

    static Activate(token, rsaPubKey, ProductId, Key, MachineCode = "", FieldsToReturn = 0, Metadata = false, FloatingTimeInterval = 0, MaxOverdraft = 0, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise((resolve, reject) => {
            (async () => {
                
                try{
                    const body = await got.post(`${LicenseServerUrl}/api/key/Activate`, {
                        form: {
                            token : token,
                            ProductId : ProductId,
                            Key : Key,
                            MachineCode : MachineCode,
                            FieldsToReturn : FieldsToReturn,
                            Metadata : Metadata,
                            FloatingTimeInterval : FloatingTimeInterval,
                            MaxOverdraft: MaxOverdraft,
                            Sign: true,
                            SignMethod : 1
                        },
                    }).json();

                    if (body.result == "1") {
                        reject(new Error(body.message));
                    } else {
                        if (helpers.VerifySignature(body, rsaPubKey)) {
                            var license = JSON.parse(Buffer.from(body["licenseKey"], "base64").toString("utf-8"));
                            license.RawResponse = body;
                            resolve(license);
                        } else {
                            reject(new Error("Signature verification failed."));
                        }
                    }
                } catch(error) {
                    if(error.name == "HTTPError") {
                        reject(new Error(JSON.parse(error.response.body).message));
                    } else {
                        reject(error);
                    } 
                };
            })();
        });
    }

    static Deactivate(token, ProductId, Key, MachineCode = "", Floating = false, OSInfo = null, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise((resolve, reject) => {
            (async () => {
                try{
                    const body = await got.post(`${LicenseServerUrl}/api/key/Deactivate`, {
                        form: {
                            token : token,
                            ProductId : ProductId,
                            Key : Key,
                            MachineCode : MachineCode,
                            Floating: Floating,
                            OSInfo : OSInfo
                        }
                    }).json();

                    if (body.result == "1") {
                        console.warn(body.message);
                        resolve(null);
                    } else {
                        console.warn(body.message);
                        resolve(null);
                    }
                }catch(error){
                    if(error.name == "HTTPError") {
                        reject(new Error(JSON.parse(error.response.body).message));
                    } else {
                        reject(error);
                    } 
                }
            })();
        });

    }

    static GetKey(token, rsaPubKey, ProductId, Key, FieldsToReturn = 0, Metadata = false, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise((resolve, reject) => {
            (async () => {
                try{
                    const body = await got.post(`${LicenseServerUrl}/api/key/GetKey`, {
                        form: {
                            token : token,
                            ProductId : ProductId,
                            Key : Key,
                            FieldsToReturn : FieldsToReturn,
                            Metadata : Metadata,
                            Sign: true,
                            SignMethod : 1
                        }
                    }).json();

                    if (body.result == "1") {
                        reject(new Error(body.message));
                    } else {
                        if (helpers.VerifySignature(body, rsaPubKey)) {
                            var license = JSON.parse(Buffer.from(body["licenseKey"], "base64").toString("utf-8"));
                            license.RawResponse = body;
                            resolve(license);
                        } else {
                            reject(new Error("Signature verification failed."));
                        }
                    }
                }catch(error){
                    if(error.name == "HTTPError") {
                        reject(new Error(JSON.parse(error.response.body).message));
                    } else {
                        reject(error);
                    } 
                }
            })();
        });
    }
}