const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    // const { token } = req.header("Authorization");
    const token = req.headers["token"];

    if (!token) return res.status(401).json({ error: "Missing Token" });

    // if (token.startsWith("Bearer ")) {
    //   token = token.slice(7, token.length).trimLeft();
    // }

    const isTokenVerified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!isTokenVerified)
      return res.status(401).json({ error: "Token is invalid" });

    // req.user = verified;

    // res.send(true);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyToken;
