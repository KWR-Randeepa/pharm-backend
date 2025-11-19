import express from 'express';
import { registerPharmacy, updateStock } from '../controllers/pharmacyController.js';

const router = express.Router();

router.post('/register', registerPharmacy);
router.post('/stock', updateStock);

export default router;