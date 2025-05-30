import sendInquiryConfirmation from '../controllers/sendInquiryConfirmation.js';
import contactUsController from '../controllers/contactUsController.js';
import eventPlannerController from '../controllers/eventPlannerController.js';
import  equipmentRentalController  from "../controllers/equipmentRentalController.js";
import  volunteerBookingController  from "../controllers/volunteerBookingController.js";
import  venueBookingController  from "../controllers/venueBookingController.js";

import express from "express";
const router = express.Router();  

router.post('/form',sendInquiryConfirmation);
router.post('/form/contactUs',contactUsController)
router.post('/form/eventPlanner',eventPlannerController)
router.post("/form/rentalBooking", equipmentRentalController);
router.post("/form/volunteerBooking", volunteerBookingController);
router.post("/form/venueBooking", venueBookingController);

export default router;