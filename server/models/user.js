// here we will be defining the user schema..
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const {Schema} =mongoose // detructutre kiya hai..

const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required"
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:"Email is required"
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:64

    },
    stripe_account_id:"",
    stripe_seller:{}, // through this we will determine wheteher the user is connected to stripe or not
    stripeSession:{}
},{
    timestamps:true
})

/* pre is a middleware(basically a function) that will run one after the other...whenever the next() is 
called..this middleware is used to hash the password...we are calling the save method in the callback fn
for the api to register the user..*/
userSchema.pre('save',function(next){
    let user=this; // here this basically refers to the user schema..
    if(user.isModified('password'))
    {
        return bcrypt.hash(user.password,10,function(err,hash){
            if(err)
            {
                console.log("bcrypt error is",err);
                return next(err);
            }
            user.password=hash; // this hash constain the hashed password...
            return next();
        })
    }
    else{
        return next();
    }
})

/** we will be writing a middleware funtion that will compare the password.. */
// this password is the plain password that the user has entered at the front end..
// in the form of a result it will give a callback fucntion to us..
userSchema.methods.comparePassword= function(password,next){
    let user=this
    bcrypt.compare(password,user.password,function(err,match){
        if(err){
            console.log("compare password error",err);
            return next(err,false);
        }
        return next(null,match) // true...
    })

}
export default mongoose.model("User",userSchema) // useSchema is used with the name user..

