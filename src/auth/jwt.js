import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (token){
    const secretKey = "ClaveSecreta3000$";

console.log("llega"+token)
let payloadOriginal=null;
try {
    payloadOriginal = jwt.verify(token, secretKey);
    return payloadOriginal

} catch (error) {

    return payloadOriginal;

}
}

