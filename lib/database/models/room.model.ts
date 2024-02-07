import  { Document, Schema, model, models } from "mongoose";


 export interface IRoom extends Document {
    location:String,
    _id:String,
    imageUrl:String,
    createdAt:Date,
    moveIn:Date,
    description:String,
    rent:Number,
    numBedrooms:Number,
    numBathrooms:Number,
    petPolicy:Boolean,
    lookingFor:"Male" | "Female" | "Any",
    benifts:String[],
    type:String,
    user:{id:String,photo:String,username:String,preferences:String[]}

}




const roomSchema = new Schema({
    location:String,
    description:{type:String,required:true},
    imageUrl:{type:String,rewuired:true},
    createdAt: { type: Date, default: Date.now },
    moveIn:{type:Date,default:Date.now},
    rent:{type:Number,required:true},
    type:{type:String,required:true},
    numBedrooms:{type:Number,required:true},
    numBathrooms:{type:Number,required:true},
    petPolicy:{type:Boolean,default:false},
    lookingFor:{type:String,default:"Any"},
    user:{  type: Schema.Types.ObjectId,
        ref: 'User'},
    hasKitchen:{type:Boolean,default:false}  ,
    hasParking:{type:Boolean,default:false}  ,
    smoking:{type:Boolean,default:false}  ,
    alcohol:{type:Boolean,default:false}  ,
    otherCharges:{type:Boolean,default:false}  ,
    hasFurniture:{type:Boolean,default:false}  ,
    
})

const Room = models.Room || model('Room', roomSchema);

export default Room;