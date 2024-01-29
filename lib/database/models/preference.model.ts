import mongoose, { models } from "mongoose";


const preferenceSchema = new mongoose.Schema({
  title: String,
});

const Preference =  models.Preference || mongoose.model('Preference', preferenceSchema);

export default Preference;
