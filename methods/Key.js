const request = require('request');
const helpers = require('../internal/HelperMethods.js');

module.exports = class Key {

    static Activate(token, rsaPubKey, ProductId, Key, MachineCode = "", FieldsToReturn = 0, Metadata = false, FloatingTimeInterval = 0, MaxOverdraft = 0) {

        return new Promise((resolve, reject) => {
            request(`https://api.cryptolens.io/api/key/Activate?token=${token}&productId=${ProductId}&Key=${Key}&machineCode=${MachineCode}&fieldsToReturn=${FieldsToReturn}&Metadata=${Metadata}&FloatingTimeInterval=${FloatingTimeInterval}&MaxOverdraft=${MaxOverdraft}&Sign=true&SignMethod=1`, { json: true }, (err, res, body) => {
                if (err || body.result == "1") {
                    console.warn(err);
                    if (!err) {
                        console.warn(body.message);
                    }
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
            });
        });

    }

    static Deactivate(token, ProductId, Key, MachineCode = "", Floating = false, OSInfo = null) {

        return new Promise((resolve, reject) => {
            request(`https://api.cryptolens.io/api/key/Deactivate?token=${token}&productId=${ProductId}&Key=${Key}&machineCode=${MachineCode}&floating=${Floating}&OSInfo=${OSInfo}`, { json: true }, (err, res, body) => {
                if (err || body.result == "1") {
                    console.warn(err);
                    if (!err) {
                        console.warn(body.message);
                    }
                    resolve(null);
                } else {
                    console.warn(body.message);
                    resolve(null);
                }
            });
        });

    }

    static GetKey(token, rsaPubKey, ProductId, Key, FieldsToReturn = 0, Metadata = false) {

        return new Promise((resolve, reject) => {
            request(`https://api.cryptolens.io/api/key/GetKey?token=${token}&productId=${ProductId}&Key=${Key}&fieldsToReturn=${FieldsToReturn}&Metadata=${Metadata}&Sign=true&SignMethod=1`, { json: true }, (err, res, body) => {
                if (err || body.result == "1") {
                    console.warn(err);
                    if (!err) {
                        console.warn(body.message);
                    }
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
            });
        });

    }
}