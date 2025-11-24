import Pharmacy from '../models/Pharmacy.js'; // Ensure the filename matches your model file

// @desc    Register a new pharmacy
// @route   POST /api/pharmacy/register
// @access  Public

export const registerPharmacy = async (req, res) => {
console.log("BODY RECEIVED:", req.body);
  try {
    const { 
      pharmacyName, 
      ownerName, 
      email, 
      phoneNumber, 
      address, 
      openingHours, 
      latitude, 
      longitude,
      profilePicture 
    } = req.body || {};

    // 1. Check if pharmacy already exists
    const pharmacyExists = await Pharmacy.findOne({ email });
    if (pharmacyExists) {
      return res.status(400).json({ message: 'Pharmacy with this email already exists' });
    }

    // 2. Format Location Data (GeoJSON)
    // The form sends flat lat/long, but the model needs a nested object
    let locationData = {
      type: 'Point',
      coordinates: [0, 0] // Default
    };

    if (latitude && longitude) {
      locationData = {
        type: 'Point',
        // Note: MongoDB GeoJSON format is [Longitude, Latitude]
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
    }

    // 3. Create the new Pharmacy object
    const pharmacy = await Pharmacy.create({
      pharmacyName,
      ownerName,
      email,
      phoneNumber,
      address,
      openingHours,
      location: locationData,
      profilePicture: profilePicture || null
    });

    if (pharmacy) {
      res.status(201).json({
        message: 'Pharmacy registered successfully',
        _id: pharmacy._id,
        pharmacyName: pharmacy.pharmacyName,
        email: pharmacy.email
      });
    } else {
      res.status(400).json({ message: 'Invalid pharmacy data' });
    }

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all pharmacies
// @route   GET /api/pharmacy
// @access  Public
export const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({});
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
