import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  project: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
  registrationDate: { type: Date, default: Date.now },
  registrationExpiryDate: { type: Date, default: null }, // TODO oder ein sinnvoller Standardwert zb in 1 Jahr
  alarm: { type: Boolean, default: false },
  notes: { type: String, required: false },
});

// Pre-Save-Hook zum Setzen des registrationExpiryDate auf ein Jahr nach der Registrierung, falls nicht angegeben
favoritesSchema.pre('save', function (next) {
  if (!this.registrationExpiryDate) {
    this.registrationExpiryDate = new Date(this.registrationDate);
    this.registrationExpiryDate.setFullYear(
      this.registrationExpiryDate.getFullYear() + 1
    );
  }
  next();
});

export const Favorite = mongoose.model('Favorite', favoritesSchema);
