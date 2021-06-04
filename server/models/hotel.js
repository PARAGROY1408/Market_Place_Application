import mongoose from 'mongoose'
const {Schema}=mongoose
const {ObjectId}=mongoose.Schema


const hotelSchema=new Schema({
    title:{
        type:String,
        required:"title is required"
    },
    content:{
       type:String,
       required:"content is required",
       maxlength:5000
    },
    location:{
        type:String
    },
    price:{
        type:Number,
        trim:true,
        required:"price is required"
    },
    postedBy:{
        type:ObjectId,
        ref:"User" 
    },
    image:{
       data:Buffer,
       contentType:String
    },
    from:{
        type:Date
    },
    to:{
        type:Date
    },
    bed:{
        type:Number
    }
},{
    timestamps:true
})

export default mongoose.model("Hotel",hotelSchema);