var Key = require("./methods/Key.js")

var result = Key.Activate(token="WyIzMjkwIiwiQUFab0Y4Wmk0ckt1U2l1U2Rya3FXREF5TFlzTnNMcDZiQlNIb3hSSSJd", ProductId=3349, Key="GEBNC-WZZJD-VJIHG-GCMVD", MachineCode="test");

result.then(function(s) {console.log(s)});