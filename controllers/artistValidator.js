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

  // String-only fields to validate with trim
  const stringFields = {
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
    profileTitle,
    profileKeywords,
    profileDescription
  };

  Object.entries(stringFields).forEach(([key, value]) => {
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(`${key} is required`);
    }
  });

  // Validate videoLink (must be a non-empty array of valid URLs)
  if (!Array.isArray(videoLink) || videoLink.length === 0) {
    errors.push("At least one video link is required");
  } else {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    videoLink.forEach((url, index) => {
      if (typeof url !== "string" || !urlRegex.test(url.trim())) {
        errors.push(`Video link ${index + 1} is invalid`);
      }
    });
  }

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

  if (errors.length > 0) {
    console.log("Validation errors:", errors);
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};
