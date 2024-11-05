let jwtSecretKey = process.env.JWT_SECRET_KEY;

// async function generateJWT(userDetailsObj)
async function generateJWT(userId, username, roles = null) {}

async function decodeJWT(token) {}

async function validateUserAuth(request, response, next) {}

module.exports = {
  generateJWT,
  decodeJWT,
  validateUserAuth,
};
