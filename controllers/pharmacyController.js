import Pharmacy from '../models/Pharmacy.js';
import Medicine from '../models/Medicine.js';
import Inventory from '../models/Inventory.js';

// 1. Create a Pharmacy (For setup)
export const registerPharmacy = async (req, res) => {
  try {
    // coordinates must be [Longitude, Latitude]
    const { name, address, latitude, longitude } = req.body;
    
    const pharmacy = await Pharmacy.create({
      name,
      address,
      location: { type: 'Point', coordinates: [longitude, latitude] }
    });
    res.status(201).json(pharmacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Add Stock (Link a medicine to a pharmacy)
export const updateStock = async (req, res) => {
  try {
    const { pharmacyId, medicineId, status } = req.body;
    
    // Check if inventory record exists, if so update, else create
    let inventory = await Inventory.findOne({ pharmacy: pharmacyId, medicine: medicineId });

    if (inventory) {
      inventory.status = status;
      inventory.updatedAt = Date.now();
      await inventory.save();
    } else {
      inventory = await Inventory.create({
        pharmacy: pharmacyId,
        medicine: medicineId,
        status
      });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};