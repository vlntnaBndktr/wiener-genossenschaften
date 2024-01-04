import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
  registrationDate: { type: Date, default: Date.now },
  registrationExpiryDate: { type: Date, default: null }, // TODO oder ein sinnvoller Standardwert zb in 1 Jahr
  alarm: { type: Date, default: null }, // oder ein sinnvoller Standardwert zb in 1 Jahr
  notes: [
    {
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Favorite = mongoose.model('Favorite', favoritesSchema);
