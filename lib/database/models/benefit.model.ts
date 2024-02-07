import mongoose, { models } from "mongoose";

export interface IBenefit extends Document {
  _id: string;
  title: string;
}

const benefitSchema = new mongoose.Schema({
  title: String,
});

const Benefit =  models.Benefit || mongoose.model('Benefit', benefitSchema);

export default Benefit
