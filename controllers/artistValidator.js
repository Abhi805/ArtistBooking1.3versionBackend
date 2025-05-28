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

  // Validate required string fields
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
    if (!value || typeof value !== "string" || value.trim() === "") {
      errors.push(`${key} is required and must be a non-empty string`);
    }
  });

<<<<<<< HEAD
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
=======
  // Validate video links only if provided
  let parsedVideoLink = [];

  if (videoLink && videoLink.length > 0) {
    try {
      parsedVideoLink = typeof videoLink === 'string' ? JSON.parse(videoLink) : videoLink;
    } catch (e) {
      errors.push("Video link must be a valid JSON array");
    }

    if (Array.isArray(parsedVideoLink)) {
      const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/[^\s]+$/;
      parsedVideoLink.forEach((url, index) => {
        if (typeof url !== "string" || !urlRegex.test(url.trim())) {
          errors.push(`Video link ${index + 1} is invalid`);
        }
      });
    }
  }

  // Email validation
>>>>>>> 922a4c7e2001de33416aec9205eea4e41a6e3ba6
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("Email is invalid");
  }

  // Mobile validation: allows +91 or 10-digit number
  const mobileRegex = /^(\+91)?[6-9][0-9]{9}$/;
  if (mobile && !mobileRegex.test(mobile)) {
    errors.push("Mobile number must be 10 digits or in +91 format");
  }

  // Image validation
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
<<<<<<< HEAD
=======

>>>>>>> 922a4c7e2001de33416aec9205eea4e41a6e3ba6
  console.log("artist validator run successfully");
  next();
};
