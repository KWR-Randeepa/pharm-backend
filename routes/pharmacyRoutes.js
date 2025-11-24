import express from 'express';
import { getPharmacies, registerPharmacy,  } from '../controllers/pharmacyRegister.js';

const router = express.Router();

router.post('/register',registerPharmacy);
router.get('/stock', getPharmacies);

export default router;