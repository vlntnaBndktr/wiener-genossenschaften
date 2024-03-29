import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const flatsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    constructionAssociation: { type: String },
    moveIn: { type: String },
    squareMeters: { type: String },
    location: {
      street: { type: String },
      zip: { type: String },
      city: { type: String },
      coordinates: {
        lat: Number,
        lon: Number,
      }, // Längen- und Breitengrade für die OpenStreetMap
    },
    image: { type: String }, //=url vom Bild
    website: { type: String }, // Link zur Homepage der Genossenschaft
    // Weitere relevante Felder
  },
  { timestamps: true }
);

export const Flat = mongoose.model('Flat', flatsSchema);
