import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  userId: ObjectId, // ID des Benutzers, der das Projekt favorisiert hat
  projectId: ObjectId, // ID des favorisierten Projekts
  registrationDate: Date,
  registrationExpiryDate: Date,
  alarm: Date,
  note: String,
});

export const Favorite = mongoose.model('Favorite', favoritesSchema);
