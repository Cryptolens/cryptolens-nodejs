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
                    const license = JSON.parse(Buffer.from(helpers.GetValueCaseInsensitive(res,"licenseKey"), "base64").toString("utf-8"));
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
                try {
                    const body = await got.post(`${LicenseServerUrl}/api/key/GetKey`, {
                        form: {
                            token: token,
                            ProductId: ProductId,
                            Key: Key,
                            FieldsToReturn: FieldsToReturn,
                            Metadata: Metadata,
                            Sign: true,
                            SignMethod: 1
                        }
                    }).json();

                    if (body.result === "1") {
                        reject(new Error(body.message));
                    } else {
                        if (helpers.VerifySignature(body, rsaPubKey)) {
                            const license = JSON.parse(Buffer.from(helpers.GetValueCaseInsensitive(body,"licenseKey"), "base64").toString("utf-8"));
                            license.RawResponse = body;
                            resolve(license);
                        } else {
                            reject(new Error("Signature verification failed."));
                        }
                    }
                } catch (error) {
                    if (error.name === "HTTPError") {
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

    static CreateTrialKey(token, ProductId, MachineCode = "", LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const body = await got
                    .post(`${LicenseServerUrl}/api/key/CreateTrialKey`, {
                        form: {
                            token: token,
                            ProductId: ProductId,
                            MachineCode: MachineCode,
                        },
                    })
                    .json();
                console.log(body);
                if (body.result == "1") {
                    console.warn(body.message);
                    resolve(null);
                } else {
                    console.warn(body.message);
                    resolve(body.key);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    static CreateKey(
        token,
        ProductId,
        Period,
        Notes = "",
        Block = false,
        CustomerId = null,
        TrialActivation = false,
        MaxNoOfMachines = 0,
        AllowedMachines = null,
        ResellerId = 0,
        NoOfKeys = 1,
        F1 = false,
        F2 = false,
        F3 = false,
        F4 = false,
        F5 = false,
        F6 = false,
        F7 = false,
        F8 = false,
        NewCustomer = false,
        AddOrUseExistingCustomer = false,
        LicenseServerUrl = "https://api.cryptolens.io"
    ) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const body = await got
                        .post(`${LicenseServerUrl}/api/key/CreateKey`, {
                            form: {
                                token: token,
                                ProductId: ProductId,
                                Period: Period,
                                Notes: Notes,
                                Block: Block,
                                CustomerId: CustomerId,
                                TrialActivation: TrialActivation,
                                MaxNoOfMachines: MaxNoOfMachines,
                                AllowedMachines: AllowedMachines,
                                ResellerId: ResellerId,
                                NoOfKeys: NoOfKeys,
                                F1: F1,
                                F2: F2,
                                F3: F3,
                                F4: F4,
                                F5: F5,
                                F6: F6,
                                F7: F7,
                                F8: F8,
                                NewCustomer : NewCustomer,
                                AddOrUseExistingCustomer : AddOrUseExistingCustomer
                            },
                        })
                        .json();

                    if (body.result == "1") {
                        console.warn(body.message);
                        resolve(null);
                    } else {
                        console.warn(body.message);
                        resolve(body);
                    }
                } catch (error) {
                    reject(error);
                }
            })();
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

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/ExtendLicense`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }

    static AddFeature(token, ProductId, Key, Feature, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    productId: ProductId,
                    key: Key,
                    feature: Feature
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/AddFeature`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }

    static RemoveFeature(token, ProductId, Key, Feature, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    productId: ProductId,
                    key: Key,
                    feature: Feature
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/RemoveFeature`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }

    static ChangeNotes(token, ProductId, Key, Notes, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    productId: ProductId,
                    key: Key,
                    notes: Notes
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/ChangeNotes`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }
    
    static BlockKey(token, ProductId, Key, LicenseServerUrl = "https://api.cryptolens.io") {
        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    productId: ProductId,
                    key: Key,
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/key/BlockKey`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }

}
