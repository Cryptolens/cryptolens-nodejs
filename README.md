# Cryptolens Client API for NodeJS

This library contains helper methods to verify licenses in NodeJS.

## Installation

```bash 
npm add cryptolens
```

## Example

### Key Verification
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

### Offline activation (saving/loading licenses)
Assuming the license key verification was successful, we can save the result in a file so that we can use it instead of contacting Cryptolens.

First, we need to add the reference to the helper methods:

```js
const Helpers = require('cryptolens').Helpers;
```

We can now proceed and save it as a string.

```js
var licenseString = Helpers.SaveAsString(license);
```

When loading it back, we can use the code below:
```js
var license = Helpers.LoadFromString(RSAPubKey, licenseString);
```

If you want to make sure that the license file is not too old, you can specify the maximum number of days as shown below (after 30 days, this method will return null).
```js
var license = Helpers.LoadFromString(RSAPubKey, licenseString, 30);
```

