import DecryptToken from "../auth/jwt.js"

export default async function (req,res,next){
    if(!req.headers.authorization){
        res.status(401).send("No tenes acceso a esta información");

    }else{
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const payload=await DecryptToken(token);
        console.log("sssss"+ payload)

        if(payload!=null){
            req.user=payload;
            next();
        }else{
            res.status(401).send("No esta autorizado") ;
        }
    }

}