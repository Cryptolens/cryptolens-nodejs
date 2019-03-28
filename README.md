# Cryptolens Client API for NodeJS

This library contains helper methods to verify licenses in NodeJS.

## Installation

```bash 
npm add cryptolens
```

## Example

To verify a license key, you can use the code below. The RSAPublicKey, token and the product id can be found on [this page](https://help.cryptolens.io/examples/key-verification).

```js
const Key = require('cryptolens').Key;

var RSAPubKey = "{Your RSA Public key, which can be found here: https://app.cryptolens.io/User/Security}";
var result = Key.Activate(token="{Access token with with Activate permission}", RSAPubKey, ProductId=3349, Key="GEBNC-WZZJD-VJIHG-GCMVD", MachineCode="test");

result.then(function(license) {
    if (!license) {
        // failure
        return;
    }
    
    // Please see https://app.cryptolens.io/docs/api/v3/model/LicenseKey for a complete list of parameters.
    console.log(license.Created);
});
```
