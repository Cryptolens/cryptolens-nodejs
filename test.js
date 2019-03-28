var Key = require("./methods/Key.js")
const Helpers = require('./methods/Helpers.js');

var RSAPubKey = "<RSAKeyValue><Modulus>sGbvxwdlDbqFXOMlVUnAF5ew0t0WpPW7rFpI5jHQOFkht/326dvh7t74RYeMpjy357NljouhpTLA3a6idnn4j6c3jmPWBkjZndGsPL4Bqm+fwE48nKpGPjkj4q/yzT4tHXBTyvaBjA8bVoCTnu+LiC4XEaLZRThGzIn5KQXKCigg6tQRy0GXE13XYFVz/x1mjFbT9/7dS8p85n8BuwlY5JvuBIQkKhuCNFfrUxBWyu87CFnXWjIupCD2VO/GbxaCvzrRjLZjAngLCMtZbYBALksqGPgTUN7ZM24XbPWyLtKPaXF2i4XRR9u6eTj5BfnLbKAU5PIVfjIS+vNYYogteQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
var result = Key.Activate(token="WyIzMzY0IiwiZHRGd1N0Vm0zUUY0c3p6MGRjbllGRmgxUGlSblVFeUw0NHBLTHd1SSJd", RSAPubKey, ProductId=3349, Key="GEBNC-WZZJD-VJIHG-GCMVD", MachineCode="test");

result.then((s)=> console.log(Helpers.LoadFromString(RSAPubKey, Helpers.SaveAsString(s))));

