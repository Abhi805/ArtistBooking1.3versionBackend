export const validateArtistInput = (req, res, next) => {
  console.log("artist validator run successfully");
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
  console.log("artist validator run successfully");

  // Fields expected to be non-empty strings
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

  console.log("artist validator run successfully");

  Object.entries(stringFields).forEach(([key, value]) => {
    if (!value || typeof value !== "string" || value.trim() === "") {
      errors.push(`${key} is required and must be a non-empty string`);
    }
  });

  // Validate videoLink: must be a non-empty array of valid URLs
  // Only validate videoLink if it's provided and not empty
  if (videoLink && Array.isArray(videoLink) && videoLink.length > 0) {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    videoLink.forEach((url, index) => {
      if (typeof url !== "string" || !urlRegex.test(url.trim())) {
        errors.push(`Video link ${index + 1} is invalid`);
      }
    });
  }


  // Email validation (only if email is provided)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("Email is invalid");
  }

  // Mobile validation (only if mobile is provided)
  const mobileRegex = /^[0-9]{10}$/;
  if (mobile && !mobileRegex.test(mobile)) {
    errors.push("Mobile number must be 10 digits");
  }

  // Images validation (multer req.files)
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
  console.log("artist validator run successfully");
  next();
};
