import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: String,
  description: String,
  constructionAssociation: String,
  moveIn: String,
  location: {
    street: String,
    zip: String, // z.B. "Point" für GeoJSON
    city: String,
    coordinates: {
      lat: Number,
      lon: Number,
    }, // Längen- und Breitengrade für die OpenStreetMap
  },
  image: String, //=url vom Bild
  website: String, // Link zur Homepage der Genossenschaft
  // Weitere relevante Felder
});

export const Project = mongoose.model('Project', projectsSchema);
