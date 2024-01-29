import mongoose, { models } from "mongoose";


const benefitSchema = new mongoose.Schema({
  title: String,
});

const Benefit =  models.Benefit || mongoose.model('Benefit', benefitSchema);

export default Benefit
