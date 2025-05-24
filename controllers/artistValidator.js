// middlewares/artistValidator.js

export const validateArtistInput = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    city,
    duration,
    travel,
    category,
    genre,
    team,
    location,
    description,
    videoLink,
    profileTitle,
    profileKeywords,
    profileDescription
  } = req.body;

  const errors = [];

  // Check required fields
  const requiredFields = {
    firstName,
    lastName,
    email,
    mobile,
    city,
    duration,
    travel,
    category,
    genre,
    team,
    location,
    description,
    videoLink,
    profileTitle,
    profileKeywords,
    profileDescription
  };

  Object.entries(requiredFields).forEach(([key, value]) => {
    if (!value || value.trim() === "") {
      errors.push(`${key} is required`);
    }
  });

  

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("Email is invalid");
  }

  // Mobile number validation (10 digits)
  const mobileRegex = /^[0-9]{10}$/;
  if (mobile && !mobileRegex.test(mobile)) {
    errors.push("Mobile number must be 10 digits");
  }
 
  // Images validation
  if (!req.files || req.files.length === 0) {
    errors.push("At least one image is required");
  } else if (req.files.length > 6) {
    errors.push("You can upload maximum 6 images only");
  }
console.log("FILES RECEIVED:", req.files);

  // Agar errors hai to turant response bhej do
  if (errors.length > 0) {
    
    console.log("Validation errors:", errors);  // <- Add this
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};
