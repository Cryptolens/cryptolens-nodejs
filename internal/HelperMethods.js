module.exports = class HelperMethods {

    /**
     * Verify that a response obtained from Key.Activate has not been tampered with.
     * @param {object} response 
     * @param {string} rsaPubKey 
     */
    static VerifySignature(response, rsaPubKey) {
        const NodeRSA = require('node-rsa');
        const key = new NodeRSA();
        var pubKey = HelperMethods.GetPublicKeyParams(rsaPubKey);
        key.importKey({ n: pubKey.modulus, e: pubKey.exponent }, 'components-public');
        return key.verify(Buffer.from(response["licenseKey"], "base64"), Buffer.from(response["signature"], "base64"));
    }

    /**
     * Returns a dictionary with the modulus and exponent obtained from an RSA Public key string.
     */
    static GetPublicKeyParams(str) {

        var modulus_str = str.substring(str.indexOf('<Modulus>')+8, str.indexOf('</Modulus>'));
        var exponent_str = str.substring(str.indexOf('<Exponent>')+9, str.indexOf('</Exponent>'));

        return {
            modulus: new Buffer.from(modulus_str, 'base64'),
            exponent: new Buffer.from(exponent_str, 'base64')
        }
    }
}