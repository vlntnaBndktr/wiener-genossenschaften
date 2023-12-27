import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String }, //gehasht
});

export const User = mongoose.model('User', usersSchema);
