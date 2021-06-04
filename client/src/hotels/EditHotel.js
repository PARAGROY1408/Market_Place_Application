import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import HotelEditForm from '../components/forms/HotelEditForm'
import axios from 'axios'
import Form from 'antd/lib/form/Form'
import { toast } from 'react-toastify'

const EditHotel=()=>{
    /**first we need to fetch the id of the hotel from the url and then only we can send that id of the 
     * hotel to the backend so that we can fetch the details of that hotel */
    const [value, setValue] = useState({
        title: "",
        content: "",
        price: "",
        from: "",
        to: "",
        bed: ""

    })
    const [image,setImage]=useState("")
    const { auth } = useSelector((state) =>({...state}))
    const { token } = auth;
    const [preview, setPreview] = useState();
    const [location, setLocation] = useState("");
    const { title, content, price, from, to, bed } = value;
    const {hotelId}=useParams() // by the help of useParams hook we can fetch the hotelid from the url
    
    useEffect(()=>{
        console.log(hotelId)
        // now we will be making a get request at the backend..
        loadHotel();
    },[])
    
    const handleImageChange = (event) => {
        //console.log(event.target.files[0]);
        setPreview(URL.createObjectURL(event.target.files[0]))
        //setValue({ ...value, image: event.target.files[0] })
        setImage(event.target.files[0])
    }

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();

        const hotelData=new FormData();
        hotelData.append("title", title)
        hotelData.append("content", content)
        hotelData.append("location", location)
        hotelData.append("price", price)
        image && hotelData.append("image", image)
        hotelData.append("from", from)
        hotelData.append("to", to)
        hotelData.append("bed", bed)

        try{
            // now we can make a request to the backend...
            // we will send the  token,updated data and the id of the hotel that we want to update.
            let res=await axios.put(`/update-hotel/${hotelId}`,hotelData,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            toast.success("Hotel is Updated Successfully")
            setTimeout(() => {
                window.location.reload(); // this will reloads the current page..
            }, 1000)
        }
        catch(err)
        {
            console.log("error while updating the hotel is ",err)
            console.log(err)
            toast.error("Try Again")
        }
    }
    const loadHotel=async ()=>{
       let res=await axios.get(`/hotel/${hotelId}`)
       console.log(res)
       const {data}=res
       const {hotel}=data
       //console.log(hotel)
       setValue({...value,...res.data.hotel})
       setLocation(res.data.hotel.location)
       setPreview(`/hotel/image/${hotel._id}`)
       
    }
    return(
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
                <h2>Edit Hotel</h2>
        </div>
        <br></br>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                <HotelEditForm
                            value={value}
                            setValue={setValue}
                            location={location}
                            setLocation={setLocation}
                            handleImageChange={handleImageChange}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                ></HotelEditForm>
                </div>
                <div className="col-md-2">
                   <img src={preview} alt="preview_image" className="img img-fluid m2"></img>
                   
                </div>
            </div>
        </div>
        </>
    )
}
export default EditHotel
//<pre>{JSON.stringify(value, null, 4)}</pre>