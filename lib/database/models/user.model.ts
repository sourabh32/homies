import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName:{type:String},
  preferences:[{type:Schema.Types.ObjectId,
    ref:'Preference'
} 
],
  gender: {type: String, required: true },
  photo: { type: String, required: true },
  isAdult:{type:Boolean,default:false},
})

const User = models.User || model('User', UserSchema);

export default User;
