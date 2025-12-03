import express from 'express';
import { addMedicineToInventory, getMyInventory ,deleteFromInventory} from '../controllers/inventoryController.js';
import { protect } from '../middleware/authMiddleware.js'; // <--- IMPORT THIS

const router = express.Router();

// Apply 'protect' to these routes
router.post('/add', protect, addMedicineToInventory); // <--- ADD 'protect' HERE
router.get('/my-medicines', protect, getMyInventory); 
router.delete('/:id', protect, deleteFromInventory);

// <--- ADD 'protect' HERE

export default router;