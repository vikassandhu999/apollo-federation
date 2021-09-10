const jwt = require('jsonwebtoken');

function userAuthMiddleware() {
  function extractAccessTokenFromRequest(req) {
    return req.headers.authorization;
  }

  async function verifyAccessToken(token) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    return new Promise(((resolve) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) resolve(null);
        resolve(decoded);
      });
    }));
  }

  return async (req, res, next) => {
    req.user = {
      isAuthenticated: false,
      id: null,
    };
    const accessToken = extractAccessTokenFromRequest(req);
    const userPayload = await verifyAccessToken(accessToken);
    if (userPayload) {
      req.user.isAuthenticated = true;
      req.user.id = userPayload.id;
    }
    next();
  };
}

module.exports = userAuthMiddleware;
