import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization")

        // 401 - Invalid Credential , 403 - Valid Credential but not authorized to access the resource
        if (!token) return res.status(403).send({ message: "Access Denied"})

        token = token.split(" ")[1]

        const verified = jwt.verify(token,process.env.JWT_SECRET)

        req.user = verified ;
        next();
    } catch (error) {
        return res.status(403).send({ message: "Access Denied"})
    }
}

export default verifyToken