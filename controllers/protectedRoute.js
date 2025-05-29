
import jwt from "jsonwebtoken";



const protectedRoute = (req,res) =>{
     console.log("🔐 Cookies received:", req.cookies);

  const token = req.cookies.token;
  if (!token) {
    console.log("❌ No token found.");
    return res.json({ loggedIn: false });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token is valid. User:", user);
    res.json({ loggedIn: true, user });
  } catch (err) {
    console.log("❌ Invalid token.");
    res.json({ loggedIn: false });
  }
}

export {protectedRoute};