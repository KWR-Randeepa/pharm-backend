import mongoose from 'mongoose';

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String },
  // GeoJSON for location
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true } // [Longitude, Latitude]
  }
});

// Create a geospatial index so we can search by distance
PharmacySchema.index({ location: "2dsphere" });

export default mongoose.model('Pharmacy', PharmacySchema);