const got = require('got');
const helpers = require('../internal/HelperMethods.js');

module.exports = class Key {

    static AddDataObjectToKey(token, ProductId, Key, CheckForDuplicates = false, Name = null, StringValue = null, IntValue= 0, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    productId: ProductId,
                    key: Key,
                    checkForDuplicates: CheckForDuplicates,
                    name: Name,
                    stringValue: StringValue,
                    intValue: IntValue,
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/data/AddDataObjectToKey`, formBody)
                resolve(res.id)
            } catch (error) {
                reject(error);
            }
        });
    }
}
