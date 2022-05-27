const got = require('got');
const helpers = require('../internal/HelperMethods.js');

module.exports = class Key {

    static Activate(token, rsaPubKey, ProductId, Key, MachineCode = "", FieldsToReturn = 0, Metadata = false, FloatingTimeInterval = 0, MaxOverdraft = 0, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
           try {
               const formBody = {
                   token: token,
                   ProductId: ProductId,
                   Key: Key,
                   MachineCode: MachineCode,
                   FieldsToReturn: FieldsToReturn,
                   Metadata: Metadata,
                   FloatingTimeInterval: FloatingTimeInterval,
                   MaxOverdraft: MaxOverdraft,
                   Sign: true,
                   SignMethod: 1
               }
               const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/Activate`, formBody)

               if (helpers.VerifySignature(res, rsaPubKey)) {
                   const license = JSON.parse(Buffer.from(res["licenseKey"], "base64").toString("utf-8"));
                   license.RawResponse = res;
                   resolve(license);
               } else {
                   reject(new Error("Signature verification failed."));
               }
           } catch (error) {
               reject(error);
           }
        });
    }

    static Deactivate(token, ProductId, Key, MachineCode = "", Floating = false, OSInfo = null, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    ProductId: ProductId,
                    Key: Key,
                    MachineCode: MachineCode,
                    Floating: Floating,
                    OSInfo: OSInfo
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/Deactivate`, formBody)
                resolve(res.message)
            } catch (error) {
                reject(error);
            }
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

                    if (body.result === "1") {
                        reject(new Error(body.message));
                    } else {
                        if (helpers.VerifySignature(body, rsaPubKey)) {
                            const license = JSON.parse(Buffer.from(body["licenseKey"], "base64").toString("utf-8"));
                            license.RawResponse = body;
                            resolve(license);
                        } else {
                            reject(new Error("Signature verification failed."));
                        }
                    }
                }catch(error){
                    if(error.name === "HTTPError") {
                        reject(new Error(JSON.parse(error.response.body).message));
                    } else {
                        reject(error);
                    }
                }
            })();
        });
    }

    static CreateKeyFromTemplate(token, LicenseTemplateId, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    LicenseTemplateId: LicenseTemplateId
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/CreateKeyFromTemplate`, formBody)
                resolve(res.key)
            } catch (error) {
                reject(error);
            }
        });
    }

    static ExtendLicense(token, ProductId, Key, NoOfDays = 0, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    productId: ProductId,
                    key: Key,
                    noOfDays: NoOfDays
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/CreateKeyFromTemplate`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }
}
