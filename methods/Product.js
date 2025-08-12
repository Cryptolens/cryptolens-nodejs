const got = require('got');
const helpers = require('../internal/HelperMethods.js');

module.exports = class Product {

    static GetKeys(token, ProductId, Page = 1,OrderBy="",SearchQuery="", GlobalId = 0, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token,
                    productId: ProductId,
                    page:Page,
                    orderBy: OrderBy,
                    searchQuery: SearchQuery,
                    globalId:GlobalId
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/product/GetKeys`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }

    static GetProducts(token, LicenseServerUrl = "https://api.cryptolens.io") {

        return new Promise(async (resolve, reject) => {
            try {
                const formBody = {
                    token: token
                }

                const res = await helpers.CallAPI(`${LicenseServerUrl}/api/product/GetProducts`, formBody)
                resolve(res)
            } catch (error) {
                reject(error);
            }
        });
    }
}
