import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
  status: { 
    type: String, 
    enum: ['In Stock', 'Out of Stock'], 
    default: 'In Stock' 
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inventory', InventorySchema);