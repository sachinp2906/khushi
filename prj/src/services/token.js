const jsonwebtoken = require("jsonwebtoken");

const jwt = {
  issueJWT: async (user) => {
    let payload = {
      id: user.id,
      email: user.email,
    };
    const options = {
      expiresIn: "365d",
    };
    const jwtToken = await jsonwebtoken.sign(payload, process.env.SECRET_KEY, options);
    return jwtToken;
  },

  verifyTokenFn: async (req, res, next) => {
    let token = req.headers.authorization;
    await jsonwebtoken.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.json({
          status: false,
          statusCode: false,
          message: "Token not found",
        });
      } else {
        req.user = {
          id: decoded.id,
          email: decoded.email,
        };
        return next();
      }
    });
  },
};

module.exports = jwt;
