import express from 'express';

import { getPharmacies, registerPharmacy, loginPharmacy } from '../controllers/pharmacyRegister.js';
import { protect } from '../middleware/authMiddleware.js';
import { addMedicineToInventory, getMyInventory, deleteFromInventory } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/register',registerPharmacy);
router.get('/stock', getPharmacies);

router.post('/inventory/add', protect, addMedicineToInventory);
router.get('/inventory', protect, getMyInventory); // View all my medicines
router.delete('/inventory/:id', protect, deleteFromInventory);
router.post('/login', loginPharmacy);
export default router;