const crypto = require("crypto")

let result = crypto.createHash("sha256")
    .update("prueba")
    .digest("hex");

console.log(result)



