import jwt from 'jsonwebtoken';
export const protect = (req, res, next) => {
    let token; 
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token, process.env.JWT_SECRET || "en tillfallig_hemlig_nyckel"
            );
            req.userId = decoded.userId;
            next()

        }catch (err) {
            return res.status(401).json({ message: "Inte behörig, ogiltig token" });

        }
    }
    if (!token) {
    return res.status(401).json({ message: "Inte behörig, ingen token hittades" });
  }
    
};