const productModel = require("../../models/productModel");

const authorizeAdminController = (req, res, next) => {
  const userRole = req.user.role; // Assuming user role is available in req.user
  console.log("userRole",userRole)
  if (userRole !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports =authorizeAdminController;