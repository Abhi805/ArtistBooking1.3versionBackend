// // controllers/volunteerReachController.js

// import Volunteer from "../models/Volunteer.js";

// // ✅ Increases reach count for a volunteer (only once per device/frontend handles this)
// export const increaseVolunteerReach = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const volunteer = await Volunteer.findById(id);
//     if (!volunteer) {
//       return res.status(404).json({ message: "Volunteer not found" });
//     }

//     volunteer.reachCount = (volunteer.reachCount || 0) + 1;
//     await volunteer.save();

//     res.status(200).json({
//       message: "Reach count updated successfully",
//       reachCount: volunteer.reachCount,
//     });
//   } catch (error) {
//     console.error("Error updating reach count:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
