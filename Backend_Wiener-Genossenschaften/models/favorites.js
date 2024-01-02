import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // ID des Benutzers, der das Projekt favorisiert hat
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' }, // ID des favorisierten Projekts
  registrationDate: Date,
  registrationExpiryDate: Date,
  alarm: Date,
  note: String,
});

export const Favorite = mongoose.model('Favorite', favoritesSchema);
