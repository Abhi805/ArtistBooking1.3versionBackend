import express from 'express';

import { checkAuth } from '../controllers/signup/twilioController.js';

const router = express.Router();


router.post('/check', checkAuth);