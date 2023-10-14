const { verifyToken } = require("../token");

// middleware
function verifikasi(req, res, next) {
  const token = req.header("authorization");

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    // jika ada token, lakukan verifikasi token
    verifyToken(token);
    next();
  }
}

module.exports = verifikasi;
