import React, { useState } from 'react'
import AlgoliaPlaces from 'algolia-places-react'
import axios from "axios"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import HotelCreateForm from '../components/forms/HotelCreateForm'

const NewHotel = () => {
    const [value, setValue] = useState({
        title: "",
        content: "",
        image: "",
        price: "",
        from: "",
        to: "",
        bed: ""

    })
    const { auth } = useSelector((state) => {
        return state
    })
    const { token } = auth;
    const [preview, setPreview] = useState();
    const [location, setLocation] = useState("");
    const { title, content, image, price, from, to, bed } = value;
    const handleImageChange = (event) => {
        //console.log(event.target.files[0]);
        setPreview(URL.createObjectURL(event.target.files[0]))
        setValue({ ...value, image: event.target.files[0] })
    }
    const handleSubmit = async (event) => { // this fn will be triggered when the form will be submit
        event.preventDefault();
        /*console.log(value);
        console.log(location)
        we got the values entered by the user at the front end in our state...*/

        /**1->as we need to send all this data to the backend so we will be making a post request 
         * 2-> as we are also sending the image that is a file so we cant send the data in the json format
         * we have to send it as a form data...
        */
        let hotelData = new FormData()
        hotelData.append("title", title)
        hotelData.append("content", content)
        hotelData.append("location", location)
        hotelData.append("price", price)
        image && hotelData.append("image", image)
        hotelData.append("from", from)
        hotelData.append("to", to)
        hotelData.append("bed", bed)

        //console.log([...hotelData])
        try {
            let res = await axios.post(`/create-hotel`, hotelData, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("New Hotel Room is posted");
            setTimeout(() => {
                window.location.reload(); // this will reloads the current page..
            }, 1000)
        }
        catch (err) {
           console.log(err)
           // response.data.message contain the message taht is sent by the backend to the frontend..
           //toast.error("Try Again")
           toast.error(err.response.data)
        }

    }
    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })
    }


    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>Add a new Hotel</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br></br>
                        <HotelCreateForm
                            value={value}
                            setValue={setValue}
                            location={location}
                            setLocation={setLocation}
                            handleImageChange={handleImageChange}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                        ></HotelCreateForm>
                    </div>
                    <div className="col-md-2">
                        <img src={preview} alt="preview_image" className="img img-fluid m2"></img>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default NewHotel


/**<input type="text" name="location" onChange={handleChange} placeholder="Location" className="form-control m-2" value={location}
                    ></input> */
/**<input type="number" name="bed" onChange={handleChange} placeholder="Number of Beds" className="form-control m-2" value={bed}
                    ></input> */