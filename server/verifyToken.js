import jwt from 'jsonwebtoken'
export const authenticateToken = (req, res, next) =>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({status : "Unauthorized"})

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

    if (err) return res.status(403).json({status : err})

    req.user = user

    next()
  })
}