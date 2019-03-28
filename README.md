# Cryptolens Client API for NodeJS

This library contains helper methods to verify licenses in NodeJS.

## Installation

> npm add cryptolens

## Example

```js
const Key = require('cryptolens').Key;

var RSAPubKey = "{Your RSA Public key, which can be found here: https://app.cryptolens.io/User/Security}";
var result = Key.Activate(token="{Access token with }", RSAPubKey, ProductId=3349, Key="GEBNC-WZZJD-VJIHG-GCMVD", MachineCode="test");

result.then(function(license) {
    if (!license) {
        // failure
        return;
    }
    
    console.log(license.Created);
});
```
