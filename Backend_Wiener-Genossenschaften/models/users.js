import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 2 },
    lastName: { type: String, required: true, minLength: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, //gehasht
    unlockKey: { type: String }, //required: true, unique: true; Eindeutiger Schlüssel für Freischaltung
    isActivated: { type: Boolean, default: true }, // Gibt an, ob der Benutzer freigeschaltet ist
    isAdmin: { type: Boolean, default: false },
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Favorite',
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', usersSchema);
