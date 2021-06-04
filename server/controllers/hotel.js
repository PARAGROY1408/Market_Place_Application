import Hotel from '../models/hotel'
import fs from 'fs'

export const create=async (req,res)=>{
    //console.log("call is made to the correct end point")
    //console.log("req.fields ",req.fields)
    //console.log("req.files ",req.files) image of the hotel room
    try{
       let fields=req.fields;
       let files=req.files;
       const hotel=new Hotel(fields) // a new hotel is created usmei saari fields like title,location pass kr di hai..
       
       hotel.postedBy=req.user._id;
       /*-1->in the postedBy field we have the id of the user that posted that hotel it is used to show
       all the hotels posted by a user in the daasbord.
       2-> we will make a query to our database and store all the post made by the login user
       in an array and then send it as a response to the frontend*/


       // now we need to tackle the iamge and append it inside the hotel and then save it to the database..
       if(files.image)
       {
           hotel.image.data=fs.readFileSync(files.image.path)
           hotel.image.contentType = files.image.type
       }
       hotel.save((err,result)=>{
           if(err)
           {
               console.log("error while saving the hotel to the database...",err)
               return res.status(400).send("Error while saving the hotel room")
               // this is the response what we have sent from the backend to the frontend.
           }
           console.log(result)
           // this result contain everything what the user has entered about the hotel at the front end
           // this result is also what is saved inside the database..
           // and now we are sending it back to the frontend..s
           res.json(result)
       })
    }
    catch(err){
        console.log("error while posting the hotel room ",err);
        return res.status(404).send({json:err})
    }
}

export const hotels=async (req,res)=>{
   let all=await Hotel.find({})
   .limit(24) // we will only be showing certain number of hotels in the home page
   .select("-image.data") // so that our response could be really fast...
   .populate("postedBy","_id name")
   .exec()
   console.log(all);
   res.json(all);
}

export const image=async (req,res)=>{
    let hotel=await Hotel.findById(req.params.hotelId)
    if(hotel && hotel.image && hotel.image.data!=null)
    {
        res.set('Content-Type',hotel.image.contentType)
        return res.send(hotel.image.data)
    }
}


export const sellerHotels=async (req,res)=>{
    let all=await Hotel.find({postedBy:req.user}) // the logged in information is present inside the req.user
    .select("-image.data") // will make our response fast
    .populate("postedBy","_id name")
    .exec()
     
    console.log(all);
    res.send(all)
}

export const remove=async (req,res)=>{
    let removed=Hotel.findByIdAndDelete(req.params.hotelId).select("-image.data").exec();

    console.log(removed)
    // this removed contain all the remaining hotel posted by that user..
    res.json(removed)
}

export const read=async (req,res)=>{
    let hotel=await Hotel.findById(req.params.hotelId).populate("postedBy","_id name").select("-image.data").exec()
    // in the postedBy we have _id and name as we dont do it will send all the information even the hashed password also
    console.log("this is hotel that user at the front end want to see ",hotel);
    res.json({hotel:hotel})
}

export const update = async (req, res) => {
    try {
      let fields = req.fields;
      let files = req.files;
  
      let data = { ...fields };
  
      if (files.image) {
        let image = {};
        image.data = fs.readFileSync(files.image.path);
        image.contentType = files.image.type;
  
        data.image = image;
      }
  
      let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
        new: true,
      }).select("-image.data");
  
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).send("Hotel update failed. Try again.");
    }
  };

export const search=async (req,res)=>{
    //console.log(req.body) // got the serach parameter from the front end..
    const {location,date,bed}=req.body
    const fromDate=date.split(",")
    let result=await Hotel.find({from:{$gte:new Date(fromDate[0]) },location:location,bed:bed})
    .select("-image.data")
    .exec()
    console.log(result)
    res.json(result)
}