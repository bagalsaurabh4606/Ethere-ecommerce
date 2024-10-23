const userModel = require("../models/userModels");

// middleware/authMiddleware.js
const authMiddleware = async (req, res, next) => {
  try {
    const userID = req.userId; // Get user ID from the request
    if (!userID) {
      return res.status(401).json({ message: 'User ID not found in request', error: true, success: false });
    }

    // Fetch user data using userID
    const userData = await userModel.findById(userID);
    
    // Log user data for debugging
    console.log("User data:", userData);

    // Check if user data was found
    if (!userData) {
      return res.status(404).json({ message: 'User not found', error: true, success: false });
    }

    console.log("User role:", userData.role);

    // Check if the user role is 'ADMIN'
    if (userData.role === 'ADMIN') { // Adjust 'ADMIN' to whatever your admin role is
      return next(); // User is an admin, proceed to the next middleware/route handler
    } else {
      return res.status(403).json({ data:[],message: 'Access denied. Admins only.',success:true,error:false});
    }
  } catch (err) {
    console.error("Error in authMiddleware:", err);
    return res.status(500).json({ message: 'Server error', error: true, success: false });
  }
};

module.exports = authMiddleware;
