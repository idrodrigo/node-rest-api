import jwt from 'jsonwebtoken'

async function createAccessToken (payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1d' }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

export default createAccessToken
